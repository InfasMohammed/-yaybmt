"use client";

import type { ProductImage } from "../data/types";

export default function ZoomImage({
  image,
  priority,
}: {
  image: ProductImage;
  priority: boolean;
}) {
  return (
    <a
      className="gallery-image"
      href={image.originalSrc || image.src}
      aria-label={"View original image: " + image.alt}
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse") return;
        const frame = event.currentTarget;
        const img = frame.querySelector("img");
        if (!img) return;
        const bounds = frame.getBoundingClientRect();
        // Use the untransformed size so zoom does not feed back into the calculation.
        const left = bounds.left + (bounds.width - img.offsetWidth) / 2;
        const top = bounds.top + (bounds.height - img.offsetHeight) / 2;
        const x = Math.max(
          0,
          Math.min(100, ((event.clientX - left) / img.offsetWidth) * 100),
        );
        const y = Math.max(
          0,
          Math.min(100, ((event.clientY - top) / img.offsetHeight) * 100),
        );
        img.style.transformOrigin = `${x}% ${y}%`;
      }}
      onPointerLeave={(event) => {
        const img = event.currentTarget.querySelector("img");
        if (img) img.style.transformOrigin = "50% 50%";
      }}
    >
      <img
        src={image.originalSrc || image.src}
        alt={image.alt}
        width={image.width || 900}
        height={image.height || 900}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
      />
    </a>
  );
}
