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

## Supplied expandable gallery

The client rejected the earlier masonry/tilt treatment and supplied an ExpandableGallery replacement. `components/ui/gallery-animation.tsx` now shows the six genuine showroom photos in a horizontal expanding strip on desktop. A two-column grid on mobile/tablet keeps touch targets and images usable. Clicking opens the full original image in a native modal dialog, with named Close/Previous/Next controls, a live image count, Arrow keys, Escape, focus containment and return to the opening link. The full-size image uses object-fit contain. Reduced-motion preferences remove animated transitions; there is no continuous floating or pointer tilt. Without JavaScript, every photo remains a native link to its original. No external demo photos or new dependencies are included. Existing TypeScript/Tailwind/components/ui infrastructure is reused, with scoped CSS for the supplied appearance.

`npm run test:gallery` verifies source photos/links, desktop expansion, mobile layouts, modal controls, keyboard wraparound/Escape/focus restoration, reduced motion, no-JavaScript navigation and overflow. Desktop/mobile screenshots are in `artifacts/showroom-gallery/`.

## Mission, Vision and History cards

Following the client's Al Fareed reference screenshot, the Company purpose/story accordion is replaced with three equal-height desktop cards. Each has a centred decorative line icon, heading, complete existing source paragraphs, rounded white frame, light copper border and restrained border/shadow hover. Cards stack at 760px and below. No floating or expanding motion is introduced; all text is visible without JavaScript and there are no truncated paragraphs. Original Company URL, page metadata and source copy are preserved.

## About introduction card

The four original Company introduction paragraphs now share a rounded white card with a light copper border. A restrained 550ms shake runs once on pointer hover or keyboard focus, then returns to rest; it is disabled for reduced motion. The card is a named keyboard-focusable region, its source copy and existing word reveal are preserved, and no animation hides static/no-JavaScript content. Mission/Vision/History, leadership and track-record panels do not inherit this shake.
