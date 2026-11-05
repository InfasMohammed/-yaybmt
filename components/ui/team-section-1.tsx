import type { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";
import "../../app/team-section.css";

type TeamMember = {
  name: string;
  designation: string;
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
};

type TeamSectionProps = HTMLAttributes<HTMLElement> & {
  title: string;
  description?: string;
  members: TeamMember[];
};

/** The client's TeamSection format, adapted for YAYBMT's genuine leadership.
 * No client runtime is needed: portraits, names and roles are static content.
 */
export function TeamSection({
  title,
  description,
  members,
  className,
  ...props
}: TeamSectionProps) {
  return (
    <section
      className={cn("about-section leadership-section", className)}
      aria-labelledby="team-heading"
      {...props}
    >
      <header className="leadership-heading">
        <p className="eyebrow">THE PEOPLE BEHIND YAYBMT</p>
        <h2 id="team-heading">{title}</h2>
        {description && <p className="leadership-description">{description}</p>}
      </header>
      <div className="leadership-grid">
        {members.map((member) => (
          <article className="leadership-card" key={member.name}>
            <div className="leadership-portrait">
              <img
                src={member.imageSrc}
                alt={member.name}
                width={member.imageWidth}
                height={member.imageHeight}
                loading="lazy"
                decoding="async"
              />
            </div>
            <h3>{member.name}</h3>
            <p>{member.designation}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
