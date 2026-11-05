"use client";

import { useRef, useSyncExternalStore, type ReactNode } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { cn } from "../../lib/utils";
import "../../app/showroom-gallery.css";

const query = "(prefers-reduced-motion: reduce)";
const subscribe = (callback: () => void) => {
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};
const snapshot = () => window.matchMedia(query).matches;
const serverSnapshot = () => true;

function GridItem({ children, index }: { children: ReactNode; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const visible = useInView(ref, { once: true, amount: 0.15 });
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 25 });
  const springY = useSpring(y, { stiffness: 300, damping: 25 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-4, 4]);
  return (
    <div
      ref={ref}
      className="showroom-masonry-item"
      role="listitem"
      onPointerMove={(event) => {
        if (reduced || event.pointerType !== "mouse") return;
        const box = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - box.left) / box.width - 0.5);
        y.set((event.clientY - box.top) / box.height - 0.5);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <motion.div
        initial={false}
        animate={
          visible && !reduced
            ? { opacity: [0.45, 1], y: [18, 0] }
            : { opacity: 1, y: 0 }
        }
        transition={{ duration: 0.5, delay: index * 0.05 }}
      >
        <motion.div
          className="showroom-masonry-tilt"
          style={reduced ? { transform: "none" } : { rotateX, rotateY }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}

/** Client-supplied masonry format, retaining visible SSR content and native links. */
export default function MasonryGrid<T>({
  items,
  renderItem,
  itemKey,
  className,
}: {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  itemKey: (item: T) => string;
  className?: string;
}) {
  return (
    <div className={cn("showroom-masonry", className)} role="list">
      {items.map((item, index) => (
        <GridItem key={itemKey(item)} index={index}>
          {renderItem(item, index)}
        </GridItem>
      ))}
    </div>
  );
}
