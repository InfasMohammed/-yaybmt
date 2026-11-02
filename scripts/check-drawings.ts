import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import sharp from "sharp";
import { productDocuments } from "../data/product-documents";
import { products } from "../data/products";
import manifest from "../docs/product-drawing-manifest.json";
import rules from "../data/drawing-image-redirects.json";
import firebase from "../firebase.json";
async function main() {
  let count = 0;
  assert.equal(Object.keys(productDocuments).length, 28);
  for (const [slug, drawings] of Object.entries(productDocuments)) {
    assert.ok(products.some((p) => p.slug === slug));
    for (const drawing of drawings) {
      const row = manifest.files.find(
        (r) =>
          r.page === `/product/${slug}/` &&
          drawing.originalSrc === `/images/products/drawings/${r.file}`,
      );
      assert.ok(row, "Exact source product association missing");
      const bytes = readFileSync("public" + drawing.originalSrc);
      assert.equal(
        createHash("sha256").update(bytes).digest("hex"),
        row.sha256,
      );
      const info = await sharp("public" + drawing.src).metadata();
      assert.equal(info.width, drawing.width);
      assert.equal(info.height, drawing.height);
      await sharp("public" + drawing.src)
        .raw()
        .toBuffer();
      count++;
    }
  }
  assert.equal(count, 31);
  for (const rule of rules) {
    assert.ok(
      firebase.hosting.redirects.some(
        (r) =>
          r.source === rule.source &&
          r.destination === rule.destination &&
          r.type === 301,
      ),
    );
    readFileSync("public" + decodeURI(rule.destination));
  }
  console.log(
    `PASS: ${count} drawings / 28 exact product associations, decoded images, original checksums, ${rules.length} redirects`,
  );
}
main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
