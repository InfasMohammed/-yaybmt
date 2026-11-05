import { productSEO } from "../lib/product-seo";
import assert from "node:assert/strict";
import { readFileSync, existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { routes } from "../lib/routes";
import { production, origin } from "../lib/site";
import { products } from "../data/products";
import { articles } from "../data/articles";
const titles = new Map<string, string>();
const descriptions = new Map<string, string>();
const seoWarnings: { type: string; paths: string[] }[] = [];
const decode = (value: string) =>
  value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'");
const localFile = (pathname: string) =>
  join(
    "out",
    decodeURIComponent(pathname),
    pathname.endsWith("/") ? "index.html" : "",
  );
for (const route of routes) {
  const file = localFile(route.path);
  assert.ok(existsSync(file), "Missing export " + route.path);
  const html = readFileSync(file, "utf8");
  assert.ok(
    !/href="mailto:/i.test(html),
    "Unexpected email enquiry link at " + route.path,
  );
  assert.equal(
    (html.match(/<h1(?:\s|>)/g) || []).length,
    1,
    "Expected one H1 " + route.path,
  );
  const title = decode(html.match(/<title>(.*?)<\/title>/s)?.[1] || "");
  assert.ok(title, "Missing title " + route.path);
  assert.ok(
    !titles.has(title),
    "Duplicate title " +
      title +
      " at " +
      route.path +
      " and " +
      titles.get(title),
  );
  titles.set(title, route.path);
  const description = decode(
    html.match(/<meta name="description" content="([^"]*)"/s)?.[1] || "",
  );
  assert.ok(description, "Missing description " + route.path);
  if (descriptions.has(description))
    seoWarnings.push({
      type: "duplicate-description",
      paths: [descriptions.get(description)!, route.path],
    });
  else descriptions.set(description, route.path);
  assert.ok(
    html.includes('rel="canonical" href="' + origin + route.path + '"'),
    "Canonical mismatch " + route.path,
  );
  const robots = html.match(/<meta name="robots" content="([^"]*)"/)?.[1] || "";
  assert.ok(
    robots
      .split(",")
      .map((s) => s.trim())
      .includes(production && route.indexable ? "index" : "noindex"),
    "Robots mismatch " + route.path,
  );
  for (const match of html.matchAll(
    /<(?:a|img)\b[^>]*\b(?:href|src)="([^"]*)"/g,
  )) {
    const value = decode(match[1]);
    const url = new URL(value, origin + route.path);
    if (url.origin !== origin) continue;
    assert.ok(
      existsSync(localFile(url.pathname)),
      "Broken internal link/image " + value + " on " + route.path,
    );
    if (url.hash && url.pathname === route.path) {
      const target = decodeURIComponent(url.hash.slice(1));
      assert.ok(
        html.includes('id="' + target + '"'),
        "Broken anchor " + value + " on " + route.path,
      );
    }
  }
  for (const match of html.matchAll(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
  )) {
    const schema = JSON.parse(match[1]);
    if (schema["@type"] === "Product")
      for (const key of ["offers", "aggregateRating", "review"])
        assert.ok(
          !(key in schema),
          "Unsupported commerce/review schema at " + route.path,
        );
  }
}
assert.ok(existsSync("out/404.html"));
assert.ok(!existsSync("out/legacy"));
assert.ok(!existsSync("out/wp-content"));
const sitemap = readFileSync("out/sitemap.xml", "utf8");
const expected = production ? routes.filter((r) => r.indexable) : [];
assert.equal(
  (sitemap.match(/<loc>/g) || []).length,
  expected.length,
  "Sitemap coverage",
);
for (const route of expected)
  assert.ok(
    sitemap.includes("<loc>" + origin + route.path + "</loc>"),
    "Missing sitemap URL " + route.path,
  );
assert.ok(
  readFileSync("out/robots.txt", "utf8").includes(
    production ? "Sitemap: " + origin + "/sitemap.xml" : "Disallow: /",
  ),
);
assert.ok(products.length >= 292);
assert.ok(articles.length >= 10);
console.log(
  "PASS exported SEO and internal links:",
  routes.length,
  "pages; canonical tags, titles, H1s, sitemap, robots, structured data and local assets.",
);
console.log("Description review warnings:", seoWarnings.length);
if (seoWarnings.length) console.log(JSON.stringify(seoWarnings));

writeFileSync(
  "docs/seo-audit.json",
  JSON.stringify(
    {
      scope: "Local static export; not a production crawl",
      pagesChecked: routes.length,
      indexableAfterLaunch: routes.filter((r) => r.indexable).length,
      reviewNoindex: !production,
      uniqueTitles: titles.size,
      uniqueDescriptions: descriptions.size,
      descriptionWarnings: seoWarnings,
      checks: [
        "One H1 per page",
        "Page-specific canonical",
        "Robots mode",
        "Internal links and local images",
        "JSON-LD parses",
        "No Product offers, ratings or reviews",
        "Sitemap coverage",
        "No WordPress runtime in export",
      ],
    },
    null,
    2,
  ) + "\n",
);

const audit = JSON.parse(readFileSync("docs/seo-audit.json", "utf8"));
audit.productSourceSEOTitles = products.filter((p) => p.seo?.title).length;
audit.productTitleAdjustments = products
  .filter((p) => productSEO(p).title !== (p.seo?.title || p.name))
  .map((p) => ({
    path: "/product/" + p.slug + "/",
    original: p.seo?.title || p.name,
    rendered: productSEO(p).title,
  }));
writeFileSync("docs/seo-audit.json", JSON.stringify(audit, null, 2) + "\n");
