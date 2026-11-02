# SEO preservation and production release

The client's design review does not complete the source/content/media or production release review. The rebuild preserves known URLs and metadata and prevents an accidental indexable sample launch. It cannot guarantee rankings.

## Implemented technical SEO

- Database-derived product, brand, nested category, article and source page paths; real static archive pagination with crawlable page links.
- Unique page titles and descriptions, original H1 names, source Yoast fields where available and factual local fallbacks. Duplicate product titles use the recorded category for context.
- Page-specific apex-HTTPS canonicals; static pagination pages self-canonicalise. Filter/sort variants retain the canonical of the static archive document. Query variants do not enter the sitemap.
- Product, Article, BreadcrumbList and Organization JSON-LD based on public source/client-confirmed facts. No invented price, stock, rating, review, author, photo or publication date. Product rich-result eligibility is not claimed when required commerce/review facts are absent.
- Safe article HTML and repaired internal Marine Locks links. Known competitor references are recorded for review and not replaced with invented destinations.
- One-hop specific 301s; a genuine exported 404; no blanket homepage redirect or SPA fallback.
- Production sitemap generated from real indexable exported routes. Retired cart/checkout/account pages are permanently excluded and remain noindexed.
- Local fonts, explicit image frames, an original hero encoded/preloaded as static WebP, and lightweight catalogue records passed to the client. No third-party embeds or database requests are required to render content.
- Automated source integrity checks, export SEO/internal-link audit and desktop/mobile/no-JavaScript browser checks. GitHub CI contains no deployment action.

See `seo-audit.json`, `url-manifest.json`, `migration-report.json` and `static-validation.md` for evidence and scope. Local audit success does not verify Firebase response headers, production host redirects, Google indexing or ranking impact.

## Content and media review before release

1. All 292 primary product photos are restored using exact SQL references. Review their quality, alt text, measured dimensions and byte size. All 31 genuine inline technical drawings are now recovered locally for 28 products; one legacy generated placeholder is deliberately excluded. Never invent replacement photos.
2. Confirm priority products and enrich the 201 empty product bodies using approved manufacturer/client information. Review the 203 short records, 224 missing brand relationships and 234 absent explicit models. Keep unknown fields empty until verified.
3. Review imported marketing claims and technical values. Confirm the metadata and visible copy reflect current business/service facts. Resolve the two removed competitor links with verified relevant destinations or retain plain text.
4. Obtain a live crawl, current sitemap and Search Console page/query exports. Reconcile high-value URLs, old pagination, attachment/author/tag/query/plugin routes and inbound links against the database-derived manifest. Add only relevant, specific redirects. Do not consolidate duplicate-looking products without reviewing their real distinctions.
5. Validate final structured data using Google's tools with genuine images/content. Review the business name, confirmed contacts and Maps listing. Do not add unverified opening hours, full street address or review stars.
6. Measure Lighthouse and Core Web Vitals on representative final pages. Current checks verify responsive layout and reduced-motion behavior, not field performance or a full WCAG audit.

## Approved production switch

Keep review builds noindexed. Before an approved indexable release, complete the above review, set `complete:true` in `data/migration.ts`, and remove only the review `X-Robots-Tag: noindex, nofollow` header from `firebase.json`. Preserve the content-type security header and specific redirects.

```sh
npm ci
npm run check
npm run manifest
YAYBMT_PRODUCTION=true npm run build
YAYBMT_PRODUCTION=true npm run check:export
```

Without the production flag, page metadata/robots stay noindexed and the sitemap stays empty. With the flag, incomplete migration review intentionally blocks the build. The pure production sitemap generator is tested separately without changing the review export.

After explicit deployment approval, verify actual Firebase Hosting responses: every priority URL, 404 status, one-hop 301 destinations, robots, sitemap, canonical tags, final headers and HTTPS. Configure and test the www-to-apex host redirect and domain/TLS using the approved Hosting/domain setup; it has not been changed here. Never redirect all missing URLs to the homepage.

Record the existing host/DNS rollback plan. After cutover, submit the sitemap in Search Console, inspect priority URLs and monitor indexing, 404s, clicks and impressions against the pre-launch baseline. Keep the old host/history available for rollback until the approved monitoring period is complete.
