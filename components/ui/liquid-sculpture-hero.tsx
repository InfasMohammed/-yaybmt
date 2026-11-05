"use client";

import { useEffect, useRef } from "react";

/** Adapted from the user-supplied Sculpture Hero by guglielmogiannattasio.it.
 * The existing hero content remains server-rendered. Only its image is enhanced.
 */
export default function LiquidSculptureHero() {
  const layer = useRef<HTMLDivElement>(null);
  const image = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const root = layer.current;
    const photo = image.current;
    const hero = root?.parentElement;
    if (
      !root ||
      !photo ||
      !hero ||
      !window.ResizeObserver ||
      !window.IntersectionObserver
    )
      return;
    const eligible = window.matchMedia(
      "(min-width: 900px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const navigatorInfo = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean };
    };
    const limited =
      navigatorInfo.connection?.saveData ||
      (navigatorInfo.deviceMemory ?? 8) <= 2;
    let teardown = () => {};
    const configure = () => {
      teardown();
      root.dataset.liquid = "static";
      if (!eligible.matches || limited) return;
      let cancelled = false;
      let engine: import("./liquid-engine").LiquidEngine | null = null;
      let cleanListeners = () => {};
      const canvas = document.createElement("canvas");
      canvas.className = "hero-liquid-canvas";
      const fallback = () => {
        root.dataset.liquid = "unavailable";
        engine?.setVisible(false);
      };
      teardown = () => {
        cancelled = true;
        cleanListeners();
        engine?.destroy();
        engine = null;
        canvas.remove();
        root.dataset.liquid = "static";
      };
      root.dataset.liquid = "loading";
      void Promise.all([import("./liquid-engine"), photo.decode()])
        .then(([module]) => {
          if (cancelled) return;
          root.append(canvas);
          try {
            engine = new module.LiquidEngine(
              canvas,
              {
                interactive: true,
                strength: 0.6,
                radius: 160,
                density: 0.15,
                dotSize: 1,
                spread: 0.5,
                turbulence: 0.45,
                returnSpeed: 1.3,
                streaks: true,
                restStyle: "image",
                ambient: false,
                ambientIntensity: 0,
                speed: 1,
                intro: false,
                reducedMotion: false,
                bg: [0.145, 0.157, 0.153],
                imgBg: null,
                liquid: 0.4,
              },
              fallback,
            );
            const resize = () => {
              const w = root.clientWidth,
                h = root.clientHeight;
              const ratio = Math.max(
                w / photo.naturalWidth,
                h / photo.naturalHeight,
              );
              const rw = photo.naturalWidth * ratio,
                rh = photo.naturalHeight * ratio;
              engine?.resize(w, h, {
                x: (w - rw) * 0.62,
                y: (h - rh) / 2,
                w: rw,
                h: rh,
              });
            };
            let inView = hero.getBoundingClientRect().bottom > 0;
            const visibility = () =>
              engine?.setVisible(inView && !document.hidden);
            const observer = new IntersectionObserver(([entry]) => {
              inView = entry.isIntersecting;
              visibility();
            });
            observer.observe(hero);
            const size = new ResizeObserver(resize);
            size.observe(root);
            const pointer = (event: PointerEvent) => {
              if (event.pointerType !== "mouse") return;
              const box = hero.getBoundingClientRect();
              const interactive =
                event.target instanceof Element &&
                event.target.closest("a,button,summary,input,textarea");
              engine?.pointer(
                interactive || event.type === "pointerleave" ? "leave" : "move",
                event.clientX - box.left,
                event.clientY - box.top,
                false,
              );
            };
            hero.addEventListener("pointermove", pointer, { passive: true });
            hero.addEventListener("pointerleave", pointer, { passive: true });
            document.addEventListener("visibilitychange", visibility);
            cleanListeners = () => {
              observer.disconnect();
              size.disconnect();
              hero.removeEventListener("pointermove", pointer);
              hero.removeEventListener("pointerleave", pointer);
              document.removeEventListener("visibilitychange", visibility);
            };
            engine.onFirstFrame = () => {
              if (!cancelled && root.dataset.liquid !== "unavailable")
                root.dataset.liquid = "ready";
            };
            engine.setImage(photo);
            resize();
            visibility();
          } catch {
            fallback();
          }
        })
        .catch(() => {
          if (!cancelled) fallback();
        });
    };
    configure();
    eligible.addEventListener("change", configure);
    return () => {
      teardown();
      eligible.removeEventListener("change", configure);
    };
  }, []);
  return (
    <div
      ref={layer}
      className="hero-liquid-layer"
      data-liquid="static"
      aria-hidden="true"
    >
      <img
        ref={image}
        src="/images/hero-marine.webp"
        alt=""
        width="1774"
        height="887"
        fetchPriority="high"
      />
    </div>
  );
}
