import { notFound } from "next/navigation";
import { products } from "../../../../../data/products";
import { brands } from "../../../../../data/brands";
import ArchivePage from "../../../../../components/ArchivePage";
import { metadata as meta } from "../../../../../lib/site";
import { pageNumbers, pagePath } from "../../../../../lib/pagination";
export const dynamicParams = false;
export function generateStaticParams() {
  return brands.flatMap((brand) =>
    pageNumbers(products.filter((p) => p.brand === brand.slug).length)
      .slice(1)
      .map((page) => ({ slug: brand.slug, page: String(page) })),
  );
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; page: string }>;
}) {
  const { slug, page } = await params;
  const term = brands.find((b) => b.slug === slug);
  return term
    ? meta(
        term.name + " products – Page " + page,
        "Browse page " + page + " of " + term.name + " products at YAYBMT.",
        pagePath("/brand/" + slug + "/", Number(page)),
      )
    : {};
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; page: string }>;
}) {
  const { slug, page } = await params;
  const term = brands.find((b) => b.slug === slug);
  const n = Number(page);
  if (
    !term ||
    !pageNumbers(products.filter((p) => p.brand === slug).length)
      .slice(1)
      .includes(n)
  )
    notFound();
  return <ArchivePage term={term} kind="brand" page={n} />;
}
