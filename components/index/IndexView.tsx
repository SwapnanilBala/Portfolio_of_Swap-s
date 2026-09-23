"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { SharedMedia } from "@/components/PageTransition";
import { ProjectCover } from "@/components/index/ProjectCover";
import { Flip, gsap, useGSAP } from "@/lib/gsap";
import { recordNumber } from "@/lib/media";
import { DURATION, EASE, useFinePointer, useReducedMotion } from "@/lib/motion";
import { hasCaseStudy, isResolvedLink, type Project, type UiCopy } from "@/lib/types";

type Layout = "grid" | "list";

interface Props {
  readonly projects: readonly Project[];
  readonly copy: UiCopy["index"];
}

/**
 * The loose asymmetric grid. Complete class strings, not assembled ones, so
 * Tailwind can see every class it has to generate. Each slot sets a column,
 * a span and a vertical offset; together they place two projects to a row at
 * different heights, which is where the negative space comes from.
 */
const GRID_SLOTS: readonly { readonly place: string; readonly aspect: string }[] = [
  { place: "md:col-start-1 md:col-span-5", aspect: "aspect-[4/3]" },
  { place: "md:col-start-8 md:col-span-4 md:mt-[18vh]", aspect: "aspect-[4/5]" },
  { place: "md:col-start-2 md:col-span-4 md:mt-[8vh]", aspect: "aspect-square" },
  { place: "md:col-start-7 md:col-span-6 md:mt-[24vh]", aspect: "aspect-[16/10]" },
  { place: "md:col-start-1 md:col-span-4 md:mt-[6vh]", aspect: "aspect-[4/3]" },
  { place: "md:col-start-7 md:col-span-3 md:mt-[14vh]", aspect: "aspect-[3/4]" },
];

function slotFor(index: number) {
  return GRID_SLOTS[index % GRID_SLOTS.length] ?? GRID_SLOTS[0];
}

/** Where a project opens: its case study, or its source when it has none. */
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
    return (
      <Link
        href={destination.href}
        transitionTypes={["page"]}
        className={className}
        onPointerEnter={onPointerEnter}
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
      duration: 0.35,
      ease: EASE.inOut,
      stagger: 0.03,
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
    Flip.from(state, {
      targets: names(),
      duration: 0.9,
      ease: EASE.inOut,
      scale: true,
      stagger: 0.03,
      onComplete: () => {
        busy.current = false;
      },
    });
    gsap.fromTo(
      arriving,
      { autoAlpha: 0, scale: layout === "grid" ? 0.96 : 1 },
      { autoAlpha: 1, scale: 1, duration: DURATION.meta, ease: EASE.out, stagger: 0.04, delay: 0.55 },
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
              className={`py-1 transition-opacity duration-300 ${
                layout === option ? "underline decoration-1 underline-offset-4" : "opacity-50 hover:opacity-100"
              }`}
            >
              {option === "grid" ? copy.grid : copy.list}
            </button>
          ))}
        </div>
        <span className="meta tabular-nums text-paper-muted">{recordNumber(projects.length - 1)}</span>
      </div>

      {layout === "grid" ? (
        <ol className="grid grid-cols-1 gap-x-5 gap-y-16 px-5 pb-32 pt-12 md:grid-cols-12 md:gap-y-0 md:px-8">
          {projects.map((project, i) => {
            const slot = slotFor(i);
            return (
              <li key={project.slug} className={slot?.place}>
                <ProjectLink project={project} className="group block" cursor="view">
                  <div data-grid-media className="overflow-hidden">
                    <SharedMedia slug={project.slug} enabled={hasCaseStudy(project)}>
                      <div className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.04] reduced:transition-none reduced:group-hover:scale-100">
                        <ProjectCover
                          project={project}
                          sizes="(min-width: 48rem) 42vw, 90vw"
                          className={slot?.aspect}
                        />
                      </div>
                    </SharedMedia>
                  </div>
                  <div className="meta mt-3 flex items-baseline justify-between gap-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1.5 reduced:transition-none">
                    <span className="flex items-baseline gap-2">
                      <span className="tabular-nums text-paper-muted">{recordNumber(i)}</span>
                      <span data-flip-id={project.slug} className="inline-block origin-left">
                        {project.name}
                      </span>
                    </span>
                    <span className="text-paper-muted">
                      {project.type} / {project.year}
                    </span>
                  </div>
                </ProjectLink>
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
                <span
                  data-flip-id={project.slug}
                  className="col-span-10 inline-block origin-left text-[clamp(1.75rem,5vw,5.25rem)] font-semibold uppercase leading-[0.9] tracking-[-0.04em] transition-transform duration-500 ease-out-expo group-hover:translate-x-2 reduced:transition-none md:col-span-6"
                >
                  {project.name}
                </span>
                <span data-list-extra className="meta col-span-8 col-start-3 mt-3 md:col-span-3 md:col-start-auto md:mt-0">
                  {project.category}
                </span>
                <span data-list-extra className="meta col-span-2 mt-3 text-right tabular-nums md:mt-0">
                  {project.year}
                </span>
              </ProjectLink>
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
                  <ProjectCover project={hoveredProject} sizes="22vw" className="aspect-[4/3]" />
                </div>
              </SharedMedia>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
