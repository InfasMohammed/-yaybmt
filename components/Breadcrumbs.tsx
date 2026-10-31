import { origin } from "../lib/site";
export default function Breadcrumbs({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: origin + item.path,
    })),
  };
  return (
    <>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        {items.map((item, i) => (
          <span key={item.path}>
            {i > 0 && " / "}
            {i === items.length - 1 ? (
              <span aria-current="page">{item.name}</span>
            ) : (
              <a href={item.path}>{item.name}</a>
            )}
          </span>
        ))}
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
