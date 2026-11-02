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
  const navigation = useRef<HTMLElement>(null);
  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (!(event.target instanceof Node)) return;
      navigation.current
        ?.querySelectorAll<HTMLDetailsElement>("details[open]")
        .forEach((dropdown) => {
          if (!dropdown.contains(event.target as Node)) dropdown.open = false;
        });
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
            ?.querySelectorAll<HTMLDetailsElement>("details[open]")
            .forEach((other) => {
              if (other !== current) other.open = false;
            });
        }}
        onPointerEnter={(event) => {
          if (
            event.pointerType === "mouse" &&
            window.matchMedia("(hover: hover) and (pointer: fine)").matches
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

  return (
    <nav
      ref={navigation}
      className="primary-navigation"
      aria-label="Main navigation"
      onKeyDown={(event) => {
        if (event.key !== "Escape") return;
        const open =
          navigation.current?.querySelector<HTMLDetailsElement>(
            "details[open]",
          );
        if (open) {
          open.open = false;
          open.querySelector("summary")?.focus();
          event.preventDefault();
        }
      }}
    >
      <a href="/">Home</a>
      {dropdown("Products", "/shop/", categories, "/product-category/")}
      {dropdown("Brands", "/brands/", brands, "/brand/")}
      <a href="/about-us/">Company</a>
      <a href="/contact-us/">Contact</a>
    </nav>
  );
}
