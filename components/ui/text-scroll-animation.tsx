"use client";

import { brands } from "../../data/brands";
import { brandLogos } from "../../data/brand-logos";
import "../../app/brand-scroll.css";

const logoBrands = brands.filter((brand) => brandLogos[brand.slug]);

export default function ScrollLogoAssembly() {
  return (
    <div className="brand-scroll" data-motion="static">
      <div className="brand-scroll-grid">
        {logoBrands.map((brand) => {
          const logo = brandLogos[brand.slug];
          return (
            <div key={brand.slug} className="brand-scroll-card">
              <a href={`/brand/${brand.slug}/`} className="brand-scroll-link">
                <div className="brand-scroll-image">
                  <img
                    src={logo.src}
                    width={logo.width}
                    height={logo.height}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <span>{brand.name}</span>
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
