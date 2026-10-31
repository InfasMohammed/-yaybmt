# Manual content maintenance

The finished site reads local TypeScript files only. No SQL, WordPress, plugin, remote CMS or Firebase database is used at runtime or by an ordinary rebuild.

## Data files

| File | Content |
| --- | --- |
| `data/products.ts` | Original product slug/name, explicit model or null, recorded brand or null, category paths, descriptions, sourced specifications, media references and SEO |
| `data/brands.ts`, `data/categories.ts` | Original term names and complete category path hierarchy |
| `data/articles.ts` | Original article path, title, publication date, sanitised body and source SEO |
| `data/source-pages.ts` | All eight source page identities, routes and SEO fields |
| `data/pages.ts` | Authored company/contact content and retired commerce utility notices |
| `data/contacts.ts` | Confirmed business contacts and external profile links |
| `data/redirects.json` | Specific redirect mapping, mirrored in `firebase.json` |

Types are in `data/types.ts`. Preserve slugs, article `path` values and category hierarchy. Specifications need a label, value and source; only add values supported by a supplied manufacturer/client source. An absent model or brand stays null. Do not infer a brand from a product name or fill empty descriptions with invented claims. Article `publishedAt` is the original publication date; do not set a new date on every build.

`bodyHtml` is the importer's allowlisted public HTML. It retains headings, paragraphs, lists, tables and safe internal links. It must never contain scripts, forms, event handlers, styles, WordPress shortcodes or unavailable remote images. Use `description`/`paragraphs` for simple manual copy changes. Review edited HTML and run checks before committing.

Metadata uses source SEO fields, then factual name/category fallbacks. Duplicate product SEO titles are disambiguated using recorded category names; H1s keep original product names. All canonicals use the original route and `https://yaybmt.com`. Do not add price/availability/review schema without genuine supporting data and an explicit change in scope.

## Adding genuine media later

Keep files under `public/images/`. Every product image needs `src`, accurate `alt`, and provenance `source`. Rendered frames use `object-fit: contain`; explicit dimensions reserve space. The gallery uses native scroll/anchor links and works without JavaScript. Missing images remain placeholders and are never emitted in Product schema.

The SQL has 523 attachment records and 292 product image references. Once the original uploads directory is supplied, match files by those references rather than filenames guessed from product names:

```sh
node --import tsx scripts/match-images.ts --uploads /private/path/wp-content/uploads
# Review the dry-run results, then copy the matched originals:
node --import tsx scripts/match-images.ts --uploads /private/path/wp-content/uploads --write
npm run check
npm run build
npm run check:export
```

The matcher validates raster image signatures, rejects paths/symlinks outside the input directory, copies referenced originals to `public/images/products/`, and updates product image data. It does not download substitutes. Article illustrations have separate source references in `docs/migration-report.json`; matching them is still pending. Preserve original logos unchanged.

`npm run assets:optimise` re-encodes only the retained illustrative homepage hero as WebP; it leaves the original PNG and logo files unchanged. Commit the generated WebP when changing that hero.

## Routes and verification

`lib/routes.ts` is the route inventory; `npm run manifest` writes `docs/url-manifest.json`. Static pagination is generated at 12 products per page, including nested category and brand archive URLs. No-JavaScript visitors follow the same exported page links. Filter/query variants are not added to the sitemap.

The original source counts are minimum preservation baselines; intentional removal or consolidation needs URL/redirect review. When adding verified records, review any data-specific regression expectations as well as the data.

Run `npm run check`, `npm run manifest`, `npm run build`, `npm run check:export`, and browser checks for changes affecting visitor flows. Commit source, lockfile and approved assets. Never commit SQL, credentials, private backups, `node_modules`, `.next` or `out`.

## Repeating the one-off SQL migration

This overwrites imported data files, so preserve reviewed manual edits first. Normal content changes do not require it.

```sh
python3 -m pip install -r scripts/migration-requirements.txt
python3 scripts/import-catalogue.py /private/path/softsql.sql
npm run format
npm run manifest
npm run check
```

The importer never executes SQL. It selects public published website fields and known attachment references, ignores users/orders/reviews/prices/stock/plugin configuration, verifies the expected counts and records a source checksum. It strips unsafe/runtime markup, repairs the five Marine Locks links, and reports unsupported/external links. Raw input and intermediates stay outside Git, normally in ignored `work/`.
