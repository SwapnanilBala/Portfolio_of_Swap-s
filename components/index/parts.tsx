import Link from "next/link";
import type { ReactNode } from "react";
import { SharedMedia } from "@/components/PageTransition";
import { ProjectCover } from "@/components/index/ProjectCover";
import { recordNumber } from "@/lib/media";
import { warmCaseHero } from "@/lib/preload";
import { hasCaseStudy, isResolvedLink, type LinkRole, type Project, type UiCopy } from "@/lib/types";

/*
 * What the Index's two trees share: the list of names, how a row links, its
 * small cover, and the destinations under an entry without a case study.
 * The desktop view (IndexView) sets the list beside a detail of the project
 * under the pointer or focus; the phone view (PhoneIndexView) is the list
 * alone, with a small cover in every row. One markup, so the two cannot
 * drift.
 */

/**
 * Whether a project has a capture to show. The rest -- a dataset, the
 * certificates -- show their data as a dot field or their headline figure.
 */
export function hasTile(project: Project): boolean {
  return (project.cover ?? project.hero) !== undefined;
}

/** Where a project opens: its case study, or its first link when it has none. */
export function destinationOf(project: Project): { href: string; internal: boolean } | null {
  if (hasCaseStudy(project)) return { href: `/work/${project.slug}`, internal: true };
  const link = project.links.find(isResolvedLink);
  return link ? { href: link.href, internal: false } : null;
}

