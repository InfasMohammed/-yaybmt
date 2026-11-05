import { welcome } from "../data/welcome";
import "../app/company-values.css";

const icons: Record<string, React.ReactNode> = {
  Vision: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  Mission: (
    <>
      <path d="M12 21V4m0 0c4-5 6 5 10 0v10c-4 5-6-5-10 0" />
      <path d="M4 21h16" />
    </>
  ),
  History: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l4 2" />
    </>
  ),
};

export default function CompanyValues() {
  return (
    <section
      className="about-section company-values"
      aria-labelledby="company-values-heading"
    >
      <div className="company-values-heading">
        <p className="eyebrow">OUR PURPOSE & STORY</p>
        <h2 id="company-values-heading">Vision, Mission & History</h2>
      </div>
      <div className="company-values-cards">
        {welcome.panels.map((panel) => (
          <article className="company-value-card" key={panel.title}>
            <svg
              className="company-value-icon"
              viewBox="0 0 24 24"
              width="36"
              height="36"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {icons[panel.title]}
            </svg>
            <h3>{panel.title}</h3>
            {panel.paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </article>
        ))}
      </div>
    </section>
  );
}
