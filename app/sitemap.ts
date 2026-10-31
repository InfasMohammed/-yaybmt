import { products } from "../data/products";
import { production, origin } from "../lib/site";
export const dynamic = "force-static";
export default function sitemap() {
  return production
    ? [
        "/",
        "/shop/",
        "/brand/daelim/",
        "/brand/marine-locks/",
        ...products.map((p) => "/product/" + p.slug + "/"),
      ].map((path) => ({ url: origin + path }))
    : [];
}
