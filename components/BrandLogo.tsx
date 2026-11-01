import { brandLogos } from "../data/brand-logos";

export default function BrandLogo({ slug }: { slug: string }) {
  const logo = brandLogos[slug];
  if (!logo) return null;
  return (
    <span className="brand-logo-frame">
      <img
        src={logo.src}
        alt=""
        width={logo.width}
        height={logo.height}
        loading="lazy"
        decoding="async"
      />
    </span>
  );
}
