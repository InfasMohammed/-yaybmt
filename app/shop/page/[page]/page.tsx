import { notFound } from "next/navigation";
import { products } from "../../../../data/products";
import CataloguePage from "../../../../components/CataloguePage";
import { metadata as meta } from "../../../../lib/site";
import { pageNumbers, pagePath } from "../../../../lib/pagination";
export const dynamicParams = false;
export function generateStaticParams() {
  return pageNumbers(products.length)
    .slice(1)
    .map((page) => ({ page: String(page) }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  return meta(
    "Product catalogue – Page " + page,
    "Browse page " +
      page +
      " of YAYBMT product records, with enquiries by email or WhatsApp.",
    pagePath("/shop/", Number(page)),
  );
}
export default async function Page({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const n = Number(page);
  if (!pageNumbers(products.length).slice(1).includes(n)) notFound();
  return <CataloguePage page={n} />;
}
