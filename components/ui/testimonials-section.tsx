import { visibleTestimonials } from "../../data/testimonials";
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
          <p className="eyebrow">CLIENT FEEDBACK</p>
          <h2 id="testimonials-heading">Customer testimonials</h2>
          {hasSamples && (
            <p className="testimonials-preview-note">
              Design preview — sample content only, not real customer
              testimonials.
            </p>
          )}
        </div>
        <div className="testimonials-grid">
          {items.map((item, index) => (
            <figure key={item.id} className="testimonial-card" data-home-reveal>
              <GridPattern className="testimonial-pattern" />
              <div className="testimonial-person">
                <span className="testimonial-avatar" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <figcaption>
                  <strong>{item.name}</strong>
                  <span>{item.context}</span>
                </figcaption>
              </div>
              <blockquote>
                <p>{item.quote}</p>
              </blockquote>
              {item.status === "sample" && (
                <span className="testimonial-sample">SAMPLE</span>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
