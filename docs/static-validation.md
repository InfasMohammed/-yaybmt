# Static catalogue validation — 31 October 2026

Story verified: visitor opens an exported catalogue page, searches/filters public local records, follows native pagination or category/brand links, opens a real product or article, and prepares an email or WhatsApp enquiry. There is no runtime database or API boundary.

## Results

| Check | Result |
| --- | --- |
| Source reconciliation | 292 products, 9 brands, 41 categories, 10 articles, 8 source page routes |
| TypeScript and content integrity | Passed |
| Catalogue and sitemap regression tests | 5 passed |
| Offline SQL parser/privacy tests | 3 passed |
| Next.js static build | Passed |
| Export SEO/internal-link audit | 406 pages passed |
| Unique titles/descriptions | 406 / 406 |
| Eligible production sitemap routes | 403; excludes three retired utility pages |
| Actual local HTTP responses | All 406 public exported routes returned 200 |
| Specific redirects / unknown URLs | 301 destinations and genuine 404s passed |
| Production dependency audit | Zero known vulnerabilities at verification time |

The staging export remains noindexed, with blocked robots rules and an empty sitemap. The production sitemap generator is tested independently. An attempted indexable build was correctly blocked by the incomplete launch-review flag; no production release was made.

## Browser coverage

Chromium verified homepage, catalogue, product and article pages at 1440, 390 and 320 pixels: one H1, no horizontal overflow, correct page canonical and review noindex. It checked search/clear, multi-group filters, selected chips, restored filter URLs, empty states, native archive pagination, mobile drawer and Escape, first-row image-frame/name-panel/card-bottom alignment, imported specifications and missing-model/brand handling.

Product-specific email/WhatsApp destinations and exact confirmed numbers were checked without opening external services or sending messages. Every exported route was requested over localhost, including the percent-encoded product slug. Invalid product/brand/page paths returned HTTP 404. All known redirect mappings returned a one-hop 301 to an exported destination.

A separate JavaScript-disabled context followed DAELIM's native page links and opened a real product enquiry. Reduced motion disabled card animations. No uncaught browser errors remained. Fresh full-page desktop/mobile homepage, catalogue, product and article screenshots are in `artifacts/nextjs/`.

Visual inspection confirmed the original white logo, charcoal/off-white/copper treatment and labelled missing-image frames. The hero is the existing illustrative scene, pre-encoded to 190,332-byte WebP from a 2,331,615-byte PNG. Both original logo hashes match the retained source assets.

## Issues caught and corrected

- The preview-only brand list omitted DAELIM; real SQL terms and relationships now replace it.
- An encoded quote in one source product slug initially produced an error document. Both route parameter and lookup are now normalised, and its exported HTML/HTTP response pass.
- Browser filtering initially produced duplicate canonical tags when mutating React-owned metadata. That mutation was removed; the static document remains the metadata owner and native pagination self-canonicalises.
- Two duplicate utility descriptions were made page-specific. Source duplicate product titles are distinguished by actual recorded categories; all adjustments are listed in `seo-audit.json`.
- The SQL reader was restricted to the detected core prefix, preventing similarly named plugin tables from entering the public extraction. Privacy tests confirm users, orders, draft products, prices and arbitrary settings are excluded.

## Limits

The HTTP redirect/404 checks used the local static preview; Firebase configuration was inspected, but no Hosting emulator, deployed headers, domain redirects, TLS, production crawl, Search Console, Google rich-results tool, field Core Web Vitals or full WCAG audit is claimed. GitHub CI was added; the local results above do not claim a completed remote workflow run.

All 292 product photos and 32 article illustrations remain unavailable. 201 product bodies are empty in the source and need approved enrichment; imported specifications are reproduced source values, not independent manufacturer certification. The two removed competitor links remain editorial review items. Raw SQL and the uploaded archive are not committed or served. Nothing was deployed and main is unchanged.
