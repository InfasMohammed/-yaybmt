import Catalogue from "./Catalogue";
export default function CataloguePage() {
  return (
    <main id="main" className="page">
      <div className="breadcrumb">
        <a href="/">Home</a> / Catalogue
      </div>
      <div className="page-heading">
        <div>
          <p className="eyebrow">THE CATALOGUE / SAMPLE 01</p>
          <h1>
            Made for the
            <br />
            <em>details that matter.</em>
          </h1>
        </div>
        <p>
          Explore the DAELIM selection.
          <br />
          Find a model, then connect with our team for verified product
          information.
        </p>
      </div>
      <p className="notice">
        Review sample · Existing project records only. Product photography, full
        specifications and the remaining catalogue await the source export.
      </p>
      <Catalogue />
    </main>
  );
}
