# WordPress brand, testimonial and product-name review

Reviewed 4 November 2026. Novamira discovery returned an internal error, so its authenticated diagnostics/content could not be inspected. Public WordPress content was retrieved through the web reader; it includes cached crawls and is not proof of current runtime health.

## Distributor wording

https://yaybmt.com/brand/kopat/ and the homepage show “Official Distributors in the Gulf” specifically for KOPAT. This documents the source website's claim, not independent verification of a distributor agreement. Do not broaden it to all brands or change it to “authorised dealer in GCC”.

The retrieved pages for BN COSMO, DAELIM, Horse, MARINE LOCKS, MARINE SANITARY FITTINGS, ROYAL & CO, Staco and Sungmi Locks contained no equivalent distributor claim. Some crawls are older, so this is not confirmation of their current commercial status.

## Testimonials

https://yaybmt.com/ has a Client Testimonials heading; the retrieved text does not contain customer names, quotes or ratings there. Nearby Instagram content consists of product posts, not testimonials.

https://yaybmt.com/about-us/ has a Testimonials heading followed by an embedded Google link. The retrieved content does not establish that this is a reviews widget or provide review text. No customer quotes, ratings or review schema should be created from these headings alone.

## Product names

The previously supplied 41-row missing-name CSV was compared with the imported public WordPress descriptions and specification fields from the supplied SQL. There are 23 records with source descriptions: 19 have usable descriptive identities, four require confirmation and 18 have no source description. The attached product-name-recovery.csv covers all 41 records, including evidence and unresolved reasons.

The 19 clear names are updated in data/products.ts. Slugs, routes, models, specifications, photos and commercial claims remain unchanged. These are source-derived names, not independently verified manufacturer identifications.

Four held records:
- 5522: source Product Name instead identifies Foresti & Suardi 361.L Base.
- 6202: generic storage/case copy does not establish a specific marine product identity.
- 6203: source name combines models 6203/6204.
- 6204: source name instead identifies models 6203A/6204A.

A public reader spot check of https://yaybmt.com/product/4225/ confirmed both its numeric heading and the descriptive Cam Drawer Lock wording in its body. Other attempted product reads failed, so all 41 were not independently revalidated against current live WordPress. The full comparison uses the supplied SQL-derived public content, not a fresh database export.

No WordPress content, files, plugins, settings or DNS were modified. No testimonials or dealer claims were added to the new site by this review.

## Approved refinements

The client requested descriptive names without leading numbers and chose to preserve product URLs while renaming image files. The 19 display names now omit the numeric model prefix; the old identifier remains in the separate model field. Rendered images and original-image links use descriptive filenames, with copies of the exact existing bytes. The old numeric image paths remain available, and existing WordPress upload redirects point to the descriptive originals. SQL attachment references and checksum provenance are preserved. See product-image-name-recovery.json for all 38 old/new asset links.

KOPAT's exact source wording is shown on its brand archive, the brand directory and the homepage brand entry. It is not applied to any other brand. No new top-of-page brand logo was added.

Validation after refinements: clean Next.js static build, content integrity, 406-page export/SEO audit, 292-image checksum/redirect checks, drawing checks and catalogue/image-import tests passed. Clearing the generated .next cache resolved the earlier compiler failure; no build configuration changes were needed.

## Client-confirmed identities

The client manually confirmed three previously held records: 5522 → Foresti & Suardi 361.L Base, 6203 → Boat Side Stanchion Hand Rail Bracket, and 6204 → Boat Hand Rail Stanchion Bracket. These names and descriptive image links are now applied. The Foresti & Suardi model is 361.L; its existing product pathname remains /product/5522/. All previous numeric image paths remain available. This brings the updated total to 22 products (19 source-derived and three client-confirmed), with 6202 still held and 18 products awaiting descriptions/names. The earlier four-held-record list records the audit state before these client confirmations.
