"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { SharedMedia } from "@/components/PageTransition";
import { ProjectCover } from "@/components/index/ProjectCover";
import { Flip, gsap, useGSAP } from "@/lib/gsap";
import { recordNumber } from "@/lib/media";
import { warmCaseHero } from "@/lib/preload";
import { DURATION, EASE, useFinePointer, useReducedMotion } from "@/lib/motion";
import { hasCaseStudy, isResolvedLink, type LinkRole, type Project, type UiCopy } from "@/lib/types";

type Layout = "grid" | "list";

interface Props {
  readonly projects: readonly Project[];
  readonly copy: UiCopy["index"];
}

interface GridSlot {
  /** Column start, span and vertical offset at each breakpoint. */
  readonly place: string;
  /** Shape of a typographic plate here; captures keep their own ratio. */
  readonly aspect: string;
  /** The slot's rendered width, for next/image. */
  readonly sizes: string;
}

/**
 * The loose asymmetric grid: three projects to a row from 64rem, two from
 * 48rem, one below, each at its own width and height so no two rows repeat.
 * Complete class strings, not assembled ones, so Tailwind can see every class
 * it has to generate. Offsets are in vw: the grid is sized by width, and vh
 * offsets ballooned on a tall window until a row held one project.
 */
const GRID_SLOTS: readonly GridSlot[] = [
  {
    place: "col-span-12 md:col-span-7 md:col-start-1 lg:col-span-5 lg:col-start-1",
    aspect: "aspect-[4/3]",
    sizes: "(min-width: 64rem) 39vw, (min-width: 48rem) 54vw, 90vw",
  },
  {
    place: "col-span-10 col-start-3 md:col-span-4 md:col-start-9 md:mt-[14vw] lg:col-span-3 lg:col-start-7 lg:mt-[9vw]",
    aspect: "aspect-[4/5]",
    sizes: "(min-width: 64rem) 26vw, (min-width: 48rem) 32vw, 75vw",
  },
  {
    place: "col-span-12 md:col-span-5 md:col-start-2 md:mt-[5vw] lg:col-span-3 lg:col-start-10 lg:mt-[3vw]",
    aspect: "aspect-[4/3]",
    sizes: "(min-width: 64rem) 26vw, (min-width: 48rem) 40vw, 90vw",
  },
  {
    place: "col-span-8 md:col-span-4 md:col-start-8 md:mt-[12vw] lg:col-span-3 lg:col-start-2 lg:mt-[7vw]",
    aspect: "aspect-[4/5]",
    sizes: "(min-width: 64rem) 26vw, (min-width: 48rem) 32vw, 60vw",
  },
  {
    place: "col-span-10 col-start-3 md:col-span-5 md:col-start-1 md:mt-[4vw] lg:col-span-4 lg:col-start-6 lg:mt-[2vw]",
    aspect: "aspect-[4/3]",
    sizes: "(min-width: 64rem) 32vw, (min-width: 48rem) 40vw, 75vw",
  },
  {
    place: "col-span-7 md:col-span-3 md:col-start-8 md:mt-[9vw] lg:col-span-2 lg:col-start-11 lg:mt-[11vw]",
    aspect: "aspect-[3/4]",
    sizes: "(min-width: 64rem) 19vw, (min-width: 48rem) 24vw, 52vw",
  },
];

function slotFor(index: number) {
  return GRID_SLOTS[index % GRID_SLOTS.length] ?? GRID_SLOTS[0];
}

/** Where a project opens: its case study, or its first link when it has none. */
function destinationOf(project: Project): { href: string; internal: boolean } | null {
  if (hasCaseStudy(project)) return { href: `/work/${project.slug}`, internal: true };
  const link = project.links.find(isResolvedLink);
  return link ? { href: link.href, internal: false } : null;
}

