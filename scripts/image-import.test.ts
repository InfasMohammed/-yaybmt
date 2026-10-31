import test from "node:test";
import assert from "node:assert/strict";
import { mergeProductImages } from "../lib/image-import";
import type { ProductImage } from "../data/types";
const image = (source: string, src: string): ProductImage => ({
  source,
  src,
  alt: "Recorded product image",
});
test("partial month imports preserve earlier months and manually supplied images", () => {
  const april = image(
    "supplied SQL attachment 1",
    "/images/products/2025/04/a.jpg",
  );
  const june = image(
    "supplied SQL attachment 2",
    "/images/products/2025/06/b.jpg",
  );
  const manual = image("Client-approved photo", "/images/manual.jpg");
  assert.deepEqual(
    mergeProductImages([april, manual], [june], [april.source, june.source]),
    [april, june, manual],
  );
});
test("reimport updates the same source without duplicating a product gallery", () => {
  const original = image("supplied SQL attachment 1", "/images/products/a.jpg");
  const optimised = {
    ...original,
    src: "/images/products/a.jpg.webp",
    originalSrc: original.src,
  };
  assert.deepEqual(
    mergeProductImages([original], [optimised], [original.source]),
    [optimised],
  );
  assert.deepEqual(
    mergeProductImages([optimised], [optimised], [original.source]),
    [optimised],
  );
});
test("duplicate attachment records pointing to the same original do not repeat photos", () => {
  const first = image("supplied SQL attachment 1", "/images/products/a.jpg");
  const other = image("supplied SQL attachment 2", first.src);
  assert.deepEqual(
    mergeProductImages([], [first, other], [first.source, other.source]),
    [first],
  );
});
