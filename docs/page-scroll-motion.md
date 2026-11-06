# Sitewide scroll assembly

The supplied CharacterV1/CharacterV3 effect is adapted to semantic headings, product card images, brand logos and company cards on every non-homepage route. Homepage retains its reviewed full-drop and logo-assembly components. The shared client controller is components/ui/page-scroll-animation.tsx, mounted in the root layout. Existing TypeScript, Tailwind and components/ui structure are retained.

Scroll position controls translation/rotation/scale and settles at mid-passage. Native scrolling remains intact; navigation, filters, forms and product gallery controls stay steady. No text is split or replaced, no URLs/content/metadata change, and no runtime data service is introduced. Server-rendered/no-JavaScript content stays visible. Reduced-motion cancels effects immediately, keyboard focus settles its target, route changes clean up listeners, and catalogue DOM changes refresh targets.

Verify: npm run build -- --webpack; npm run check:export; YAYBMT_TEST_URL=http://127.0.0.1:8103 node --import tsx scripts/check-page-scroll.ts.

Cards and images: full catalogue/related-product cards, brand cards, company/leadership panels, article/category directory cards and gallery photo frames now assemble on scroll as well. Content images animate independently; product zoom images animate through their outer photo frame so pointer-based zoom remains intact. Modal images, thumbnail controls and small icons stay steady. Layout bounds are captured before applying parent/child motion to prevent compounded measurements.

Navigation is consistent sitewide: the supplied animated border/fill labels, uppercase text and morphing mobile toggle now apply on every route. The homepage keeps its transparent hero overlay; inner pages keep the charcoal header for contrast. Shared native dropdowns, mobile Back, outside click, Escape and no-JavaScript links are preserved. Verify with npm run test:menu.
