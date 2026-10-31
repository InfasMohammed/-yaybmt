import Breadcrumbs from "./Breadcrumbs";
import { pagePath } from "../lib/pagination";
import { catalogueItems } from "../lib/catalogue-data";
import Catalogue from "./Catalogue";
export default function CataloguePage({ page = 1 }: { page?: number }) {
  return (
    <main id="main" className="page">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          {
            name: page > 1 ? "Catalogue – Page " + page : "Catalogue",
            path: pagePath("/shop/", page),
          },
        ]}
      />
      <div className="page-heading">
        <div>
          <p className="eyebrow">THE CATALOGUE / REVIEW EDITION</p>
          <h1>
            Made for the
            <br />
            <em>details that matter.</em>
          </h1>
        </div>
        <p>
          Find a model, then connect with our team for verified product
          information.
        </p>
      </div>
      <p className="notice">
        {catalogueItems.length} catalogue records.{" "}
        {catalogueItems.some((p) => !p.images.length) &&
          "Some original product photography is pending. "}
        Confirm current specifications with our team.
      </p>
      <div className="browse-links">
        <a href="/brands/">Browse brands</a>
        <a href="/categories/">Browse categories</a>
      </div>
      <Catalogue items={catalogueItems} initialPage={page} />
    </main>
  );
}
