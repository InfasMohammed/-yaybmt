# Visible navigation and Company values

The hamburger menu is replaced by visible Home, Products, Brands, Company and Contact navigation on desktop and mobile. Products lists the imported top-level product categories plus All products; Brands lists the nine recorded brands plus All brands. Existing category/brand URLs are retained.

Dropdowns use native details/summary controls, so links remain usable without JavaScript. Desktop hover, click/tap and keyboard activation are supported. Only one dropdown is open at a time; outside pointer presses close it, and Escape closes it and returns focus to its summary. Mobile navigation wraps visibly and its dropdown panel stays within the viewport, with scrolling for longer lists. The original white logo remains over the homepage photograph.

Original Vision, Mission and History paragraphs remain in `data/welcome.ts`, but their panels are now rendered by `CompanyValues` on `/about-us/` only. The homepage keeps the welcome video, introduction and enquiry link. No content or source image was invented or removed from the Company panels.

Validation: npm run check, static build, 406-route SEO/internal-link audit and full browser suite passed. Regression checks cover the visible navigation, brand dropdown, Escape, moved panels and Company link. Targeted browser checks at 1440, 390 and 320 pixels cover products/brands links, one-open-dropdown behavior, outside dismissal, keyboard activation, no overflow and content placement. A 320-pixel check verified brand navigation and Company panels with JavaScript disabled. Fresh desktop/mobile homepage, dropdown, welcome-section and Company screenshots are included in `artifacts/nextjs/`.
