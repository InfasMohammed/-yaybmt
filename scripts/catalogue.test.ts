import test from "node:test";
import assert from "node:assert/strict";
import { products } from "../data/products";
import {
  filterProducts,
  emptyFilters,
  readFilters,
  writeFilters,
} from "../lib/catalogue";
import { pageNumbers, pagePath } from "../lib/pagination";
test("real DAELIM and Marine Locks relationships match the supplied export", () => {
  assert.equal(
    filterProducts(
      products.filter((p) => p.source.startsWith("supplied SQL product ")),
      { ...emptyFilters, brands: ["daelim"] },
    ).length,
    21,
  );
  assert.equal(
    filterProducts(
      products.filter((p) => p.source.startsWith("supplied SQL product ")),
      { ...emptyFilters, brands: ["marine-locks"] },
    ).length,
    19,
  );
});
test("hierarchical filters include descendants, combine across groups, and search ignores case/spacing", () => {
  const parent = filterProducts(products, {
    ...emptyFilters,
    categories: ["fasteners"],
  });
  assert.ok(parent.length > 0);
  assert.ok(
    parent.every((p) =>
      p.categorySlugs.some(
        (c) => c === "fasteners" || c.startsWith("fasteners/"),
      ),
    ),
  );
  const results = filterProducts(products, {
    ...emptyFilters,
    query: "  dc 102 ",
    brands: ["daelim"],
  });
  assert.equal(results.length, 1);
  assert.equal(results[0].slug, "dc-102");
  assert.equal(
    filterProducts(products, {
      ...emptyFilters,
      brands: ["daelim"],
      categories: ["fasteners"],
    }).length,
    0,
  );
});
test("filter URLs round-trip and reject malformed or unknown terms", () => {
  const filters = {
    query: "flush & mixer",
    brands: ["daelim"],
    categories: ["flush-valve"],
    sort: "model" as const,
    page: 2,
  };
  assert.deepEqual(
    readFilters(writeFilters(filters), ["daelim"], ["flush-valve"]),
    filters,
  );
  assert.deepEqual(
    readFilters(
      "?brand=unknown&brand=daelim&brand=daelim&category=bad&page=-5&sort=price",
      ["daelim"],
      [],
    ),
    { ...emptyFilters, brands: ["daelim"] },
  );
});
test("pagination creates real page paths and handles boundary counts", () => {
  assert.equal(pageNumbers(292).length, 25);
  assert.equal(pagePath("/brand/daelim/", 2), "/brand/daelim/page/2/");
  assert.equal(pagePath("/shop/", 1), "/shop/");
});

import { sitemapEntries } from "../lib/sitemap";
import { routes } from "../lib/routes";
test("production sitemap covers real indexable routes and excludes retired utility pages", () => {
  assert.deepEqual(sitemapEntries(false), []);
  const urls = sitemapEntries(true).map((item) => item.url);
  assert.equal(urls.length, routes.filter((route) => route.indexable).length);
  assert.ok(urls.includes("https://yaybmt.com/brand/marine-locks/"));
  assert.ok(urls.includes("https://yaybmt.com/product/dc-102/"));
  for (const path of [
    "/cart/",
    "/checkout/",
    "/my-account/",
    "/product-category/marine-locks/",
  ])
    assert.ok(!urls.includes("https://yaybmt.com" + path));
});
