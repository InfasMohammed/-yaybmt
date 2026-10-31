import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { products } from "../data/products";
import { brands } from "../data/brands";
import { categories } from "../data/categories";
import { articles } from "../data/articles";
import { sourcePages } from "../data/source-pages";
import { pages } from "../data/pages";
import { routes } from "../lib/routes";
import { migration } from "../data/migration";
import { productSEO } from "../lib/product-seo";
import redirects from "../data/redirects.json";

function unique(values: string[], label: string) {
  assert.equal(new Set(values).size, values.length, "Duplicate " + label);
}
unique(
  products.map((p) => decodeURIComponent(p.slug)),
  "product slugs",
);
unique(
  brands.map((b) => b.slug),
  "brand slugs",
);
unique(
  categories.map((c) => c.slug),
  "category slugs",
);
unique(
  routes.map((r) => decodeURIComponent(r.path)),
  "routes",
);
for (const route of routes) {
  assert.ok(
    route.path.startsWith("/") &&
      route.path.endsWith("/") &&
      !route.path.includes(".."),
    "Unsafe route " + route.path,
  );
  assert.ok(!/[?#]/.test(route.path), "Route must be a pathname");
}
const brandSlugs = new Set(brands.map((b) => b.slug));
const categorySlugs = new Set(categories.map((c) => c.slug));
for (const p of products) {
  assert.ok(p.name && p.source, "Missing product provenance/name");
  assert.ok(
    p.brand === null || brandSlugs.has(p.brand),
    "Unknown brand " + p.slug,
  );
  for (const slug of p.categorySlugs)
    assert.ok(categorySlugs.has(slug), "Unknown category " + p.slug);
  for (const spec of p.specifications)
    assert.ok(
      spec.label && spec.value && spec.source,
      "Unsourced specification " + p.slug,
    );
  for (const image of p.images) {
    assert.ok(
      image.src.startsWith("/images/") &&
        !image.src.includes("..") &&
        image.alt &&
        image.source,
      "Unsafe/unsourced image",
    );
    assert.ok(
      existsSync(resolve("public", image.src.slice(1))),
      "Missing local image " + image.src,
    );
  }
  for (const ref of p.mediaReferences)
    assert.ok(
      ref.attachmentId > 0 &&
        ref.file &&
        !ref.file.includes("..") &&
        !ref.file.startsWith("/") &&
        !/^https?:/.test(ref.file),
      "Invalid attachment reference",
    );
  assert.ok(!p.name.includes("\uFFFD"), "Invalid source encoding");
}
for (const item of [...products, ...articles, ...pages]) {
  if (item.bodyHtml) {
    assert.ok(
      !/<(?:script|style|iframe|form|input|object|embed|img)\b/i.test(
        item.bodyHtml,
      ),
      "Unsafe or unavailable embedded content",
    );
    assert.ok(
      !/\son\w+\s*=|javascript:|data:text\/html/i.test(item.bodyHtml),
      "Unsafe HTML attributes",
    );
    assert.ok(
      !/<!--\s*wp:|\[\/?(?:woocommerce|wpforms|contact-form)/i.test(
        item.bodyHtml,
      ),
      "Unconverted WordPress content",
    );
  }
}
for (const redirect of redirects) {
  assert.ok(
    routes.some((r) => r.path === redirect.destination),
    "Redirect destination missing",
  );
  assert.ok(
    !routes.some((r) => r.path === redirect.source),
    "Redirect shadows a static route",
  );
  assert.equal(redirect.type, 301);
}
const firebase = JSON.parse(readFileSync("firebase.json", "utf8")).hosting;
assert.equal(firebase.public, "out");
assert.ok(!firebase.rewrites?.length, "No SPA fallback allowed");
for (const redirect of redirects)
  assert.ok(
    firebase.redirects.some(
      (r: { source: string; destination: string }) =>
        r.source === redirect.source && r.destination === redirect.destination,
    ),
    "Firebase redirect drift",
  );
const counts = {
  products: products.length,
  brands: brands.length,
  categories: categories.length,
  articles: articles.length,
  pages: sourcePages.length,
};
for (const [kind, expected] of Object.entries(migration.expected)) {
  assert.ok(
    counts[kind as keyof typeof counts] >= expected,
    "Source baseline lost records in " +
      kind +
      "; review URL retirement/redirects before reducing this baseline",
  );
}
const titles = products.map((p) => productSEO(p).title.toLowerCase());
unique(titles, "product SEO titles");
assert.ok(articles.length >= migration.expected.articles);
assert.ok(
  pages
    .filter((p) => p.kind === "retired")
    .every((p) => routes.find((r) => r.path === p.path)?.indexable === false),
);
console.log(
  "PASS content integrity:",
  counts,
  ";",
  routes.length,
  "static routes; sourced specifications; safe HTML; local media; redirects; unique product SEO titles.",
);
