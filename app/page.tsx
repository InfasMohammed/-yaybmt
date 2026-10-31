import { metadata as meta } from "../lib/site";
export const metadata = meta(
  "Building materials, connected",
  "Building materials and marine fittings enquiries in Deira, Dubai.",
  "/",
);
export default function Home() {
  return (
    <main id="main">
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
            Explore the catalogue +
          </a>
        </div>
        <small>Illustrative marine image from the previous design</small>
      </section>
      <section className="intro">
        <p className="eyebrow">A NEW WAY TO EXPLORE</p>
        <h2>Built around your next project.</h2>
        <p>
          Review our new catalogue and product detail experience. This sample
          uses existing public project records; the complete catalogue and
          original photography are pending migration.
        </p>
        <a href="/brand/daelim/">Discover the DAELIM sample +</a>
      </section>
    </main>
  );
}
