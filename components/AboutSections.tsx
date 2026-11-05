import ShowroomGallery from "./ShowroomGallery";
import CompanyMotion from "./CompanyMotion";
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
      <CompanyMotion>
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
                <dd>
                  <span className="sr-only">{figure.value}</span>
                  <span aria-hidden="true" data-count-up={figure.value}>
                    {figure.value}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </CompanyMotion>
      <section className="about-section" aria-labelledby="showroom-heading">
        <p className="eyebrow">SHOWROOM</p>
        <h2 id="showroom-heading">Our Gallery</h2>
        <ShowroomGallery />
      </section>
    </>
  );
}
