import { routes } from "./routes";
import { origin } from "./site";
export function sitemapEntries(indexable: boolean) {
  return indexable
    ? routes
        .filter((route) => route.indexable)
        .map((route) => ({ url: origin + route.path }))
    : [];
}
