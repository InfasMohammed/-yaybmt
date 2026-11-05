# WhatsApp enquiries

The contact form contains Full name, Phone number and Message. Name and message are required; phone is optional because the WhatsApp conversation provides a reply channel. There are no Company or Email fields and no email is sent.

Submitting a valid form opens https://wa.me/971567369803?text= followed by the URL-encoded enquiry template in a new tab/app. The template includes a greeting, the visitor's details, their message under Requirements and a request for product details/a quotation. Optional blank details are omitted. The visitor must press Send in WhatsApp; submitting the website form does not send a message automatically. No WhatsApp Business API, backend, third-party form service or email service is used.

An inline fallback link opens the same prepared enquiry if the new tab is blocked. Editing a field clears that old fallback. Without JavaScript, a direct WhatsApp link opens an editable template; the unavailable form is hidden. Product/brand enquiries, footer and contact actions also use WhatsApp/telephone rather than email. Stored historical email addresses remain in the repository's contact data but no mailto actions are rendered.

Validation covers desktop/mobile form validation and exact WhatsApp message content, special-character/newline encoding, the destination number, fallback link behavior and no-JavaScript contact access. Browser tests intercept window.open and never send enquiries. The export audit checks every route for absence of mailto links.
