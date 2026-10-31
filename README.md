# YAYBMT — Next.js static catalogue

Review branch: Next.js + TypeScript, exported to `out/` for Firebase Hosting. No WordPress runtime, admin, database, Firestore, Authentication or Storage. Nothing has been deployed. Earlier WordPress work is preserved in Git history and `legacy/`; it is never copied into the export.

## Setup and review

Node.js 22+ and npm:

```sh
npm ci
npm run dev
npm run typecheck
npm run build
npm run preview
npm run test:browser
```

`npm run preview` serves the actual export at http://127.0.0.1:8080 with real 404 responses and the specific Marine Locks redirect. The browser script requires runtime-provided Playwright and Chromium. It does not contact external enquiry services or send messages.

Review `/shop/` (catalogue), `/product/fc-110cs/` (detail), and `/` (homepage brand treatment). Product links resolve to generated static detail pages. The same catalogue sample is available at the established `/brand/daelim/` URL. Email actions use the visitor's email application; WhatsApp opens a product-specific draft. No delivery backend is claimed.

## Content editing

Edit `data/products.ts`, `data/brands.ts`, `data/categories.ts`, and `data/articles.ts` manually. Preserve slugs. Product records include their source and explicit empty specifications/images when evidence is absent. Put approved images in `public/images/`. Image frames use `object-fit: contain`; `images.unoptimized` is enabled, so no image server is required. Current placeholders are intentional, and are not product photographs.

The current data is a labelled subset extracted from `legacy/preview/catalogue.html`, not a restoration of the database. Category and brand lists preserve public reference labels and paths; category assignments are unverified and unused by the sample filter. No article text has been invented. See `docs/nextjs-migration.md` for missing inputs and URL work.

## Firebase Hosting — only after approval

Install Firebase CLI separately and use an approved project ID. Do not select a project implicitly.

```sh
npm ci
npm run build
firebase emulators:start --only hosting --project YOUR_REVIEW_PROJECT_ID
# Only after explicit deployment approval:
firebase deploy --only hosting --project YOUR_APPROVED_PROJECT_ID
```

`firebase.json` serves only `out/`, with no SPA catch-all. Unknown URLs return the exported `404.html` and HTTP 404. `/product-category/marine-locks/` redirects specifically to `/brand/marine-locks/`.

Review is noindexed in page metadata, robots.txt, and Firebase's X-Robots-Tag. Review sitemap contains no URLs. Before an approved production release, complete the URL/content migration and remove the `X-Robots-Tag: noindex, nofollow` header from `firebase.json`, then build with:

```sh
YAYBMT_PRODUCTION=true npm run build
```

This switches metadata and robots to indexable and generates the sitemap from actual exported routes, with `https://yaybmt.com` canonicals. Review both switches together; verify final headers, robots, sitemap and canonical tags before cutover. Do not publish this incomplete sample as the production catalogue.
