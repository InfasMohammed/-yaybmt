import { visibleTestimonials } from "../../data/testimonials";
import { contacts } from "../../data/contacts";
import { TestimonialCard } from "./testimonial-card";
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
      <div className="testimonials-light-rays" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="testimonials-inner">
        <div className="testimonials-heading">
          <h2 id="testimonials-heading">Real Results, Real Voices</h2>
          <p className="testimonials-preview-note">
            {hasSamples
              ? "Design preview — sample content only, not real customer testimonials."
              : "Feedback shared by our customers on Google."}
          </p>
        </div>
        <div className="testimonials-grid">
          {items.map((item, index) => (
            <TestimonialCard key={item.id} index={index} name={item.name}>
              <GridPattern className="testimonial-pattern" />
              <figcaption className="testimonial-person">
                <span className="testimonial-avatar" aria-hidden="true">
                  {item.name
                    .split(/\s+/)
                    .slice(0, 2)
                    .map((part) => part[0])
                    .join("")
                    .toUpperCase()}
                </span>
                <span className="testimonial-person-copy">
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
                </span>
              </figcaption>
              <div className="testimonial-body">
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
              </div>
            </TestimonialCard>
          ))}
        </div>
        <a className="testimonials-source" href={contacts.maps}>
          Read reviews on Google <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
