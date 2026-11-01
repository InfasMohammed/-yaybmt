# Context-aware catalogue filters

A brand archive previously received only that brand's products but displayed every brand/category checkbox. Selecting another brand or an unrelated category produced an avoidable empty result.

Brand archives now identify their fixed brand and provide a native Change brand link to `/brands/`. They show only category options represented within that brand. In all listings, brand/category options are limited to the listing's original product set. Counts reflect search and the other filter group; an unselected option with zero matching products is disabled. Selected options remain enabled and removable even at zero matches. This concerns product matches, not stock availability.

Old contradictory brand/category query values on brand pages are ignored by validating restored filters against that archive's scope. Clear filters resets refinements without changing the current brand route. Search may still legitimately return no matches, with the existing clear/reset controls. Native brand/category navigation and pagination remain accessible without JavaScript.

Also removes the two requested migration notices from archive/brands pages and the decorative plus after Deira, Dubai in the footer.

Validation: npm run check, static build and the 406-route export SEO audit passed. The browser suite includes regressions for DAELIM with contradictory query parameters, relevant category selection, disabling Fasteners after selecting DAELIM in the main catalogue, re-enabling it after clearing the brand, and the scoped mobile filter drawer. The full 406-route/browser suite passed. Desktop/mobile screenshots show the updated brand listings and mobile filter drawer. The footer Maps link retains its confirmed destination and now displays only Deira, Dubai.
