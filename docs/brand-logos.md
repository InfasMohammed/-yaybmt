# Original brand logos

Eight logos were retrieved read-only from the connected WordPress site's `product_brand` term `thumbnail_id` references. The source site was not modified. See `brand-logo-manifest.json` for exact attachment paths, source dimensions and SHA-256 hashes.

Unchanged originals are retained in `public/images/brands/`. Smaller WebP display copies fit inside 640 × 240 pixels without enlargement. Typed mappings are in `data/brand-logos.ts`. These static files require no WordPress connection at build time or runtime.

Logos appear in homepage brand links, the brands directory and brand archives, including pagination. Equal display frames use contain sizing and preserve proportions. The visible brand name supplies the accessible name; the repeated logo is decorative.

Marine Locks uses the product montage assigned as its brand image in WordPress; it is preserved as supplied. Marine Sanitary Fittings has no assigned logo in the connected source and retains its text name. No logo or distributor claim was invented.

Validation: static build and 406-route SEO/internal-link audit passed. Browser checks cover all nine brand routes at desktop/mobile widths, image decoding/proportions, directory/homepage placement and no horizontal overflow. All eight original SHA-256 hashes were compared with the source. Screenshots are in `artifacts/nextjs/brands-*` and `brand-kopat-*`.

Original assigned brand images also appear beside the brand information on product-detail pages, linked to the corresponding brand archive. Compact desktop/mobile frames use contain sizing. Products without a recorded brand or verified brand image have no empty logo frame. Browser checks cover a product from each of the eight mapped brands, the no-logo/unbranded fallbacks, responsive overflow and no-JavaScript brand navigation.

The later placement adjustment moves verified brand marks to the top-right of the product image frame on catalogue/archive cards, related-product cards and detail galleries, matching the requested WordPress position. The earlier separate logo beside the product-information heading is removed. Decorative badges do not intercept clicks or move with image zoom; existing brand text/links remain available. Desktop/mobile browser checks verify their position and stationary behavior during zoom.

Client correction: Marine Locks and Marine Sanitary Fittings have no brand logos. Both are now explicitly text-only across homepage/directory cards, product cards, related products and detail galleries. The Marine Locks product montage has been removed from the logo mapping; its source file is retained only as unused migration provenance. Seven genuine brand-logo mappings remain. Product photographs are unaffected. Browser checks verify both brands have no logo image/badge across those placements on desktop/mobile.
