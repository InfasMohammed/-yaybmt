import ScrollVideo from "./ScrollVideo";
import { welcome } from "../data/welcome";
import { whatsapp } from "../lib/site";

export default function WelcomeSection() {
  return (
    <section
      className="home-section welcome-section"
      aria-labelledby="welcome-heading"
    >
      <div className="welcome-media">
        <div className="welcome-video-frame">
          <ScrollVideo src={welcome.video} poster={welcome.poster} />
        </div>
      </div>
      <div className="welcome-copy">
        <p className="eyebrow">{welcome.heading}</p>
        <h2 id="welcome-heading">{welcome.title}</h2>
        {welcome.paragraphs.map((text) => (
          <p key={text}>{text}</p>
        ))}
        <a className="button" href={whatsapp()}>
          Get in Touch
        </a>
      </div>
    </section>
  );
}
