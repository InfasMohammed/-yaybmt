import { welcome } from "../data/welcome";

export default function CompanyValues() {
  return (
    <section
      className="about-section company-values"
      aria-labelledby="company-values-heading"
    >
      <p className="eyebrow">OUR PURPOSE & STORY</p>
      <h2 id="company-values-heading">Vision, Mission & History</h2>
      <div className="company-values-panels">
        {welcome.panels.map((panel, i) => (
          <details key={panel.title} open={i === 0}>
            <summary>{panel.title}</summary>
            {panel.paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </details>
        ))}
      </div>
    </section>
  );
}
