"use client";

import MasonryGrid from "./ui/masonry-grid";
import { aboutImages } from "../data/about";

export default function ShowroomGallery() {
  return (
    <MasonryGrid
      items={aboutImages.gallery}
      itemKey={(image) => image.src}
      renderItem={(image, index) => (
        <a
          className="showroom-masonry-photo"
          href={image.originalSrc}
          aria-label={`Open showroom image ${index + 1}`}
        >
          <img
            src={image.src}
            alt={`YAYBMT showroom — view ${index + 1}`}
            width={image.width}
            height={image.height}
            loading="lazy"
            decoding="async"
          />
        </a>
      )}
    />
  );
}
