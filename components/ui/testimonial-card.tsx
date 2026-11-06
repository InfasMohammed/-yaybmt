"use client";

import { useRef, useSyncExternalStore, type ReactNode } from "react";
import { motion, useInView } from "motion/react";

const query = "(prefers-reduced-motion: reduce)";
const subscribe = (callback: () => void) => {
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};
const snapshot = () => window.matchMedia(query).matches;
const serverSnapshot = () => true;

/** Supplied blur/upward-offset reveal; SSR and reduced-motion text remain visible. */
export function TestimonialCard({
  children,
  index,
  name,
}: {
  children: ReactNode;
  index: number;
  name: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const reduced = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const reveal = inView && !reduced;
  return (
    <div ref={ref} className="testimonial-reveal-slot">
      <motion.figure
        className="testimonial-card"
        aria-label={`Review by ${name}`}
        data-testimonial-reveal={reveal ? "animated" : "static"}
        initial={false}
        animate={
          reveal
            ? {
                filter: "none",
                y: [12, 0],
                opacity: [0, 1],
              }
            : reduced
              ? { filter: "blur(0px)", y: 0, opacity: 1 }
              : { filter: "none", y: 12, opacity: 0 }
        }
        transition={{
          duration: reduced ? 0 : 0.5,
          delay: reduced ? 0 : index * 0.04,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.figure>
    </div>
  );
}
