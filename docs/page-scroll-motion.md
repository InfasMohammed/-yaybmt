# Smooth sitewide reveals

Team-review feedback replaces the dramatic falling animation with a restrained one-time fade: 12px upward movement, 500ms duration, cubic-bezier(0.22,1,0.36,1), and at most 90ms stagger. No bounce, rotation, continuous floating or scroll-scrubbed movement. Headings/cards/images keep reserved layout and stay visible after first entry.

Homepage and inner-page controllers use identical motion. Paragraphs remain stationary and readable inside their card rather than animating word by word. Testimonials use the same short fade/12px movement without blur; desktop industry images crossfade without falling. The company intro no longer shakes on hover.

Reduced-motion/no-JavaScript content is visible; keyboard focus reveals targets immediately; new filter results are discovered. Forms, navigation, gallery controls and all text/URLs remain intact.

Checks: static build, SEO export audit, home-drop/page-scroll/paragraph/testimonial browser scripts. Existing script names/data attributes are retained for compatibility; their assertions now verify subtle reveals rather than large falls.
