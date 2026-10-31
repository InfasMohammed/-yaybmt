import { metadata as meta, whatsapp } from "../../../lib/site";
export const metadata = meta(
  "Marine locks",
  "Contact YAYBMT about marine locks. Catalogue migration pending.",
  "/brand/marine-locks/",
);
export default function Page() {
  return (
    <main id="main" className="page intro">
      <p className="eyebrow">CATALOGUE MIGRATION</p>
      <h1>Marine locks</h1>
      <p>
        This established brand URL is preserved. Its product records await the
        database export and are not included in this sample.
      </p>
      <a className="button" href={whatsapp("marine locks")}>
        Enquire about marine locks +
      </a>
      <p>
        <a href="/shop/">View the catalogue sample +</a>
      </p>
    </main>
  );
}
