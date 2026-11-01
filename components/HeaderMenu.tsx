"use client";

export default function HeaderMenu() {
  return (
    <details
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
        <a href="/categories/">Ranges</a>
        <a href="/about-us/">Company</a>
        <a href="/contact-us/">Contact</a>
      </nav>
    </details>
  );
}
