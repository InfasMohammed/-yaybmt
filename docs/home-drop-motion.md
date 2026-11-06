# Homepage full drop reveals

At the client's request, homepage content starts completely transparent with JavaScript enabled and drops 140px from above into its reserved layout, with a short 12px landing/4px rebound. The 950ms entry is staggered by up to 195ms and runs once per content block. Hero text, header groups, brand panel, welcome/video, category headings/cards, industry text/images, testimonial heading/cards, enquiry and footer groups are covered. Existing horizontal brand rolling, hover effects and desktop industry pinning remain functional. Other pages are unchanged.

HomeMotion hides pending elements with opacity only, so observation and layout positions stay stable. Entry uses the individual translate property to preserve unrelated transforms; original inline opacity is restored and completed animations are released. Keyboard focus immediately reveals its containing block. Reduced-motion changes cancel movement and reveal every pending block; leaving reduced motion does not hide previously revealed content again. Without JavaScript all content remains visible in the exported HTML.

Desktop industry images use a separate in-view, active-step drop so inactive photographs are never made visible together and centering transforms remain intact. Mobile images reveal individually. Testimonial cards use an untransformed observation slot so a large entry offset cannot trigger the reveal early; their existing blur style remains.

`npm run test:home-drop` verifies the initial blank state, actual downward keyframes, settling, stable layout, no repeated hiding, reduced-motion restoration and no-JavaScript fallback on desktop/mobile. In-progress and settled screenshots are in artifacts/home-drop/.
