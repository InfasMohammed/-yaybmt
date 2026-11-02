import { productDocuments } from "../data/product-documents";
import type { Product } from "../data/types";

export default function ProductDocuments({ product }: { product: Product }) {
  const documents = productDocuments[product.slug] || [];
  const images = documents;
  if (!images.length) return null;
  return (
    <details className="product-documents" open>
      <summary>Technical Drawings</summary>
      <div className="product-document-list">
        {images.map((image, index) => (
          <figure key={image.originalSrc}>
            <a
              className="product-document-preview"
              href={image.originalSrc}
              aria-label={
                "Open full-size " +
                "technical drawing" +
                " " +
                (index + 1) +
                " for " +
                product.name
              }
            >
              <img
                src={image.src}
                alt={
                  product.name +
                  " — " +
                  "technical drawing" +
                  (images.length > 1 ? " " + (index + 1) : "")
                }
                width={image.width}
                height={image.height}
                loading="lazy"
                decoding="async"
              />
              <span className="product-document-expand" aria-hidden="true">
                View full size ↗
              </span>
            </a>
          </figure>
        ))}
      </div>
    </details>
  );
}
