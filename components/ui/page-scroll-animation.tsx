"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Adapts the supplied CharacterV1/V3 transforms to existing semantic content. */
export default function PageScrollAnimation() {
  const pathname = usePathname();
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("main");
    if (
      !root ||
      root.classList.contains("home-page") ||
      !("animate" in Element.prototype)
    )
      return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let items: {
      element: HTMLElement;
      animation: Animation;
      top: number;
      height: number;
    }[] = [];
    let frame = 0;
    const clear = () => {
      items.forEach((item) => item.animation.cancel());
      items = [];
    };
    const render = () => {
      frame = 0;
      items.forEach(({ element, animation, top, height }) => {
        // Source motion settles halfway through the target's viewport passage.
        const progress = Math.max(
          0,
          Math.min(
            1,
            (scrollY + innerHeight - top) / ((innerHeight + height) * 0.5),
          ),
        );
        animation.currentTime = element.contains(document.activeElement)
          ? 1000
          : progress * 1000;
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    const setup = () => {
      clear();
      if (preference.matches) return;
      const cardSelector =
        ".card, .logo-cloud-card, .company-value-card, .about-intro-card, .leadership-card, .directory > a, .showroom-expandable-photo, .gallery-photo";
      const elements = root.querySelectorAll<HTMLElement>(
        `h1, h2, img, ${cardSelector}`,
      );
      const bounds = new Map(
        [...elements].map((element) => [
          element,
          element.getBoundingClientRect(),
        ]),
      );
      elements.forEach((element, index) => {
        // Nested panels retain their own transforms; animate headings separately only outside panels.
        if (element.matches("h1,h2") && element.closest(cardSelector)) return;
        if (
          element.closest("dialog, .gallery-thumbnails, .showroom-viewer") ||
          element.matches(".gallery-photo img, .gallery-photo picture img")
        )
          return;
        const rect = bounds.get(element)!;
        if (rect.width < 2 || rect.height < 2) return;
        const image = element.tagName === "IMG";
        const card = element.matches(cardSelector);
        if (image && rect.width < 32 && rect.height < 32) return;
        const distance = (index % 3) - 1;
        const x = image ? distance * 90 : card ? distance * 35 : distance * 50;
        const animation = element.animate(
          [
            {
              translate: `${x}px -${image ? 20 : card ? 100 : 50}px`,
              rotate: image
                ? `${distance * 50}deg`
                : card
                  ? `${distance * 8}deg`
                  : "x 35deg",
              scale: image ? ".75" : card ? ".9" : "1",
            },
            {
              translate: "0px 0px",
              rotate: image || card ? "0deg" : "x 0deg",
              scale: "1",
            },
          ],
          { duration: 1000, fill: "both", easing: "linear" },
        );
        animation.pause();
        element.dataset.pageScroll = image ? "image" : card ? "card" : "text";
        items.push({
          element,
          animation,
          top: rect.top + scrollY,
          height: rect.height,
        });
      });
      render();
    };
    const observer = new MutationObserver(setup);
    observer.observe(root, { childList: true, subtree: true });
    setup();
    root.addEventListener("load", setup, true);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", setup);
    root.addEventListener("focusin", schedule);
    preference.addEventListener("change", setup);
    return () => {
      root.removeEventListener("load", setup, true);
      observer.disconnect();
      clear();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", setup);
      root.removeEventListener("focusin", schedule);
      preference.removeEventListener("change", setup);
    };
  }, [pathname]);
  return null;
}
