import { categories } from "../data/categories";
import { contacts } from "../data/contacts";
import { cataloguePDF } from "../lib/catalogue-file";
import { whatsapp } from "../lib/site";
import "../app/footer.css";

// Existing, populated top-level categories covering the core marine/building catalogue.
const categorySlugs = [
  "marine-furniture-fittings",
  "marine-hardware-fittings",
  "cp-fittings",
  "fasteners",
  "general-hardware",
  "oil-field-industrial-pipe-fittings",
  "ppr-upvc-pipes-fittings",
  "abrasives",
];
const footerCategories = categorySlugs.map((slug) =>
  categories.find((category) => category.slug === slug)!,
);

export default function SiteFooter() {
  return (
    <footer id="contact" className="site-footer">
      <div className="footer-identity">
        <a href="/" aria-label="YAYBMT home">
          <img
            className="logo"
            src="/images/logo-footer-original.png"
            alt="Yusuf Al Yousfi Building Materials Trading LLC"
          />
        </a>
        <p>
          Marine hardware, sanitary fittings and building materials in Deira,
          Dubai. Serving our customers since 2004.
        </p>
        <div className="social" aria-label="Social media">
          {[
            ["Instagram", contacts.instagram, "instagram"],
            ["Facebook", contacts.facebook, "facebook"],
            ["LinkedIn", contacts.linkedin, "linkedin"],
          ].map(([label, href, icon]) => (
            <a key={label} aria-label={label} href={href}>
              <img src={`/images/icons/${icon}.svg`} alt="" />
            </a>
          ))}
        </div>
      </div>
      <nav
        className="footer-navigation footer-column"
        aria-labelledby="footer-links-heading"
      >
        <h2 id="footer-links-heading">Quick links</h2>
        <a href="/">Home</a>
        <a href="/shop/">Catalogue</a>
        <a href="/brands/">Brands</a>
        <a href="/about-us/">Company</a>
        <a href="/blog/">Articles</a>
        <a href="/contact-us/">Contact</a>
        <a href={cataloguePDF.href} download={cataloguePDF.filename}>
          Original catalogue (PDF)
        </a>
      </nav>
      <nav
        className="footer-categories footer-column"
        aria-labelledby="footer-categories-heading"
      >
        <h2 id="footer-categories-heading">Product categories</h2>
        {footerCategories.map((category) => (
          <a key={category.slug} href={`/product-category/${category.slug}/`}>
            {category.name}
          </a>
        ))}
        <a className="footer-all-categories" href="/categories/">
          All categories{" "}
          <svg
            className="footer-arrow"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M6 18 18 6M6 6h12v12" />
          </svg>
        </a>
      </nav>
      <div className="footer-contact footer-column">
        <h2>Get in touch</h2>
        <a href={contacts.telephoneHref}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M6 3 3 5c-1 8 8 17 16 16l2-3-5-3-2 2c-3-1-6-4-7-7l2-2Z" />
          </svg>
          <span>
            <strong>Telephone</strong>
            {contacts.telephone}
          </span>
        </a>
        <a href={whatsapp()}>
          <img src="/images/icons/whatsapp.svg" alt="" />
          <span>
            <strong>WhatsApp</strong>
            {contacts.whatsapp}
          </span>
        </a>
        <a href={contacts.maps}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>
            <strong>Our location</strong>
            {contacts.location}
          </span>
        </a>
        <a className="footer-specialist-link" href="/brand/marine-locks/">
          Explore marine locks{" "}
          <svg
            className="footer-arrow"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M6 18 18 6M6 6h12v12" />
          </svg>
        </a>
      </div>
      <div className="footer-note footer-bottom">
        <p>
          © 2026 <strong>Yusuf Al Yousfi Building Materials Trading LLC</strong>
          . All rights reserved.
        </p>
        <a
          className="powered-by"
          href="https://maneuver.ae/"
          aria-label="Powered by Maneuver"
        >
          <span>Powered by</span>
          <img
            src="/images/maneuver-logo-white.png"
            alt="Maneuver"
            width="600"
            height="139"
            loading="lazy"
          />
        </a>
      </div>
    </footer>
  );
}
