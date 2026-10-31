# Validation — 29 October 2026

Passed: PHP 8.3 syntax checks for all seven theme PHP files; JavaScript syntax check; local WordPress 6.8.3/MariaDB startup; active custom theme serving the homepage; Playwright/Chromium checks against the static preview and real WordPress for one H1, four marine-lock archive links, no horizontal overflow at 320px/390px, menu toggle and Escape behavior, and no uncaught JavaScript errors. Desktop/mobile screenshots are in artifacts. Database healthcheck passed. Development site search indexing is disabled.

During validation, corrected development site URL/port and public theme file permissions. These corrections are included in the installer/setup helpers. Browser checks cover the homepage only, not a migrated catalogue, WooCommerce behavior, forms, or external services. No production SEO, Google indexing, analytics, accessibility audit, performance benchmarks or Firebase deployment was validated. Website access returned HTTP 403. Firebase configuration is preparatory; no full static export exists.

Playwright is supplied by this cloud runtime, not a pinned project dependency. Run scripts/check-preview.cjs against an already running preview, or set YAYBMT_TEST_URL to the local WordPress URL. It writes screenshots to artifacts.

## Modern homepage update

Reworked the WordPress homepage using the supplied old-site screenshots: 11 product ranges, seven brand names, three industries, email and phone contacts. Product photos are intentionally empty, with labeled placeholders. Add images through Appearance → Customize → Homepage product images; publish the Customizer changes to save them. The header supports an existing WordPress primary menu. Category enquiries open the user's email application; the marine-lock link retains its established archive path, which still requires the old catalogue/plugins to be imported. No products or archive contents were invented.

Validated on the local WordPress instance: all seven PHP templates pass syntax checks; the existing homepage browser checks pass; 11 image controls are registered; catalogue/brand/industry counts and contact links are checked; no horizontal overflow at 320, 390, 768 or 1440 pixels. Updated desktop/mobile screenshots and the installable theme archive are in artifacts. Existing content migration, the original logo, catalogue archives and real product images remain pending. Nothing was deployed to the live site.

Homepage hero now uses a full-width generated marine industry background (illustrative, not the company premises), a dark text overlay and a Customizer replacement control under Homepage background image. Updated PHP syntax and existing desktop/mobile browser checks passed. Theme archive and screenshots refreshed.

## Brand/category archive layout

Implemented a Brands and Categories sidebar with real term counts, selected-term state and existing term URLs; responsive product grids with image fallbacks; and WordPress pagination. Supports the existing brand taxonomy names brand, product_brand, pwb-brand or yith_product_brand without registering or renaming production taxonomies. WooCommerce wrapper includes the sidebar on listing pages and leaves single products to WooCommerce. Generic product taxonomy archives use the native WordPress query.

Local browser validation with temporary product/taxonomy fixtures passed: DAELIM title, 10/6 products across two pages, 9 brands, 10 categories, selected brand count 16, category navigation, no horizontal overflow at 320/390/768/1440 pixels and no JavaScript errors. All nine theme PHP files passed syntax checks. Test products, terms and temporary registration plugin were removed afterward. Actual WooCommerce/plugin compatibility and migrated catalogue data remain unverified pending the source-site backup. Live archive access was denied by the network proxy. Preview catalogue.html and catalogue desktop/mobile images are labelled sample-data layout previews, not an imported catalogue. Homepage now includes Marine Hardware Fittings and PPR/UPVC Pipes & Fittings.

## Real catalogue restoration — 30 October 2026

Restored 292 published products, 9 brands, 41 categories, 10 articles and 8 pages from the supplied database in a separate private local instance. Uploaded WooCommerce, ACF and Yoast are active; the extra schema plugin is inactive and its synthetic default-review option disabled. Corrected five local article links and added the WordPress Marine Locks 301. All 50 brand/category archives returned 200; real pagination, product enquiry, selected-term counts, schema sample, staging noindex, responsive layouts and homepage checks passed. See docs/restored-catalogue.md for exact scope and remaining limitations.

## Consistent product-card alignment

Product loops now use a shared fixed-aspect image frame, with images centered and contained. Uploaded width/height attributes cannot change the image slot height. Product name panels stretch evenly within each row, wrap long titles without truncation, and card bottoms align. The same rules cover homepage range cards and generic archive images; original image files remain unchanged.

Browser-only fixtures with portrait, landscape and square images plus long names passed geometry checks at 320/390/768/1100/1440px: equal image frames, aligned name-panel starts and card bottoms, no clipped text and no page overflow. No test images or names were saved to the database. Restored-catalogue regression checks and PHP syntax checks passed. Refreshed previews include catalogue-desktop-aligned.png and catalogue-mobile-aligned.png. Real product photography remains pending.

## Confirmed contacts and navigation

Confirmed telephone +971 4 227 8616, WhatsApp +971 56 736 9803, sales@yaybmt.com, info@yaybmt.com, Deira/Dubai, the supplied Maps listing (CID 10643360148458649588), Instagram and Facebook are now used in theme contact areas. Added a floating WhatsApp icon and product-specific WhatsApp enquiries alongside email. The header uses original emblem artwork recovered from the uploaded theme with company text, supports a full replacement through WordPress Custom Logo, and provides native-details Products/Brands dropdowns when no primary menu is assigned. Top-level product categories and all nine brands link to existing archives.

Passed browser checks: exact WhatsApp destination and prefilled product message; both email links; telephone, Maps CID and social URLs; brand/category navigation; keyboard Enter/Escape, outside dismissal, touch menu, floating button position/tap size, and no overflow at 320/390/700/768/1024/1440px. Homepage regression, mixed-image card alignment and restored catalogue checks passed; four changed PHP templates passed syntax checks. No external WhatsApp/social/map service was contacted and no messages were sent. Updated screenshots ending -contact.png and theme ZIP are available. All changes remain local.

