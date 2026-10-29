# SEO-preserving migration and release gates

## Evidence and limits

Inputs: supplied Maneuver audit dated 28 September 2026 and pasted scope. These are requirements/evidence, not verified current production state. The audit reports roughly 363 pages, 74 sitemap URLs and five urgent issues. Counts, rankings, review markup and current indexation must be rechecked. Automated requests to the homepage and robots.txt returned HTTP 403 from this environment on 29 October 2026, preventing a live crawl. The repository initially had no commits or files.

The audit explicitly identifies the live Marine Locks route as `/brand/marine-locks/` and the broken route as `/product-category/marine-locks/`. Firebase configuration preserves the former and redirects the latter with 301. Do not create a competing marine-locks taxonomy/archive. The theme does not register or rename product taxonomies: restore their original plugin registration from the backup.

## Needed before content migration

1. WordPress database + uploads + plugin/theme backup, or an export plus catalogue/media files. Keep backups outside Git and do not send credentials in chat.
2. Search Console exports for at least the past 3–6 months: pages, queries, clicks, impressions, positions, indexed pages, sitemaps, links and any manual actions. Analytics baseline with matching dates.
3. Correct legal name, full address, phone, WhatsApp, opening hours and approved logo/brand assets. The audit author's contact details are not the client's details.
4. Priority 20 products and accurate names, models, descriptions, materials, dimensions, finish, applications, images, certificates and availability. Do not invent product claims.
5. Decide catalogue/enquiries versus live ecommerce. Firebase static export is suited to the former; dynamic features need a backend.

## Migration sequence

- Restore a backup to isolated staging. Record permalink settings, registered taxonomy bases, SEO-plugin config, existing redirects, robots and sitemaps. Keep staging noindexed and access restricted. Never deploy staging noindex to production.
- Create a complete URL manifest from crawl, WordPress export, Search Console and existing sitemaps. Include blogs, products, categories, pagination, media and high-value inbound links. Record status, canonical, title, description, H1, indexability and internal links per URL.
- Keep established URLs and useful content. For unavoidable changes, map each old URL to its closest equivalent with one-hop 301s. Do not redirect every missing URL to the homepage.
- Remove unsupported admin reviews/zero-INR offers in the actual plugin or product data responsible, preserving genuine reviews. The new theme emits no product ratings/offers, but cannot remove markup emitted by existing plugins. Validate final output.
- Replace dummy text, demo-domain assets and competitor product links after identifying their exact locations. Keep accurate existing descriptions and relevant content. Use self-hosted approved assets.
- Restore/expand all genuine catalogue pages, improving the top 20 first. Keep the marine locks archive and repair incoming internal links. Do not remove products solely because this design draft does not display them.
- Verify utility-page noindex rules and exclude cart/checkout/account/search from the public sitemap. Generate the sitemap from actual exported canonical, indexable URLs, not estimated counts.
- Preserve the current SEO plugin as the single metadata owner. Verify server-rendered unique titles, descriptions, canonical URLs, breadcrumb/organization/product data and existing pagination. Only include verified business facts and genuine structured data.

## Before Firebase staging deployment

Request access at this point: Firebase project ID and least-privilege staging Hosting access through the supported account mechanism. No secret values in Git/chat. Access is not needed for design/theme work. Keep WordPress origin access and domain/DNS control available for the later cutover. Export publication must rebuild when content changes; admin URLs and credentials never enter the export.

Generate the complete public export with canonical host `https://yaybmt.com`, including real `404.html`, sitemap and robots. Test every URL from the manifest against the export and staging response. Check redirects at the HTTP layer, canonical host/protocol, correct 404 statuses, no broken internal links/media, no draft/demo assets, no admin/API/private files, and no staging URLs in metadata. The configuration is not evidence these checks passed.

Test mobile menu, keyboard focus, contact actions, enquiry delivery with spam controls, catalogue pages and any required search. Measure Core Web Vitals/Lighthouse on representative pages. Validate rendered structured data using Google's tools and verify it matches visible content. Apply CSP/HSTS only after testing the actual integrations and HTTPS domain policy.

## Cutover and monitoring

Get stakeholder approval of the completed staging site and brand treatment. Keep the old host available and record DNS rollback settings. Verify the custom domain/TLS, redirects, URLs and forms immediately after cutover. Submit the verified sitemap in Search Console, inspect priority URLs and compare 404/indexation/traffic/query trends against the recorded baseline. Investigate meaningful drops; rankings cannot be guaranteed. Record publication and rollback decisions separately from this development build.

## Current status

Theme/design implemented; source-site crawl, backup import, priority-product enrichment, real contact flow, metadata audit, static export, Firebase deployment, analytics baseline and cutover remain pending. No live-site fixes or ranking claims have been made.
