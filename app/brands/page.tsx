import BrandLogo from "../../components/BrandLogo";
import Breadcrumbs from "../../components/Breadcrumbs";
import { brands } from "../../data/brands";
import { metadata as meta } from "../../lib/site";
export const metadata = meta(
  "Browse brands",
  "Explore brand catalogue information and enquiries at YAYBMT, Deira, Dubai.",
  "/brands/",
);
export default function Page() {
  return (
    <main id="main" className="page">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Brands", path: "/brands/" },
        ]}
      />
      <p className="eyebrow">EXPLORE THE CATALOGUE</p>
      <h1>Browse by brand.</h1>
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
    </main>
  );
}
