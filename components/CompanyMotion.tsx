"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Static source values stay available to assistive technology and without JS. */
export default function CompanyMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const counted = useRef(new WeakSet<Element>());

  useEffect(() => {
    const container = root.current;
    if (!container) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const counters = [
      ...container.querySelectorAll<HTMLElement>("[data-count-up]"),
    ];
    const frames = new Set<number>();
    const finish = () => {
      frames.forEach(cancelAnimationFrame);
      frames.clear();
      counters.forEach((el) => {
        el.textContent = el.dataset.countUp!;
      });
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          if (counted.current.has(entry.target)) return;
          counted.current.add(entry.target);
          if (preference.matches) return;
          const el = entry.target as HTMLElement;
          const value = el.dataset.countUp!;
          const target = parseInt(value, 10);
          const suffix = value.replace(/^\d+/, "");
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / 1600, 1);
            el.textContent = `${Math.round(target * (1 - (1 - progress) ** 3))}${suffix}`;
            if (progress < 1) schedule();
          };
          const schedule = () => {
            const id = requestAnimationFrame((now) => {
              frames.delete(id);
              tick(now);
            });
            frames.add(id);
          };
          schedule();
        });
      },
      { threshold: 0.7 },
    );
    if (!preference.matches) counters.forEach((el) => observer.observe(el));
    preference.addEventListener("change", finish);
    return () => {
      observer.disconnect();
      finish();
      preference.removeEventListener("change", finish);
    };
  }, []);

  return (
    <div ref={root} className="company-motion">
      {children}
    </div>
  );
}
