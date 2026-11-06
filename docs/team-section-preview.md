# Leadership section format

The client supplied a three-card TeamSection React example and requested another agent to adapt it for YAYBMT. `components/ui/team-section-1.tsx` follows that format: a subtle grid backdrop, section header, three equal cards, circular portrait frames, names/roles and a gentle background/border/portrait hover treatment. Colours use the existing charcoal/off-white/copper identity.

`components/AboutSections.tsx` passes the existing `data/about.ts` leadership records. Yusuf Ebrahim, Nazmi Yusuf and Mohammed Yusuf retain their source roles and exact local image associations. The display images are 144px inside 152px circular frames; the originals are 180/190px, so they are not enlarged. Object-fit contains each original image. No dummy team members, stock avatars, placeholder text, personal social accounts, register button or extra logo from the demo are included.

The component is server rendered and does not need another package or client runtime. It uses scoped `app/team-section.css` instead of unprefixed demo Tailwind utilities or undefined demo colour tokens. Its title is an H2 with the existing `team-heading` identifier, preserving the Company page's single H1. The grid uses three columns on larger screens and a single column on small screens. All names/photos/roles are available without JavaScript; hover animation is disabled for reduced motion.

The parent task updates typography independently; this component inherits those heading/body fonts. Existing company values, banner, figures and gallery remain unchanged.

## Validation command

After building and serving the exported site:

```sh
YAYBMT_TEST_URL=http://127.0.0.1:8080 node --import tsx scripts/check-team-section.ts
```

The check covers 1440/768/390/320px layouts, genuine source data, exact images, natural display sizing/aspect ratio, a single H1, no fabricated links, reduced-motion hover, no-JavaScript content and horizontal overflow. It writes desktop/mobile screenshots to `artifacts/team-section/`, configurable with `YAYBMT_TEAM_SCREENSHOTS`. Parent runs this with the integrated font/paragraph changes and the normal build/export checks; no independent build was started during parallel editing.

## Company count-up motion

Floating motion was removed following client review. Leadership cards, section headings and track-record panels stay stationary; the previous subtle pointer hover styling remains. No pause/resume control is needed.

The original figures (500+, 20+, 100+ and 7) are unchanged. Visible counters animate once, over 1.6 seconds, when entering the viewport. Complete source values are server rendered and exposed once to screen readers; only the aria-hidden visual copy changes. Reduced-motion preferences disable count-up and a preference change immediately restores the final values. All content stays available without JavaScript.

`npm run test:company` checks stationary panels/headings, actual count-up, reduced motion, desktop/mobile overflow and no-JavaScript values. It is included in `test:browser`. The catalogue route uses a prop-free Next page wrapper to satisfy route type checking, preserving catalogue behavior and URLs. In restricted environments where Turbopack cannot bind its local worker port, use `npm run build -- --webpack`.
