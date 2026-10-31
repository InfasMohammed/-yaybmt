import { writeFileSync } from "node:fs";
import { routes } from "../lib/routes";
import redirects from "../data/redirects.json";
const manifest = {
  canonicalOrigin: "https://yaybmt.com",
  reviewNoindex: true,
  routes: [...routes].sort((a, b) => a.path.localeCompare(b.path)),
  redirects,
};
writeFileSync(
  "docs/url-manifest.json",
  JSON.stringify(manifest, null, 2) + "\n",
);
console.log("Wrote", routes.length, "routes to docs/url-manifest.json");