function ProjectLink({
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
 * link -- the certificate, the repository -- side by side under the tile, so a
 * second destination is not hidden behind the first. Outside the tile's own
 * link, which cannot contain another. The accessible name adds the project, so
 * links read out of context are not a run of "Repository".
 */
function DestinationLinks({
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
    <ul className={`meta grid auto-cols-fr grid-flow-col divide-x divide-paper-rule ${className}`} {...rest}>
      {links.map((link) => (
        <li key={link.role} className="px-3 first:pl-0 last:pr-0">
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${labels[link.role]}, ${project.name}`}
            className="inline-block py-1 underline decoration-1 underline-offset-4 transition-colors duration-300 hover:text-paper-muted"
          >
            {labels[link.role]}
          </a>
        </li>
      ))}
    </ul>
  );
}

/**
 * The archive, as a grid or as a list, animated between the two rather than
 * cut. GSAP Flip matches elements across the layouts by `data-flip-id`: going
 * to the list, the grid's images fade out first and then each small label
 * flies and scales into its row's large name; going back, the names return
 * and the images come in behind them.
 *
 * In list view a preview follows the pointer. It carries the shared
 * view-transition name of the hovered project, so opening a row morphs that
 * preview into the case-study hero.
 */
export function IndexView({ projects, copy }: Props) {
  const [layout, setLayout] = useState<Layout>("grid");
  const [hovered, setHovered] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const pendingFlip = useRef<Flip.FlipState | null>(null);
  const busy = useRef(false);
  const reduced = useReducedMotion();
  const fine = useFinePointer();

  const names = () => rootRef.current?.querySelectorAll<HTMLElement>("[data-flip-id]") ?? [];

  const switchTo = (next: Layout) => {
    if (next === layout || busy.current) return;
    if (reduced) {
      setLayout(next);
      return;
    }
    busy.current = true;
    const commit = () => {
      pendingFlip.current = Flip.getState(names());
      setLayout(next);
    };
    const leaving =
      rootRef.current?.querySelectorAll<HTMLElement>(
        layout === "grid" ? "[data-grid-media]" : "[data-list-extra]",
      ) ?? [];
    if (leaving.length === 0) {
      commit();
      return;
    }
    gsap.to(leaving, {
      autoAlpha: 0,
      scale: layout === "grid" ? 0.96 : 1,
      duration: DURATION.micro,
      ease: EASE.inOut,
      stagger: 0.02,
      onComplete: commit,
    });
  };

  // After React has rendered the new layout: fly the names from where they
  // were, then bring in whatever only this layout has.
  useLayoutEffect(() => {
    const state = pendingFlip.current;
    if (!state) return;
    pendingFlip.current = null;
    // Flip only calls onComplete when it animated something; this makes sure
    // the toggle can never stay locked if it had nothing to move.
    const unlock = window.setTimeout(() => {
      busy.current = false;
    }, 1400);
    const arriving =
      rootRef.current?.querySelectorAll<HTMLElement>(
        layout === "grid" ? "[data-grid-media]" : "[data-list-extra]",
      ) ?? [];
    gsap.set(arriving, { autoAlpha: 0 });
    // About 1.4s end to end, the fade out included: large motion, but a
    // layout toggle should not outlast a page transition by much.
    Flip.from(state, {
      targets: names(),
      duration: DURATION.layout,
      ease: EASE.inOut,
      scale: true,
      stagger: 0.02,
      onComplete: () => {
        busy.current = false;
      },
    });
    gsap.fromTo(
      arriving,
      { autoAlpha: 0, scale: layout === "grid" ? 0.96 : 1 },
      { autoAlpha: 1, scale: 1, duration: DURATION.meta, ease: EASE.out, stagger: 0.03, delay: 0.4 },
    );
    return () => window.clearTimeout(unlock);
  }, [layout]);

  // The preview trails the pointer in list view.
  useGSAP(
    () => {
      const preview = previewRef.current;
      const root = rootRef.current;
      if (layout !== "list" || !fine || !preview || !root) return;
      const duration = reduced ? 0 : 0.55;
      const xTo = gsap.quickTo(preview, "x", { duration, ease: "power3.out" });
      const yTo = gsap.quickTo(preview, "y", { duration, ease: "power3.out" });
      const onMove = (event: PointerEvent) => {
        xTo(event.clientX);
        yTo(event.clientY);
      };
      root.addEventListener("pointermove", onMove);
      return () => root.removeEventListener("pointermove", onMove);
    },
    { dependencies: [layout, fine, reduced], scope: rootRef },
  );

  const hoveredProject = projects.find((project) => project.slug === hovered) ?? null;

  return (
    <div ref={rootRef}>
      <div className="flex items-center justify-between border-b border-paper-rule px-5 py-3 md:px-8">
        <div role="group" aria-label={copy.toggle} className="meta flex gap-5">
          {(["grid", "list"] as const).map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={layout === option}
              onClick={() => switchTo(option)}
              // Dimmed by colour, not opacity: ink at half opacity on paper is
              // 3.4:1, under AA for text this size; paper-muted is 5.8:1.
              className={`py-1 transition-colors duration-300 ${
                layout === option ? "underline decoration-1 underline-offset-4" : "text-paper-muted hover:text-ink"
              }`}
            >
              {option === "grid" ? copy.grid : copy.list}
            </button>
          ))}
        </div>
        <span className="meta tabular-nums text-paper-muted">{recordNumber(projects.length - 1)}</span>
      </div>

      {layout === "grid" ? (
        <ol className="grid grid-cols-12 gap-x-5 gap-y-14 px-5 pb-32 pt-12 md:gap-y-[4vw] md:px-8">
          {projects.map((project, i) => {
            const slot = slotFor(i);
            return (
              <li key={project.slug} className={slot?.place}>
                <ProjectLink project={project} className="group block" cursor="view">
                  <div data-grid-media data-cursor-frame className="overflow-hidden">
                    <SharedMedia slug={project.slug} enabled={hasCaseStudy(project)}>
                      <div className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.04] reduced:transition-none reduced:group-hover:scale-100">
                        <ProjectCover
                          project={project}
                          sizes={slot?.sizes ?? "90vw"}
                          aspect={slot?.aspect}
                          eager={i === 0}
                        />
                      </div>
                    </SharedMedia>
                  </div>
                  {/* Stacked, not name-left and type-right: in a narrow slot the
                      two sides wrapped into each other. The name hugs its text
                      (justify-self-start), because Flip scales that box into
                      the list row's name. */}
                  <div className="meta mt-3 grid grid-cols-[auto_1fr] items-baseline gap-x-2 gap-y-1 transition-transform duration-500 ease-out-expo group-hover:translate-x-1.5 reduced:transition-none">
                    <span className="tabular-nums text-paper-muted">{recordNumber(i)}</span>
                    <span data-flip-id={project.slug} className="inline-block origin-left justify-self-start">
                      {project.name}
                    </span>
                    <span className="col-start-2 text-paper-muted">
                      {project.type} / {project.year}
                    </span>
                  </div>
                </ProjectLink>
                <DestinationLinks
                  project={project}
                  labels={copy.destinations}
                  data-grid-media
                  className="mt-3 border-t border-paper-rule pt-2"
                />
              </li>
            );
          })}
        </ol>
      ) : (
        <ol className="px-5 pb-32 md:px-8" onPointerLeave={() => setHovered(null)}>
          {projects.map((project, i) => (
            <li key={project.slug} className="border-b border-paper-rule">
              <ProjectLink
                project={project}
                onPointerEnter={() => setHovered(project.slug)}
                className="group grid grid-cols-12 items-baseline gap-x-5 py-5 md:py-6"
              >
                <span data-list-extra className="meta col-span-2 tabular-nums text-paper-muted md:col-span-1">
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
                <span data-list-extra className="meta col-span-8 col-start-3 mt-3 md:col-span-3 md:col-start-auto md:mt-0">
                  {project.category}
                </span>
                <span data-list-extra className="meta col-span-2 mt-3 text-right tabular-nums md:col-span-1 md:mt-0">
                  {project.year}
                </span>
              </ProjectLink>
              {hasCaseStudy(project) ? null : (
                <div data-list-extra className="-mt-2 grid grid-cols-12 gap-x-5 pb-5 md:-mt-3 md:pb-6">
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
      )}

      {layout === "list" && fine ? (
        <div
          ref={previewRef}
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-40"
        >
          <div
            className={`w-[22vw] -translate-x-1/2 -translate-y-1/2 transition-[opacity,scale] duration-500 ease-out-expo reduced:transition-none ${
              hoveredProject ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}
          >
            {hoveredProject ? (
              <SharedMedia slug={hoveredProject.slug} enabled={hasCaseStudy(hoveredProject)}>
                <div>
                  <ProjectCover project={hoveredProject} sizes="22vw" />
                </div>
              </SharedMedia>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
