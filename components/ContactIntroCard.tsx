import ParagraphMotion from "./ParagraphMotion";
import { contactPage } from "../data/contact-page";

export default function ContactIntroCard({
  paragraphs,
}: {
  paragraphs: string[];
}) {
  return (
    <section
      className="contact-intro-card"
      data-page-reveal
      aria-labelledby="contact-intro-heading"
    >
      <p className="eyebrow">LET’S CONNECT</p>
      <h2 id="contact-intro-heading">{contactPage.introHeading}</h2>
      <div className="contact-intro-copy">
        {paragraphs
          .filter((text) => text.trim() !== contactPage.introHeading)
          .map((text) => (
            <p key={text}>
              <ParagraphMotion text={text} />
            </p>
          ))}
      </div>
    </section>
  );
}
