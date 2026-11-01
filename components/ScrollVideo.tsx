"use client";

import { useEffect, useRef } from "react";

export default function ScrollVideo({
  src,
  poster,
}: {
  src: string;
  poster: string;
}) {
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const element = video.current;
    if (!element || !("IntersectionObserver" in window)) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const update = () => {
      if (visible && !reducedMotion.matches && !document.hidden) {
        element.play().catch(() => {});
      } else {
        element.pause();
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && entry.intersectionRatio >= 0.35;
        update();
      },
      { threshold: [0, 0.35] },
    );
    observer.observe(element);
    reducedMotion.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
      element.pause();
    };
  }, []);
  return (
    <video
      ref={video}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      width={1920}
      height={1080}
      aria-label="YAYBMT company video"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
