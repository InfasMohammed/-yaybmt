import { notFound } from "next/navigation";
import { categories } from "../../../data/categories";
import { products } from "../../../data/products";
import { inCategory } from "../../../lib/catalogue";
import { pageNumbers, pagePath } from "../../../lib/pagination";
import ArchivePage from "../../../components/ArchivePage";
import { metadata as meta } from "../../../lib/site";
export const dynamicParams = false;
function resolve(slug: string[]) {
  const match = slug.join("/").match(/^(.*)\/page\/(\d+)$/);
  const category = match ? match[1] : slug.join("/");
  const page = match ? Number(match[2]) : 1;
  return { term: categories.find((c) => c.slug === category), page };
}
export function generateStaticParams() {
  return categories.flatMap((c) =>
    pageNumbers(products.filter((p) => inCategory(p, c.slug)).length).map(
      (page) => ({
        slug: pagePath("/product-category/" + c.slug + "/", page)
          .split("/")
          .filter(Boolean)
          .slice(1),
      }),
    ),
  );
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const { term, page } = resolve(slug);
  return term
    ? meta(
        term.name + (page > 1 ? " – Page " + page : ""),
        "Explore " +
          term.name +
          (page > 1 ? " page " + page : "") +
          " at YAYBMT in Deira, Dubai. Enquire about product requirements.",
        pagePath("/product-category/" + term.slug + "/", page),
        products.some((p) => p.status !== "sample" && inCategory(p, term.slug)),
      )
    : {};
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const { term, page } = resolve(slug);
  if (
    !term ||
    !pageNumbers(
      products.filter((p) => inCategory(p, term.slug)).length,
    ).includes(page)
  )
    notFound();
  return <ArchivePage term={term} kind="category" page={page} />;
}
