# YAYBMT — static catalogue

Next.js + TypeScript, exported to `out/` for Firebase Hosting. The client-supplied SQL has been migrated into typed local files: **292 products, 9 brands, 41 product categories, 10 articles and all 8 source page routes**. SQL is migration input only. There is no WordPress runtime, admin dashboard, database, Authentication, Firestore or Firebase Storage.

The core rebuild was merged into `main` through PR #1. The current image update is isolated on `feat/static-product-images`; it does not change production hosting or deploy Firebase. Earlier implementation and deliverables are preserved in Git history and `legacy/`; they are excluded from the export.

## Setup and commands

Node.js 22.18+ (24 recommended), npm and Python 3 for the local preview/parser tests:

```sh
npm ci
npm run dev
npm run check
npm run build
npm run check:export
npm run preview
# In another terminal:
npm run test:browser
```

Browser checks use the pinned Playwright package. They use `/usr/bin/chromium` when available; otherwise install its matching browser with `npx playwright install chromium`. `YAYBMT_BROWSER_EXECUTABLE` can select an installed browser. Tests stay on localhost and do not send enquiries. The preview is http://127.0.0.1:8080 and serves the actual exported files with real 404s and the configured specific redirects.

`npm run check` validates TypeScript, content relationships, sourced specifications, HTML, filter behavior, pagination and the SQL reader. `npm run check:export` audits every exported route for metadata, canonical, H1, internal links, local assets, JSON-LD and sitemap rules. The GitHub workflow runs checks/build/browser validation; it has no deployment job or Firebase credentials.

## Browse the rebuild

- `/shop/`, `/shop/page/2/` — catalogue with search, brand/category filters, removable chips, sorting and static pagination.
- `/brands/`, `/categories/` — directories linking to original `/brand/.../` and nested `/product-category/.../` routes.
- `/product/dc-102/` — real product with imported specifications, a genuine product image, original-size view and direct enquiries.
- `/blog/` and original root article slugs — all ten imported articles.
- `/about-us/`, `/contact-us/` — original company/contact routes using confirmed business details.

Native page links work without JavaScript; search/filter enhancements keep selections in the URL. Filter and sort variants retain the canonical of their static archive document. Each static pagination page has its own canonical. Email links open an email application; WhatsApp opens an unsent product-specific draft.

`/cart/`, `/checkout/` and `/my-account/` retain their URLs as **noindexed retirement information**, with enquiry links. They provide no commerce or account functionality and are excluded from the production sitemap.

## Editing content and images

See [content editing](docs/content-editing.md) and [migration report](docs/nextjs-migration.md). Future changes are manual repository edits, followed by checks, rebuild and approved redeployment. Keep original slugs and consult [the URL manifest](docs/url-manifest.json) before changing a route.

All 292 primary product images have been retrieved read-only from the connected WordPress uploads using exact SQL attachment paths. Originals and smaller static web copies are in `public/images/products/`. No product photo, model, brand relationship or specification was guessed. See [image validation](docs/image-validation.md) and the [checksum manifest](docs/product-image-manifest.json). Logos are the unchanged original assets. The existing illustrative hero is pre-encoded as a static WebP and preloaded; no image optimisation server is required.

## Firebase Hosting — only after approval

`firebase.json` serves **only `out/`**, with no SPA catch-all. Unknown paths return `404.html` with HTTP 404. Exact 301s include `/product-category/marine-locks/` → `/brand/marine-locks/` and the interim review utility aliases → original page routes. There are also 292 exact redirects from the old WordPress upload URLs to the copied original static image files; unknown image paths still return 404.

Install Firebase CLI separately and use the explicitly approved project:

```sh
# Optional local Hosting emulator; no deployment:
firebase emulators:start --only hosting --project YOUR_REVIEW_PROJECT_ID
# Only after deployment approval and all launch gates:
firebase deploy --only hosting --project YOUR_APPROVED_PROJECT_ID
```

Review builds have `noindex,nofollow` metadata and Firebase `X-Robots-Tag`, blocked robots rules and an empty sitemap. Production export is intentionally gated by `data/migration.ts` while media/content/SEO launch review remains open.

The approved production switch requires completing [SEO release gates](docs/seo-release.md), setting `migration.complete=true`, removing the review `X-Robots-Tag` header in `firebase.json`, then:

```sh
YAYBMT_PRODUCTION=true npm run build
YAYBMT_PRODUCTION=true npm run check:export
```

That generates production robots and a sitemap from real indexable routes, using `https://yaybmt.com` canonicals. Retired utility pages remain noindexed. Verify actual hosting responses before cutover; do not deploy the review export to production.
