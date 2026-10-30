# YAYBMT WordPress website

Modern WordPress theme for Yusuf Al Yousfi Building Materials Trading LLC, with responsive product/brand/category layouts, the original company logos, consistent product-image frames, email enquiries and floating WhatsApp.

## Download the theme

**[Download and installation instructions](delivery/README.md)**

The ready-to-install ZIP is [`delivery/yaybmt-wordpress-theme.zip`](delivery/yaybmt-wordpress-theme.zip). Open that file on GitHub and choose **Download raw file**. Install the theme ZIP on WordPress staging using **Appearance → Themes → Add New → Upload Theme**. The ZIP installs as `yaybmt-modern`, preserving the old `yaybmt` theme folder.

This repository contains theme code and public design assets. Products, pages, private database backups, credentials, uploaded plugin packages and the product-photo library are not included. Existing products and images remain in your WordPress database and uploads folder; database/SEO repairs are separate from installing the theme.

## Source and development

- `wp-content/themes/yaybmt/` — editable theme source. The packaging script changes only the installation folder name to `yaybmt-modern`.
- `preview/` — static homepage/catalogue layout previews. Catalogue navigation needs WordPress to serve the real routes.
- `delivery/` — installable theme ZIP, checksum and instructions.
- `scripts/` — packaging, local development setup, validation and staging-only database repairs.
- `docs/` — validation results, restoration notes and migration requirements.
- `artifacts/` — current desktop/mobile screenshots.

Build the installable theme from the repository root:

```sh
python3 scripts/package-theme.py
```

For an empty isolated WordPress/MariaDB development site, use the existing checkout rather than a worktree:

```sh
python3 scripts/init-local.py
docker --host=unix:///var/run/docker.sock compose up -d --wait
```

If that isolated database is fresh, run `node scripts/install-dev.cjs` once. It refuses an already installed WordPress site. Never run the installer against production. Local credentials are kept in ignored `.local-admin.json`; database configuration is kept in ignored `.env`.

The prepared cloud environment also contains a separate, private restoration of the supplied catalogue. See [restored catalogue instructions](docs/restored-catalogue.md). Its database is deliberately outside Git and is not recreated by cloning this repository.

For the static design preview:

```sh
python3 -m http.server 8080 --bind 127.0.0.1 --directory preview
```

## Validation and launch

[Validation notes](docs/validation.md) record the completed browser and PHP checks. Browser checks use runtime-provided Playwright and Chromium. Real product photos, priority-product specifications and remaining production SEO/integration checks are still pending. No code in this repository has been deployed to the live website.

`firebase.json` is an optional, preparatory static-hosting configuration from the migration planning. Firebase Hosting does not run WordPress PHP/MySQL; the installable deliverable here is a WordPress theme.
