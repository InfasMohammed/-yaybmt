import ZoomImage from "./ZoomImage";
import type { Product } from "../data/types";
import { Placeholder } from "./Card";
export default function Gallery({ product }: { product: Product }) {
  if (!product.images.length)
    return (
      <section className="product-gallery" aria-label="Product gallery">
        <div className="gallery">
          <Placeholder />
        </div>
        <p className="caption">
          Original product photography has not been supplied.
        </p>
      </section>
    );
  return (
    <section className="product-gallery" aria-label="Product gallery">
      <div
        className="gallery-track"
        tabIndex={0}
        aria-label="Product images; scroll to see more"
      >
        {product.images.map((image, i) => (
          <figure
            id={"photo-" + (i + 1)}
            className="gallery-photo"
            key={image.src}
          >
            <ZoomImage image={image} priority={i === 0} />
          </figure>
        ))}
      </div>
      {product.images.length > 1 && (
        <nav className="gallery-thumbnails" aria-label="Choose a product image">
          {product.images.map((image, i) => (
            <a
              href={"#photo-" + (i + 1)}
              key={image.src}
              aria-label={"View image " + (i + 1)}
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
