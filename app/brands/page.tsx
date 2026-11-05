import { LogoCloud } from "../../components/ui/logo-cloud";
import Breadcrumbs from "../../components/Breadcrumbs";
import { metadata as meta } from "../../lib/site";
export const metadata = meta(
  "Browse brands",
  "Explore brand catalogue information and enquiries at YAYBMT, Deira, Dubai.",
  "/brands/",
);
export default function Page() {
  return (
    <main id="main" className="page">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Brands", path: "/brands/" },
        ]}
      />
      <p className="eyebrow">EXPLORE THE CATALOGUE</p>
      <h1>Browse by brand.</h1>
      <LogoCloud />
    </main>
  );
}
