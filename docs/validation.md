# Validation — 29 October 2026

Passed: PHP 8.3 syntax checks for all seven theme PHP files; JavaScript syntax check; local WordPress 6.8.3/MariaDB startup; active custom theme serving the homepage; Playwright/Chromium checks against the static preview and real WordPress for one H1, four marine-lock archive links, no horizontal overflow at 320px/390px, menu toggle and Escape behavior, and no uncaught JavaScript errors. Desktop/mobile screenshots are in artifacts. Database healthcheck passed. Development site search indexing is disabled.

During validation, corrected development site URL/port and public theme file permissions. These corrections are included in the installer/setup helpers. Browser checks cover the homepage only, not a migrated catalogue, WooCommerce behavior, forms, or external services. No production SEO, Google indexing, analytics, accessibility audit, performance benchmarks or Firebase deployment was validated. Website access returned HTTP 403. Firebase configuration is preparatory; no full static export exists.

Playwright is supplied by this cloud runtime, not a pinned project dependency. Run scripts/check-preview.cjs against an already running preview, or set YAYBMT_TEST_URL to the local WordPress URL. It writes screenshots to artifacts.
