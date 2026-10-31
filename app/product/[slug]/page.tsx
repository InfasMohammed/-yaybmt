import { notFound } from "next/navigation";
import { products } from "../../../data/products";
import Card, { Placeholder } from "../../../components/Card";
import { metadata as meta, email, whatsapp } from "../../../lib/site";
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = products.find((p) => p.slug === slug);
  return p
    ? meta(
        p.name,
        "Enquire about " + p.name + " at YAYBMT, Deira, Dubai.",
        "/product/" + p.slug + "/",
      )
    : {};
}
export default async function Product({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = products.find((p) => p.slug === slug);
  if (!p) notFound();
  return (
    <main id="main" className="page">
      <div className="breadcrumb">
        <a href="/">Home</a> / <a href="/shop/">Catalogue</a> / {p.model}
      </div>
      <div className="product-layout">
        <section aria-label="Product gallery">
          <div className="gallery">
            <Placeholder />
          </div>
          <p className="caption">
            Original product photography has not been supplied.
          </p>
          <details>
            <summary>About this gallery</summary>
            <p>
              No substitute or generated product photos are used. Original
              images will be matched using database attachment references.
            </p>
          </details>
        </section>
        <section>
          <p className="eyebrow">DAELIM / PRODUCT SAMPLE</p>
          <h1>{p.name}</h1>
          <p className="model">MODEL {p.model}</p>
          <p className="product-copy">
            For product details and suitability for your project, speak directly
            with our team in Deira, Dubai.
          </p>
          <a className="button" href={email(p.name + " (" + p.model + ")")}>
            Enquire by email +
          </a>
          <a
            className="button outline"
            href={whatsapp(p.name + " (" + p.model + ")")}
          >
            Enquire on WhatsApp +
          </a>
          <p className="muted">
            Confirm specifications, pricing and availability with our team.
          </p>
          <details open>
            <summary>Product information</summary>
            <dl>
              <dt>Brand</dt>
              <dd>DAELIM</dd>
              <dt>Model reference</dt>
              <dd>{p.model}</dd>
            </dl>
          </details>
          <details open>
            <summary>Specifications</summary>
            <p>
              Technical specifications are not available in the repository.
              Verified dimensions, material, finish and installation information
              are pending the original product data.
            </p>
          </details>
          <p className="notice">
            Sample record from the previous public project preview. No
            specifications, prices or availability have been inferred from its
            title.
          </p>
        </section>
      </div>
      <section className="related">
        <p className="eyebrow">CONTINUE EXPLORING</p>
        <h2>More from DAELIM</h2>
        <p>Related by brand only.</p>
        <div className="grid">
          {products
            .filter((x) => x.slug !== p.slug)
            .slice(0, 3)
            .map((x) => (
              <Card key={x.slug} product={x} />
            ))}
        </div>
      </section>
    </main>
  );
}
