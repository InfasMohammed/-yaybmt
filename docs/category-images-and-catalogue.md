# Homepage category images and original catalogue PDF

Nine category-image associations were read from the live WordPress homepage and copied exactly. Typed mappings are in `data/category-images.ts`; the homepage retains the existing category URLs. Original files are stored in `public/images/categories/`, with smaller WebP rendering copies resized inside 960 × 600 pixels without enlargement. Equal frames use contain sizing so source montages remain fully visible. `category-image-manifest.json` records original paths, dimensions, sizes and SHA-256 hashes.

The original eight-page PDF is stored unchanged at `public/downloads/yaybmt-catalogue.pdf`. Product-listing toolbars and the shared footer provide native local download links. `catalogue-pdf-manifest.json` records the source URL, original size (1,947,679 bytes) and checksum. This adds no floating button, runtime database or WordPress dependency.

## Original PDF contact review

The PDF contains older WhatsApp annotation destinations, including +971 55 104 4298, +971 50 659 4298 and +971 50 353 5248. These differ from the client's confirmed website WhatsApp +971 56 736 9803. The document remains an unchanged original and is labelled Original catalogue; it must be reviewed before production release. The original contains no embedded JavaScript according to pdfinfo. Visible document text is predominantly rasterised, so a full visual/contact review is still needed. Website enquiry links continue to use the confirmed contact.

## Validation

Static build and 406-route SEO/internal-link audit passed. Browser checks at 1440, 390 and 320 pixels verify all nine correctly mapped images decode, original category links are preserved, pages do not overflow, and the local PDF returns HTTP 200/application-pdf with the source checksum. A native browser download produces YAYBMT-catalogue.pdf. The narrowest check runs without JavaScript; the footer download remains available. Fresh homepage/category-section and catalogue screenshots are in `artifacts/nextjs/`.

Source WordPress content/settings and production hosting were not modified. No Firebase deployment or production promotion was performed.
