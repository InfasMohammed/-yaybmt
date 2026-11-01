"use client";

import { useEffect, useRef } from "react";

export default function HeaderMenu() {
  const menu = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      const element = menu.current;
      if (
        element?.open &&
        event.target instanceof Node &&
        !element.contains(event.target)
      ) {
        element.open = false;
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, []);

  return (
    <details
      ref={menu}
      className="header-menu"
      onKeyDown={(event) => {
        if (event.key !== "Escape") return;
        event.currentTarget.open = false;
        event.currentTarget.querySelector("summary")?.focus();
      }}
    >
      <summary aria-label="Main menu">
        <span className="menu-bars" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </summary>
      <nav aria-label="Main navigation">
        <a href="/shop/">Products</a>
        <a href="/brands/">Brands</a>
        <a href="/about-us/">Company</a>
        <a href="/contact-us/">Contact</a>
      </nav>
    </details>
  );
}
