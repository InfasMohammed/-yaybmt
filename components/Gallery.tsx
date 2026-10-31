import type { Product } from "../data/types";
import { Placeholder } from "./Card";
export default function Gallery({ product }: { product: Product }) {
  if (!product.images.length)
    return (
      <section aria-label="Product gallery">
        <div className="gallery">
          <Placeholder />
        </div>
        <p className="caption">
          Original product photography has not been supplied.
        </p>
      </section>
    );
  return (
    <section aria-label="Product gallery">
      <div
        className="gallery-track"
        tabIndex={0}
        aria-label="Product photographs; scroll to see more"
      >
        {product.images.map((image, i) => (
          <figure
            id={"photo-" + (i + 1)}
            className="gallery-photo"
            key={image.src}
          >
            <img
              src={image.src}
              alt={image.alt}
              width="900"
              height="900"
              loading={i === 0 ? "eager" : "lazy"}
            />
            <figcaption>
              {i + 1} / {product.images.length}
            </figcaption>
          </figure>
        ))}
      </div>
      {product.images.length > 1 && (
        <nav
          className="gallery-thumbnails"
          aria-label="Choose a product photograph"
        >
          {product.images.map((image, i) => (
            <a
              href={"#photo-" + (i + 1)}
              key={image.src}
              aria-label={"View photograph " + (i + 1)}
            >
              <img
                src={image.src}
                alt=""
                width="70"
                height="70"
                loading="lazy"
              />
            </a>
          ))}
        </nav>
      )}
    </section>
  );
}
