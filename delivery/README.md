# Download and install the YAYBMT theme

Download **[yaybmt-wordpress-theme.zip](yaybmt-wordpress-theme.zip)** from this folder. On GitHub's file page, click **Download raw file** (the download icon). Sign in to GitHub if the repository requires it.

## Install on your WordPress staging site

1. Open **Appearance → Themes → Add New → Upload Theme**.
2. Select `yaybmt-wordpress-theme.zip`, then click **Install Now**.
3. Activate **YAYBMT Enterprise** on staging and review it before changing the live website.

The ZIP installs into **yaybmt-modern**, so it does not overwrite the old **yaybmt** theme folder. Use this theme ZIP, rather than uploading GitHub's whole-repository ZIP to WordPress.

Included: the modern theme, original white logo over the homepage hero, green logo on inner pages and white footer logo, responsive catalogue layout, image alignment, contact details, footer social icons and floating WhatsApp. The header has no contact bar, social icons or WhatsApp button.

The ZIP is theme code and public design assets only. It contains no SQL database, passwords, private backups, uploaded plugin packages or product-photo library. Existing products and images stay in the WordPress database and uploads folder. Local database repairs and disabling the overlapping schema plugin are separate from theme installation; see [restored catalogue notes](../docs/restored-catalogue.md).

## View or edit the source

Theme source: [`wp-content/themes/yaybmt`](../wp-content/themes/yaybmt). The folder is named `yaybmt` in this development checkout; the packaging script deliberately uses `yaybmt-modern` for installation.

Build the installable ZIP again from the repository root:

```sh
python3 scripts/package-theme.py
```

[`SHA256SUMS.txt`](SHA256SUMS.txt) contains the checksum for the supplied ZIP. No changes have been deployed to the live website.
