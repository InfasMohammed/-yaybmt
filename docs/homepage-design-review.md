# Homepage design review — 2 November 2026

Branch: `feat/enterprise-homepage`. A visual redesign of the homepage for client review, using the established charcoal, off-white and copper palette and original local assets.

The homepage has a refined full-width hero, clear catalogue and contact actions, numbered links to the three industries, an editorial company/video introduction, spacious category cards, a dark photographic industry section, a structured seven-logo brand grid with two text-only marine ranges, and a project enquiry panel. Marine ranges without genuine logos remain text-only. The original white header/footer logos and footer social links are retained. Mobile navigation remains visible, with native Products/Brands dropdowns.

Existing homepage metadata, canonical URL, H1 text, all original welcome paragraphs, industry names and descriptions of the existing catalogue offering are retained. The established year comes from the source company content. No performance figures, endorsements, prices, stock claims, certifications or product photos have been invented. Product, category, brand, company and contact routes are unchanged. Vision/Mission/History remain on the Company page.

The page is server-rendered into the static export. New elements need no client state or external library. Static WebP assets, the existing small reveal enhancement and the existing scroll-aware muted video are reused. Content is visible by default; reduced-motion users get no reveal animations or automatic video playback. Native links work without JavaScript.

Validation includes the full repository checks and build, exported SEO/internal-link checks across all 406 pages, the existing catalogue/drawings browser suite, and focused homepage checks at 1440, 1024, 768, 390 and 320 pixels. Focused checks cover header/title separation, horizontal overflow, all nine category and nine brand links, all three industries, no-JavaScript catalogue/company navigation, WhatsApp destination and reduced-motion video behavior. Fresh screenshots are in `artifacts/homepage-redesign/`.

Review remains noindexed. This branch does not deploy Firebase, change the WordPress website, alter the production SEO gate or merge into main. Client design acceptance and the documented SEO migration release gates are still required before production cutover.
