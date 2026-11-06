import ParagraphMotion from "./ParagraphMotion";
import "../app/about-intro-card.css";

export default function AboutIntroCard({
  paragraphs,
}: {
  paragraphs: string[];
}) {
  return (
    <div
      className="about-intro-card"
      role="region"
      aria-label="About YAYBMT"
      tabIndex={0}
    >
      {paragraphs.map((text) => (
        <p key={text}>
          <ParagraphMotion text={text} />
        </p>
      ))}
    </div>
  );
}
