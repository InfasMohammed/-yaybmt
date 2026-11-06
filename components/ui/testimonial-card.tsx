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
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const reduced = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const reveal = inView && !reduced;
  return (
    <motion.figure
      ref={ref}
      className="testimonial-card"
      aria-label={`Review by ${name}`}
      data-testimonial-reveal={reveal ? "animated" : "static"}
      initial={false}
      animate={
        reveal
          ? { filter: ["blur(4px)", "blur(0px)"], y: [-8, 0], opacity: [0, 1] }
          : { filter: "blur(0px)", y: 0, opacity: 1 }
      }
      transition={{
        duration: reduced ? 0 : 0.8,
        delay: reduced ? 0 : index * 0.1 + 0.1,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.figure>
  );
}
