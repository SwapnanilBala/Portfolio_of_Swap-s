import Link from "next/link";
import type { ReactNode } from "react";
import { SharedMedia } from "@/components/PageTransition";
import { ProjectCover } from "@/components/index/ProjectCover";
import { recordNumber } from "@/lib/media";
import { warmCaseHero } from "@/lib/preload";
import { hasCaseStudy, isResolvedLink, type LinkRole, type Project, type UiCopy } from "@/lib/types";

/*
 * What the Index's two trees share: the grid, how a tile links, and
 * the row of destinations under an entry without a case study. The desktop
 * view (IndexView) animates between grid and list with GSAP Flip and trails a
 * preview after the pointer; the phone view (PhoneIndexView) has neither, and
 * both render these -- one markup, so the two cannot drift. The hooks only the
 * desktop reads (data-flip-id, data-grid-media, data-list-extra, the cursor's
 * data attributes) are inert on a phone.
 */

/**
 * A tile's rendered width, for next/image: three to a row from 48rem across
 * the page less its margins and two gaps, the full width below.
 */
const TILE_SIZES = "(min-width: 48rem) calc((100vw - 6.5rem) / 3), calc(100vw - 2.5rem)";

/**
 * Whether a project takes a tile: it has a capture to show. The rest -- a
 * dataset, the certificates -- are listed in type beneath the tiles rather
 * than set as plates that hold one number each.
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

/**
 * A card's frosted glass, as a layer behind its content rather than the card
 * box itself. It carries the same hook as what only its layout has, so the
 * grid-to-list Flip fades the glass out with the images and back in behind
 * the names; the names are the only things that fly.
 */
function Surface({
  layout,
  className = "rounded-glass-sm md:rounded-glass",
}: {
  readonly layout: Layout;
  readonly className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      data-grid-media={layout === "grid" ? true : undefined}
      data-list-extra={layout === "list" ? true : undefined}
      className={`index-surface glass-light ${className}`}
    />
  );
}

export function ProjectLink({
  project,
  className,
  children,
  onPointerEnter,
  cursor,
}: {
  readonly project: Project;
  readonly className?: string;
  readonly children: ReactNode;
  readonly onPointerEnter?: () => void;
  readonly cursor?: "view";
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
        onFocus={warm}
        data-cursor={cursor}
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
      data-cursor={cursor}
    >
      {children}
    </a>
  );
}

/**
 * A project without a case study says where it leads: one small section per
 * link -- the certificate, the repository -- as glass chips side by side, so a
 * second destination is not hidden behind the first. Outside the tile's own
 * link, which cannot contain another. The accessible name adds the project, so
 * links read out of context are not a run of "Repository".
 */
