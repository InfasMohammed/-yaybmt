# Homepage customer reviews

The supplied TestimonialsSection card format sits after Industries We Serve and before the enquiry section. The initial three clearly-labelled dummy cards were replaced at the client's request with Google-review records recovered from the client-supplied softsql.zip WordPress export. There is no WordPress runtime dependency.

## Source and limits

Read-only public homepage and About Us retrieval on 6 November 2026 (Dubai) showed testimonial headings but did not expose widget review text. Novamira discovery returned an internal error. The offline Trustindex Google reviews table contains four unhidden records. Its page-details option identifies Yusuf Al Yousfi Building Materials Trading LLC (YAYBMT), Souk Deira St, Naif, Dubai; its Google CID matches the confirmed 10643360148458649588. No credentials, plugin tokens, private SQL or profile-photo URLs are committed.

All four public review records are preserved in data/testimonials.ts with exact names, text where present, ratings, stored dates, original review IDs and legacy-page provenance. The first three are displayed: two written reviews (Mustafa Mithi, 5/5; salman rangwala, 4/5) followed by Tasneem Mithi's 5/5 rating-only record. Mohammed Mithi's 5/5 rating-only record remains in local data. No third quote is fabricated; the rating-only card says “No written comment.” No job titles, company names or real customer portraits are invented; circles show initials only.

The section says “Google reviews preserved from our previous website” and links to the confirmed business Maps listing. These are historical cached records dated 20 May 2025, not a live Google feed or independently refreshed ratings. There is no aggregate score/count or Review/AggregateRating structured data. Read reviews on Google leads to the real business listing rather than an invented per-review URL.

## Rendering

Dashed cards, the supplied grid pattern and quote hierarchy use existing site fonts/colours. Existing HomeMotion supplies a one-time reveal with visible static HTML and reduced-motion support. The homepage retains one H1 and this section uses an H2. No external demo portraits or new motion dependencies are added.

visibleTestimonials(production) excludes sample records from production and limits the section to three entries; imported/approved source-backed records remain eligible. The existing migration production gate is unchanged. Future content is edited manually in the typed local file, rebuilt and redeployed. Desktop/mobile review screenshots are in artifacts/testimonials/.
