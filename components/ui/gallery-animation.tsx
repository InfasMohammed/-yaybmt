"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import type { AboutImage } from "../../data/about";
import "../../app/showroom-gallery.css";

/** Supplied expandable gallery adapted to local photos and a native modal dialog. */
export default function ExpandableGallery({
  images,
}: {
  images: AboutImage[];
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const move = (offset: number) =>
    setSelectedIndex(
      (index) => (index + offset + images.length) % images.length,
    );
  if (!images.length) return null;
  return (
    <div className="showroom-expandable">
      <div className="showroom-expandable-strip" aria-label="Showroom photos">
        {images.map((image, index) => (
          <a
            key={image.src}
            className="showroom-expandable-photo"
            href={image.originalSrc}
            aria-label={`Open showroom image ${index + 1}`}
            onClick={(event) => {
              if (
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey
              )
                return;
              event.preventDefault();
              setSelectedIndex(index);
              dialog.current?.showModal();
            }}
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
        ))}
      </div>
      <dialog
        ref={dialog}
        className="showroom-viewer"
        aria-label="Showroom image viewer"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            move(1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            move(-1);
          }
        }}
      >
        <button
          type="button"
          className="showroom-viewer-close"
          aria-label="Close image viewer"
          onClick={() => dialog.current?.close()}
        >
          ×
        </button>
        <div className="showroom-viewer-content">
          <motion.img
            key={images[selectedIndex].src}
            src={images[selectedIndex].originalSrc}
            alt={`YAYBMT showroom — view ${selectedIndex + 1}`}
            width={images[selectedIndex].width}
            height={images[selectedIndex].height}
            initial={false}
            className="showroom-viewer-image"
          />
        </div>
        {images.length > 1 && (
          <>
            <button
              type="button"
              className="showroom-viewer-prev"
              aria-label="Previous image"
              onClick={() => move(-1)}
            >
              ‹
            </button>
            <button
              type="button"
              className="showroom-viewer-next"
              aria-label="Next image"
              onClick={() => move(1)}
            >
              ›
            </button>
          </>
        )}
        <p className="showroom-viewer-counter" aria-live="polite">
          {selectedIndex + 1} / {images.length}
        </p>
      </dialog>
    </div>
  );
}