export function DestinationLinks({
  project,
  labels,
  className = "",
  ...rest
}: {
  readonly project: Project;
  readonly labels: Readonly<Record<LinkRole, string>>;
  readonly className?: string;
  readonly "data-grid-media"?: boolean;
  readonly "data-list-extra"?: boolean;
}) {
  if (hasCaseStudy(project)) return null;
  const links = project.links.filter(isResolvedLink);
  if (links.length === 0) return null;
  return (
    <ul className={`meta flex flex-wrap gap-2 ${className}`} {...rest}>
      {links.map((link) => (
        <li key={link.role}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${labels[link.role]}, ${project.name}`}
            className="index-chip px-3 py-2 md:py-1.5"
          >
            {labels[link.role]}
          </a>
        </li>
      ))}
    </ul>
  );
}

export type Layout = "grid" | "list";

interface ViewProps {
  readonly projects: readonly Project[];
  readonly copy: UiCopy["index"];
}

/** The Grid / List switch and the record count. */
export function IndexToggle({
  layout,
  onSwitch,
  copy,
  count,
}: {
  readonly layout: Layout;
  readonly onSwitch: (next: Layout) => void;
  readonly copy: UiCopy["index"];
  readonly count: number;
}) {
  return (
    <div className="flex items-center justify-between px-5 pb-4 pt-5 md:px-8 md:pb-5 md:pt-6">
      {/* A segmented glass strip: the pressed segment is a brighter pane. */}
      <div role="group" aria-label={copy.toggle} className="meta glass-light inline-flex gap-0.5 rounded-glass-sm p-1">
        {(["grid", "list"] as const).map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={layout === option}
            onClick={() => onSwitch(option)}
            // Dimmed by colour, not opacity: ink at half opacity is under AA
            // for text this size; glass-ink-2 on light glass is 7.6:1.
            className={`rounded-glass-xs px-3.5 py-2 transition-[color,background-color,box-shadow] duration-300 md:py-1.5 ${
              layout === option ? "index-segment-on" : "text-glass-ink-2 hover:text-ink"
            }`}
          >
            {option === "grid" ? copy.grid : copy.list}
          </button>
        ))}
      </div>
      <span className="meta glass-light rounded-glass-xs px-3 py-2 tabular-nums text-glass-ink-2">
        {recordNumber(count - 1)}
      </span>
    </div>
  );
}

/**
 * An even grid: every project with a capture as one of a row of equal 16:10
 * tiles, three to a row from 48rem, then the rest in type, one column each.
 * Record numbers follow the content's order, which puts the tiles first.
 */
export function IndexGrid({ projects, copy }: ViewProps) {
  const records = projects.map((project, index) => ({ project, index }));
  const tiles = records.filter(({ project }) => hasTile(project));
  const entries = records.filter(({ project }) => !hasTile(project));

  return (
    <div className="px-5 pb-16 md:px-8 md:pb-20">
      <ol className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
        {tiles.map(({ project, index }) => (
          <li key={project.slug}>
            {/* The link is the glass card; the shared name stays on the
                media inside it, never on the card. */}
            <ProjectLink
              project={project}
              className="group relative isolate block p-2 pb-4 md:p-2.5 md:pb-5"
              cursor="view"
            >
              <Surface layout="grid" />
              <div data-grid-media data-cursor-frame className="overflow-hidden rounded-glass-xs md:rounded-glass-sm">
                <SharedMedia slug={project.slug} enabled={hasCaseStudy(project)}>
                  <div className="overflow-hidden rounded-glass-xs transition-transform duration-700 ease-out-expo group-hover:scale-[1.04] reduced:transition-none reduced:group-hover:scale-100 md:rounded-glass-sm">
                    <ProjectCover project={project} sizes={TILE_SIZES} framed eager={index === 0} />
                  </div>
                </SharedMedia>
              </div>
              {/* Stacked, not name-left and type-right: in a narrow tile the
                  two sides wrapped into each other. The name hugs its text
                  (justify-self-start), because Flip scales that box into
                  the list row's name. */}
              <div className="meta mt-3.5 grid grid-cols-[auto_1fr] items-baseline gap-x-3 gap-y-1 px-1.5 transition-transform duration-500 ease-out-expo group-hover:translate-x-1.5 reduced:transition-none">
                <span className="tabular-nums text-glass-ink-2">{recordNumber(index)}</span>
                <span data-flip-id={project.slug} className="inline-block origin-left justify-self-start">
                  {project.name}
                </span>
                <span className="col-start-2 text-glass-ink-2">
                  {project.type} / {project.year}
                </span>
              </div>
            </ProjectLink>
          </li>
        ))}
      </ol>

      {entries.length > 0 ? (
        <ol className="mt-4 grid grid-cols-1 gap-4 md:mt-5 md:grid-cols-3 md:gap-5">
          {entries.map(({ project, index }) => (
            <li key={project.slug} className="relative isolate flex flex-col p-5 md:p-6">
              <Surface layout="grid" />
              <ProjectLink project={project} className="group block">
                <span className="meta tabular-nums text-glass-ink-2">{recordNumber(index)}</span>
                {/* Uppercase like the list row it flies into, so Flip only
                    scales the word and never changes its case mid-flight. */}
                <span
                  data-flip-id={project.slug}
                  className="mt-2 block origin-left text-[1.375rem] font-semibold uppercase leading-[0.95] tracking-[-0.03em] transition-transform duration-500 ease-out-expo group-hover:translate-x-1.5 reduced:transition-none md:w-fit md:text-[clamp(1.125rem,1.7vw,1.625rem)]"
                >
                  {project.name}
                </span>
                <span className="meta mt-2 block text-glass-ink-2">
                  {project.type} / {project.year}
                </span>
              </ProjectLink>
              <p data-grid-media className="mb-4 mt-3 max-w-[44ch] text-[0.8125rem] leading-snug text-glass-ink-2">
                {project.summary}
              </p>
              <DestinationLinks
                project={project}
                labels={copy.destinations}
                data-grid-media
                className="mt-auto border-t border-ink/10 pt-3.5"
              />
            </li>
          ))}
        </ol>
      ) : null}
    </div>
  );
}

/** One row per project. `onHover` feeds the desktop's trailing preview. */
export function IndexList({
  projects,
  copy,
  onHover,
  onLeave,
}: ViewProps & { readonly onHover?: (slug: string) => void; readonly onLeave?: () => void }) {
  return (
    <ol className="flex flex-col gap-2 px-5 pb-16 md:gap-2.5 md:px-8 md:pb-20" onPointerLeave={onLeave}>
      {projects.map((project, i) => (
        <li key={project.slug} className="relative isolate">
          {/* Each row a glass strip, faded with the list's other extras so
              the names fly into rows that frost in behind them. */}
          <Surface layout="list" className="rounded-glass-sm" />
          <ProjectLink
            project={project}
            onPointerEnter={onHover ? () => onHover(project.slug) : undefined}
            className="group grid grid-cols-12 items-baseline gap-x-5 px-4 py-5 md:px-6 md:py-6"
          >
            <span data-list-extra className="meta col-span-2 tabular-nums text-glass-ink-2 md:col-span-1">
              {recordNumber(i)}
            </span>
            {/* Seven columns at 4vw hold the longest name, "Meta Database
                Engineer", on one line at desktop widths. */}
            <span
              data-flip-id={project.slug}
              className="col-span-10 inline-block origin-left text-[clamp(1.75rem,4vw,4.5rem)] font-semibold uppercase leading-[0.9] tracking-[-0.04em] transition-transform duration-500 ease-out-expo group-hover:translate-x-2 reduced:transition-none md:col-span-7"
            >
              {project.name}
            </span>
            <span data-list-extra className="meta col-span-6 col-start-3 mt-3 md:col-span-3 md:col-start-auto md:mt-0">
              {project.category}
            </span>
            {/* Four columns on a phone: inside the strip's padding, two held "2026" and
                wrapped its open-ended dash and "Fall 2025" onto a second line. */}
            <span data-list-extra className="meta col-span-4 mt-3 whitespace-nowrap text-right tabular-nums md:col-span-1 md:mt-0">
              {project.year}
            </span>
          </ProjectLink>
          {hasCaseStudy(project) ? null : (
            <div data-list-extra className="-mt-2 grid grid-cols-12 gap-x-5 px-4 pb-5 md:-mt-3 md:px-6 md:pb-6">
              <DestinationLinks
                project={project}
                labels={copy.destinations}
                className="col-span-10 col-start-3 md:col-span-7 md:col-start-2"
              />
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}
