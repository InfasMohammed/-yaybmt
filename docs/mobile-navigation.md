# Mobile navigation

At viewport widths up to 650px, the header uses a three-line Menu disclosure instead of the full navigation row. Desktop navigation retains its Home, Products, Brands, Company and Contact links and dropdowns.

With JavaScript, the mobile menu shows one level at a time. Selecting Products or Brands replaces the main list with a dedicated list, headed by Back, a section title and View all products/brands. Close is available on both levels. Back and Escape from a sublist return to the main menu and focus the corresponding Products/Brands link. Escape from the main level, Close and outside taps dismiss the menu. Close and Escape restore focus to the menu toggle. Selecting a destination navigates and closes the panel. Long lists scroll inside the viewport.

The outer disclosure uses native details/summary. Without JavaScript, Products and Brands are normal links to their complete static directories, and the native Menu toggle opens/closes the main list. The JavaScript-only Back/Close controls are not rendered in this fallback. Links remain accessible without animation or JavaScript.

Validation: static build and 406-route SEO audit passed. Responsive homepage checks cover both menu levels, Back, View all, Close, outside taps, Escape, desktop navigation and no-JavaScript product navigation.
