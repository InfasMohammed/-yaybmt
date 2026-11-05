# Industries We Serve image refresh

The client requested replacements for all three industry images. Marine, Engineering & Fabrication and Construction now use matching 3:2 illustrative scenes generated specifically for the review design with OpenAI image generation. These are generic industry illustrations, not documentary photographs of YAYBMT's own vessels, facilities, clients or projects. They do not replace or invent any catalogue product photographs.

The local WebP assets are 960 × 640 pixels and are served without an image optimisation server. Images now fill the full card width in matching 3:2 frames, with no inset padding or 260px width cap. The 960px source width keeps them sharp at desktop and mobile card sizes. Their full aspect ratios are preserved. Original WordPress industry assets remain in the repository and Git history. No routes, product data or metadata changed.

Asset files:
- public/images/industries/marine-illustration.webp
- public/images/industries/engineering-fabrication-illustration.webp
- public/images/industries/construction-illustration.webp

Validation: static build and 406-route SEO/internal-link export audit passed. Homepage browser checks passed at 1440, 1024, 768, 390 and 320 pixels, including local image decoding, image sizing, reduced motion, no-JavaScript navigation and enquiries. Fresh desktop/mobile screenshots were captured for review.

Industry images now have a one-time gentle scale-and-fade reveal when they enter the viewport, plus a small Tailwind hover zoom inside the clipped image frame. The existing card reveal remains. Both effects respect prefers-reduced-motion; switching that preference cancels active reveal animations. Images remain visible without JavaScript and are never hidden by default. No animation dependency was added. Browser checks exercise the actual image reveal, hover transform and live reduced-motion cancellation in addition to responsive/no-JavaScript coverage.
