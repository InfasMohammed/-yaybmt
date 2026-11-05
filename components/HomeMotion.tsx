"use client";

import { useEffect } from "react";

export default function HomeMotion() {
  useEffect(() => {
    if (
      !("IntersectionObserver" in window) ||
      !("animate" in Element.prototype)
    )
      return;
    const home = document.querySelector<HTMLElement>(".home-page");
    if (!home) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cards =
      ".enterprise-brand, .enterprise-category, .enterprise-product-grid .card, .enterprise-industry, .enterprise-video";
    const modern = home.classList.contains("enterprise-home");
    const candidates = home.querySelectorAll<HTMLElement>(
      modern
        ? `${cards}, h1, h2, h3, p, .enterprise-actions, .enterprise-enquiry-actions, [data-industry-image], .enterprise-hero-photo`
        : "[data-industry-image], [data-home-reveal], section:not(.hero) > h2, section:not(.hero) > p, .industry-card, .directory > a",
    );
    // A card reveals as one unit. Avoid separately fading all its child text.
    const elements = [...candidates].filter(
      (element) =>
        !modern ||
        element.matches(cards) ||
        element.matches("[data-industry-image]") ||
        !element.closest(cards),
    );
    const animations = new Set<Animation>();
    const revealed = new WeakSet<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        let stagger = 0;
        for (const entry of entries) {
          if (
            !entry.isIntersecting ||
            preference.matches ||
            revealed.has(entry.target)
          )
            continue;
          observer.unobserve(entry.target);
          revealed.add(entry.target);
          const element = entry.target as HTMLElement;
          const image = element.hasAttribute("data-industry-image");
          const heroPhoto = element.classList.contains("enterprise-hero-photo");
          const card = element.matches(cards);
          const keyframes =
            image || heroPhoto
              ? [
                  {
                    opacity: 0.8,
                    transform: image ? "scale(1.06)" : "scale(1.035)",
                  },
                  { opacity: 1, transform: "scale(1)" },
                ]
              : [
                  {
                    opacity: 0.55,
                    transform: `translateY(${card ? 20 : 12}px)`,
                  },
                  { opacity: 1, transform: "translateY(0)" },
                ];
          const animation = element.animate(keyframes, {
            duration: image ? 1000 : heroPhoto ? 1100 : card ? 620 : 520,
            delay: Math.min(stagger++, 3) * 65,
            easing: "cubic-bezier(0.2, 0.7, 0.2, 1)",
            fill: "backwards",
          });
          element.dataset.motionRevealed = "true";
          animations.add(animation);
          const release = () => animations.delete(animation);
          animation.onfinish = release;
          animation.oncancel = release;
        }
      },
      { threshold: 0.12 },
    );
    const updatePreference = () => {
      observer.disconnect();
      for (const animation of animations) animation.cancel();
      animations.clear();
      if (!preference.matches)
        elements.forEach((element) => {
          if (!revealed.has(element)) observer.observe(element);
        });
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
