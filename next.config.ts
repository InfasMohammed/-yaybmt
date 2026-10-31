import type { NextConfig } from "next";
import { migration } from "./data/migration";
if (process.env.YAYBMT_PRODUCTION === "true" && !migration.complete) {
  throw new Error(
    "Production export blocked: complete the source migration and URL reconciliation before setting data/migration.ts complete=true. Review builds remain available with npm run build.",
  );
}
const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};
export default config;
