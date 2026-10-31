import type { Product, CatalogueItem } from "../data/types";
export type Filters = {
  query: string;
  brands: string[];
  categories: string[];
  sort: "name" | "model";
  page: number;
};
export const emptyFilters: Filters = {
  query: "",
  brands: [],
  categories: [],
  sort: "name",
  page: 1,
};
export function inCategory(
  product: Pick<Product, "categorySlugs">,
  slug: string,
) {
  return product.categorySlugs.some(
    (value) => value === slug || value.startsWith(slug + "/"),
  );
}
export function filterProducts<T extends CatalogueItem>(
  items: T[],
  filters: Filters,
): T[] {
  const words = filters.query
    .trim()
    .toLocaleLowerCase()
    .split(/\s+/)
    .filter(Boolean);
  return items
    .filter((p) => {
      const text = (p.name + " " + (p.model || "")).toLocaleLowerCase();
      return (
        words.every((word) => text.includes(word)) &&
        (!filters.brands.length ||
          (p.brand !== null && filters.brands.includes(p.brand))) &&
        (!filters.categories.length ||
          filters.categories.some((slug) => inCategory(p, slug)))
      );
    })
    .sort(
      (a, b) =>
        (filters.sort === "model" ? a.model || "" : a.name).localeCompare(
          filters.sort === "model" ? b.model || "" : b.name,
          "en",
          { numeric: true },
        ) || a.slug.localeCompare(b.slug),
    );
}
export function readFilters(
  search: string,
  brandSlugs: string[],
  categorySlugs: string[],
): Filters {
  const params = new URLSearchParams(search);
  return {
    query: (params.get("q") || "").slice(0, 200),
    brands: [...new Set(params.getAll("brand"))].filter((slug) =>
      brandSlugs.includes(slug),
    ),
    categories: [...new Set(params.getAll("category"))].filter((slug) =>
      categorySlugs.includes(slug),
    ),
    sort: params.get("sort") === "model" ? "model" : "name",
    page: Math.max(
      1,
      Math.min(100000, Number.parseInt(params.get("page") || "1", 10) || 1),
    ),
  };
}
export function writeFilters(filters: Filters): string {
  const params = new URLSearchParams();
  if (filters.query) params.set("q", filters.query);
  for (const brand of filters.brands) params.append("brand", brand);
  for (const category of filters.categories)
    params.append("category", category);
  if (filters.sort !== "name") params.set("sort", filters.sort);
  if (filters.page > 1) params.set("page", String(filters.page));
  return params.toString();
}
