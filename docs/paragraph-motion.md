# Contact and Company paragraph motion

Separate preview branch: feat/contact-company-text-motion, based on approved main. The closed design PRs are excluded. This implements the client-supplied TextRotate React component on the introduction paragraphs of /contact-us/ and /about-us/ only.

## Integration

- Reusable component: components/ui/text-rotate.tsx. Page adapter: components/ParagraphMotion.tsx. A small string-only cn helper is in lib/utils.ts; no class-merging dependency or full shadcn setup is needed. The UI folder organises the reusable component and matches the supplied example's convention; it is not a runtime requirement.
- Motion is pinned to 12.40.0 in package.json and package-lock.json. Existing React, TypeScript and Tailwind setup remains. Scoped CSS classes replace unprefixed demo utilities so existing tw:-prefixed Tailwind and non-Preflight styles keep working.
- The supplied newline string was malformed; it is repaired. Inline spans replace the demo's block div inside paragraph markup, preventing invalid HTML/hydration errors. Empty text and index changes are guarded, Unicode grapheme splitting and the ref navigation API are retained.
- Each source paragraph uses a word-by-word entrance when it first enters the viewport (12ms word stagger, capped at one second). auto=false and loop=false keep every paragraph in place; there is no automatic carousel or disappearing copy. The original text, paragraph order, headings, metadata, canonical URLs and routes remain. Demo typography quotes and sample authors are not used.
- The initial server render/no-JavaScript version is visible static text. Word animation mounts only after hydration and viewport entry. Screen readers receive one complete copy rather than individual animated words. Reduced motion uses static text, with an explicit media-query subscription that immediately unmounts running motion and a CSS safeguard. There is no forced focus change or live-region word announcement.
- The existing WhatsApp contact form/map, company leadership/gallery/values, homepage, catalogue and footer remain. An outdated email-application caption on the shared company-page footer is corrected to describe the existing WhatsApp-only flow.

No WordPress, Firebase, DNS or main changes. The finished site remains a static export with no backend or image-optimisation server.

## Validation

Run the existing setup/check/build/export commands, start npm run preview, then npm run test:paragraphs. npm run test:browser also includes that check. YAYBMT_TEST_URL and YAYBMT_PARAGRAPH_SCREENSHOTS override the preview URL and screenshots directory.

Dedicated checks verify actual intermediate word opacity at 1440/390/320px, exact source paragraphs, unchanged H1/canonicals, no page errors/horizontal overflow, live reduced-motion cancellation and fully visible no-JavaScript text. Screenshots are captured after switching to reduced motion so all paragraph content is legible in the review images. Build, content/TypeScript/media/catalogue/import checks and the 406-route SEO/internal-link audit passed. The full site browser suite is also run to check unaffected functionality.
