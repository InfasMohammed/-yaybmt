"use client";

import {
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import { useMotionValueEvent, useScroll, useInView } from "motion/react";
import "../../app/industry-scroll.css";

export interface ItemContent {
  id: string;
  title: string;
  description: string;
  image: { url: string; width: number; height: number; alt: string };
}
const query = "(min-width: 901px) and (prefers-reduced-motion: no-preference)";
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
  const frame = useRef<HTMLDivElement>(null);
  const inView = useInView(frame, { once: true, amount: 0.5 });
  const enhanced = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    ref.current?.style.setProperty("--industry-progress", `${value * 300}%`);
    const next = Math.min(2, Math.max(0, Math.floor(value * 3)));
    setActive((current) => (current === next ? current : next));
  });
  return (
    <div
      ref={ref}
      className="industry-scroll"
      data-scroll-enhanced={enhanced ? "true" : "false"}
      data-industry-in-view={inView}
      data-industry-grid
    >
      <div ref={frame} className="industry-scroll-frame">
        {[contentA, contentB, contentC].map((item, index) => (
          <article
            id={item.id}
            key={item.id}
            className="industry-scroll-step"
            style={{ "--step-offset": `${index * 100}%` } as CSSProperties}
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
              data-home-reveal-image
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
