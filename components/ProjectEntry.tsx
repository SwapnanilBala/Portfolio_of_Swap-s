import type { Project } from "@/lib/types";
import {
  LINK_LABELS,
  STATUS_LABELS,
  isBadgedStatus,
  isResolvedLink,
} from "@/lib/types";
import { ProjectMedia } from "@/components/ProjectMedia";

interface Props {
  readonly project: Project;
}

export function ProjectEntry({ project }: Props) {
  // A link without a destination is dropped rather than rendered dead.
  const links = project.links.filter(isResolvedLink);

  return (
    <article className="entry">
      <div className="entry-gutter-col">
        <p className="entry-meta">{project.period}</p>
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
      </div>

      <div className="prose">
        <h3 className="entry-title">
          {project.name}
          {isBadgedStatus(project.status) ? (
            <span className="entry-status">
              {STATUS_LABELS[project.status]}
            </span>
          ) : null}
        </h3>

        <p className="entry-summary">{project.summary}</p>

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

        {project.media?.map((media) => (
          <ProjectMedia key={media.src} media={media} />
        ))}
      </div>
    </article>
  );
}
