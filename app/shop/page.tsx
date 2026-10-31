import { sourcePages } from "../../data/source-pages";
import CataloguePage from "../../components/CataloguePage";
import { metadata as meta } from "../../lib/site";
const source = sourcePages.find((p) => p.path === "/shop/")!;
export const metadata = meta(
  source.seo.title || "Product catalogue",
  source.seo.description || "Browse the YAYBMT catalogue.",
  "/shop/",
);
export default CataloguePage;
