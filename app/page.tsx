import "./tailwind-home.css";
import LiquidSculptureHero from "../components/ui/liquid-sculpture-hero";
import HomeMotion from "../components/HomeMotion";
import ScrollVideo from "../components/ScrollVideo";
import { brandLogos } from "../data/brand-logos";
import { brands } from "../data/brands";
import { categories } from "../data/categories";
import { categoryImages } from "../data/category-images";
import { industries } from "../data/industries";
import { sourcePages } from "../data/source-pages";
import { welcome } from "../data/welcome";
import { metadata as meta, whatsapp } from "../lib/site";

const source = sourcePages.find((p) => p.path === "/")!;
export const metadata = meta(
  source.seo.title || "Building materials, connected",
  source.seo.description || "Building materials enquiries in Deira, Dubai.",
  "/",
);
const container = "tw:mx-auto tw:w-full tw:max-w-[1328px] tw:px-6";
const eyebrow =
  "tw:m-0 tw:text-[10px] tw:font-bold tw:tracking-[0.2em] tw:uppercase tw:text-copper-dark";
const heading =
  "tw:m-0 tw:text-[34px] tw:leading-[1.1] tw:font-semibold tw:tracking-[-1.5px] tw:md:text-[48px]";
const button =
  "tw:inline-flex tw:min-h-12 tw:items-center tw:justify-between tw:gap-8 tw:border tw:border-solid tw:border-copper tw:bg-copper tw:px-6 tw:py-3.5 tw:text-[13px] tw:font-bold tw:text-white tw:no-underline tw:hover:bg-copper-dark tw:hover:no-underline tw:motion-safe:transition-colors";
