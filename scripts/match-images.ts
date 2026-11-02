import {
  readFileSync,
  writeFileSync,
  existsSync,
  mkdirSync,
  realpathSync,
  copyFileSync,
  statSync,
} from "node:fs";
import { resolve, dirname, sep } from "node:path";
import { createHash } from "node:crypto";
import sharp, { type Metadata } from "sharp";
import { products } from "../data/products";
import type { ProductImage } from "../data/types";
import { mergeProductImages } from "../lib/image-import";

async function main() {
  const args = process.argv.slice(2);
  const index = args.indexOf("--uploads");
  if (index < 0 || !args[index + 1])
    throw new Error(
      "Usage: node --import tsx scripts/match-images.ts --uploads /private/path/wp-content/uploads [--write] [--optimise]",
    );
  const uploads = realpathSync(args[index + 1]);
  const write = args.includes("--write");
  const optimise = args.includes("--optimise");
  const report: {
    product: string;
    file: string;
    status: string;
    originalBytes?: number;
    renderedBytes?: number;
    sha256?: string;
    src?: string;
    reason?: string;
  }[] = [];
  for (const product of products) {
    const incoming: ProductImage[] = [];
    for (const ref of product.mediaReferences) {
      const row = { product: product.slug, file: ref.file, status: "missing" };
      if (!/\.(?:png|jpe?g|webp|avif|gif)$/i.test(ref.file)) {
        report.push({ ...row, status: "unsupported" });
        continue;
      }
      const input = resolve(uploads, ref.file);
      if (!input.startsWith(uploads + sep))
        throw new Error("Attachment path escaped uploads");
      if (!existsSync(input)) {
        report.push(row);
        continue;
      }
      if (!realpathSync(input).startsWith(uploads + sep))
        throw new Error("Attachment symlink escaped uploads");
      const bytes = readFileSync(input);
      const checksum = createHash("sha256").update(bytes).digest("hex");
      let info: Metadata;
      try {
        info = await sharp(bytes, { animated: true }).metadata();
        if (
          !["jpeg", "png", "webp", "avif", "gif", "heif"].includes(
            info.format || "",
          )
        )
          throw new Error("Unsupported raster format");
      } catch (error) {
        report.push({ ...row, status: "invalid-image", reason: String(error) });
        continue;
      }
      const originalSrc = "/images/products/" + ref.file;
      const output = resolve("public", originalSrc.slice(1));
      let image: ProductImage = {
        src: originalSrc,
        originalSrc,
        alt: ref.alt,
        source: "supplied SQL attachment " + ref.attachmentId,
        width: info.width!,
        height: info.height!,
      };
      let renderedBytes = bytes.length;
      if (write) {
        mkdirSync(dirname(output), { recursive: true });
        const sameOriginal =
          existsSync(output) &&
          createHash("sha256").update(readFileSync(output)).digest("hex") ===
            checksum;
        if (!sameOriginal) copyFileSync(input, output);
        const previous = product.images.find((i) => i.source === image.source);
        if (
          sameOriginal &&
          previous?.originalSrc === originalSrc &&
          previous.width &&
          previous.height &&
          existsSync(resolve("public", previous.src.slice(1)))
        ) {
          image = { ...previous, alt: ref.alt };
          renderedBytes = statSync(resolve("public", image.src.slice(1))).size;
        } else if (optimise && (info.pages || 1) === 1) {
          const converted = await sharp(bytes)
            .rotate()
            .resize({
              width: 1600,
              height: 1600,
              fit: "inside",
              withoutEnlargement: true,
            })
            .webp({ quality: 88, effort: 5 })
            .toBuffer({ resolveWithObject: true });
          if (converted.data.length < bytes.length * 0.9) {
            image = {
              ...image,
              src: originalSrc + ".webp",
              width: converted.info.width,
              height: converted.info.height,
            };
            writeFileSync(output + ".webp", converted.data);
            renderedBytes = converted.data.length;
          }
        }
      }
      incoming.push(image);
      report.push({
        ...row,
        status: "matched",
        originalBytes: bytes.length,
        renderedBytes,
        sha256: checksum,
        src: image.src,
      });
    }
    if (write)
      product.images = mergeProductImages(
        product.images,
        incoming,
        product.mediaReferences.map(
          (ref) => "supplied SQL attachment " + ref.attachmentId,
        ),
      );
  }
  const summary = {
    write,
    optimise,
    totalReferences: report.length,
    matched: report.filter((row) => row.status === "matched").length,
    missing: report.filter((row) => row.status === "missing").length,
    invalid: report.filter((row) => row.status === "invalid-image").length,
    productsWithImages: products.filter((p) => p.images.length).length,
    originalBytes: report.reduce(
      (sum, row) => sum + (row.originalBytes || 0),
      0,
    ),
    renderedBytes: report.reduce(
      (sum, row) => sum + (row.renderedBytes || 0),
      0,
    ),
  };
  if (write) {
    writeFileSync(
      "data/products.ts",
      'import type { Product } from "./types";\nexport const products: Product[] = ' +
        JSON.stringify(products, null, 2) +
        ";\n",
    );
    writeFileSync(
      "docs/product-image-manifest.json",
      JSON.stringify(
        {
          source:
            "Read-only Novamira retrieval of exact supplied SQL attachment paths",
          summary,
          files: report,
        },
        null,
        2,
      ) + "\n",
    );
    const imageRedirects = [
      ...new Map(
        products
          .flatMap((p) =>
            p.images.flatMap((image) => {
              const ref = p.mediaReferences.find(
                (ref) =>
                  image.source ===
                  "supplied SQL attachment " + ref.attachmentId,
              );
              return ref
                ? [
                    {
                      source: encodeURI("/wp-content/uploads/" + ref.file),
                      destination: encodeURI(image.originalSrc || image.src),
                      type: 301,
                    },
                  ]
                : [];
            }),
          )
          .map((rule) => [rule.source, rule]),
      ).values(),
    ].sort((a, b) => a.source.localeCompare(b.source));
    writeFileSync(
      "data/image-redirects.json",
      JSON.stringify(imageRedirects, null, 2) + "\n",
    );
    const firebase = JSON.parse(readFileSync("firebase.json", "utf8"));
    const pageRedirects = JSON.parse(
      readFileSync("data/redirects.json", "utf8"),
    );
    firebase.hosting.redirects = [
      ...pageRedirects.map(
        (rule: { source: string; destination: string; type: number }) => ({
          ...rule,
          source: rule.source.replace(/\/$/, ""),
        }),
      ),
      ...pageRedirects,
      ...imageRedirects,
      ...JSON.parse(readFileSync("data/drawing-image-redirects.json", "utf8")),
    ];
    writeFileSync("firebase.json", JSON.stringify(firebase, null, 2) + "\n");
    const migration = JSON.parse(
      readFileSync("docs/migration-report.json", "utf8"),
    );
    migration.productsWithoutLocalImages = products.filter(
      (p) => !p.images.length,
    ).length;
    migration.productImageManifest = "product-image-manifest.json";
    writeFileSync(
      "docs/migration-report.json",
      JSON.stringify(migration, null, 2) + "\n",
    );
  }
  console.log(
    write
      ? "Imported genuine static product images."
      : "Dry run; no files changed.",
    summary,
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
