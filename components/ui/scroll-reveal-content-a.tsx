"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import "../../app/industry-scroll.css";

export interface ItemContent {
  id: string;
  title: string;
  description: string;
  image: { url: string; width: number; height: number; alt: string };
}
const query =
  "(min-width: 1000px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)";
const subscribe = (callback: () => void) => {
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};
const snapshot = () => window.matchMedia(query).matches;
const serverSnapshot = () => false;

/** Supplied three-point sticky scroll format, with a complete static fallback. */
export default function ScrollRevealContentA({
  contentA,
  contentB,
  contentC,
}: {
  contentA: ItemContent;
  contentB: ItemContent;
  contentC: ItemContent;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const enhanced = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(2, Math.max(0, Math.floor(value * 3)));
    setActive((current) => (current === next ? current : next));
  });
  return (
    <div
      ref={ref}
      className="industry-scroll"
      data-scroll-enhanced={enhanced ? "true" : "false"}
      data-industry-grid
    >
      <div className="industry-scroll-frame">
        {[contentA, contentB, contentC].map((item, index) => (
          <article
            id={item.id}
            key={item.id}
            className="industry-scroll-step"
            data-active={active === index ? "true" : "false"}
          >
            <div className="industry-scroll-copy">
              <span className="industry-scroll-number" aria-hidden="true">
                0{index + 1}
              </span>
              <div className="industry-scroll-text">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
            <img
              src={item.image.url}
              alt={item.image.alt}
              width={item.image.width}
              height={item.image.height}
              loading="lazy"
              decoding="async"
            />
          </article>
        ))}
      </div>
    </div>
  );
}
