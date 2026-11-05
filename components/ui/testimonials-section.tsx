import { visibleTestimonials } from "../../data/testimonials";
import { contacts } from "../../data/contacts";
import { GridPattern } from "./grid-pattern";
import "../../app/testimonials.css";

export function TestimonialsSection() {
  const items = visibleTestimonials(process.env.YAYBMT_PRODUCTION === "true");
  if (!items.length) return null;
  const hasSamples = items.some((item) => item.status === "sample");
  return (
    <section
      className="testimonials-section"
      aria-labelledby="testimonials-heading"
    >
      <div className="testimonials-inner">
        <div className="testimonials-heading" data-home-reveal>
          <p className="eyebrow">CUSTOMER FEEDBACK</p>
          <h2 id="testimonials-heading">Customer reviews</h2>
          <p className="testimonials-preview-note">
            {hasSamples
              ? "Design preview — sample content only, not real customer testimonials."
              : "Google reviews preserved from our previous website."}
          </p>
        </div>
        <div className="testimonials-grid">
          {items.map((item) => (
            <figure key={item.id} className="testimonial-card" data-home-reveal>
              <GridPattern className="testimonial-pattern" />
              <div className="testimonial-person">
                <span className="testimonial-avatar" aria-hidden="true">
                  {item.name
                    .split(/\s+/)
                    .slice(0, 2)
                    .map((part) => part[0])
                    .join("")
                    .toUpperCase()}
                </span>
                <figcaption>
                  <strong>{item.name}</strong>
                  <span>
                    {item.source?.kind}
                    {item.date && (
                      <>
                        {" "}
                        ·{" "}
                        <time dateTime={item.date}>
                          {new Date(
                            item.date + "T00:00:00Z",
                          ).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            timeZone: "UTC",
                          })}
                        </time>
                      </>
                    )}
                  </span>
                </figcaption>
              </div>
              {item.rating !== undefined && (
                <span
                  className="testimonial-rating"
                  role="img"
                  aria-label={`${item.rating} out of 5 stars`}
                >
                  {"★".repeat(item.rating)}
                  {"☆".repeat(5 - item.rating)}
                </span>
              )}
              {item.quote ? (
                <blockquote>
                  <p>{item.quote}</p>
                </blockquote>
              ) : (
                <p className="testimonial-rating-only">No written comment.</p>
              )}
              {item.status === "sample" && (
                <span className="testimonial-sample">SAMPLE</span>
              )}
            </figure>
          ))}
        </div>
        <a className="testimonials-source" href={contacts.maps}>
          Read reviews on Google <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
