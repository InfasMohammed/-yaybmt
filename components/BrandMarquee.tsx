"use client";

import { useSyncExternalStore } from "react";
import { brands } from "../data/brands";
import { brandLogos } from "../data/brand-logos";
import "../app/brand-marquee.css";

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;
const logoBrands = brands.filter((brand) => brandLogos[brand.slug]);

export default function BrandMarquee() {
  const ready = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  const items = (duplicate: boolean) =>
    logoBrands.map((brand) => {
      const logo = brandLogos[brand.slug];
      const content = (
        <>
          <img
            src={logo.src}
            alt=""
            width={logo.width}
            height={logo.height}
            loading="lazy"
            decoding="async"
          />
          <span>{brand.name}</span>
          {brand.distributorNote && (
            <small className="distributor-note">{brand.distributorNote}</small>
          )}
        </>
      );
      return duplicate ? (
        <a
          className="brand-marquee-card"
          href={`/brand/${brand.slug}/`}
          tabIndex={-1}
          onMouseDown={(event) => event.preventDefault()}
          key={brand.slug}
        >
          {content}
        </a>
      ) : (
        <a
          className="brand-marquee-card"
          href={`/brand/${brand.slug}/`}
          aria-label={
            brand.name +
            (brand.distributorNote ? ` — ${brand.distributorNote}` : "")
          }
          key={brand.slug}
        >
          {content}
        </a>
      );
    });
  return (
    <div className="brand-marquee" data-ready={ready}>
      <div className="brand-marquee-window">
        <div className="brand-marquee-track">
          <div className="brand-marquee-group">{items(false)}</div>
          <div
            className="brand-marquee-group brand-marquee-copy"
            aria-hidden="true"
          >
            {items(true)}
          </div>
        </div>
      </div>
    </div>
  );
}
