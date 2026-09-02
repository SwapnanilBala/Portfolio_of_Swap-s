import type { Experience } from "@/lib/types";

interface Props {
  readonly experience: Experience;
}

export function ExperienceEntry({ experience }: Props) {
  return (
    <article className="entry">
      <div className="entry-gutter-col">
        <p className="entry-meta">{experience.period}</p>
        <ul className="gutter">
          {experience.gutter.map((fact) => (
            <li key={fact.label}>
              <span
                className="fact-value"
                data-todo={fact.value === "TODO" ? "true" : undefined}
              >
                {fact.value}
              </span>
              <span className="fact-label">{fact.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="prose">
        <h3 className="entry-title">{experience.role}</h3>
        <p className="entry-summary">
          {experience.org}, {experience.team} team, {experience.location}
        </p>

        <ul className="detail-list">
          {experience.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
