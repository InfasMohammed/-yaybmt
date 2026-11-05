"use client";

import { useEffect, useRef } from "react";

type NavigationItem = { slug: string; name: string };

export default function HeaderMenu({
  categories,
  brands,
}: {
  categories: NavigationItem[];
  brands: NavigationItem[];
}) {
  const navigation = useRef<HTMLDivElement>(null);
  const mobileMenu = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (!(event.target instanceof Node)) return;
      navigation.current
        ?.querySelectorAll<HTMLDetailsElement>(".nav-dropdown[open]")
        .forEach((dropdown) => {
          if (!dropdown.contains(event.target as Node)) dropdown.open = false;
        });
      if (
        mobileMenu.current?.open &&
        !mobileMenu.current.contains(event.target)
      ) {
        mobileMenu.current.open = false;
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, []);

  function dropdown(
    label: string,
    path: string,
    entries: NavigationItem[],
    prefix: string,
  ) {
    return (
      <details
        className="nav-dropdown"
        name="primary-navigation"
        onToggle={(event) => {
          if (!event.currentTarget.open) {
            delete event.currentTarget.dataset.hoverOpened;
            return;
          }
          const current = event.currentTarget;
          navigation.current
            ?.querySelectorAll<HTMLDetailsElement>(".nav-dropdown[open]")
            .forEach((other) => {
              if (other !== current) other.open = false;
            });
        }}
        onPointerEnter={(event) => {
          if (
            event.pointerType === "mouse" &&
            window.matchMedia(
              "(min-width: 651px) and (hover: hover) and (pointer: fine)",
            ).matches
          ) {
            if (!event.currentTarget.open) {
              event.currentTarget.dataset.hoverOpened = "true";
              event.currentTarget.open = true;
            }
          }
        }}
        onPointerLeave={(event) => {
          if (
            event.pointerType === "mouse" &&
            !event.currentTarget.contains(document.activeElement)
          ) {
            delete event.currentTarget.dataset.hoverOpened;
            event.currentTarget.open = false;
          }
        }}
      >
        <summary
          onClick={(event) => {
            const element = event.currentTarget
              .parentElement as HTMLDetailsElement;
            if (element.dataset.hoverOpened === "true") {
              delete element.dataset.hoverOpened;
              event.preventDefault();
            }
          }}
        >
          {label}
          <span className="nav-chevron" aria-hidden="true">
            ⌄
          </span>
        </summary>
        <div className="nav-dropdown-links">
          <a className="nav-view-all" href={path}>
            All {label.toLowerCase()}
          </a>
          {entries.map((entry) => (
            <a href={prefix + entry.slug + "/"} key={entry.slug}>
              {entry.name}
            </a>
          ))}
        </div>
      </details>
    );
  }

  function links() {
    return (
      <>
        <a href="/">Home</a>
        {dropdown("Products", "/shop/", categories, "/product-category/")}
        {dropdown("Brands", "/brands/", brands, "/brand/")}
        <a href="/about-us/">Company</a>
        <a href="/contact-us/">Contact</a>
      </>
    );
  }

  return (
    <div
      ref={navigation}
      className="header-navigation"
      onClick={(event) => {
        if (
          event.target instanceof Element &&
          event.target.closest("a") &&
          mobileMenu.current
        ) {
          mobileMenu.current.open = false;
        }
      }}
      onKeyDown={(event) => {
        if (event.key !== "Escape") return;
        const open =
          navigation.current?.querySelector<HTMLDetailsElement>(
            ".nav-dropdown[open]",
          ) || (mobileMenu.current?.open ? mobileMenu.current : null);
        if (open) {
          open.open = false;
          open.querySelector("summary")?.focus();
          event.preventDefault();
        }
      }}
    >
      <nav
        className="primary-navigation desktop-navigation"
        aria-label="Main navigation"
      >
        {links()}
      </nav>
      <details className="mobile-navigation" ref={mobileMenu}>
        <summary aria-label="Menu">
          <svg
            aria-hidden="true"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </summary>
        <nav className="primary-navigation" aria-label="Main navigation">
          {links()}
        </nav>
      </details>
    </div>
  );
}
