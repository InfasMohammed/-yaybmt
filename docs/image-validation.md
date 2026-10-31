# Product image import — 31 October 2026

The client authorised read-only retrieval through the existing Novamira WordPress connection. No WordPress content, code, settings, plugins or database records were changed. The finished website continues to use static local files only.

## Source and matching

- 292 of 292 primary product image references matched exactly: 253 in `2025/04`, 39 in the other SQL-recorded months.
- Images were retrieved directly from `wp-content/uploads/<exact SQL path>` through the authenticated connector. No filename guessing, product substitutions or remote runtime image dependencies were used.
- Every original is preserved byte-for-byte in `public/images/products/`; its source association, SHA-256, original byte size and chosen rendering path are in `product-image-manifest.json`.
- Source originals total 21,529,572 bytes. Selected static rendering files total 7,481,334 bytes, approximately 65% fewer bytes across the image set. This is not a measured Core Web Vitals improvement.
- Smaller WebP copies are generated only where useful, without cropping, stretching or enlarging images. Original files remain available through the product gallery's “View original image” link. Both company logos are unchanged.

## Inline references and source limitations

The earlier importer's `articleImageReferences` name was misleading. All 32 embedded references occur in product descriptions, not articles. The report now calls them `inlineImageReferences`.

31 referenced additional photos/drawings are unavailable at their recorded paths on the connected source. Eight attachment IDs from the old SQL also no longer resolve as attachments there. They are not guessed from other products or silently substituted. A separate `via.placeholder.com` image reference is synthetic and is excluded. The full public reference list is in `inline-media-review.json`; primary product photos are unaffected.

Some source photos are small. This update does not invent higher-resolution detail, technical specifications, model numbers or brand assignments. The 201 empty product descriptions remain a separate content-enrichment task.

## Static delivery and SEO

Product cards reserve equal image frames with `object-fit: contain`. Gallery images have measured dimensions, a high-priority first image, lazy secondary images, meaningful source alt text and native original-size links. They remain accessible without JavaScript and require no image-optimisation server, WordPress endpoint or Firebase Storage.

Product JSON-LD now includes genuine local image URLs. Existing page URLs, titles and canonicals are preserved. The Firebase configuration includes 292 exact one-hop 301 mappings from recorded `/wp-content/uploads/...` image URLs to the copied originals under `/images/products/...`. Unknown old image paths still return 404. Vercel does not consume Firebase's rules; Firebase response behavior must be verified with its emulator/hosting before release.

The matcher is safe for partial future uploads: importing a later month does not erase earlier SQL-matched or manually supplied images. Re-importing the same source updates its slot rather than duplicating the gallery.

Validation commands and the final results are recorded in `static-validation.md`. This branch is for review; no merge to main, Firebase deployment, domain change or production promotion is part of the image import.
