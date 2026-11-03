# Tailwind homepage proposal — 3 November 2026

An independent alternative on `feat/tailwind-homepage`, based on `main` after PR #7. PR #8 remains a separate design proposal. This branch is for visual review and must not be merged automatically.

## Design

The homepage uses bold sans-serif typography, a marine photograph behind the original white logo/navigation, copper actions, an overlapping white brand panel, an editorial company video/established-year panel, clean category cards, an asymmetric industry image grid and a dark enquiry section. It reuses the original local images and confirmed company content. Seven genuine logos are used; Marine Locks and Marine Sanitary Fittings remain text-only. Existing footer/social icons and the floating icon-only WhatsApp link remain.

The homepage retains all three source welcome paragraphs, the original H1 wording, existing source metadata/canonical, original category/brand routes and the 2004 establishment year from the source company content. No product photos, specifications, statistics, testimonials, prices, stock or certification claims are invented. Vision/Mission/History stay on the Company page. No URLs, redirects, product data or indexability rules change.

## Tailwind integration

Tailwind CSS and its PostCSS plugin are pinned to 4.3.4 with an updated npm lockfile. Tailwind is compiled at build time, with no CDN script, external CSS request or client-side styling runtime. `app/tailwind-home.css` imports theme/utilities with a `tw:` prefix and intentionally excludes Preflight. Important prefixed utilities take precedence over the retained unlayered legacy rules on the new homepage. Small header/focus bridge rules are scoped to `.tailwind-home`; shared catalogue/detail styling is not migrated in this proposal.

The page remains a server component. It reuses the existing small motion enhancer and scroll-aware muted video. Content is visible by default and native links work without JavaScript. Transitions and reveals respect reduced motion; the video remains paused for that preference. Original static WebP assets and measured image dimensions are retained; the hero is high-priority and lower images load lazily.

## Validation

Run `npm ci`, `npm run check`, `npm run build`, `npm run check:export`, then `npm run preview` and `npm run test:browser`. The browser script now includes `npm run test:home`; use `YAYBMT_TEST_URL` to target another preview port. `YAYBMT_HOME_SCREENSHOTS` overrides the homepage screenshot directory.

Repository checks, build and the exported SEO/internal-link audit cover all 406 public pages. Existing browser coverage checks catalogue search/filters/pagination, enquiries, technical drawings, 301/404 behavior, no-JavaScript browsing and reduced motion. The new homepage check verifies that Tailwind actually compiled, five viewport widths (1440/1024/768/390/320), hero/header separation, all nine brand and nine category links, source welcome copy, decoded local images, reduced-motion video, no-JavaScript navigation and enquiry destinations. Fresh full-page screenshots are in `artifacts/tailwind-homepage/`.

These are local/automated checks, not field Core Web Vitals, a complete accessibility audit or a guarantee of rankings. Review remains noindexed. Firebase and the live WordPress website have not been changed; production release still requires the existing SEO migration gates and explicit approval.
