import { catalogueItems } from "../lib/catalogue-data";
import Catalogue from "./Catalogue";
export default function CataloguePage({ page = 1 }: { page?: number }) {
  return (
    <main id="main" className="page">
      <h1 className="sr-only">
        {page > 1 ? "Catalogue – Page " + page : "Catalogue"}
      </h1>
      <Catalogue items={catalogueItems} initialPage={page} />
    </main>
  );
}
