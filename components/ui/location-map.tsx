import "../../app/location-map.css";

type LocationMapProps = {
  location: string;
  address: string;
  mapEmbed: string;
  mapHref: string;
};

/** Supplied expandable location-card design, with a genuine map and native controls. */
export function LocationMap({
  location,
  address,
  mapEmbed,
  mapHref,
}: LocationMapProps) {
  return (
    <div className="location-map">
      <details className="location-map-details">
        <summary className="location-map-preview">
          <span className="location-map-top">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3Zm6-3v15m6-12v15" />
            </svg>
            <span className="location-map-action">
              <span className="location-map-show">Expand map</span>
              <span className="location-map-hide">Collapse map</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="m7 10 5 5 5-5" />
              </svg>
            </span>
          </span>
          <span className="location-map-pin" aria-hidden="true">
            <svg
              width="38"
              height="38"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            >
              <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
          </span>
          <span className="location-map-label">{location}</span>
          <span className="location-map-caption">
            Yusuf Al Yousfi Building Materials Trading LLC
          </span>
          <span className="location-map-rule" aria-hidden="true" />
        </summary>
        <div className="location-map-embed">
          <iframe
            src={mapEmbed}
            title={`Yusuf Al Yousfi Building Materials Trading LLC location in ${location}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </details>
      <address>{address}</address>
      <a className="location-map-directions" href={mapHref}>
        Get directions{" "}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M6 18 18 6M6 6h12v12" />
        </svg>
      </a>
    </div>
  );
}
