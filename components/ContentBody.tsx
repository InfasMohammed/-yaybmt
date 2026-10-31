// Only the allowlisted HTML produced by scripts/import-catalogue.py belongs here.
export default function ContentBody({ html }: { html: string }) {
  return (
    <div className="content-body" dangerouslySetInnerHTML={{ __html: html }} />
  );
}
