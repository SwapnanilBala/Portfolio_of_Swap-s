import type { MediaLabels, Project } from "@/lib/types";
import {
  LINK_LABELS,
  STATUS_LABELS,
  isBadgedStatus,
  isResolvedLink,
} from "@/lib/types";
import { ProjectMedia } from "@/components/ProjectMedia";

interface Props {
  readonly project: Project;
  readonly mediaLabels: MediaLabels;
  /**
   * Position in the rendered order, 1-based. Shown as the record locator and
   * used as the first half of each figure citation, so "Fig 2.1" is findable
   * from record 02 without counting.
   */
  readonly ordinal: number;
}

export function ProjectEntry({ project, mediaLabels, ordinal }: Props) {
  // A link without a destination is dropped rather than rendered dead.
  const links = project.links.filter(isResolvedLink);
  const locator = String(ordinal).padStart(2, "0");

  return (
    <article className="entry">
      <div className="entry-gutter-col">
        <p className="entry-meta">
          <b className="entry-ordinal">{locator}</b>
          <span>{project.period}</span>
        </p>
      </div>

      <div className="prose">
        <div className="entry-head">
          <h3 className="entry-title">{project.name}</h3>
          {isBadgedStatus(project.status) ? (
            <p className="entry-status">{STATUS_LABELS[project.status]}</p>
          ) : null}
        </div>

        <p className="entry-summary">{project.summary}</p>

        {/* The spec table belongs in the body column, not the locator column:
            at 132px a label like "lines of TypeScript" wraps to two lines and
            the figure loses the right edge it is supposed to line up on. */}
        <ul className="gutter">
          {project.gutter.map((fact) => (
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
          {project.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>

        <ul className="stack">
          {project.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        {links.length > 0 ? (
          <ul className="link-row">
            {links.map((link) => (
              <li key={link.role}>
                <a href={link.href}>{LINK_LABELS[link.role]}</a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {/* Figures span both columns and sit below the record rather than beside
          it. A plate constrained to either column is too small to be evidence,
          which is the whole reason they are not children of .prose. */}
      {project.media && project.media.length > 0 ? (
        <div className="entry-figures">
          {project.media.map((media, index) => (
            <ProjectMedia
              key={media.src}
              media={media}
              labels={mediaLabels}
              reference={mediaLabels.figureRef
                .replace("{record}", String(ordinal))
                .replace("{index}", String(index + 1))}
            />
          ))}
        </div>
      ) : null}
    </article>
  );
}
