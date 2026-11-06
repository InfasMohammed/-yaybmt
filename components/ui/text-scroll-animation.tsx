"use client";

import { useRef, useSyncExternalStore } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { brands } from "../../data/brands";
import { brandLogos } from "../../data/brand-logos";
import "../../app/brand-scroll.css";

const subscribe = (notify: () => void) => {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
};
const snapshot = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const serverSnapshot = () => true;
const logoBrands = brands.filter((brand) => brandLogos[brand.slug]);

function CharacterV3({
  src,
  width,
  height,
  index,
  progress,
  reduced,
}: {
  src: string;
  width: number;
  height: number;
  index: number;
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const distance = index - Math.floor(logoBrands.length / 2);
  const x = useTransform(progress, [0, 0.5], [distance * 90, 0]);
  const rotate = useTransform(progress, [0, 0.5], [distance * 50, 0]);
  const y = useTransform(progress, [0, 0.5], [-Math.abs(distance) * 20, 0]);
  const scale = useTransform(progress, [0, 0.5], [0.75, 1]);
  return (
    <motion.img
      src={src}
      alt=""
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      style={
        reduced ? undefined : { x, rotate, y, scale, transformOrigin: "center" }
      }
    />
  );
}

export default function ScrollLogoAssembly() {
  const target = useRef<HTMLDivElement>(null);
  const reduced = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start end", "end start"],
  });
  return (
    <div
      ref={target}
      className="brand-scroll"
      data-motion={reduced ? "static" : "scroll"}
    >
      <div className="brand-scroll-grid">
        {logoBrands.map((brand, index) => {
          const logo = brandLogos[brand.slug];
          return (
            <a
              key={brand.slug}
              href={`/brand/${brand.slug}/`}
              className="brand-scroll-card"
            >
              <div className="brand-scroll-image">
                <CharacterV3
                  {...logo}
                  index={index}
                  progress={scrollYProgress}
                  reduced={reduced}
                />
              </div>
              <span>{brand.name}</span>
              {brand.distributorNote && (
                <small className="distributor-note">
                  {brand.distributorNote}
                </small>
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}
