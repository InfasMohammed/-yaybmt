# Real-data design samples — review before rollout

These files are an opt-in local prototype, separate from the installable theme. `template.php` reads the restored WordPress/WooCommerce product, brand and description data. `sample.css` adds the proposed layout and motion. `design-samples.php` is a **local-only** must-use plugin that enables the prototype when `design_sample=1` is supplied on a product or catalogue archive. Removing that query returns the baseline layout. Product permalink paths and stored content are not changed.

The prepared runtime is private at `/workspace/private/yaybmt-restore`, on loopback port 8086. Its baseline theme was copied from main commit `70d1947846dc45c19ebf470bb6ff1fd1fbf1392d`, with only the requested floating-only WhatsApp correction. Earlier working-tree design changes are preserved separately and are not the theme mounted into this instance.

The uploaded SQL, plugins, database volumes and runtime credentials stay outside Git. Do not put them in the theme ZIP or public Hosting directories. Product photos were not supplied, so samples explicitly show placeholders. Descriptions/specifications are imported content, not new verified product claims.

Sample request paths on the local instance:

- `/brand/daelim/?design_sample=1`
- `/product/dc-102/?design_sample=1`

Normal startup, from the private runtime directory:

```sh
env -u DOCKER_HOST -u DOCKER_CONTEXT -u DOCKER_TLS -u DOCKER_TLS_VERIFY -u DOCKER_CERT_PATH docker --host=unix:///var/run/docker.sock compose -p yaybmt-restore up -d --wait
```

Never reimport SQL or initialize a missing volume as part of normal startup. Diagnose missing restored state first. Do not change the live site. Local WordPress is protected by a must-use plugin blocking email and WordPress HTTP calls, noindex headers/meta, disabled cron/updates, and a browser CSP blocking external resource requests. The database network is internal; only WordPress's web bridge publishes a loopback port. These protections are development-only.

To refresh the prototype, copy these three code files to their matching private `samples/` and `mu-plugins/` paths; runtime code directories must be mode 755 and files 644 so Apache can read them. Preserve the separate `local-safety.php` must-use plugin. Never copy credentials or imported database files into this directory.

From the repository root, `node scripts/check-restored-samples.cjs` validates the prototype and saves desktop/mobile screenshots to `/tmp/yaybmt-real-samples` (override with `YAYBMT_SAMPLE_ARTIFACTS`). It blocks browser requests outside the local origin. `node scripts/check-restored.cjs` checks the real catalogue baseline. The contact/navigation and homepage suites also pass against the restored instance.

The prototype has not been applied throughout the theme or deployed to any host. Obtain design feedback before rollout. Firebase Hosting does not execute WordPress PHP; this workflow uses the isolated local WordPress instance.

## Revised copper/charcoal review

The current two templates replace the earlier sample styling. The catalogue includes a heading/intro, prominent server-rendered search, native collapsible Brands/Categories, removable selected-filter links, clear/reset, empty results and real pagination. Mobile JavaScript enhances the same controls into a modal drawer with focus trapping, Escape, backdrop dismissal, focus return and inert background. Without JavaScript, the filters stay accessible inline and forms/links work normally.

Product cards use equal `object-fit: contain` image frames, plain name panels, full wrapping and aligned card bottoms. Brand and model are separate; model numbers come only from explicit model attributes/specification labels, and missing/non-numeric descriptive values are not promoted into model numbers. For DC 102 the readable product type comes directly from its stored `Toilet Type` specification. The product sample displays stored descriptions/attributes, a gallery when local original images exist, explicit missing-photo placeholders, related products (same brand when available), and email/WhatsApp enquiries carrying the unchanged product URL. The product enquiry WhatsApp link follows the latest design request; the shared floating button remains.

Files to copy into the private runtime are now `template.php`, `sample.css` **and `sample.js`** under `samples/`, plus `design-samples.php` under `mu-plugins/`. Do not copy them into the theme or deploy them. Styles are scoped to `body.yb-sample`; removing `design_sample=1` returns the baseline. Existing sitewide working-tree changes predate this revision and remain separate.

Passed the revised browser suite for real search/filter/chip/reset/empty/pagination behavior, mobile drawer focus/keyboard behavior, no-JavaScript search and product navigation, four viewport widths, aligned name/media/card geometry, product enquiries, related products and reduced motion. Review screenshots are under `/tmp/yaybmt-real-samples` and copied to the ignored `artifacts/` sample images for review.

Latest review change: the product enquiry panel (heading, explanatory text, email/WhatsApp buttons and app-opening note) has been removed at every viewport at the user's request. The shared floating WhatsApp button and footer contacts remain. The earlier description of inline enquiry actions is superseded by this change.
