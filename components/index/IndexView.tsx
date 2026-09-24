"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { SharedMedia } from "@/components/PageTransition";
import { IndexGrid, IndexList, IndexToggle, type Layout } from "@/components/index/parts";
import { ProjectCover } from "@/components/index/ProjectCover";
import { Flip, gsap, useGSAP } from "@/lib/gsap";
import { DURATION, EASE, useFinePointer, useReducedMotion } from "@/lib/motion";
import { hasCaseStudy, type Project, type UiCopy } from "@/lib/types";

interface Props {
  readonly projects: readonly Project[];
  readonly copy: UiCopy["index"];
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
      <IndexToggle layout={layout} onSwitch={switchTo} copy={copy} count={projects.length} />

      {layout === "grid" ? (
        <IndexGrid projects={projects} copy={copy} />
      ) : (
        <IndexList
          projects={projects}
          copy={copy}
          onHover={setHovered}
          onLeave={() => setHovered(null)}
        />
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