## Header/icon correction

Removed the top contact strip. Floating WhatsApp is icon-only on desktop and mobile. Replaced the hand-drawn symbol and text-only social links with the Font Awesome Free WhatsApp, Facebook and Instagram brand icons, stored locally with the bundled license. Header icons appear on desktop and footer icons remain available on mobile. Browser checks passed for bar absence, icon markup, exact link destinations, accessible names, keyboard/touch navigation and 6 viewport widths. The supplied full green/white logos are visible in chat but not available as downloadable workspace files; the older, different emblem from the theme backup is no longer rendered. Header/footer show a plain company-name fallback until the exact logo files are supplied. Company logos controls accept the original assets without redesign. Updated catalogue-desktop-charcoal.png and catalogue-mobile-charcoal.png, with new -clean-header filenames to avoid cached previews.

## Original logos installed

The uploaded Desktop.zip supplied yaybmt-logo.jpg (200×114) and footer-logo1.png (399×224). Both originals were copied unchanged, with SHA-256 equality verified against the uploaded files. The green image is the header logo; the transparent white image is the footer logo. Browser checks confirmed both native image dimensions on homepage/catalogue pages, no desktop/mobile overflow, and the previously requested contact/nav behavior. The top contact bar and header social icons remain removed; the floating WhatsApp control remains icon-only. Fresh previews end in -original-logos.png; existing -charcoal.png names and the theme ZIP were also refreshed. The earlier missing-original-logo limitation is resolved.

## Homepage overlay navigation

Removed the separate light homepage header strip. The original white logo and bold navigation now overlay the hero photograph; the green original stays on light inner-page headers. The header contains no WhatsApp button; the icon-only floating WhatsApp control remains. Mobile menus open as a dark panel with keyboard/touch support. Passed contact/navigation regression checks at six widths plus desktop/mobile assertions for a transparent absolute header, hero at page top, heading clear of navigation, white original logo, navigation weight 700, no header WhatsApp and no horizontal overflow. Refreshed homepage screenshots and static preview; theme version 0.9.2.

## Modern catalogue and product samples — 31 October 2026

Added a refined catalogue grid, sidebar, sample-page name search with accessible result/empty feedback, and a separate DC 102 detail sample with email enquiry and native keyboard-accessible disclosure panels. Real product links and WordPress permalink handling remain unchanged. Product images are labelled placeholders; no specifications, prices or reviews were invented. Shared theme CSS refreshes native catalogue cards and product surfaces while retaining WooCommerce content and interactions. Card/product entrance and hover animations respect reduced-motion preferences. The white homepage hero logo, bold navigation and footer social icons remain; WhatsApp is floating-only and its native product-page message includes the product URL.

Passed `scripts/check-samples.cjs` against the local Firebase Hosting emulator: homepage/catalogue/detail at 320/390/768/1440px, product link paths, search/missing/reset states, keyboard disclosure, reduced-motion animation disablement, homepage branding, footer-only socials, floating-only WhatsApp and no uncaught JavaScript errors. All nine theme PHP files passed PHP 8.3 syntax checks using the existing container image without starting database services. Screenshots were reviewed from /tmp.

The private restored catalogue and uploaded plugins are absent in this instance. Restored-catalogue, WooCommerce integration and updated contact-navigation checks have not run against the restored database. Static sample validation does not establish migrated catalogue readiness. No deployment was performed.

## Real-data sample review after supplied restore — 31 October 2026

The supplied SQL/plugins are now restored in a separate private local instance. The earlier note about absent restoration data no longer describes this instance. Full baseline catalogue, contact/navigation and homepage checks passed; `scripts/check-restored-samples.cjs` passed for opt-in real-data samples at 320/390/768/1440px, unchanged product paths, 9 brands/41 categories, keyboard disclosure, reduced motion, contextual enquiries, noindex/CSP and homepage branding. Screenshots finish CSS animations before capture. The private restored instance uses a main-based baseline; prototype styles/templates are gated by `design_sample=1`. Existing working-tree changes are preserved, and no rollout or live deployment was performed. See `samples/restored/README.md`.

## Copper/charcoal redesign samples

Replaced only the opt-in local review templates with the requested off-white/charcoal/copper design: prominent search, native collapsible filters, an enhanced mobile drawer, removable filter chips, real search/filter/reset/empty/pagination responses, plain spacious cards, verified model labels and a real-data product detail with related products and both enquiry actions. Earlier catalogue/theme work remains separate; baseline pages and product paths are unchanged. Revised sample checks pass for four widths, mobile focus/keyboard handling, aligned cards, reduced motion and search/product navigation with JavaScript disabled. No rollout, packaging or live deployment was performed for this revision.

Final revised sample checks also exercise Categories filtering and removal (CP Fittings), mixed portrait/landscape/square browser-only image fixtures with `object-fit: contain`, equal media/name start positions and card bottoms, and no-JavaScript keyboard navigation into the product detail. Fixtures are never saved to the database or review screenshots. Model numbers are accepted from explicit model metadata/specification labels only; descriptive source values without a number are displayed as missing. Related products prefer the same stored brand. Copper review screenshots are saved as ignored `artifacts/*-copper-*.png`; the theme ZIP was not rebuilt for these opt-in samples.

Removed the product sample's entire inline enquiry panel per review feedback. Revised sample suite passes at 320/390/768/1440px, checking panel absence and the retained floating WhatsApp control. Refreshed review screenshots are `artifacts/product-copper-no-enquiry-desktop.png` and `artifacts/product-copper-no-enquiry-mobile.png`. No live-site change.
