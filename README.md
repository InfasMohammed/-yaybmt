# YAYBMT WordPress redesign

**Download the latest theme:** [installation ZIP and instructions](delivery/README.md). Theme source is under `wp-content/themes/yaybmt`; the installable ZIP uses the separate folder `yaybmt-modern`.

First design and theme implementation for Yusuf Al Yousfi Building Materials Trading LLC. This is a development draft, not a completed content migration or deployed website.

## Included

- Responsive custom WordPress theme under `wp-content/themes/yaybmt`.
- Homepage, existing-content template, archives/search, WooCommerce wrapper, accessible mobile navigation and 404 template.
- Original, local SVG artwork (illustration, not a product photograph), system fonts and no autoplay video.
- Standalone homepage design at `preview/index.html`. It is noindexed; its navigation points to planned WordPress routes which do not exist in the static preview.
- Local WordPress/MariaDB development stack and Firebase static-host configuration.

## Local WordPress

Use the existing checkout; do not create a worktree. From this directory:

```sh
python3 scripts/init-local.py
docker compose up -d
```

The local server listens on loopback port 8085. This instance is already installed with the theme active and indexing disabled. Local login details are stored in ignored `.local-admin.json`. On a fresh instance, run `node scripts/install-dev.cjs` once (requires Node.js and Docker), or complete the WordPress installer and activate **YAYBMT Enterprise** manually. The installer refuses an existing database. Import a backup only into this isolated development site. Never import over production. Retain existing permalink settings, taxonomy registrations and SEO plugin. Install the existing WooCommerce/plugin versions from the backup before updating them separately. Assign the primary menu to existing pages; homepage fallback routes for About and Contact are provisional and must be checked against the imported site. Configure a static homepage using WordPress Reading settings. The homepage currently uses curated theme copy; existing inner-page and product content renders from WordPress. Content editing blocks for the homepage are future work.

The quote links currently lead to the contact page; a real enquiry destination, confirmed business phone/WhatsApp, and form handling must be configured after importing the site. No fake form submission is provided. The logo is a provisional wordmark pending brand approval.

## Design preview

```sh
python3 -m http.server 8080 --bind 127.0.0.1 --directory preview
```

Request `/` internally to review the homepage. This static preview is not a public deployment and does not include the catalogue.

## WordPress + Firebase

Firebase Hosting serves static assets; it does not run WordPress PHP or MySQL. Recommended for a quote catalogue: keep WordPress on a separate PHP/database host as the editing system, and export complete HTML/assets to the ignored `public/` folder for Firebase Hosting. The export plugin/workflow is not yet selected or implemented. Dynamic search, enquiry forms, preview, admin login, carts and accounts need separate handling. If checkout/accounts are required, decide the architecture before deployment; a static export alone is insufficient.

`firebase.json` is a starting configuration for the eventual export, with the audit's marine-lock redirect and basic headers. It has no catch-all SPA rewrite: missing URLs must return real 404s. No Firebase project is selected and no deploy command has been run. Do not deploy the design preview as the migrated website.

See `docs/migration.md` for release gates and required access. No rankings or index coverage have been measured or guaranteed.

## Restored original catalogue

The supplied database now runs separately on loopback port 8086 with the new theme and the four supplied plugins available. See [restored catalogue instructions](docs/restored-catalogue.md) for startup, validation, local repairs and remaining launch work. This copy contains the real catalogue; the original empty development instance remains on port 8085. Nothing was deployed to the live site.
