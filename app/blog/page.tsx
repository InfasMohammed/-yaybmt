import Breadcrumbs from "../../components/Breadcrumbs";
import { articles } from "../../data/articles";
import { sourcePages } from "../../data/source-pages";
import { metadata as meta } from "../../lib/site";
const source = sourcePages.find((p) => p.path === "/blog/")!;
export const metadata = meta(
  source.seo.title || "Articles",
  source.seo.description ||
    "YAYBMT articles and building materials information.",
  "/blog/",
);
export default function Page() {
  return (
    <main id="main" className="page">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Articles", path: "/blog/" },
        ]}
      />
      <p className="eyebrow">FROM YAYBMT</p>
      <h1>Articles</h1>
      <div className="directory">
        {articles.map((article) => (
          <a href={article.path} key={article.path}>
            <div>
              <h2>{article.title}</h2>
              <p>{article.description}</p>
            </div>
            <span aria-hidden="true">+</span>
          </a>
        ))}
      </div>
    </main>
  );
}
