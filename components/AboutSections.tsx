import CompanyValues from "./CompanyValues";
import { TeamSection } from "./ui/team-section-1";
import { aboutImages, team, companyFigures } from "../data/about";

export default function AboutSections() {
  return (
    <>
      <CompanyValues />
      <div className="about-banner">
        <img
          src={aboutImages.banner.src}
          alt=""
          width={aboutImages.banner.width}
          height={aboutImages.banner.height}
          decoding="async"
        />
      </div>
      <TeamSection
        title="Our leadership"
        members={team.map((person) => ({
          name: person.name,
          designation: person.role,
          imageSrc: person.image.src,
          imageWidth: person.image.width,
          imageHeight: person.image.height,
        }))}
      />
      <section
        className="about-section company-figures"
        aria-labelledby="figures-heading"
      >
        <p className="eyebrow">OUR TRACK RECORD OF EXCELLENCE</p>
        <h2 id="figures-heading">
          Delivering Quality, Reliability, and Service Since 2004
        </h2>
        <dl>
          {companyFigures.map((figure) => (
            <div key={figure.label}>
              <dt>{figure.label}</dt>
              <dd>{figure.value}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section className="about-section" aria-labelledby="showroom-heading">
        <p className="eyebrow">SHOWROOM</p>
        <h2 id="showroom-heading">Our Gallery</h2>
        <div className="showroom-grid">
          {[0, 1, 2].map((column) => (
            <div className="showroom-column" key={column}>
              {aboutImages.gallery
                .slice(column * 2, column * 2 + 2)
                .map((image, offset) => {
                  const index = column * 2 + offset;
                  return (
                    <a
                      className={"showroom-image showroom-image-" + index}
                      href={image.originalSrc}
                      key={image.src}
                      aria-label={"Open showroom image " + (index + 1)}
                    >
                      <img
                        src={image.src}
                        alt={"YAYBMT showroom — view " + (index + 1)}
                        width={image.width}
                        height={image.height}
                        loading="lazy"
                        decoding="async"
                      />
                    </a>
                  );
                })}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
