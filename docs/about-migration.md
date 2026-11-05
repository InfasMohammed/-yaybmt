# About Us migration

The existing `/about-us/` URL, metadata and canonical are retained. The earlier two-paragraph placeholder introduction is replaced with the four company paragraphs read from the live public WordPress page. The three leadership names/roles, company figures, banner and six showroom gallery images also come from that page.

All ten original files are retained unchanged in `public/images/about/`. `about-image-manifest.json` records their source URLs, original dimensions and SHA-256 hashes. Typed display data is in `data/about.ts`; smaller WebP copies preserve the original proportions, with no enlargement. Original gallery images remain accessible through native links.

The published company figures (500+ customers, 20+ years, 100+ projects and 7 employees) and marketing statements are reproduced from the existing site, not independently verified or recalculated. They remain editorial review items before production. No reviews, ratings or new availability claims were created. The third-party review widget and duplicate brand carousel are omitted. Existing confirmed contact/Maps links remain functional without embedded services.

Validation: static build and 406-route metadata/internal-link audit passed. Browser checks at 1440, 390 and 320 pixels verified one H1, all three team profiles, all ten decoded images, six working original-gallery links, four source figures and no horizontal overflow. The 320-pixel check ran without JavaScript. All original hashes match the retrieved source bytes. Fresh screenshots: `artifacts/nextjs/about-desktop.png` and `about-mobile.png`.

No WordPress content, database, plugin, theme or hosting settings were modified. No Firebase deployment or production promotion was performed.

## Frame sizing follow-up

The live WordPress markup and cached theme stylesheet were inspected. Leadership uses a 150 × 150-pixel `.team-img` frame, with the managing director first and the other two profiles beneath. The inline page style changes the original rounded frame to a 10-pixel corner radius. These dimensions and hierarchy are restored.

The original gallery groups images as three columns of two. Its special image heights are 597 pixels for the left lower image, 290 pixels for the middle upper image, and 266 pixels for the right lower image. Other images use width 100% and natural height; corners have a 12-pixel radius. The new desktop gallery follows those rules. Mobile uses a single column with natural-height images to show the full photos. Browser checks at 1440, 390 and 320 pixels verify these sizes/proportions, all six images and no overflow; the narrowest check disables JavaScript.

The later gallery alignment adjustment reduces the lower-left and lower-middle frames to fill the remaining height established by the right column, so all three columns finish at the same baseline. The original image files are unchanged. Verified at 1440, 1100 and 950 pixels; mobile retains natural image heights. `artifacts/nextjs/about-gallery-desktop.png` shows the aligned result.

## Supplied masonry gallery

The client-supplied MasonryGrid replaces the old manually sized three-column showroom layout. The six existing local photos and native links to originals remain in source order, with natural aspect ratios and responsive three/two/one-column masonry. Rounded borders and soft shadows match the site palette. A one-time staggered viewport reveal and restrained mouse-only 3D tilt adapt the supplied animation; no continuous floating is added. Reduced-motion preferences disable both effects immediately, and initial server HTML stays visible without JavaScript. No external demo photos, extra headings or new dependencies are added; the existing Motion package provides the supplied Framer Motion APIs through motion/react. TypeScript, Tailwind, components/ui and the local cn utility already exist, so no shadcn scaffold is needed.

`npm run test:gallery` verifies source images/links, responsive layouts, real pointer tilt, reduced motion and no-JavaScript navigation. Desktop/mobile screenshots are in `artifacts/showroom-gallery/`.
