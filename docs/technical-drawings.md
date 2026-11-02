# Technical drawings — 2 November 2026

Recovered all 31 genuine inline product-body images for 28 products from the live WordPress uploads, read-only. The connected test installation had lacked these files. Each association follows the exact supplied SQL reference; attachment originals were preferred to thumbnails. All 31 were visually checked as dimension/installation drawings. The synthetic placeholder remains excluded.

`product-drawing-manifest.json` records source references, recovered filenames, dimensions, bytes and SHA-256 checksums. Original bytes are retained under `public/images/products/drawings/`. Smaller lossless WebP copies preserve line detail and original dimensions. No dimensions were transcribed into new specifications and no product URLs or primary photos changed.

Product pages show an open, collapsible Technical Drawings section immediately below Specifications. Images retain their aspect ratio, are never cropped, and link to local full-size originals. This works without JavaScript. Recovered source-placeholder notices are suppressed only on matched products. Products without a source drawing show no empty section.

Specific legacy upload redirects are in `data/drawing-image-redirects.json` and Firebase Hosting configuration. The static preview server reproduces them. Firebase has not been deployed. All content is served locally in the static export; WordPress is migration input only. Review noindex and the incomplete production migration gate remain in place.

Validation: `npm run check`, `npm run build`, `npm run check:export`, `npm run test:browser`. The media check verifies all source associations, original checksums, decoded dimensions and redirects.
