import { production, origin } from "../lib/site";
export const dynamic = "force-static";
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      ...(production ? { allow: "/" } : { disallow: "/" }),
    },
    ...(production ? { sitemap: origin + "/sitemap.xml" } : {}),
  };
}
