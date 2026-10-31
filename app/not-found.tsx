export default function NotFound() {
  return (
    <main id="main" className="page intro">
      <p className="eyebrow">404</p>
      <h1>Page not found.</h1>
      <p>This address is not part of the current static catalogue.</p>
      <a className="button" href="/shop/">
        Browse the catalogue +
      </a>
    </main>
  );
}
