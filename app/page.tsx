import { industries } from "../data/industries";
import BrandLogo from "../components/BrandLogo";
import { sourcePages } from "../data/source-pages";
import { brands } from "../data/brands";
import { categories } from "../data/categories";
import { metadata as meta } from "../lib/site";
const source = sourcePages.find((p) => p.path === "/")!;
export const metadata = meta(
  source.seo.title || "Building materials, connected",
  source.seo.description || "Building materials enquiries in Deira, Dubai.",
  "/",
);
export default function Home() {
  return (
    <main id="main">
      <link
        rel="preload"
        as="image"
        href="/images/hero-marine.webp"
        fetchPriority="high"
      />
      <section className="hero">
        <div>
          <p className="eyebrow">DEIRA, DUBAI · YUSUF AL YOUSFI</p>
          <h1>
            Strong foundations.
            <br />
            <em>Lasting connections.</em>
          </h1>
          <p>
            Explore building materials, sanitary fittings and marine hardware.
            Find your product. Speak to our team.
          </p>
          <a className="button" href="/shop/">
            Explore the catalogue
          </a>
        </div>
      </section>
      <section className="intro">
        <p className="eyebrow">A NEW WAY TO EXPLORE</p>
        <h2>Built around your next project.</h2>
        <p>
          Browse the imported catalogue by brand, category or model. Contact our
          team to confirm specifications and discuss your requirements.
        </p>
        <a href="/brand/daelim/">Discover the DAELIM range +</a>
      </section>
      <section
        className="home-section industries-section"
        aria-labelledby="industries-heading"
      >
        <p className="eyebrow">OUR EXPERTISE</p>
        <h2 id="industries-heading">Industries We Serve</h2>
        <p className="industries-subtitle">
          Comprehensive Solutions for a Wide Range of Industries
        </p>
        <div className="industry-grid">
          {industries.map((industry) => (
            <article className="industry-card" key={industry.slug}>
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
              <h3>{industry.name}</h3>
            </article>
          ))}
        </div>
      </section>
      <section className="home-section">
        <p className="eyebrow">PRODUCT RANGES</p>
        <h2>Explore by category.</h2>
        <div className="directory">
          {categories
            .filter((c) => !c.slug.includes("/") && c.slug !== "uncategorized")
            .map((c) => (
              <a href={"/product-category/" + c.slug + "/"} key={c.slug}>
                {c.name}
                <span aria-hidden="true">+</span>
              </a>
            ))}
        </div>
      </section>
      <section className="home-section">
        <p className="eyebrow">BRANDS</p>
        <h2>Find your brand.</h2>
        <div className="directory">
          {brands.map((b) => (
            <a
              className="brand-directory-card"
              href={"/brand/" + b.slug + "/"}
              key={b.slug}
            >
              <BrandLogo slug={b.slug} />
              {b.name}
              <span aria-hidden="true">+</span>
            </a>
          ))}
        </div>
      </section>
      <section className="intro" id="company">
        <p className="eyebrow">YUSUF AL YOUSFI</p>
        <h2>Building materials in Deira, Dubai.</h2>
        <p>
          Share your product list, model numbers and project requirements with
          our team.
        </p>
        <a href="/about-us/">Our company +</a>
      </section>
    </main>
  );
}
