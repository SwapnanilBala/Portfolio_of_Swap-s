import type { Experience } from "@/lib/types";

interface Props {
  readonly experience: Experience;
  /** Position in the rendered order, 1-based. Shown as the record locator. */
  readonly ordinal: number;
  /** Template from content. Tokens: {org} {team} {location} */
  readonly affiliation: string;
}

export function ExperienceEntry({ experience, ordinal, affiliation }: Props) {
  const locator = String(ordinal).padStart(2, "0");

  // The sentence is assembled from a content template rather than written
  // here, so this file holds no English.
  const line = affiliation
    .replace("{org}", experience.org)
    .replace("{team}", experience.team)
    .replace("{location}", experience.location);

  return (
    <article className="entry">
      <div className="entry-gutter-col">
        <p className="entry-meta">
          <b className="entry-ordinal">{locator}</b>
          <span>{experience.period}</span>
        </p>
      </div>

      <div className="prose">
        <div className="entry-head">
          <h3 className="entry-title">{experience.role}</h3>
        </div>
        <p className="entry-summary">{line}</p>

        {/* In the body column, for the same reason as ProjectEntry. */}
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

        <ul className="detail-list">
          {experience.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
