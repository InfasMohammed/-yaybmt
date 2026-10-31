# Static rebuild migration status

The previous documentation in this folder records historical WordPress work, not the current runtime. Root README is the current setup guide. Legacy source, preview and delivery archives are retained under `legacy/` solely for provenance. The Next build includes only app code and `public/` assets.

## Evidence and missing input

The private `/workspace/private/yaybmt-restore` directory is absent in this environment. No supplied SQL export or uploads library is available here. Git explicitly excludes those private inputs. Therefore the 292 products, 9 brands, 41 categories, 10 articles, 8 pages and 523 attachment records reported in the earlier restoration have NOT been fully migrated.

The catalogue sample uses the names, model references and product paths in the existing preview. It contains no inferred material, measurements, technical specifications, prices, stock, ratings or reviews. DAELIM association follows the source preview's archive. Some public preview records may themselves need verification against the export. All technical specifications remain explicitly unavailable. The product gallery intentionally contains a missing-photo placeholder because there are no genuine product photos in Git. Related items share a brand only.

Required next inputs: original database export, wp-content/uploads, verified priority product specifications, and a complete historical URL manifest/crawl plus Search Console data. Import public fields only; never commit SQL, users, customers, credentials or plugins. Database is migration input only. Sanitise legacy HTML, strip shortcodes, validate links and copy approved media by attachment references. Preserve original slugs and Yoast metadata where supported. Reconcile counts and all URLs against the export before launch.

## URL handling

Existing known sample product routes `/product/<original-slug>/` and `/brand/daelim/` are generated. `/brand/marine-locks/` stays at its established address, with a clearly labelled migration holding page and functional enquiry. Its erroneous category route has the specific Firebase 301. No other missing URL is redirected to a homepage. The category reference file preserves nested paths but does not claim those archives are already implemented. Article bodies, page routes and remaining products await migration. Do not invent a redirect map without the missing manifest.

## Contacts

Confirmed Deira, Dubai; telephone +971 4 227 8616; WhatsApp +971 56 736 9803; sales@yaybmt.com; info@yaybmt.com. Instagram, Facebook and Google Maps links use the client-confirmed URLs. No enquiry messages are sent by tests.

## Review limitations

This branch is a sample implementation only. Missing real technical specifications cannot be resolved by design or code. The original white logo is reused unchanged on the homepage and footer; the existing marine hero is documented as illustrative. Neither it nor placeholders represent product photography. No Firebase project has been linked, no deployment made, and main is untouched.
