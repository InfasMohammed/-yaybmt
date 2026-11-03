import "./tailwind-home.css";
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
        <img
          src="/images/hero-marine.webp"
          alt=""
          width="1774"
          height="887"
          fetchPriority="high"
          className="tw:absolute tw:inset-0 tw:-z-20 tw:h-full tw:w-full tw:object-cover tw:object-[62%_center]"
        />
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
                  aria-label={b.name}
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
        <div data-home-reveal className="tw:relative tw:min-w-0">
          <div className="tw:mb-4 tw:flex tw:items-center tw:gap-4">
            <span
              aria-hidden="true"
              className="tw:h-px tw:flex-1 tw:bg-[#d1d1c6]"
            />
            <span className="tw:text-[9px] tw:tracking-[0.16em] tw:text-muted">
              YUSUF AL YOUSFI / DUBAI
            </span>
          </div>
          <div className="tw:overflow-hidden tw:bg-ink tw:[&_video]:block tw:[&_video]:h-auto tw:[&_video]:w-full">
            <ScrollVideo src={welcome.video} poster={welcome.poster} />
          </div>
          <div className="tw:relative tw:ml-6 tw:-mt-5 tw:flex tw:items-center tw:gap-5 tw:border tw:border-solid tw:border-[#dedfd6] tw:bg-paper tw:px-6 tw:py-5 tw:sm:ml-12 tw:sm:gap-8">
            <strong className="tw:text-[48px] tw:leading-none tw:font-normal tw:tracking-[-3px] tw:text-copper-dark">
              2004
            </strong>
            <span className="tw:border-0 tw:border-l tw:border-solid tw:border-[#cecec2] tw:pl-5 tw:text-[11px] tw:leading-[1.8] tw:text-muted">
              Established in Dubai.
              <br />
              Built on lasting connections.
            </span>
          </div>
        </div>
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
              .map((c, index) => (
                <a
                  data-home-reveal
                  key={c.slug}
                  href={"/product-category/" + c.slug + "/"}
                  className="tw:group tw:flex tw:min-w-0 tw:flex-col tw:border tw:border-solid tw:border-transparent tw:bg-white tw:no-underline tw:hover:border-copper tw:hover:no-underline tw:motion-safe:transition-colors"
                >
                  <div className="tw:relative tw:flex tw:h-[170px] tw:items-center tw:justify-center tw:p-7 tw:sm:h-[215px]">
                    <span
                      aria-hidden="true"
                      className="tw:absolute tw:top-3 tw:left-4 tw:text-[9px] tw:text-muted"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <img
                      src={categoryImages[c.slug].src}
                      alt=""
                      width={categoryImages[c.slug].width}
                      height={categoryImages[c.slug].height}
                      loading="lazy"
                      className="tw:block tw:h-full tw:w-full tw:object-contain tw:motion-safe:transition-transform tw:motion-safe:duration-500 tw:motion-safe:group-hover:scale-105"
                    />
                  </div>
                  <div className="tw:flex tw:min-h-[76px] tw:flex-1 tw:items-center tw:justify-between tw:gap-3 tw:border-0 tw:border-t tw:border-solid tw:border-[#eeeee8] tw:px-4 tw:py-5 tw:sm:px-6">
                    <h3 className="tw:m-0 tw:text-[13px] tw:leading-normal tw:font-medium tw:sm:text-[15px]">
                      {c.name}
                    </h3>
                    <span className="tw:text-copper-dark">
                      <Arrow diagonal />
                    </span>
                  </div>
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
        className={container + " tw:py-20 tw:md:py-24"}
        aria-labelledby="industries-heading"
      >
        <div
          data-home-reveal
          className="tw:mb-10 tw:flex tw:flex-col tw:gap-6 tw:md:flex-row tw:md:items-end tw:md:justify-between"
        >
          <div>
            <p className={eyebrow + " tw:mb-4"}>02 / OUR EXPERTISE</p>
            <h2 id="industries-heading" className={heading}>
              Industries We Serve
            </h2>
          </div>
          <p className="tw:m-0 tw:max-w-[270px] tw:text-[14px] tw:leading-[1.8] tw:text-muted">
            Comprehensive Solutions for a Wide Range of Industries
          </p>
        </div>
        <div className="tw:grid tw:gap-5 tw:lg:grid-cols-2 tw:lg:grid-rows-2">
          {industries.map((i, index) => (
            <article
              data-home-reveal
              id={"industry-" + i.slug}
              key={i.slug}
              className={
                "tw:relative tw:isolate tw:flex tw:min-h-[300px] tw:scroll-mt-6 tw:flex-col tw:justify-end tw:overflow-hidden tw:bg-ink tw:p-7 tw:text-white " +
                (index === 0
                  ? "tw:lg:row-span-2 tw:lg:min-h-[570px]"
                  : "tw:lg:min-h-[275px]")
              }
            >
              <img
                src={i.src}
                alt=""
                width={i.width}
                height={i.height}
                loading="lazy"
                className="tw:absolute tw:inset-0 tw:-z-20 tw:h-full tw:w-full tw:object-cover"
              />
              <div
                aria-hidden="true"
                className="tw:absolute tw:inset-0 tw:-z-10 tw:bg-[linear-gradient(0deg,rgba(17,25,24,0.95),rgba(17,25,24,0.1))]"
              />
              <span
                aria-hidden="true"
                className="tw:absolute tw:top-6 tw:left-7 tw:text-[11px] tw:tracking-wide tw:text-white/80"
              >
                0{index + 1} / INDUSTRY
              </span>
              <h3 className="tw:mt-0 tw:mb-3 tw:text-[28px] tw:leading-tight tw:font-medium tw:tracking-[-0.7px]">
                {i.name}
              </h3>
              <p className="tw:m-0 tw:max-w-[340px] tw:text-[13px] tw:leading-[1.8] tw:text-white/85">
                {industryCopy[i.slug]}
              </p>
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
        className="tw:relative tw:isolate tw:overflow-hidden tw:bg-ink tw:py-20 tw:text-white tw:md:py-24"
        aria-labelledby="home-enquiry-heading"
      >
        <div
          aria-hidden="true"
          className="tw:pointer-events-none tw:absolute tw:-top-40 tw:-right-32 tw:-z-10 tw:h-[500px] tw:w-[500px] tw:rounded-full tw:border tw:border-solid tw:border-white/10"
        />
        <div
          data-home-reveal
          className={
            container +
            " tw:grid tw:gap-9 tw:lg:grid-cols-[1fr_420px] tw:lg:items-center tw:lg:gap-20"
          }
        >
          <div>
            <p className="tw:mt-0 tw:mb-5 tw:text-[10px] tw:font-bold tw:tracking-[0.2em] tw:text-copper-light">
              LET’S TALK ABOUT YOUR PROJECT
            </p>
            <h2
              id="home-enquiry-heading"
              className={heading + " tw:md:text-[54px]"}
            >
              Your requirements.
              <br />
              <span className="tw:font-normal tw:text-copper-light">
                Our next conversation.
              </span>
            </h2>
          </div>
          <div>
            <p className="tw:mt-0 tw:mb-6 tw:text-[14px] tw:leading-[1.9] tw:text-white/75">
              Share your product list, model numbers and project requirements
              with our team in Deira, Dubai.
            </p>
            <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-x-6 tw:gap-y-3">
              <a className={button} href="/contact-us/">
                Make an enquiry <Arrow />
              </a>
              <a
                href={whatsapp()}
                className="tw:inline-flex tw:min-h-11 tw:items-center tw:gap-3 tw:text-[12px] tw:font-semibold tw:text-white"
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
