# Modern enterprise UI proposal

Separate branch: feat/modern-enterprise-ui, based on main after PR #10. The cancelled liquid-hero trial is excluded.

## Design

The homepage is rebuilt around a clear products/location headline, original marine photograph and overlay white logo/navigation. A restrained brand strip, image-led category grid and four genuine catalogue highlights make browsing more direct. The source company video/copy remain, followed by full-width industry imagery and a concise enquiry panel. Palette and original charcoal footer remain. Mobile spacing, gutters and type sizes are adjusted for readable content and touch controls.

The four product highlights are existing records 5600, kl-200, dc-102 and fc-110cs. These are display examples, not claims of popularity, stock or the client's unprovided top-20 commercial selection. Product photos, names, models and URLs come from existing typed data. No prices, specifications or reviews were invented. Existing source welcome paragraphs and KOPAT-only distributor wording remain. The new H1 names the products and Dubai to address the customer's requirement for useful page headlines. Existing metadata and canonical URLs are unchanged.

Shared catalogue/related-product cards receive subtle rounded borders and hover shadows; name wrapping, equal image frames and aligned bottoms are retained. Cards with no recorded model omit the redundant 'Model reference not recorded' label; real model values remain separate. Directory corners, page heading rhythm and contact fields are lightly refined. Functional mobile menu, filters, product zoom/gallery, sticky specifications, enquiries and static pagination remain unchanged.

## Plugin status

The requested 21st Codex plugin is installed/enabled locally, but account-authenticated MCP tools were not loaded into this running chat. The CLI catalogue search requires sign-in. No 21st component or generated UI was retrieved. This proposal is a local React/Tailwind implementation, informed by the public project-aware 21st workflow and the client's established design constraints. See 21st-integration.md for verified setup and connection steps.

## Checks

Use existing npm run check, npm run build, npm run check:export and npm run test:browser commands. Responsive homepage checks cover 1440/1024/768/390/320 widths, genuine product-highlight links, all original category/brand links, source welcome copy, image decoding/sizing, reduced motion, no-JavaScript access, mobile menus and enquiries. The full suite covers all 406 routes, catalogue interactions, technical drawings and redirects/404s. Staging noindex and the Firebase production gate remain.

All listed checks passed locally. The 21st CLI local review was also run; duration feedback was applied, with the client-requested small clipped hover zoom intentionally retained despite the generic hover-scale warning. Fresh desktop/mobile screenshots are in artifacts/modern-enterprise-ui/.

## Homepage motion

All main homepage headings, paragraphs, brand/category/product/industry cards, the company video card and action groups have one-time viewport reveals, with a small bounded stagger. Card child text is not separately faded to avoid multiplying effects. The hero image has a gentle scale entrance; industry images retain their own image reveal. Hover adds small card lifts, contained product-image zoom and arrow movement. The existing image/card interactions remain normal links.

Motion uses the existing IntersectionObserver/Web Animations enhancer and CSS, with no library or WebGL. Content is visible by default without JavaScript. Active animations are cancelled when reduced motion is enabled, transitions are disabled and previously revealed content is not replayed. Observers and listeners are cleaned up on unmount. Browser coverage includes actual heading/card reveal execution, image hover and live reduced-motion cancellation.
