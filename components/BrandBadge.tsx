import { brandLogos } from "../data/brand-logos";

export default function BrandBadge({ brand }: { brand: string | null }) {
  const logo = brand ? brandLogos[brand] : undefined;
  if (!logo) return null;
  return (
    <span className="product-image-brand" aria-hidden="true">
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
