# Homepage testimonial design samples

The supplied TestimonialsSection format is placed immediately after Industries We Serve and before the enquiry section. It contains three client-requested dummy records in data/testimonials.ts, covering example marine, engineering and construction feedback. All are visibly labelled SAMPLE and Sample customer, with a section-wide design-preview notice. Numbered circles replace real portraits; no ratings, real customer identities, company endorsements or review structured data are added.

The supplied dashed cards, grid pattern and quote hierarchy use the existing off-white/charcoal/copper palette and fonts. Its demo ERP content and external portrait URLs are excluded. The homepage keeps one H1; this section has an H2. Existing HomeMotion supplies the one-time reveal, with visible static HTML and reduced-motion support, avoiding another motion package or initially hidden server content.

visibleTestimonials(true) excludes all sample records. The server section uses YAYBMT_PRODUCTION to select this production-safe list and returns no section if it is empty. The existing migration production gate remains unchanged. Replace samples with genuine client-approved names/quotes, change their status to approved, rebuild and redeploy when approved content is ready. No database, CMS, authentication or runtime storage is used.
