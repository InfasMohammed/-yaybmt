# Source migration status — 31 October 2026

The client supplied `softsql.zip` in this conversation. Its 22,214,970-byte SQL export was read locally without executing SQL or starting WordPress. The archive/raw SQL remain outside Git and the public export. Public output provenance and a SHA-256 checksum are recorded in `migration-report.json`.

## Reconciliation

| Source | Imported |
| --- | ---: |
| Published products | 292 |
| Brands | 9 |
| Product categories | 41 |
| Articles | 10 |
| Original page routes | 8 |
| Attachment records identified | 523 |
| Product image references retained | 292 |

All original product slugs, brand/category paths, article permalinks and public source page routes are represented. The database's `/%postname%/` article permalink and `/product/` base were checked. Nested product category paths come from the original parent relationships. The encoded quote in one product slug is preserved and separately checked against the actual export.

The eight source pages comprise homepage, shop, blog, about, contact, cart, checkout and account. About/contact/blog use their original routes. The three commerce/account URLs serve noindexed information and enquiry links; there is no cart, checkout or authentication runtime. Empty source About/Contact page bodies were replaced with confirmed business/contact copy, not invented company history. Source SEO fields were retained.

The route manifest contains source-derived routes plus browse directories and real static archive pagination. It is a database-derived inventory, not a completed production/Search Console crawl; historical media, author, query and other plugin URLs still need the launch URL review.

## Content fidelity and gaps

- 91 products contain original specifications; 58 have an explicit stored model. These values are reproduced from the supplied source, not independently certified manufacturer data.
- 224 products have no brand taxonomy assignment. No brand was inferred from their names or manufacturer text.
- 201 products have no stored description/details. The current text extraction finds 203 products with fewer than 50 words across excerpt and body. These are content enrichment priorities, not grounds to delete established URLs or add filler.
- All 292 primary product images are now present: 253 from April and 39 from other recorded months. They were read from the existing WordPress uploads through Novamira without changing WordPress files/settings. Each exact SQL image path is associated with its original product, and the byte-identical original has a recorded SHA-256 checksum. No fabricated or substitute photos are used.
- Article headings, paragraphs, lists, tables and internal links are retained in safe HTML. Block comments, styles and runtime markup are removed. The import report's former `articleImageReferences` label was inaccurate: all 32 embedded image references occur in product bodies, not articles. This is now `inlineImageReferences`. Of those, 31 genuine technical drawings have been recovered from live WordPress uploads and matched to 28 products using the exact SQL references. One synthetic placeholder URL remains intentionally excluded. See `technical-drawings.md`.
- Five invalid Marine Locks links in article content were corrected. The exact old category route has a one-hop 301 to the original brand archive.
- Two competitor destinations in the stainless-steel article have no verified equivalent in the supplied catalogue. Their anchor text is retained as plain text; those destinations are not promoted as links. The original destinations are recorded for editorial review, rather than guessed replacements.
- Product prices, stock status, customer/order data, user accounts, reviews and plugin settings were excluded. No synthetic Offer, price-currency or AggregateRating markup is emitted.

## Provenance and architecture

The site now depends on `data/`, `app/`, `components/` and approved `public/images/` assets only. Original logos match the source files unchanged. The homepage hero is the pre-existing illustrative marine scene; its static WebP is 190,332 bytes versus the original 2,331,615-byte PNG. This is an asset-byte reduction, not a Core Web Vitals claim.

The SQL reader/importer and optional image matcher are repository maintenance tools only. No PHP/MySQL/WordPress service is started or required. Earlier WordPress code, scripts, delivery ZIP and historical documentation are preserved under `legacy/` and in Git history; none enter `out/`.

The core rebuild was merged into main after the client's explicit request, and the pre-existing Vercel integration subsequently built it. This media update remains on a separate review branch; it has not changed main, WordPress content/settings, DNS, Firebase or Search Console. Production release remains gated by `docs/seo-release.md`.
