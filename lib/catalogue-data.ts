import { products } from "../data/products";
import type { CatalogueItem, Product } from "../data/types";
export function catalogueItem(p: Product): CatalogueItem {
  return {
    slug: p.slug,
    name: p.name,
    model: p.model,
    brand: p.brand,
    categorySlugs: p.categorySlugs,
    images: p.images,
  };
}
export const catalogueItems = products.map(catalogueItem);
