"use client";

import { useEffect, useRef, useState } from "react";
import { brands } from "../data/brands";
import { categories } from "../data/categories";
import type { CatalogueItem } from "../data/types";
import {
  emptyFilters,
  filterProducts,
  inCategory,
  readFilters,
  writeFilters,
  type Filters,
} from "../lib/catalogue";
import Card from "./Card";

import { pageSize as PAGE_SIZE, pagePath } from "../lib/pagination";

export default function Catalogue({
  items,
  initialPage = 1,
  basePath = "/shop/",
}: {
  items: CatalogueItem[];
  initialPage?: number;
  basePath?: string;
}) {
  const [filters, setFilters] = useState<Filters>({
    ...emptyFilters,
    page: initialPage,
  });
  const [enhanced, setEnhanced] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const resultsHeading = useRef<HTMLParagraphElement>(null);
  const results = filterProducts(items, filters);
  const pageCount = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const currentPage = Math.min(filters.page, pageCount);
  const visible = results.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );
  const hasCategories = items.some((p) => p.categorySlugs.length);

  useEffect(() => {
    const restore = () => {
      const restored = readFilters(
        window.location.search,
        brands.map((b) => b.slug),
        categories.map((c) => c.slug),
      );
      if (!new URLSearchParams(window.location.search).has("page"))
        restored.page =
          restored.query ||
          restored.brands.length ||
          restored.categories.length ||
          restored.sort !== "name"
            ? 1
            : initialPage;
      setFilters(restored);
      setEnhanced(true);
    };
    restore();
    window.addEventListener("popstate", restore);
    return () => window.removeEventListener("popstate", restore);
  }, [initialPage, basePath, items.length]);

  function update(patch: Partial<Filters>, resetPage = true) {
    const next = { ...filters, ...(resetPage ? { page: 1 } : {}), ...patch };
    setFilters(next);
    const search = writeFilters(next);
    if (
      !next.query &&
      !next.brands.length &&
      !next.categories.length &&
      next.sort === "name" &&
      next.page === 1 &&
      window.location.pathname !== basePath
    ) {
      window.location.assign(basePath);
      return;
    }
    window.history.replaceState(
      null,
      "",
      window.location.pathname +
        (search ? "?" + search : "") +
        window.location.hash,
    );
  }
  function toggle(key: "brands" | "categories", value: string) {
    update({
      [key]: filters[key].includes(value)
        ? filters[key].filter((v) => v !== value)
        : [...filters[key], value],
    });
  }
  function paginate(page: number) {
    update({ page }, false);
    resultsHeading.current?.focus({ preventScroll: true });
    resultsHeading.current?.scrollIntoView({
      block: "center",
      behavior: "instant",
    });
  }
  function renderFilters() {
    return (
      <>
        <details open>
          <summary>Brands</summary>
          {brands.map((brand) => (
            <label className="check" key={brand.slug}>
              <input
                type="checkbox"
                checked={filters.brands.includes(brand.slug)}
                onChange={() => toggle("brands", brand.slug)}
              />
              {brand.name}
              <small aria-label="Imported records">
                {items.filter((p) => p.brand === brand.slug).length}
              </small>
            </label>
          ))}
        </details>
        <details>
          <summary>Categories</summary>
          {hasCategories ? (
            categories.map((category) => (
              <label className="check" key={category.slug}>
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category.slug)}
                  onChange={() => toggle("categories", category.slug)}
                />
                {category.name}
                <small>
                  {items.filter((p) => inCategory(p, category.slug)).length}
                </small>
              </label>
            ))
          ) : (
            <p>
              Category assignments await the original source data.{" "}
              <a className="text-link" href="/categories/">
                Browse known category names
              </a>
            </p>
          )}
        </details>
        <p className="muted">
          Counts refer to imported records, not stock or the complete catalogue.
        </p>
        {(filters.query ||
          filters.brands.length > 0 ||
          filters.categories.length > 0) && (
          <button onClick={() => update(emptyFilters)}>
            Clear all filters
          </button>
        )}
      </>
    );
  }
  return (
    <>
      <noscript>
        <style>{`.tools,.catalogue aside,.filter-toggle{display:none!important}.catalogue{display:block}.card{animation:none;transform:none}`}</style>
        <p>
          Browse the products below. Use the page links to see the rest of the
          catalogue.
        </p>
      </noscript>
      <div className="tools">
        <label className="search">
          Search products
          <input
            type="search"
            value={filters.query}
            onChange={(e) => update({ query: e.target.value })}
            placeholder="Search by name or model…"
          />
        </label>
        <button
          className="filter-toggle"
          onClick={() => dialog.current?.showModal()}
          aria-haspopup="dialog"
        >
          Filters +
        </button>
      </div>
      <div className="catalogue">
        <aside aria-label="Product filters">{renderFilters()}</aside>
        <section aria-label="Products">
          <div className="result-bar">
            <p ref={resultsHeading} tabIndex={-1} aria-live="polite">
              {results.length} imported{" "}
              {results.length === 1 ? "product" : "products"}
            </p>
            <span>
              {enhanced && results.length > 0
                ? `Page ${currentPage} of ${pageCount}`
                : "Name / model"}
            </span>
          </div>
          <div className="chips">
            {filters.brands.map((slug) => (
              <button key={slug} onClick={() => toggle("brands", slug)}>
                {brands.find((b) => b.slug === slug)?.name} ×{" "}
                <span className="sr-only">Remove brand filter</span>
              </button>
            ))}
            {filters.categories.map((slug) => (
              <button key={slug} onClick={() => toggle("categories", slug)}>
                {categories.find((c) => c.slug === slug)?.name} ×{" "}
                <span className="sr-only">Remove category filter</span>
              </button>
            ))}
            {filters.query && (
              <button onClick={() => update({ query: "" })}>
                Search: {filters.query} ×{" "}
                <span className="sr-only">Clear search</span>
              </button>
            )}
          </div>
          <div className="grid">
            {visible.map((p) => (
              <Card key={p.slug} product={p} />
            ))}
          </div>
          {!results.length && (
            <div className="empty-state">
              <h2>No imported records match.</h2>
              <p>
                Try another name or model, or clear your filters. Try browsing a
                broader category or contact our team.
              </p>
              <button onClick={() => update(emptyFilters)}>
                Clear search and filters
              </button>
              <p>
                <a className="text-link" href="/contact-us/">
                  Ask our team about a product
                </a>
              </p>
            </div>
          )}
          {pageCount > 1 && (
            <nav className="pagination" aria-label="Catalogue pages">
              {!filters.query &&
              !filters.brands.length &&
              !filters.categories.length &&
              filters.sort === "name" ? (
                <>
                  {currentPage > 1 ? (
                    <a
                      className="page-link"
                      href={pagePath(basePath, currentPage - 1)}
                    >
                      Previous
                    </a>
                  ) : (
                    <span aria-disabled="true">Previous</span>
                  )}
                  <span aria-current="page">
                    {currentPage} / {pageCount}
                  </span>
                  {currentPage < pageCount ? (
                    <a
                      className="page-link"
                      href={pagePath(basePath, currentPage + 1)}
                    >
                      Next
                    </a>
                  ) : (
                    <span aria-disabled="true">Next</span>
                  )}
                </>
              ) : (
                <>
                  <button
                    disabled={currentPage === 1}
                    onClick={() => paginate(currentPage - 1)}
                  >
                    Previous
                  </button>
                  <span aria-current="page">
                    {currentPage} / {pageCount}
                  </span>
                  <button
                    disabled={currentPage === pageCount}
                    onClick={() => paginate(currentPage + 1)}
                  >
                    Next
                  </button>
                </>
              )}
            </nav>
          )}
        </section>
      </div>
      <dialog ref={dialog} aria-label="Filter products">
        <div className="drawer-head">
          <h2>Filters</h2>
          <button
            onClick={() => dialog.current?.close()}
            aria-label="Close filters"
          >
            ×
          </button>
        </div>
        {renderFilters()}
        <button className="button" onClick={() => dialog.current?.close()}>
          Show {results.length} products
        </button>
      </dialog>
    </>
  );
}
