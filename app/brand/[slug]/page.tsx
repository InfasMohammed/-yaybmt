import { notFound } from "next/navigation";
import { brands } from "../../../data/brands";
import { products } from "../../../data/products";
import ArchivePage from "../../../components/ArchivePage";
import { metadata as meta } from "../../../lib/site";
export const dynamicParams = false;
export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const term = brands.find((b) => b.slug === slug);
  return term
    ? meta(
        term.name + " products",
        "Browse " +
          term.name +
          " catalogue information and enquire with YAYBMT, Deira, Dubai.",
        "/brand/" + term.slug + "/",
        products.some((p) => p.brand === slug && p.status !== "sample"),
      )
    : {};
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const term = brands.find((b) => b.slug === slug);
  if (!term) notFound();
  return <ArchivePage term={term} kind="brand" />;
}
