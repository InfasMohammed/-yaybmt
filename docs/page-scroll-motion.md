# Sitewide one-time falling reveal

Every inner page uses the same effect as HomeMotion: content starts hidden, falls from 140px above, overshoots to 12px, settles via -4px to zero, then stays visible. Duration 950ms with short stagger. There is no scroll-scrubbed translation, rotation or scaling. Scrolling back does not replay it.

Targets include headings, catalogue/related cards, brand cards, company and leadership cards, article/category cards, gallery frames and standalone content images. Images inside a card fall with the card rather than duplicating the effect. Modal images, thumbnail controls, forms and navigation remain usable. Newly filtered cards are discovered. Reduced-motion restores visibility immediately; no-JavaScript content is visible; keyboard focus reveals its containing card.

Homepage retains its established full-drop components, industry active-step fall and testimonial fall/blur. The separate rotating logo-assembly effect has been removed; original local logos and brand links remain in the homepage panel, which falls as a unit.

Navigation uses the reviewed shared hover/fill design on every route. Homepage retains its transparent hero header; inner pages retain charcoal headers.

Verify: npm run build -- --webpack; npm run check:export; YAYBMT_TEST_URL=http://127.0.0.1:8103 node --import tsx scripts/check-page-scroll.ts; npm run test:home.