export function ProjectLink({
  project,
  className,
  children,
  onPointerEnter,
  onFocus,
  cursor,
  tabIndex,
}: {
  readonly project: Project;
  readonly className?: string;
  readonly children: ReactNode;
  readonly onPointerEnter?: () => void;
  readonly onFocus?: () => void;
  readonly cursor?: "view";
  readonly tabIndex?: number;
}) {
  const destination = destinationOf(project);
  if (!destination) return <div className={className}>{children}</div>;
  if (destination.internal) {
    // The case study's hero is wider than this cover: fetch it on intent so
    // the page transition lands on the capture, not its placeholder.
    const warm = () => warmCaseHero(project.hero ?? project.cover);
    return (
      <Link
        href={destination.href}
        transitionTypes={["page"]}
        className={className}
        onPointerEnter={() => {
          warm();
          onPointerEnter?.();
        }}
        onFocus={() => {
          warm();
          onFocus?.();
        }}
        data-cursor={cursor}
        tabIndex={tabIndex}
      >
        {children}
      </Link>
    );
  }
  return (
    <a
      href={destination.href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onPointerEnter={onPointerEnter}
      onFocus={onFocus}
      data-cursor={cursor}
      tabIndex={tabIndex}
    >
      {children}
    </a>
  );
}

/**
 * A project without a case study says where it leads: one small section per
 * link -- the certificate, the repository -- as glass chips side by side, so a
 * second destination is not hidden behind the first. Outside the row's own
 * link, which cannot contain another. The accessible name adds the project, so
 * links read out of context are not a run of "Repository".
 */
export function DestinationLinks({
  project,
  labels,
  className = "",
  onFocus,
}: {
  readonly project: Project;
  readonly labels: Readonly<Record<LinkRole, string>>;
  readonly className?: string;
  readonly onFocus?: () => void;
}) {
  if (hasCaseStudy(project)) return null;
  const links = project.links.filter(isResolvedLink);
  if (links.length === 0) return null;
  return (
    <ul className={`meta flex flex-wrap gap-2 ${className}`}>
      {links.map((link) => (
        <li key={link.role}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${labels[link.role]}, ${project.name}`}
            onFocus={onFocus}
            className="index-chip px-3 py-2 md:py-1.5"
          >
            {labels[link.role]}
          </a>
        </li>
      ))}
    </ul>
  );
}

/**
 * Any project as a 16:10 cover: a capture contained in an ink frame, whole
 * and centred, so covers of different shapes still read as one size; the
 * dot field for the classifier; the headline figure for a certificate.
 * `compact` is for covers a few centimetres wide, where the figure plate's
 * labels would not fit: the figure alone, sized to the cover.
 */
export function IndexCover({
  project,
  sizes,
  eager = false,
  compact = false,
}: {
  readonly project: Project;
  readonly sizes: string;
  readonly eager?: boolean;
  readonly compact?: boolean;
}) {
  const figure = project.figures[0];
  const plate = !hasTile(project) && (project.selected || !project.dotField);
  if (compact && plate && figure) {
    return (
      <div
        role="img"
        aria-label={`${project.name}: ${figure.value} ${figure.label}`}
        className="@container flex aspect-[16/10] items-end overflow-hidden bg-ink p-[9%] text-paper"
      >
        <span className="display text-[24cqw] tabular-nums">{figure.value}</span>
      </div>
    );
  }
  // Centred in the frame: the dot field is a little wider than 16:10.
  return (
    <div className="flex aspect-[16/10] items-center overflow-hidden bg-ink [&>div]:w-full">
      <ProjectCover project={project} sizes={sizes} framed={hasTile(project)} aspect="aspect-[16/10]" eager={eager} />
    </div>
  );
}

/**
 * One row per project: its record number, its name, and its category and
 * year, in one glass panel. `onActivate` is the desktop's: the row under the
 * pointer or focus opens in the detail beside the list, and the open row is
 * a brighter pane with an arrow, the others' names a step quieter. A row
 * also carries a small cover -- on every row in the phone tree, and below
 * 48rem in a narrow desktop window, where the detail is not shown.
 * `sharedCovers` gives those covers the page transition's shared name, for
 * whichever tree is showing them; never both a row's cover and the detail.
 */
export function IndexRows({
  projects,
  copy,
  active,
  onActivate,
  covers,
  sharedCovers,
}: {
  readonly projects: readonly Project[];
  readonly copy: UiCopy["index"];
  readonly active?: string;
  readonly onActivate?: (slug: string) => void;
  /** Where rows show their small cover: always, or only below 48rem. */
  readonly covers: "always" | "narrow";
  readonly sharedCovers: boolean;
}) {
  return (
    <ol className="glass-light flex flex-col rounded-glass-sm p-2 md:rounded-glass md:p-3">
      {projects.map((project, index) => {
        const open = project.slug === active;
        const activate = onActivate ? () => onActivate(project.slug) : undefined;
        return (
          // The open pane is the whole entry, destinations included: set on
          // the link alone, its lower edge and shadow ran into the chips.
          <li
            key={project.slug}
            className={`rounded-glass-xs border-b last:border-b-0 transition-[background-color,box-shadow,border-color] duration-300 ${
              open ? "index-row-open border-transparent" : "border-ink/10"
            }`}
          >
            <ProjectLink
              project={project}
              onPointerEnter={activate}
              onFocus={activate}
              className="group grid grid-cols-[2rem_1fr_auto] items-center gap-x-3 rounded-glass-xs px-2.5 py-3.5 md:grid-cols-[2.5rem_1fr_auto] md:px-3 md:py-4"
            >
              <span className="meta tabular-nums text-glass-ink-2">{recordNumber(index)}</span>
              <span className="min-w-0">
                {/* Inactive names step down by colour, not opacity: glass-ink-2
                    on light glass is 7.6:1. */}
                <span
                  className={`block text-[clamp(1.25rem,2.2vw,2rem)] font-semibold uppercase leading-[0.92] tracking-[-0.035em] transition-[color,translate] duration-500 ease-out-expo group-hover:translate-x-1.5 reduced:transition-none ${
                    onActivate && !open ? "md:text-glass-ink-2" : ""
                  }`}
                >
                  {project.name}
                </span>
                <span className="meta mt-1.5 block text-glass-ink-2">
                  {/* Unbroken: "2026—" split from its dash on a phone. */}
                  {project.category} / <span className="whitespace-nowrap">{project.year}</span>
                </span>
              </span>
              <span
                className={`w-24 overflow-hidden rounded-glass-xs ${covers === "narrow" ? "md:hidden" : ""}`}
              >
                <SharedMedia slug={project.slug} enabled={sharedCovers && hasCaseStudy(project)}>
                  <div>
                    <IndexCover project={project} sizes="6rem" compact />
                  </div>
                </SharedMedia>
              </span>
              {onActivate ? (
                <span
                  aria-hidden="true"
                  className={`hidden text-xl transition-[opacity,translate] duration-500 ease-out-expo reduced:transition-none md:block ${
                    open ? "opacity-100" : "-translate-x-2 opacity-0"
                  }`}
                >
                  →
                </span>
              ) : null}
            </ProjectLink>
            <DestinationLinks
              project={project}
              labels={copy.destinations}
              onFocus={activate}
              className="-mt-1 pb-3.5 pl-[3.375rem] md:pl-16"
            />
          </li>
        );
      })}
    </ol>
  );
}
