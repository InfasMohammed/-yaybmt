import { sitemapEntries } from "../lib/sitemap";
import { production } from "../lib/site";
export const dynamic = "force-static";
export default function sitemap() {
  return sitemapEntries(production);
}
