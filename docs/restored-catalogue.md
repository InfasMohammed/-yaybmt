# Restored catalogue — 30 October 2026

The supplied database has been restored into a separate local WordPress instance. The original empty development database and uploaded backup are preserved. No live hosting or DNS changes were made.

The database contains 292 published products, 9 brands (`product_brand`), 41 categories (`product_cat`), 10 articles, 8 pages and 523 attachment records. Actual uploads were not supplied; product images remain placeholders. Original product, brand and category slugs and content were retained. Existing Yoast metadata remains in the database.

Private runtime files live outside this checkout at `/workspace/private/yaybmt-restore`. Do not commit or publicly serve that directory or the uploaded archives. It contains the private SQL backup, local credentials and uploaded plugin source.

## Start the prepared copy

Use the existing checkout; do not create a worktree. Preserve Docker volumes, credentials and the private source files. From `/workspace/private/yaybmt-restore`, run:

```sh
env -u DOCKER_HOST -u DOCKER_CONTEXT -u DOCKER_TLS -u DOCKER_TLS_VERIFY -u DOCKER_CERT_PATH docker --host=unix:///var/run/docker.sock compose -p yaybmt-restore up -d --wait
```

WordPress binds loopback port 8086. MariaDB stays on an internal network. The restored theme is mounted as `yaybmt-modern`, distinct from the original site's `yaybmt` directory. The original empty development instance remains on port 8085.

Do not reimport SQL or initialize the database during ordinary startup. An absent volume is not evidence of a completed restoration. If prepared state is missing, stop and diagnose it. Do not print credentials or raw user/customer records.

The local-only must-use plugin blocks email and WordPress HTTP requests, disables indexing, and avoids requesting missing production media. Cron, automatic updates and plugin editing are disabled in the local container configuration. These are development protections, not a production deployment configuration.

## Current plugins and repairs

Uploaded WooCommerce 10.6.0, ACF 6.7.1 and Yoast SEO 27.1.1 are enabled. The uploaded Schema & Structured Data plugin 1.56 is retained for inspection but inactive. Its `saswp_default_review=1` setting and code path can create a five-star author review when no product reviews exist; that setting was disabled in the local copy. WooCommerce's imported currency remains INR; it has not been replaced with invented AED prices. Sample archive and product JSON-LD checks found no rating/price-currency output after disabling the overlapping plugin. This is not a Google Rich Results Test or a complete audit of every product.

Five article bodies/excerpts linked to the invalid Marine Locks category. Those links were corrected in the restored database. The theme now issues a 301 from `/product-category/marine-locks/` to `/brand/marine-locks/`. WooCommerce visible-product count caches were rebuilt; DAELIM correctly reports 21 products.

For an authorized local/staging restoration, `scripts/prepare-restored-catalogue.php` repeats the known database repairs without modifying the uploaded SQL backup. It refuses production environments and keeps staging noindexed. Run it inside the restored WordPress container, with source file input from this checkout. It does not import a database, activate the theme or publish anything.

## Validation

From `/workspace/-yaybmt`:

```sh
node scripts/check-restored.cjs
YAYBMT_TEST_URL=http://127.0.0.1:8086/ node scripts/check-preview.cjs
```

Passed: real homepage range links, 9 brands and 41 category links, DAELIM count 21, 50 archive URLs returning 200, pagination, 320/390/768/1440px archive layouts, a real single product with an email enquiry action, Marine Locks 301, JSON-LD without synthetic rating/price fields on the sampled product, staging noindex, homepage mobile menu/Escape, and all nine theme PHP syntax checks. Browser requests are restricted to the local origin during the restored test. Screenshots ending `-restored.png` show real catalogue data with missing-media placeholders.

## Remaining work

205 products have fewer than 50 words in their stored description/excerpt. Confirm priority products and supply accurate specifications and photos; do not fabricate them. One article contains competitor links; each needs a verified matching internal destination before replacement. Imported content can still contain legacy shortcodes, media references or unsupported old page templates. Only the four supplied plugins were available; forms, review widgets and other integrations are not yet restored or verified.

The complete site URL manifest, detailed content/metadata/schema audit, correct business address and WhatsApp number, sitemap/robots launch configuration, image optimisation, Search Console and Analytics, Core Web Vitals, email delivery, hosting security headers, staging-to-production migration and launch are still pending. No ranking or production-readiness claim is made.

The installable theme ZIP uses the root folder `yaybmt-modern` to avoid overwriting the original theme. It includes theme code and public design assets only; it does not include customer data, SQL, uploaded plugins or local credentials. Database repairs are separate from installing the theme.

## Fresh isolated restoration and design review — 31 October 2026

Restored the newly supplied `softsql.zip` and four plugin packages into separate project `yaybmt-restore` and new volumes `yaybmt-restore_restore_db` / `yaybmt-restore_restore_wp`. The SQL backup is preserved privately and ordinary startup does not import it. Verified 292 published products, 9 brands, 41 categories, 10 articles, 8 pages and 523 attachment records. WooCommerce, ACF and Yoast are active; the extra schema plugin is retained inactive. The repository's local repair helper corrected five article links and refreshed counts without changing the supplied backup.

The running baseline uses a private theme copy from main, with floating-only WhatsApp. The new catalogue/detail design is opt-in, using real restored data, and is documented in [samples/restored/README.md](../samples/restored/README.md). It has not been applied throughout the theme. The working tree's earlier design draft is preserved separately. No live website was contacted or changed.

Passed the restored catalogue suite (all 50 archive URLs, real pagination, product enquiry, Marine Locks redirect, no synthetic rating/price schema and noindex), contact/navigation checks, homepage checks and the new sample suite at four widths. Email and WordPress HTTP blocking were verified; local responses carry noindex and a same-origin browser CSP. Product photography remains absent.
