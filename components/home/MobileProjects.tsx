"use client";

import { getImageProps } from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { DisplayTitle } from "@/components/DisplayTitle";
import { SharedMedia } from "@/components/PageTransition";
import { HomeMasthead } from "@/components/home/HomeMasthead";
import {
  blurFor,
  HERO_BRIGHTNESS,
  PHONE_QUALITY,
  PLATE_SIZES,
  recordNumber,
  SCREENSHOT_QUALITY,
  TRANSPARENT_PIXEL,
} from "@/lib/media";
import { useHydrated, useMediaQuery } from "@/lib/motion";
import { DESKTOP_QUERY } from "@/lib/slider";
import { displayLinesOf, type Profile, type SelectedProject, type UiCopy } from "@/lib/types";

interface Props {
  readonly projects: readonly SelectedProject[];
  readonly copy: UiCopy["slider"];
  readonly profile: Profile;
}

/**
 * The phone capture on a portrait screen, the desktop capture on a landscape
 * one -- a portrait plate cut from a landscape capture keeps only a sliver of
 * its middle, and the reverse keeps only the top of the phone layout.
 *
 * The first plate is the phone's largest paint, so it loads eagerly: lazy, its
 * render waited on hydration for 2.6s on a throttled phone. Eager would make
 * desktops, where this layout is hidden, download it too -- so on the desktop
 * query the picture resolves to a transparent pixel instead. The other plates
 * stay lazy, which a hidden layout never triggers. Every capture is a
 * <source> and the <img>'s own is the pixel too (see TRANSPARENT_PIXEL).
 */
function PhonePlate({ project, first }: { readonly project: SelectedProject; readonly first: boolean }) {
  const sizes = PLATE_SIZES.phone;
  const {
    props: { srcSet: landscape },
  } = getImageProps({
    src: project.hero.src,
    alt: "",
    width: project.hero.width,
    height: project.hero.height,
    sizes,
    quality: SCREENSHOT_QUALITY,
  });
  const { props: portrait } = getImageProps({
    src: project.heroMobile.src,
    alt: project.heroMobile.alt,
    width: project.heroMobile.width,
    height: project.heroMobile.height,
    sizes,
    quality: PHONE_QUALITY,
    loading: first ? "eager" : "lazy",
    // The others would otherwise download alongside the first -- they sit
    // within the browser's lazy-load distance -- and share its bandwidth.
    fetchPriority: first ? "high" : "low",
    placeholder: "blur",
    blurDataURL: blurFor(project.heroMobile.src),
    style: {
      objectFit: "cover",
      objectPosition: "top",
      filter: `brightness(${HERO_BRIGHTNESS})`,
    },
  });
  const { srcSet: portraitSet, ...fallback } = portrait;
  return (
    <picture>
      {first ? <source media={DESKTOP_QUERY} srcSet={TRANSPARENT_PIXEL} /> : null}
      <source media="(orientation: landscape)" srcSet={landscape} sizes={sizes} />
      <source srcSet={portraitSet} sizes={sizes} />
      <img
        {...fallback}
        src={TRANSPARENT_PIXEL}
        sizes={undefined}
        alt={project.heroMobile.alt}
        draggable={false}
        className="absolute inset-0 size-full"
      />
    </picture>
  );
}

/**
 * The home page for touch and narrow screens: one framed plate per screen on
 * native vertical scroll-snap. The browser's own touch physics beat anything
 * simulated, and nothing here loads WebGL. The masthead opens the first
 * screen and scrolls away with it; a counter tracks the screen in view.
 */
export function MobileProjects({ projects, copy, profile }: Props) {
  const router = useRouter();
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  // See ProjectSlider: no plate claims the shared name until the device is
  // known, or hydration would briefly name both breakpoints' plates.
  const hydrated = useHydrated();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const screenRefs = useRef<(HTMLElement | null)[]>([]);
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
    for (const screen of screenRefs.current) if (screen) observer.observe(screen);
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
            ref={(screen) => {
              screenRefs.current[i] = screen;
            }}
            data-index={i}
            aria-label={project.name}
            className="relative flex h-svh snap-start flex-col overflow-hidden pb-10"
          >
            {i === 0 ? <HomeMasthead profile={profile} className="shrink-0 px-5 pt-16" /> : null}

            <SharedMedia slug={project.slug} enabled={hydrated && !isDesktop && i === active}>
              {/* A tap on the plate opens the project too. The title below is
                  the link keyboards and screen readers use, so the plate is
                  not a second one. */}
              <div
                onClick={() => router.push(`/work/${project.slug}`, { transitionTypes: ["page"] })}
                className={`relative mx-5 min-h-0 flex-1 overflow-hidden bg-ink ${i === 0 ? "mt-6" : "mt-16"}`}
              >
                <PhonePlate project={project} first={i === 0} />
              </div>
            </SharedMedia>

            <div className="relative -mt-7 px-5">
              <Link href={`/work/${project.slug}`} transitionTypes={["page"]} className="block text-paper">
                <DisplayTitle lines={displayLinesOf(project)} className="text-[15vw]" />
              </Link>
              <div className="meta mt-4 grid gap-y-1 text-paper">
                <p className="flex gap-x-6 tabular-nums">
                  <span>
                    {recordNumber(i)} / {project.category}
                  </span>
                  <span>{project.year}</span>
                </p>
                <p className="pr-16">{project.stack.slice(0, 3).join(" / ")}</p>
              </div>
            </div>
          </section>
        ))}
      </div>

      <p
        aria-hidden="true"
        className="meta pointer-events-none fixed bottom-10 right-5 z-10 text-right tabular-nums text-paper"
      >
        {recordNumber(active)} <span className="text-ink-muted">/ {recordNumber(projects.length - 1)}</span>
      </p>
    </div>
  );
}
