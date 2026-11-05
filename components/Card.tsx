import BrandBadge from "./BrandBadge";
import type { CatalogueItem } from "../data/types";
import { brands } from "../data/brands";
export function Placeholder() {
  return (
    <div className="placeholder">
      <span aria-hidden="true">＋</span>
      <small>PRODUCT PHOTOGRAPH</small>
      <p>Awaiting original image</p>
    </div>
  );
}
export default function Card({ product: p }: { product: CatalogueItem }) {
  const image = p.images[0];
  return (
    <article className="card">
      <a href={"/product/" + p.slug + "/"}>
        <div className="image-frame">
          {image ? (
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              width={image.width || 600}
              height={image.height || 600}
            />
          ) : (
            <Placeholder />
          )}
          <BrandBadge brand={p.brand} />
        </div>
        <div className="card-name">
          <small>
            {brands.find((b) => b.slug === p.brand)?.name || "PRODUCT"}
          </small>
          <h3>{p.name}</h3>
          <p className="model">{p.model ? "Model · " + p.model : ""}</p>
        </div>
        <div className="card-bottom">
          View product <span aria-hidden="true">+</span>
        </div>
      </a>
    </article>
  );
}
