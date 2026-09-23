"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { DisplayTitle } from "@/components/DisplayTitle";
import { SharedMedia } from "@/components/PageTransition";
import { HomeMasthead } from "@/components/home/HomeMasthead";
import { blurFor, HERO_BRIGHTNESS, recordNumber } from "@/lib/media";
import { useHydrated, useMediaQuery } from "@/lib/motion";
import { DESKTOP_QUERY } from "@/lib/slider";
import { displayLinesOf, type Profile, type SelectedProject, type UiCopy } from "@/lib/types";

interface Props {
  readonly projects: readonly SelectedProject[];
  readonly copy: UiCopy["slider"];
  readonly profile: Profile;
}

/**
 * The home page for touch and narrow screens: full-height plates on native
 * vertical scroll-snap. The browser's own touch physics beat anything
 * simulated, and nothing here loads WebGL. The masthead rides in the first
 * plate and scrolls away with it; a counter tracks the plate on screen.
 */
export function MobileProjects({ projects, copy, profile }: Props) {
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  // See ProjectSlider: no plate claims the shared name until the device is
  // known, or hydration would briefly name both breakpoints' plates.
  const hydrated = useHydrated();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const plateRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = scrollerRef.current;
    if (isDesktop || !root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || !(entry.target instanceof HTMLElement)) continue;
          const index = Number(entry.target.dataset.index);
          if (Number.isInteger(index)) setActive(index);
        }
      },
      { root, threshold: 0.6 },
    );
    for (const plate of plateRefs.current) if (plate) observer.observe(plate);
    return () => observer.disconnect();
  }, [isDesktop]);

  return (
    <div className="desktop:hidden">
      <div
        ref={scrollerRef}
        role="region"
        aria-label={copy.region}
        data-lenis-prevent
        className="h-svh snap-y snap-mandatory overflow-y-auto overscroll-contain"
      >
        {projects.map((project, i) => (
          <section
            key={project.slug}
            ref={(plate) => {
              plateRefs.current[i] = plate;
            }}
            data-index={i}
            aria-label={project.name}
            className="relative flex h-svh snap-start flex-col justify-end overflow-hidden"
          >
            <SharedMedia slug={project.slug} enabled={hydrated && !isDesktop && i === active}>
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={project.hero.src}
                  alt={project.hero.alt}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  placeholder="blur"
                  blurDataURL={blurFor(project.hero.src)}
                  className="object-cover"
                  style={{ filter: `brightness(${HERO_BRIGHTNESS})` }}
                />
              </div>
            </SharedMedia>

            {i === 0 ? <HomeMasthead profile={profile} className="absolute inset-x-0 top-0 pt-14" /> : null}

            <div className="relative px-5 pb-12">
              <p className="meta tabular-nums text-paper">
                {recordNumber(i)} / {project.category}
              </p>
              <Link
                href={`/work/${project.slug}`}
                transitionTypes={["page"]}
                className="mt-4 block text-paper"
              >
                <DisplayTitle lines={displayLinesOf(project)} className="text-[15vw]" />
              </Link>
              <div className="meta mt-6 flex flex-wrap gap-x-6 gap-y-1 text-paper">
                <span className="tabular-nums">{project.year}</span>
                <span>{project.stack.slice(0, 3).join(" / ")}</span>
              </div>
            </div>
          </section>
        ))}
      </div>

      <p
        aria-hidden="true"
        className="meta pointer-events-none fixed bottom-12 right-5 z-10 text-right tabular-nums text-paper"
      >
        {recordNumber(active)} <span className="text-ink-muted">/ {recordNumber(projects.length - 1)}</span>
      </p>
    </div>
  );
}
