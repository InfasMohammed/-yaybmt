import "./home.css";
import { categoryImages } from "../data/category-images";
import WelcomeSection from "../components/WelcomeSection";
import HomeMotion from "../components/HomeMotion";
import HomeArrow from "../components/HomeArrow";
import { industries } from "../data/industries";
import BrandLogo from "../components/BrandLogo";
import { brandLogos } from "../data/brand-logos";
import { sourcePages } from "../data/source-pages";
import { brands } from "../data/brands";
import { categories } from "../data/categories";
import { metadata as meta, whatsapp } from "../lib/site";
const source = sourcePages.find((p) => p.path === "/")!;
export const metadata = meta(
  source.seo.title || "Building materials, connected",
  source.seo.description || "Building materials enquiries in Deira, Dubai.",
  "/",
);
const industryCopy: Record<string, string> = {
  marine: "Marine locks, sanitary ware and ship-chandlery hardware.",
  "engineering-fabrication":
    "Tools, fasteners, hardware and industrial supplies.",
  construction: "Building materials, plumbing and sanitary accessories.",
};
export default function Home() {
  return (
    <main id="main" className="home-page enterprise-home">
      <HomeMotion />
      <link
        rel="preload"
        as="image"
        href="/images/hero-marine.webp"
        fetchPriority="high"
      />
      <section className="hero" aria-labelledby="home-title">
        <div className="hero-content">
          <p className="eyebrow">
            <span className="home-marker" aria-hidden="true" />
            DEIRA, DUBAI · SINCE 2004
          </p>
          <h1 id="home-title">
            Strong foundations.
            <br />
            <em>Lasting connections.</em>
          </h1>
          <p>
            Explore building materials, sanitary fittings and marine hardware.
            Find your product. Speak to our team.
          </p>
          <div className="home-actions">
            <a className="button" href="/shop/">
              Explore the catalogue <HomeArrow />
            </a>
            <a className="hero-secondary" href="/contact-us/">
              Discuss your requirements <HomeArrow />
            </a>
          </div>
        </div>
        <div className="hero-footnote">
          <span>
            YUSUF AL YOUSFI
            <br />
            <strong>Building Materials Trading LLC</strong>
          </span>
          <a href="#explore">
            Explore what we do{" "}
            <span className="hero-down" aria-hidden="true">
              ↓
            </span>
          </a>
        </div>
      </section>
      <div className="home-sector-bar" aria-label="Our areas of expertise">
        {industries.map((industry, index) => (
          <a key={industry.slug} href={"#industry-" + industry.slug}>
            <span className="home-index">0{index + 1}</span>
            <span>{industry.name}</span>
            <HomeArrow />
          </a>
        ))}
      </div>
      <WelcomeSection />
      <section
        className="home-section home-ranges"
        id="explore"
        aria-labelledby="ranges-heading"
      >
        <div className="home-section-heading" data-home-reveal>
          <div>
            <p className="eyebrow">01 / THE CATALOGUE</p>
            <h2 id="ranges-heading">
              The right detail.
              <br />
              <em>For every requirement.</em>
            </h2>
          </div>
          <div className="home-heading-aside">
            <p>
              Explore by category, from marine furniture fittings to the
              essentials for your next project.
            </p>
            <a className="home-link" href="/categories/">
              Browse all categories <HomeArrow />
            </a>
          </div>
        </div>
        <div className="directory category-directory">
          {categories
            .filter((c) => Boolean(categoryImages[c.slug]))
            .map((c, index) => (
              <a href={"/product-category/" + c.slug + "/"} key={c.slug}>
                <span className="category-card-image">
                  <span className="category-number" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <img
                    src={categoryImages[c.slug].src}
                    alt=""
                    width={categoryImages[c.slug].width}
                    height={categoryImages[c.slug].height}
                    loading="lazy"
                    decoding="async"
                  />
                </span>
                <span className="category-card-name">
                  {c.name}
                  <HomeArrow />
                </span>
              </a>
            ))}
        </div>
        <div className="home-catalogue-note">
          <p>Looking for a particular model?</p>
          <a className="home-link" href="/shop/">
            Search the full catalogue <HomeArrow />
          </a>
        </div>
      </section>
      <section className="home-industries" aria-labelledby="industries-heading">
        <div className="home-section">
          <div className="home-section-heading" data-home-reveal>
            <div>
              <p className="eyebrow">02 / OUR EXPERTISE</p>
              <h2 id="industries-heading">Industries We Serve</h2>
            </div>
            <p className="industries-subtitle">
              Comprehensive Solutions for a Wide Range of Industries
            </p>
          </div>
          <div className="industry-grid">
            {industries.map((industry, index) => (
              <article
                className="industry-card"
                id={"industry-" + industry.slug}
                key={industry.slug}
              >
                <div className="industry-image">
                  <img
                    src={industry.src}
                    alt=""
                    width={industry.width}
                    height={industry.height}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <span className="industry-number" aria-hidden="true">
                  0{index + 1}
                </span>
                <div className="industry-caption">
                  <h3>{industry.name}</h3>
                  <p>{industryCopy[industry.slug]}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="home-industry-bottom">
            <p>Marine. Engineering. Construction.</p>
            <a className="home-link" href="/contact-us/">
              Talk to our team <HomeArrow />
            </a>
          </div>
        </div>
      </section>
      <section
        className="home-section home-brands"
        aria-labelledby="brands-heading"
      >
        <div className="home-section-heading" data-home-reveal>
          <div>
            <p className="eyebrow">03 / OUR BRANDS</p>
            <h2 id="brands-heading">
              Names you know.
              <br />
              <em>Details you can explore.</em>
            </h2>
          </div>
          <a className="home-link" href="/brands/">
            Browse all brands <HomeArrow />
          </a>
        </div>
        <div className="directory home-brand-grid">
          {brands
            .filter((b) => brandLogos[b.slug])
            .map((b) => (
              <a
                className="brand-directory-card"
                href={"/brand/" + b.slug + "/"}
                key={b.slug}
              >
                <BrandLogo slug={b.slug} />
                <span className="home-brand-name">
                  {b.name}
                  <HomeArrow />
                </span>
              </a>
            ))}
        </div>
        <div className="home-specialist-brands">
          <span>Explore our marine ranges</span>
          {brands
            .filter((b) => !brandLogos[b.slug])
            .map((b) => (
              <a href={"/brand/" + b.slug + "/"} key={b.slug}>
                {b.name}
                <HomeArrow />
              </a>
            ))}
        </div>
      </section>
      <section className="home-enquiry" aria-labelledby="home-enquiry-heading">
        <div className="home-enquiry-inner" data-home-reveal>
          <div>
            <p className="eyebrow">LET’S TALK ABOUT YOUR PROJECT</p>
            <h2 id="home-enquiry-heading">
              Your requirements.
              <br />
              <em>Our next conversation.</em>
            </h2>
          </div>
          <div className="home-enquiry-copy">
            <p>
              Share your product list, model numbers and project requirements
              with our team in Deira, Dubai.
            </p>
            <div className="home-actions">
              <a className="button" href="/contact-us/">
                Make an enquiry <HomeArrow />
              </a>
              <a className="home-link" href={whatsapp()}>
                WhatsApp our team <HomeArrow />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
