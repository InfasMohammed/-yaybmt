# About Us migration

The existing `/about-us/` URL, metadata and canonical are retained. The earlier two-paragraph placeholder introduction is replaced with the four company paragraphs read from the live public WordPress page. The three leadership names/roles, company figures, banner and six showroom gallery images also come from that page.

All ten original files are retained unchanged in `public/images/about/`. `about-image-manifest.json` records their source URLs, original dimensions and SHA-256 hashes. Typed display data is in `data/about.ts`; smaller WebP copies preserve the original proportions, with no enlargement. Original gallery images remain accessible through native links.

The published company figures (500+ customers, 20+ years, 100+ projects and 7 employees) and marketing statements are reproduced from the existing site, not independently verified or recalculated. They remain editorial review items before production. No reviews, ratings or new availability claims were created. The third-party review widget and duplicate brand carousel are omitted. Existing confirmed contact/Maps links remain functional without embedded services.

Validation: static build and 406-route metadata/internal-link audit passed. Browser checks at 1440, 390 and 320 pixels verified one H1, all three team profiles, all ten decoded images, six working original-gallery links, four source figures and no horizontal overflow. The 320-pixel check ran without JavaScript. All original hashes match the retrieved source bytes. Fresh screenshots: `artifacts/nextjs/about-desktop.png` and `about-mobile.png`.

No WordPress content, database, plugin, theme or hosting settings were modified. No Firebase deployment or production promotion was performed.
