import Breadcrumbs from "../../components/Breadcrumbs";
import { categories } from "../../data/categories";
import { metadata as meta } from "../../lib/site";
export const metadata = meta(
  "Browse product categories",
  "Explore building materials and marine hardware category information at YAYBMT.",
  "/categories/",
);
export default function Page() {
  const roots = categories.filter((c) => !c.slug.includes("/"));
  return (
    <main id="main" className="page">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Categories", path: "/categories/" },
        ]}
      />
      <p className="eyebrow">EXPLORE THE CATALOGUE</p>
      <h1>Browse by range.</h1>
      <p className="notice">
        Original category names, nested URLs and product assignments are
        preserved from the supplied catalogue.
      </p>
      {roots.map((root) => (
        <section className="category-group" key={root.slug}>
          <h2>
            <a href={"/product-category/" + root.slug + "/"}>{root.name}</a>
          </h2>
          <div className="directory">
            {categories
              .filter((c) => c.slug.startsWith(root.slug + "/"))
              .map((c) => (
                <a href={"/product-category/" + c.slug + "/"} key={c.slug}>
                  {c.name}
                  <span aria-hidden="true">+</span>
                </a>
              ))}
          </div>
        </section>
      ))}
    </main>
  );
}
