import { Product } from "../data/products";
export function Placeholder() {
  return (
    <div className="placeholder">
      <span aria-hidden="true">＋</span>
      <small>PRODUCT PHOTOGRAPH</small>
      <p>Awaiting original image</p>
    </div>
  );
}
export default function Card({ product: p }: { product: Product }) {
  return (
    <article className="card">
      <a href={"/product/" + p.slug + "/"}>
        <div className="image-frame">
          <Placeholder />
        </div>
        <div className="card-name">
          <small>DAELIM</small>
          <h3>{p.name}</h3>
          <p className="model">Model · {p.model}</p>
        </div>
        <div className="card-bottom">
          View product <span aria-hidden="true">+</span>
        </div>
      </a>
    </article>
  );
}
