# Sitewide scroll assembly

The supplied CharacterV1/CharacterV3 effect is adapted to semantic headings, product card images, brand logos and company cards on every non-homepage route. Homepage retains its reviewed full-drop and logo-assembly components. The shared client controller is components/ui/page-scroll-animation.tsx, mounted in the root layout. Existing TypeScript, Tailwind and components/ui structure are retained.

Scroll position controls translation/rotation/scale and settles at mid-passage. Native scrolling remains intact; navigation, filters, forms and product gallery controls stay steady. No text is split or replaced, no URLs/content/metadata change, and no runtime data service is introduced. Server-rendered/no-JavaScript content stays visible. Reduced-motion cancels effects immediately, keyboard focus settles its target, route changes clean up listeners, and catalogue DOM changes refresh targets.

Verify: npm run build -- --webpack; npm run check:export; YAYBMT_TEST_URL=http://127.0.0.1:8103 node --import tsx scripts/check-page-scroll.ts.
