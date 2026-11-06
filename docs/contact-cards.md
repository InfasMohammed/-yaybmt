# Contact page cards

The original contact route and metadata remain intact. Original paragraphs are grouped in one introductory card; a duplicate of its existing source heading is rendered once as the heading. Contact detail cards match the company Mission/Vision cards: white surfaces, 18px corners, subtle copper borders and simple outline icons.

The confirmed original Google Maps embed and WhatsApp enquiry form share one equal-height desktop row. Below 800px they stack. The form retains full name, optional phone and message, native required validation, an encoded unsent wa.me draft and a no-JavaScript WhatsApp link. No email field, email delivery, backend or contact data service is added.

Each card has data-page-reveal so the shared one-time downward fall can animate the whole card. Reduced-motion and no-JavaScript content remains visible.

Validation: npm run build -- --webpack; npm run check:export; YAYBMT_TEST_URL=http://127.0.0.1:8103 node --import tsx scripts/check-contact-cards.ts. Browser checks cover 1440/900/390/320px layouts, equal desktop panels, mobile stacking, required validation, encoded WhatsApp message, no email action, no overflow/errors and no-JavaScript fallback. Screenshots are in artifacts/contact-cards/. Google map tiles depend on external Google connectivity and are unavailable in the restricted local screenshot environment; the original map URL is checked unchanged.
