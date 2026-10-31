import {
  readFileSync,
  writeFileSync,
  existsSync,
  mkdirSync,
  realpathSync,
  copyFileSync,
} from "node:fs";
import { resolve, dirname, sep, extname } from "node:path";
import { products } from "../data/products";
const args = process.argv.slice(2);
const index = args.indexOf("--uploads");
if (index < 0 || !args[index + 1])
  throw new Error(
    "Usage: node --import tsx scripts/match-images.ts --uploads /private/path/wp-content/uploads [--write]",
  );
const uploads = realpathSync(args[index + 1]);
const write = args.includes("--write");
let matched = 0,
  missing = 0;
for (const product of products) {
  const images = [];
  for (const ref of product.mediaReferences) {
    if (!/\.(?:png|jpe?g|webp|avif|gif)$/i.test(ref.file)) continue;
    const input = resolve(uploads, ref.file);
    if (!input.startsWith(uploads + sep))
      throw new Error("Attachment path escaped upload directory");
    if (!existsSync(input)) {
      missing++;
      continue;
    }
    if (!realpathSync(input).startsWith(uploads + sep))
      throw new Error("Attachment symlink escaped upload directory");
    const bytes = readFileSync(input);
    const raster =
      bytes.subarray(0, 3).equals(Buffer.from([255, 216, 255])) ||
      bytes
        .subarray(0, 8)
        .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])) ||
      bytes.subarray(0, 6).toString().startsWith("GIF8") ||
      (bytes.subarray(0, 4).toString() === "RIFF" &&
        bytes.subarray(8, 12).toString() === "WEBP") ||
      (bytes.subarray(4, 8).toString() === "ftyp" &&
        bytes.subarray(8, 32).toString().includes("avif"));
    if (!raster)
      throw new Error("File is not a recognised raster image: " + ref.file);
    const src = "/images/products/" + ref.file;
    if (write) {
      const output = resolve("public", src.slice(1));
      mkdirSync(dirname(output), { recursive: true });
      copyFileSync(input, output);
    }
    images.push({
      src,
      alt: ref.alt,
      source: "supplied SQL attachment " + ref.attachmentId,
    });
    matched++;
  }
  if (write)
    product.images = [
      ...images,
      ...product.images.filter(
        (image) => !image.source.startsWith("supplied SQL attachment "),
      ),
    ].filter(
      (image, index, all) =>
        all.findIndex((other) => other.src === image.src) === index,
    );
}
if (write)
  writeFileSync(
    "data/products.ts",
    'import type { Product } from "./types";\nexport const products: Product[] = ' +
      JSON.stringify(products, null, 2) +
      ";\n",
  );
console.log(
  write
    ? "Copied matched images and updated product data."
    : "Dry run; no files changed.",
  { matched, missing },
);
