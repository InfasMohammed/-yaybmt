import HomeArrow from "./HomeArrow";
import ScrollVideo from "./ScrollVideo";
import { welcome } from "../data/welcome";
import { whatsapp } from "../lib/site";

export default function WelcomeSection() {
  return (
    <section
      className="home-section welcome-section"
      aria-labelledby="welcome-heading"
    >
      <div className="welcome-media" data-home-reveal>
        <span className="welcome-media-label">
          A CLOSER LOOK AT YUSUF AL YOUSFI
        </span>
        <div className="welcome-video-frame">
          <ScrollVideo src={welcome.video} poster={welcome.poster} />
        </div>
        <div className="welcome-established">
          <strong>2004</strong>
          <span>
            Established in Dubai.
            <br />
            Built on lasting connections.
          </span>
        </div>
      </div>
      <div className="welcome-copy" data-home-reveal>
        <p className="eyebrow">{welcome.heading}</p>
        <h2 id="welcome-heading">{welcome.title}</h2>
        {welcome.paragraphs.map((text) => (
          <p key={text}>{text}</p>
        ))}
        <div className="home-actions">
          <a className="home-link" href="/about-us/">
            Discover our company <HomeArrow />
          </a>
          <a className="welcome-contact" href={whatsapp()}>
            Get in Touch <HomeArrow />
          </a>
        </div>
      </div>
    </section>
  );
}
