# YAYBMT design context

Yusuf Al Yousfi Building Materials Trading LLC: a Deira, Dubai supplier of marine hardware and building materials, established in 2004. The website is an enquiry catalogue, not a checkout store.

## Technical constraints

Next.js, TypeScript, React, static export to out/ for Firebase Hosting. Local typed catalogue data and images. No CMS/runtime database/admin/authentication/storage backend. Tailwind 4 uses the tw: prefix without Preflight; retain existing shared CSS and components. All URLs and product/source relationships must be preserved. Staging remains noindexed. No main merge or production deployment without client approval.

## Identity

Charcoal #252827; paper #f7f6f2; copper #a96340; dark copper #8c4d2d; light copper #e6b996. Original white header/footer logos. Header/navigation overlays the original marine photograph; no separate white bar, header social icons or WhatsApp strip. Charcoal footer, footer social icons, floating icon-only WhatsApp. No external fonts required.

## UI direction under review

Professional, spacious and product-led. Strong but readable headings, restrained borders/radii, equal contained catalogue image frames, complete wrapping product names, model separate from name where recorded. Source facts and photos only; no fabricated reviews, prices, stock, specifications or business statistics. Homepage headlines explain products/location and existing source welcome copy is retained. Video remains muted and scroll-aware. Industry imagery is illustrative and its provenance is documented.

Mobile navigation stays a floating panel, one level/list at a time, Back at top left, vertical-only scrolling and no horizontal overflow. Products/Brands views contain only their own entries. Reduced motion and no-JavaScript access are required. Enquiries go to WhatsApp; no email fields or mailto actions.

The feat/modern-enterprise-ui branch is an unapproved proposal. The closed liquid-hero experiment is not part of this direction.