const link =
  "tw:inline-flex tw:min-h-11 tw:items-center tw:gap-5 tw:text-[13px] tw:font-bold tw:text-copper-dark tw:no-underline tw:hover:underline tw:underline-offset-4";
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
      className="tw:shrink-0"
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
    <main
      id="main"
      className="home-page tailwind-home tw:bg-paper tw:font-sans tw:text-ink"
    >
      <HomeMotion />
      <section
        className="hero tw:relative tw:isolate tw:flex tw:min-h-[790px] tw:flex-col tw:justify-end tw:bg-ink tw:bg-none tw:px-0 tw:pt-[220px] tw:pb-28 tw:text-white tw:md:min-h-[800px] tw:md:pt-[210px] tw:md:pb-36"
        aria-labelledby="home-title"
      >
        <LiquidSculptureHero />
        <div
          aria-hidden="true"
          className="tw:absolute tw:inset-0 tw:-z-10 tw:bg-[linear-gradient(90deg,rgba(17,25,24,0.96)_0%,rgba(17,25,24,0.73)_50%,rgba(17,25,24,0.2)_100%)]"
        />
        <div className={container}>
          <div className="tw:grid tw:gap-12 tw:lg:grid-cols-[1fr_250px] tw:lg:items-end">
            <div>
              <p className="tw:m-0 tw:flex tw:items-center tw:gap-3 tw:text-[10px] tw:font-bold tw:tracking-[0.22em] tw:text-copper-light">
                <span
                  aria-hidden="true"
                  className="tw:h-px tw:w-8 tw:bg-copper-light"
                />
                DEIRA, DUBAI · SINCE 2004
              </p>
              <h1
                id="home-title"
                className="tw:my-7 tw:text-[clamp(38px,5.5vw,80px)] tw:leading-[1.02] tw:font-bold tw:tracking-[-2px] tw:md:tracking-[-3.5px]"
              >
                Strong foundations.
                <br />
                <span className="tw:font-normal tw:text-copper-light">
                  Lasting connections.
                </span>
              </h1>
              <p className="tw:mt-0 tw:mb-8 tw:max-w-[435px] tw:text-[15px] tw:leading-[1.85] tw:text-white/80">
                Explore building materials, sanitary fittings and marine
                hardware. Find your product. Speak to our team.
              </p>
              <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-x-7 tw:gap-y-3">
                <a className={button} href="/shop/">
                  Explore the catalogue <Arrow />
                </a>
                <a
                  href="/contact-us/"
                  className="tw:inline-flex tw:min-h-11 tw:items-center tw:gap-4 tw:text-[13px] tw:font-semibold tw:text-white"
                >
                  Talk to our team <Arrow />
                </a>
              </div>
            </div>
            <div className="tw:hidden tw:border-0 tw:border-l tw:border-solid tw:border-white/25 tw:pl-7 tw:lg:block">
              <p className="tw:mt-0 tw:mb-6 tw:text-[9px] tw:tracking-[0.2em] tw:text-white/60">
                BUILT AROUND YOUR INDUSTRY
              </p>
              {industries.map((i, index) => (
                <a
                  key={i.slug}
                  href={"#industry-" + i.slug}
                  className="tw:flex tw:items-center tw:gap-4 tw:border-0 tw:border-b tw:border-solid tw:border-white/20 tw:py-4 tw:text-[14px] tw:text-white tw:no-underline tw:hover:text-copper-light tw:hover:no-underline"
                >
                  <span className="tw:text-[10px] tw:text-copper-light">
                    0{index + 1}
                  </span>
                  <span className="tw:flex-1">{i.name}</span>
                  <Arrow diagonal />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section
        aria-labelledby="home-brands-heading"
        className={container + " tw:relative tw:z-1 tw:-mt-12"}
      >
        <div className="tw:border tw:border-solid tw:border-[#dedfd6] tw:bg-white tw:px-6 tw:py-7 tw:shadow-[0_16px_45px_-30px_rgba(37,40,39,0.3)] tw:md:px-9">
          <div className="tw:mb-6 tw:flex tw:items-center tw:justify-between tw:gap-5">
            <h2
              id="home-brands-heading"
              className="tw:m-0 tw:text-[10px] tw:font-bold tw:tracking-[0.18em] tw:uppercase"
            >
              Explore our brands
            </h2>
            <a
              href="/brands/"
              className="tw:inline-flex tw:min-h-8 tw:items-center tw:gap-3 tw:text-[11px] tw:text-muted"
            >
              View all <Arrow />
            </a>
          </div>
          <div className="tw:grid tw:grid-cols-2 tw:gap-x-5 tw:gap-y-6 tw:sm:grid-cols-4 tw:lg:grid-cols-7">
            {brands
              .filter((b) => brandLogos[b.slug])
              .map((b) => (
                <a
                  href={"/brand/" + b.slug + "/"}
                  key={b.slug}
                  aria-label={
                    b.name +
                    (b.distributorNote ? " — " + b.distributorNote : "")
                  }
                  className="tw:group tw:flex tw:min-h-20 tw:flex-col tw:items-center tw:justify-center tw:gap-3 tw:border-0 tw:border-l tw:border-solid tw:border-[#eeeee8] tw:px-3 tw:py-1 tw:text-center tw:no-underline tw:hover:no-underline"
                >
                  <img
                    src={brandLogos[b.slug].src}
                    alt=""
                    width={brandLogos[b.slug].width}
                    height={brandLogos[b.slug].height}
                    loading="lazy"
                    className="tw:h-12 tw:w-full tw:max-w-[115px] tw:object-contain tw:motion-safe:transition-transform tw:motion-safe:group-hover:scale-105"
                  />
                  <span className="tw:text-[9px] tw:tracking-wide tw:text-muted">
                    {b.name}
                  </span>
                  {b.distributorNote && (
                    <span className="tw:text-[10px] tw:leading-relaxed tw:text-muted">
                      {b.distributorNote}
                    </span>
                  )}
                </a>
              ))}
          </div>
        </div>
      </section>
      <section
        className={
          container +
          " welcome-section tw:grid tw:grid-cols-1 tw:gap-12 tw:py-20 tw:lg:grid-cols-2 tw:lg:items-center tw:lg:gap-20 tw:lg:py-28"
        }
        aria-labelledby="welcome-heading"
      >
        <figure
          data-home-reveal
          data-video-card
          className="tw:m-0 tw:min-w-0 tw:overflow-hidden tw:rounded-2xl tw:border tw:border-solid tw:border-[#dedfd6] tw:bg-white tw:p-3 tw:shadow-[0_16px_40px_-28px_rgba(37,40,39,0.35)] tw:sm:p-4"
        >
          <div className="tw:flex tw:items-center tw:justify-between tw:gap-4 tw:px-2 tw:pt-1 tw:pb-4">
            <span className="tw:text-[9px] tw:font-bold tw:tracking-[0.15em] tw:text-muted">
              YUSUF AL YOUSFI / DUBAI
            </span>
            <span
              aria-hidden="true"
              className="tw:h-1.5 tw:w-1.5 tw:shrink-0 tw:rounded-full tw:bg-copper"
            />
          </div>
          <div className="tw:aspect-video tw:overflow-hidden tw:rounded-xl tw:bg-ink tw:[&_video]:block tw:[&_video]:h-full tw:[&_video]:w-full tw:[&_video]:object-contain">
            <ScrollVideo src={welcome.video} poster={welcome.poster} />
          </div>
          <figcaption className="tw:flex tw:items-center tw:gap-5 tw:px-2 tw:pt-5 tw:pb-2 tw:sm:gap-7">
            <strong className="tw:text-[42px] tw:leading-none tw:font-normal tw:tracking-[-2px] tw:text-copper-dark">
              2004
            </strong>
            <span className="tw:border-0 tw:border-l tw:border-solid tw:border-[#dedfd6] tw:pl-5 tw:text-[11px] tw:leading-[1.8] tw:text-muted">
              Established in Dubai.
              <br />
              Built on lasting connections.
            </span>
          </figcaption>
        </figure>
        <div data-home-reveal className="tw:min-w-0">
          <p className={eyebrow}>{welcome.heading}</p>
          <h2
            id="welcome-heading"
            className="tw:mt-5 tw:mb-6 tw:text-[32px] tw:leading-[1.13] tw:font-semibold tw:tracking-[-1.3px] tw:md:text-[40px]"
          >
            {welcome.title}
          </h2>
          <div className="tw:space-y-4 tw:text-[13px] tw:leading-[1.85] tw:text-muted">
            {welcome.paragraphs.map((p) => (
              <p key={p} className="tw:mt-0 tw:mb-4 tw:last:mb-0">
                {p}
              </p>
            ))}
          </div>
          <a href="/about-us/" className={link + " tw:mt-5"}>
            Discover our company <Arrow />
          </a>
        </div>
      </section>
      <section
        className="tw:bg-[#eeeee7] tw:py-20 tw:md:py-24"
        aria-labelledby="ranges-heading"
      >
        <div className={container}>
          <div
            data-home-reveal
            className="tw:mb-10 tw:flex tw:flex-col tw:gap-6 tw:md:flex-row tw:md:items-end tw:md:justify-between"
          >
            <div>
              <p className={eyebrow + " tw:mb-4"}>01 / PRODUCT RANGES</p>
              <h2 id="ranges-heading" className={heading}>
                Every detail.
                <br />
                <span className="tw:font-normal tw:text-muted">
                  Every requirement.
                </span>
              </h2>
            </div>
            <a className={link} href="/categories/">
              Browse all categories <Arrow />
            </a>
          </div>
          <div
            className="tw:grid tw:grid-cols-1 tw:gap-4 tw:min-[360px]:grid-cols-2 tw:lg:grid-cols-3 tw:lg:gap-6"
            data-category-grid
          >
            {categories
              .filter((c) => Boolean(categoryImages[c.slug]))
              .map((c) => (
                <a
                  data-home-reveal
                  key={c.slug}
                  href={"/product-category/" + c.slug + "/"}
                  className="tw:group tw:flex tw:min-w-0 tw:flex-col tw:overflow-hidden tw:rounded-2xl tw:border tw:border-solid tw:border-[#ddded5] tw:bg-white tw:p-4 tw:no-underline tw:hover:border-copper tw:hover:no-underline tw:motion-safe:transition-[border-color,box-shadow] tw:motion-safe:duration-300 tw:motion-safe:hover:shadow-[0_18px_40px_-25px_rgba(100,66,45,0.3)] tw:sm:p-6"
                >
                  <span className="tw:min-h-[80px] tw:pt-1 tw:text-[14px] tw:leading-snug tw:font-semibold tw:text-ink tw:sm:min-h-[56px] tw:sm:text-[18px]">
                    {c.name}
                  </span>
                  <span className="tw:flex tw:h-[130px] tw:items-center tw:justify-center tw:px-1 tw:py-3 tw:sm:h-[180px] tw:sm:px-4">
                    <img
                      src={categoryImages[c.slug].src}
                      alt=""
                      width={categoryImages[c.slug].width}
                      height={categoryImages[c.slug].height}
                      loading="lazy"
                      className="tw:block tw:h-full tw:w-full tw:object-contain tw:motion-safe:transition-transform tw:motion-safe:duration-500 tw:motion-safe:group-hover:scale-105"
                    />
                  </span>
                  <span
                    aria-hidden="true"
                    className="tw:mt-auto tw:flex tw:items-center tw:justify-between tw:gap-3 tw:pt-3 tw:text-[10px] tw:font-medium tw:tracking-wide tw:text-muted"
                  >
                    <span>Explore range</span>
                    <span className="tw:flex tw:h-8 tw:w-8 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-full tw:border tw:border-solid tw:border-[#e2d8cd] tw:bg-paper tw:text-copper-dark tw:group-hover:border-copper tw:group-hover:bg-copper tw:group-hover:text-white tw:motion-safe:transition-colors tw:sm:h-10 tw:sm:w-10">
                      <Arrow diagonal />
                    </span>
                  </span>
                </a>
              ))}
          </div>
          <div className="tw:mt-8 tw:flex tw:flex-wrap tw:items-center tw:justify-between tw:gap-x-8 tw:gap-y-2 tw:border-0 tw:border-t tw:border-solid tw:border-[#d1d1c6] tw:pt-5">
            <p className="tw:m-0 tw:text-[13px] tw:text-muted">
              Looking for a particular product or model?
            </p>
            <a className={link} href="/shop/">
              Search the catalogue <Arrow />
            </a>
          </div>
        </div>
      </section>
      <section
        className={container + " tw:py-14 tw:md:py-16"}
        aria-labelledby="industries-heading"
      >
        <div
          data-home-reveal
          className="tw:mb-10 tw:flex tw:flex-col tw:gap-6 tw:md:flex-row tw:md:items-end tw:md:justify-between"
        >
          <div>
            <p className={eyebrow + " tw:mb-4"}>02 / OUR EXPERTISE</p>
            <h2
              id="industries-heading"
              className={heading.replace(
                "tw:md:text-[48px]",
                "tw:md:text-[36px]",
              )}
            >
              Industries We Serve
            </h2>
          </div>
          <p className="tw:m-0 tw:max-w-[270px] tw:text-[14px] tw:leading-[1.8] tw:text-muted">
            Comprehensive Solutions for a Wide Range of Industries
          </p>
        </div>
        <div className="tw:grid tw:gap-5 tw:md:grid-cols-3" data-industry-grid>
          {industries.map((i, index) => (
            <article
              data-home-reveal
              id={"industry-" + i.slug}
              key={i.slug}
              className="tw:group tw:min-w-0 tw:scroll-mt-6 tw:overflow-hidden tw:rounded-xl tw:border tw:border-solid tw:border-[#dedfd6] tw:bg-white"
            >
              <div className="tw:aspect-[3/2] tw:w-full tw:overflow-hidden tw:bg-[#eeeee7]">
                <img
                  data-industry-image
                  src={i.src}
                  alt=""
                  width={i.width}
                  height={i.height}
                  loading="lazy"
                  className="tw:block tw:h-full tw:w-full tw:max-w-none tw:object-cover tw:motion-safe:transition-transform tw:motion-safe:duration-700 tw:motion-safe:ease-out tw:motion-safe:group-hover:scale-[1.04]"
                />
              </div>
              <div className="tw:p-5">
                <span
                  aria-hidden="true"
                  className="tw:text-[9px] tw:tracking-[0.12em] tw:text-copper-dark"
                >
                  0{index + 1} / INDUSTRY
                </span>
                <h3 className="tw:mt-2 tw:mb-3 tw:text-[20px] tw:leading-tight tw:font-semibold tw:tracking-[-0.4px]">
                  {i.name}
                </h3>
                <p className="tw:m-0 tw:text-[12px] tw:leading-[1.8] tw:text-muted">
                  {industryCopy[i.slug]}
                </p>
              </div>
            </article>
          ))}
        </div>
        <div className="tw:mt-7 tw:flex tw:flex-wrap tw:items-center tw:justify-between tw:gap-4">
          <p className="tw:m-0 tw:text-[13px] tw:text-muted">
            Explore our specialist marine ranges.
          </p>
          <div className="tw:flex tw:flex-wrap tw:gap-x-7 tw:gap-y-1">
            {brands
              .filter((b) => !brandLogos[b.slug])
              .map((b) => (
                <a
                  href={"/brand/" + b.slug + "/"}
                  key={b.slug}
                  className={link + " tw:text-[11px]"}
                >
                  {b.name}
                  <Arrow />
                </a>
              ))}
          </div>
        </div>
      </section>
      <section
        className="tw:relative tw:isolate tw:overflow-hidden tw:border-0 tw:border-y tw:border-solid tw:border-[#dedfd6] tw:bg-sand tw:py-14 tw:text-ink tw:md:py-16"
        aria-labelledby="home-enquiry-heading"
      >
        <div
          aria-hidden="true"
          className="tw:pointer-events-none tw:absolute tw:-top-40 tw:-right-32 tw:-z-10 tw:h-[500px] tw:w-[500px] tw:rounded-full tw:border tw:border-solid tw:border-copper/15"
        />
        <div
          data-home-reveal
          className={
            container +
            " tw:grid tw:gap-9 tw:lg:grid-cols-[1fr_420px] tw:lg:items-center tw:lg:gap-20"
          }
        >
          <div>
            <p className="tw:mt-0 tw:mb-5 tw:text-[10px] tw:font-bold tw:tracking-[0.2em] tw:text-copper-dark">
              LET’S TALK ABOUT YOUR PROJECT
            </p>
            <h2
              id="home-enquiry-heading"
              className={heading.replace(
                "tw:md:text-[48px]",
                "tw:md:text-[42px]",
              )}
            >
              Your requirements.
              <br />
              <span className="tw:font-normal tw:text-copper-dark">
                Our next conversation.
              </span>
            </h2>
          </div>
          <div>
            <p className="tw:mt-0 tw:mb-6 tw:text-[14px] tw:leading-[1.9] tw:text-muted">
              Share your product list, model numbers and project requirements
              with our team in Deira, Dubai.
            </p>
            <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-x-6 tw:gap-y-3">
              <a className={button} href="/contact-us/">
                Make an enquiry <Arrow />
              </a>
              <a
                href={whatsapp()}
                className="tw:inline-flex tw:min-h-11 tw:items-center tw:gap-3 tw:text-[12px] tw:font-semibold tw:text-copper-dark"
              >
                WhatsApp our team <Arrow />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
