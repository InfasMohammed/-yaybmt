import "./tailwind-home.css";
import HomeMotion from "../components/HomeMotion";
import ScrollVideo from "../components/ScrollVideo";
import Card from "../components/Card";
import { brandLogos } from "../data/brand-logos";
import { brands } from "../data/brands";
import { categories } from "../data/categories";
import { categoryImages } from "../data/category-images";
import { industries } from "../data/industries";
import { products } from "../data/products";
import { sourcePages } from "../data/source-pages";
import { welcome } from "../data/welcome";
import { metadata as meta, whatsapp } from "../lib/site";
import { catalogueItem } from "../lib/catalogue-data";

const source = sourcePages.find((p) => p.path === "/")!;
export const metadata = meta(
  source.seo.title || "Building materials, connected",
  source.seo.description || "Building materials enquiries in Deira, Dubai.",
  "/",
);
const selected = ["5600", "kl-200", "dc-102", "fc-110cs"].map((slug) =>
  products.find((p) => p.slug === slug)!,
);
const industryCopy: Record<string, string> = {
  marine: "Marine locks, sanitary ware and ship-chandlery hardware.",
  "engineering-fabrication":
    "Tools, fasteners, hardware and industrial supplies.",
  construction: "Building materials, plumbing and sanitary accessories.",
};
function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export default function Home() {
  return (
    <main id="main" className="home-page tailwind-home enterprise-home">
      <HomeMotion />
      <section className="hero enterprise-hero" aria-labelledby="home-title">
        <img
          className="enterprise-hero-photo"
          src="/images/hero-marine.webp"
          alt=""
          width="1774"
          height="887"
          fetchPriority="high"
        />
        <div className="enterprise-hero-shade" aria-hidden="true" />
        <div className="enterprise-container">
          <div className="enterprise-hero-copy">
            <p className="enterprise-kicker enterprise-kicker-light">
              <span aria-hidden="true" />
              YUSUF AL YOUSFI · DEIRA, DUBAI
            </p>
            <h1 id="home-title">
              Marine hardware &amp;
              <br />
              building materials
              <br />
              <span>in Dubai.</span>
            </h1>
            <p className="enterprise-hero-intro">
              Strong foundations. Lasting connections. Explore marine locks,
              sanitary fittings and building materials for your next project.
            </p>
            <div className="enterprise-actions">
              <a className="enterprise-button" href="/shop/">
                Explore the catalogue <Arrow />
              </a>
              <a className="enterprise-hero-link" href="/contact-us/">
                Talk to our team <Arrow />
              </a>
            </div>
          </div>
          <div className="enterprise-hero-bottom">
            <p>
              <span className="enterprise-status" aria-hidden="true" />
              Supplying since 2004
            </p>
            <div className="enterprise-sector-links">
              {industries.map((i) => (
                <a key={i.slug} href={"#industry-" + i.slug}>
                  {i.name}
                  <Arrow diagonal />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="enterprise-brand-section"
        aria-labelledby="home-brands-heading"
      >
        <div className="enterprise-container">
          <div className="enterprise-section-top">
            <h2 id="home-brands-heading" className="enterprise-kicker">
              Our brands
            </h2>
            <a className="enterprise-link" href="/brands/">
              Discover all brands <Arrow />
            </a>
          </div>
          <div className="enterprise-brand-grid">
            {brands
              .filter((b) => brandLogos[b.slug])
              .map((b) => (
                <a
                  className="enterprise-brand"
                  href={"/brand/" + b.slug + "/"}
                  key={b.slug}
                  aria-label={
                    b.name +
                    (b.distributorNote ? " — " + b.distributorNote : "")
                  }
                >
                  <img
                    src={brandLogos[b.slug].src}
                    alt=""
                    width={brandLogos[b.slug].width}
                    height={brandLogos[b.slug].height}
                    loading="lazy"
                  />
                  <span>{b.name}</span>
                  {b.distributorNote && <small>{b.distributorNote}</small>}
                </a>
              ))}
          </div>
        </div>
      </section>

      <section
        className="enterprise-section enterprise-container"
        aria-labelledby="categories-heading"
      >
        <div className="enterprise-section-top" data-home-reveal>
          <div>
            <p className="enterprise-kicker">01 / FIND YOUR RANGE</p>
            <h2 id="categories-heading" className="enterprise-heading">
              The right materials.
              <br />
              <span>For the work ahead.</span>
            </h2>
          </div>
          <a className="enterprise-link" href="/categories/">
            Browse all categories <Arrow />
          </a>
        </div>
        <div className="enterprise-category-grid">
          {categories
            .filter((c) => categoryImages[c.slug])
            .map((c, index) => (
              <a
                className="enterprise-category"
                href={"/product-category/" + c.slug + "/"}
                key={c.slug}
                data-home-reveal
              >
                <div className="enterprise-category-art">
                  <span aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <img
                    src={categoryImages[c.slug].src}
                    alt=""
                    width={categoryImages[c.slug].width}
                    height={categoryImages[c.slug].height}
                    loading="lazy"
                  />
                </div>
                <div className="enterprise-category-label">
                  <h3>{c.name}</h3>
                  <span className="enterprise-round-arrow" aria-hidden="true">
                    <Arrow diagonal />
                  </span>
                </div>
              </a>
            ))}
        </div>
      </section>

      <section
        className="enterprise-product-section"
        aria-labelledby="selected-products-heading"
      >
        <div className="enterprise-container">
          <div className="enterprise-section-top" data-home-reveal>
            <div>
              <p className="enterprise-kicker">02 / PRODUCT SPOTLIGHT</p>
              <h2 id="selected-products-heading" className="enterprise-heading">
                A closer look
                <br />
                <span>at our catalogue.</span>
              </h2>
            </div>
            <p className="enterprise-section-note">
              Explore product details and model information, then speak directly
              with our team.
            </p>
          </div>
          <div className="enterprise-product-grid" data-product-spotlight>
            {selected.map((p) => (
              <Card key={p.slug} product={catalogueItem(p)} />
            ))}
          </div>
          <div className="enterprise-section-end">
            <a className="enterprise-link" href="/shop/">
              Find your product <Arrow />
            </a>
          </div>
        </div>
      </section>

      <section
        className="enterprise-section enterprise-container enterprise-welcome welcome-section"
        aria-labelledby="welcome-heading"
      >
        <figure className="enterprise-video" data-home-reveal data-video-card>
          <div className="enterprise-video-screen">
            <ScrollVideo src={welcome.video} poster={welcome.poster} />
          </div>
          <figcaption>
            <span>Our story, in motion.</span>
            <strong>
              Since 2004 <Arrow diagonal />
            </strong>
          </figcaption>
        </figure>
        <div data-home-reveal>
          <p className="enterprise-kicker">{welcome.heading}</p>
          <h2
            id="welcome-heading"
            className="enterprise-heading enterprise-welcome-title"
          >
            {welcome.title}
          </h2>
          <div className="enterprise-body">
            {welcome.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <a className="enterprise-link" href="/about-us/">
            Discover our company <Arrow />
          </a>
        </div>
      </section>

      <section
        className="enterprise-industry-section"
        aria-labelledby="industries-heading"
      >
        <div className="enterprise-container">
          <div className="enterprise-section-top" data-home-reveal>
            <div>
              <p className="enterprise-kicker">
                03 / BUILT AROUND YOUR INDUSTRY
              </p>
              <h2 id="industries-heading" className="enterprise-heading">
                Industries We Serve
              </h2>
            </div>
            <p className="enterprise-section-note">
              Comprehensive Solutions for a Wide Range of Industries
            </p>
          </div>
          <div className="enterprise-industry-grid" data-industry-grid>
            {industries.map((i, index) => (
              <article
                id={"industry-" + i.slug}
                className="enterprise-industry tw:group"
                key={i.slug}
                data-home-reveal
              >
                <div className="enterprise-industry-image">
                  <img
                    data-industry-image
                    src={i.src}
                    alt=""
                    width={i.width}
                    height={i.height}
                    loading="lazy"
                    className="tw:motion-safe:transition-transform tw:motion-safe:duration-400 tw:motion-safe:ease-out tw:motion-safe:group-hover:scale-[1.025]"
                  />
                </div>
                <div className="enterprise-industry-copy">
                  <span aria-hidden="true">0{index + 1}</span>
                  <div>
                    <h3>{i.name}</h3>
                    <p>{industryCopy[i.slug]}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="enterprise-marine-links">
            <span>Explore our specialist marine ranges</span>
            {brands
              .filter((b) => !brandLogos[b.slug])
              .map((b) => (
                <a
                  className="enterprise-link"
                  key={b.slug}
                  href={"/brand/" + b.slug + "/"}
                >
                  {b.name}
                  <Arrow diagonal />
                </a>
              ))}
          </div>
        </div>
      </section>

      <section
        className="enterprise-section enterprise-container"
        aria-labelledby="home-enquiry-heading"
      >
        <div className="enterprise-enquiry" data-home-reveal>
          <div>
            <p className="enterprise-kicker">LET’S TALK ABOUT YOUR PROJECT</p>
            <h2 id="home-enquiry-heading" className="enterprise-heading">
              Tell us what
              <br />
              <span>you’re working on.</span>
            </h2>
            <p>
              Share your product list, model numbers and requirements. Our team
              in Deira, Dubai is here to help.
            </p>
          </div>
          <div className="enterprise-enquiry-actions">
            <a className="enterprise-button" href="/contact-us/">
              Make an enquiry <Arrow />
            </a>
            <a className="enterprise-link" href={whatsapp()}>
              WhatsApp our team <Arrow />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
