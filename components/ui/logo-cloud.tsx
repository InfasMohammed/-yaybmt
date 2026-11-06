"use client";

import type { PointerEvent } from "react";
import { brands } from "../../data/brands";
import { brandLogos } from "../../data/brand-logos";
import "../../app/logo-cloud.css";

function reset(event: PointerEvent<HTMLElement>) {
  const style = event.currentTarget.style;
  style.setProperty("--glow-opacity", "0");
  style.setProperty("--rotate-x", "0deg");
  style.setProperty("--rotate-y", "0deg");
}
function spotlight(event: PointerEvent<HTMLElement>) {
  if (
    event.pointerType !== "mouse" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
    return;
  const box = event.currentTarget.getBoundingClientRect();
  const x = event.clientX - box.left;
  const y = event.clientY - box.top;
  const style = event.currentTarget.style;
  style.setProperty("--pointer-x", `${x}px`);
  style.setProperty("--pointer-y", `${y}px`);
  style.setProperty("--glow-opacity", "1");
  style.setProperty("--rotate-x", `${(0.5 - y / box.height) * 8}deg`);
  style.setProperty("--rotate-y", `${(x / box.width - 0.5) * 8}deg`);
}

/** Supplied interactive LogoCloud, adapted to genuine YAYBMT brand records. */
export function LogoCloud() {
  return (
    <div
      className="logo-cloud"
      onPointerMove={spotlight}
      onPointerLeave={reset}
    >
      <div className="logo-cloud-grid">
        {brands.map((brand, index) => {
          const logo = brandLogos[brand.slug];
          return (
            <div className="logo-cloud-shell" key={brand.slug}>
              <a
                className="logo-cloud-card"
                href={`/brand/${brand.slug}/`}
                onPointerMove={spotlight}
                onPointerLeave={reset}
              >
                <span className="logo-cloud-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")} / BRAND
                </span>
                <div className="logo-cloud-mark">
                  {logo ? (
                    <img
                      src={logo.src}
                      alt=""
                      width={logo.width}
                      height={logo.height}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <span className="logo-cloud-wordmark" aria-hidden="true">
                      {brand.name}
                    </span>
                  )}
                </div>
                <div className="logo-cloud-info">
                  <h2 className={!logo ? "sr-only" : undefined}>
                    {brand.name}
                  </h2>
                </div>
                <span className="logo-cloud-link">
                  View products <span aria-hidden="true">→</span>
                </span>
                <span className="logo-cloud-corner" aria-hidden="true">
                  +
                </span>
              </a>
              {brand.distributorNote && (
                <small className="distributor-note">
                  {brand.distributorNote}
                </small>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
