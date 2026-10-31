# Static sample verification — 31 October 2026

User story: visitors browse locally stored catalogue records, search/filter them, open a static product page and prepare an email or WhatsApp enquiry. There is no API or database boundary in the finished application.

- `npm run build`: passed on Next.js 16.4.3, React 19.3.1, TypeScript 5.9.3; static routes exported, including 16 product detail routes.
- `npm run typecheck`: passed.
- Production dependency audit: zero known vulnerabilities at verification time.
- Original logo SHA-256 values match the retained source assets exactly.
- Chromium checks: one H1 and canonical per tested page; review noindex; no overflow at 320, 390 or 1440 pixels; search and clear; selected brand chip and removal; empty results; mobile modal drawer and Escape; equal first-row image frames, aligned name-panel starts and card bottoms; product-specific email/WhatsApp destinations; no uncaught browser errors; reduced motion; browsing and enquiries accessible with JavaScript disabled.
- Local static preview: Marine Locks redirect returns 301 and unknown URL returns 404. Firebase configuration was inspected but no Firebase emulator/deployment response is claimed.
- Fresh full-page desktop/mobile images: `artifacts/nextjs/` (homepage, catalogue and FC110CS product).
- Browsers were restricted to localhost. No emails or WhatsApp messages were sent, and external social/maps services were not tested.
- Review robots disallows crawling and sitemap is empty. Production switch is documented in root README, but production hosting, Search Console, rankings, performance metrics and a complete accessibility audit are not claimed.

A sandboxed build attempt could not capture TypeScript CLI output; the build passed using the execution tool's network-enabled profile. The initial preview server held a removed export directory after a rebuild; it was corrected to resolve the export directory for each request. A browser selector initially selected the floating generic enquiry instead of the product enquiry; it was scoped to the main content and rerun.

Missing database export, genuine specifications and original product images remain content blockers for a complete migration. No details were fabricated to fill those gaps. This is a review sample, not a production-ready catalogue.
