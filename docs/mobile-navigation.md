# Mobile navigation

At viewport widths up to 650px, the header uses a three-line Menu disclosure. Desktop navigation retains its Home, Products, Brands, Company and Contact links and dropdowns.

The mobile menu fills the viewport rather than opening a floating panel. Its root shows Home, Products, Brands, Company and Contact, with Close. Selecting Products or Brands replaces the root completely with only the chosen category/brand links and a Back button at the top left. Main-menu links, Close, section titles and View all rows are not rendered in this subview. Back returns to the root and focuses the original Products/Brands entry. Escape returns from a subview to the root, then closes the root and restores toggle focus. Destination links close the menu. The background page is locked while open, with its previous overflow restored on close/unmount or switching to desktop. Only the list can scroll if the available viewport is too short to fit its items.

Without JavaScript, native details/summary opens/closes the menu. Products and Brands remain regular links to complete static directories; JavaScript-only controls are not rendered. The native toggle stays above the full-screen panel in this fallback.

Validation: static build and 406-route SEO audit passed. Five-width homepage checks verify main-menu links are absent from subviews, body scroll locking, brand/category access, Back/Close, Escape, desktop navigation and no-JavaScript fallback. Fresh root/Brands screenshots captured.
