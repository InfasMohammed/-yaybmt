"use client";

import { useEffect, useRef, useState } from "react";

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
  const [view, setView] = useState<"main" | "products" | "brands">("main");
  const [enhanced, setEnhanced] = useState(false);
  const previousView = useRef(view);
  const backButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    setEnhanced(true);
  }, []);
  useEffect(() => {
    if (previousView.current !== view && mobileMenu.current?.open) {
      if (view === "main") {
        mobileMenu.current
          .querySelector<HTMLAnchorElement>(
            `[data-mobile-view="${previousView.current}"]`,
          )
          ?.focus();
      } else backButton.current?.focus();
    }
    previousView.current = view;
  }, [view]);
  function closeMobile() {
    if (!mobileMenu.current) return;
    mobileMenu.current.open = false;
    mobileMenu.current.querySelector("summary")?.focus();
    setView("main");
  }
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
          !event.defaultPrevented &&
          event.target instanceof Element &&
          event.target.closest("a") &&
          mobileMenu.current
        ) {
          mobileMenu.current.open = false;
        }
      }}
      onKeyDown={(event) => {
        if (event.key !== "Escape") return;
        if (mobileMenu.current?.open) {
          if (view !== "main") setView("main");
          else closeMobile();
          event.preventDefault();
          return;
        }
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
      <details
        className="mobile-navigation"
        ref={mobileMenu}
        onToggle={(event) => {
          if (!event.currentTarget.open) setView("main");
        }}
      >
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
        <nav
          className="primary-navigation mobile-menu-panel"
          aria-label="Main navigation"
        >
          <div className="mobile-menu-heading">
            {view !== "main" ? (
              <button
                type="button"
                ref={backButton}
                onClick={() => setView("main")}
              >
                ‹ Back
              </button>
            ) : (
              <span>Menu</span>
            )}
            {enhanced && (
              <button
                type="button"
                aria-label="Close menu"
                onClick={closeMobile}
              >
                Close <span aria-hidden="true">×</span>
              </button>
            )}
          </div>
          {view === "main" ? (
            <>
              <a href="/">Home</a>
              <a
                href="/shop/"
                data-mobile-view="products"
                onClick={(event) => {
                  event.preventDefault();
                  setView("products");
                }}
              >
                Products <span aria-hidden="true">›</span>
              </a>
              <a
                href="/brands/"
                data-mobile-view="brands"
                onClick={(event) => {
                  event.preventDefault();
                  setView("brands");
                }}
              >
                Brands <span aria-hidden="true">›</span>
              </a>
              <a href="/about-us/">Company</a>
              <a href="/contact-us/">Contact</a>
            </>
          ) : (
            <>
              <h2 className="mobile-menu-title">
                {view === "products" ? "Products" : "Brands"}
              </h2>
              <a
                className="mobile-view-all"
                href={view === "products" ? "/shop/" : "/brands/"}
              >
                View all {view}
              </a>
              {(view === "products" ? categories : brands).map((entry) => (
                <a
                  key={entry.slug}
                  href={
                    (view === "products" ? "/product-category/" : "/brand/") +
                    entry.slug +
                    "/"
                  }
                >
                  {entry.name}
                </a>
              ))}
            </>
          )}
        </nav>
      </details>
    </div>
  );
}
