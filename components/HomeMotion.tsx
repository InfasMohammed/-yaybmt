"use client";

import { useEffect } from "react";

export default function HomeMotion() {
  useEffect(() => {
    if (
      !("IntersectionObserver" in window) ||
      !("animate" in Element.prototype)
    )
      return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const elements = document.querySelectorAll<HTMLElement>(
      ".home-page > section:not(.hero) > h2, .home-page > section:not(.hero) > p, .home-page .industry-card, .home-page .directory > a",
    );
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || preference.matches) continue;
          observer.unobserve(entry.target);
          const animation = entry.target.animate(
            [
              { opacity: 0.55, transform: "translateY(16px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            { duration: 600, easing: "cubic-bezier(0.2, 0.7, 0.2, 1)" },
          );
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
        }
      },
      { threshold: 0.12 },
    );
    const updatePreference = () => {
      observer.disconnect();
      for (const animation of animations) animation.cancel();
      animations.clear();
      if (!preference.matches)
        elements.forEach((element) => observer.observe(element));
    };
    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", updatePreference);
      for (const animation of animations) animation.cancel();
    };
  }, []);
  return null;
}
