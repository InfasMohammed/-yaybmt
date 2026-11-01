# Contact Us migration

The live public WordPress `/contact-us/` page was inspected read-only. The existing route, canonical and metadata remain. Original introductory copy, street/PO-box address, opening hours and map embed reference are in `data/contact-page.ts`. Emails, telephone, WhatsApp and the direct Maps destination continue to use the client's confirmed values in `data/contacts.ts`.

Source address: PO Box 115907, Shop #2, Nakheel Rd, Near Malabar Supermarket, Deira, Dubai, United Arab Emirates. Source hours: Monday–Saturday 8:30 AM–1:30 PM and 4:00 PM–8:00 PM; Sunday closed. These were copied from the current site, not invented. The original malformed `telo:` phone link is replaced with a valid `tel:` URL.

The original form's name, telephone, email and message fields are retained in an accessible static-site form. Prepare email creates an encoded mailto draft; Open email draft launches the visitor's email application. Nothing is submitted to WordPress, stored on a server or marked as delivered. Direct email/phone/WhatsApp links remain usable without JavaScript; the enhanced form is hidden when JavaScript is unavailable. No duplicate brand carousel was added.

Validation: static build and 406-route SEO/internal-link audit passed. Browser checks at 1440, 390 and 320 pixels verified sourced contact/address/hours, valid telephone and map destinations, no overflow, mailto body encoding with special characters/newlines and stale-draft clearing. The 320-pixel check ran without JavaScript. No email or WhatsApp message was sent. Browser verification blocked external requests and checked the map iframe URL and direct directions link; live embedded-map rendering is not claimed. Screenshots: `artifacts/nextjs/contact-desktop.png` and `contact-mobile.png`.

No WordPress page, database, theme, plugin or live hosting setting was modified. No Firebase deployment or production promotion was performed.
