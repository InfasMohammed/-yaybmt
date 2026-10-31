"use client";
import { useState, useRef } from "react";
import { products } from "../data/products";
import Card from "./Card";
export default function Catalogue() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const results = products.filter(
    (p) =>
      (!selected || p.brand === "daelim") &&
      (p.name + " " + p.model).toLowerCase().includes(query.toLowerCase()),
  );
  const filters = (
    <>
      <details open>
        <summary>Brand</summary>
        <label className="check">
          <input
            type="checkbox"
            checked={selected}
            onChange={(e) => setSelected(e.target.checked)}
          />{" "}
          DAELIM <small>{products.length}</small>
        </label>
      </details>
      <details>
        <summary>Categories</summary>
        <p>Category assignments await the database export.</p>
      </details>
      <p className="muted">
        Only records available in the previous catalogue preview are shown.
      </p>
    </>
  );
  return (
    <>
      <noscript>
        <style>{`.tools,.catalogue aside,.filter-toggle{display:none!important}.catalogue{display:block}.card{animation:none;transform:none}`}</style>
        <p>
          All sample products are shown below. Browse a product or contact us to
          find a model.
        </p>
      </noscript>
      <div className="tools">
        <label className="search">
          Search products
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or model…"
          />
        </label>
        <button
          className="filter-toggle"
          onClick={() => dialog.current?.showModal()}
        >
          Filters +
        </button>
      </div>
      <div className="catalogue">
        <aside aria-label="Product filters">{filters}</aside>
        <section aria-label="Products">
          <div className="result-bar">
            <p aria-live="polite">{results.length} sample products</p>
            <span>Name / model</span>
          </div>
          <div className="chips">
            {selected && (
              <button onClick={() => setSelected(false)}>
                DAELIM × <span className="sr-only">Remove brand filter</span>
              </button>
            )}
            {query && (
              <button onClick={() => setQuery("")}>
                Search: {query} × <span className="sr-only">Clear search</span>
              </button>
            )}
          </div>
          <div className="grid">
            {results.map((p) => (
              <Card key={p.slug} product={p} />
            ))}
          </div>
          {!results.length && (
            <p>No matching products. Try another name or model.</p>
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
        {filters}
        <button className="button" onClick={() => dialog.current?.close()}>
          Show {results.length} products
        </button>
      </dialog>
    </>
  );
}
