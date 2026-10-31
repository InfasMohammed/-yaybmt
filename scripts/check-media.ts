import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { resolve } from "node:path";
import sharp from "sharp";
import { products } from "../data/products";
import redirects from "../data/image-redirects.json";

async function main() {
  const manifest = JSON.parse(
    readFileSync("docs/product-image-manifest.json", "utf8"),
  );
  let checked = 0;
  for (const product of products) {
    for (const image of product.images) {
      const rendered = readFileSync(resolve("public", image.src.slice(1)));
      const info = await sharp(rendered).metadata();
      assert.equal(info.width, image.width, "Wrong image width " + image.src);
      assert.equal(
        info.height,
        image.height,
        "Wrong image height " + image.src,
      );
      assert.ok(image.alt && image.source, "Missing image alt/provenance");
      if (image.source.startsWith("supplied SQL attachment ")) {
        const ref = product.mediaReferences.find(
          (ref) =>
            image.source === "supplied SQL attachment " + ref.attachmentId,
        );
        assert.ok(ref, "Image is not associated with this product in SQL");
        assert.equal(image.originalSrc, "/images/products/" + ref.file);
        const original = readFileSync(
          resolve("public", image.originalSrc!.slice(1)),
        );
        const entry = manifest.files.find(
          (row: { product: string; file: string }) =>
            row.product === product.slug && row.file === ref.file,
        );
        assert.ok(entry, "Image absent from checksum manifest");
        assert.equal(
          createHash("sha256").update(original).digest("hex"),
          entry.sha256,
          "Original photo changed " + product.slug,
        );
        assert.ok(
          redirects.some(
            (rule) =>
              rule.source === encodeURI("/wp-content/uploads/" + ref.file) &&
              rule.destination === encodeURI(image.originalSrc!),
          ),
          "Original media URL is not mapped",
        );
      }
      checked++;
    }
  }
  const config = JSON.parse(readFileSync("firebase.json", "utf8")).hosting;
  for (const rule of redirects) {
    assert.ok(
      existsSync(
        resolve("public", decodeURIComponent(rule.destination).slice(1)),
      ),
    );
    assert.ok(
      config.redirects.some(
        (r: { source: string; destination: string; type: number }) =>
          r.source === rule.source &&
          r.destination === rule.destination &&
          r.type === 301,
      ),
    );
  }
  assert.ok(
    products.every((p) => p.images.length),
    "A source product is missing its primary photo",
  );
  console.log(
    "PASS media:",
    checked,
    "decoded images; dimensions, source associations, original SHA-256 checksums and",
    redirects.length,
    "specific legacy media redirects.",
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
