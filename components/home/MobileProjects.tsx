"use client";

import { getImageProps } from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { DisplayTitle } from "@/components/DisplayTitle";
import { SharedMedia } from "@/components/PageTransition";
import { LiveSiteLink } from "@/components/home/LiveSiteLink";
import {
  blurFor,
  HERO_BRIGHTNESS,
  PHONE_QUALITY,
  PLATE_SIZES,
  recordNumber,
  SCREENSHOT_QUALITY,
  TRANSPARENT_PIXEL,
} from "@/lib/media";
import { useHydrated, useMediaQuery, useReducedMotion } from "@/lib/motion";
import { DESKTOP_QUERY } from "@/lib/slider";
import { displayLinesOf, liveLinkOf, type SelectedProject, type UiCopy } from "@/lib/types";

interface Props {
  readonly projects: readonly SelectedProject[];
  readonly copy: UiCopy["slider"];
  /** The live site's label, shared with the case studies' links. */
  readonly liveLabel: string;
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
 * The Projects page for touch and narrow screens, as on desktop: one plate
 * and the projects listed by name. The first screen is the plate on stage in
 * its bezel, under the nav, and the live site and the case study under it;
 * the list follows, and a tap on a name brings its plate on stage and scrolls
 * back up to it. Nothing here loads WebGL, and the browser's own scrolling
 * does the rest. A phone on its side (`short:`) sets the plate beside its
 * links instead.
 */
export function MobileProjects({ projects, copy, liveLabel }: Props) {
  const router = useRouter();
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  // See ProjectSlider: no plate claims the shared name until the device is
  // known, or hydration would briefly name both breakpoints' plates.
  const hydrated = useHydrated();
  const reduced = useReducedMotion();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = projects.length;
  const current = projects[active];
  const live = current ? liveLinkOf(current) : undefined;
  const announcement = current
    ? copy.announce
        .replace("{index}", String(active + 1))
        .replace("{total}", String(count))
        .replace("{name}", current.name)
    : "";

  const choose = (index: number) => {
    setActive(index);
    scrollerRef.current?.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <div className="projects-frame desktop:hidden">
      <div
        ref={scrollerRef}
        role="region"
        aria-label={copy.region}
        data-lenis-prevent
        className="h-svh overflow-y-auto overscroll-contain"
      >
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {announcement}
        </p>

        <h1 className="sr-only">{copy.heading}</h1>

        {/* The first screen. On a short landscape screen it is a grid: the
            plate down the left, the links at the foot of the right. */}
        <div className="flex min-h-svh flex-col short:grid short:h-svh short:min-h-0 short:grid-cols-[auto_minmax(0,1fr)] short:grid-rows-[auto_1fr] short:gap-x-5 short:px-5 short:pb-5 short:pt-16 short:[--plate-w:min(50vw-2*var(--bezel),(100svh-5.25rem-2*var(--bezel))*1.6,100vw-3.75rem-17.5rem-2*var(--bezel))]">
          {/* The plate on stage, and the line under it. On a short landscape
              screen the plate is 16:10, the capture's own shape, and ends on
              the links' bottom line: half the width, as much as the height
              under the nav allows, and never so much that the links' column
              falls under 17.5rem (after 3.75rem of gutters and gap, and the
              bezel's ring on both sides) -- the clinic's address in the live
              link needs about 17rem on one line. */}
          <div className="flex min-h-0 flex-1 flex-col pb-5 short:contents">
            <div className="glass-bezel mx-5 mt-16 flex min-h-64 flex-1 flex-col short:col-start-1 short:row-span-2 short:row-start-1 short:m-0 short:min-h-0 short:flex-none short:self-end">
              {/* A tap on the plate opens the project too. The link under it
                  is the one keyboards and screen readers use, so the plate is
                  not a second one. */}
              <div
                onClick={() => {
                  if (current) router.push(`/work/${current.slug}`, { transitionTypes: ["page"] });
                }}
                className="relative min-h-0 flex-1 overflow-hidden rounded-(--plate-r) bg-ink short:aspect-[16/10] short:w-(--plate-w) short:flex-none"
              >
                {/* Every plate is here, stacked; the one on stage shows. The
                    view-transition name is the image's, inside the bezel,
                    and only the plate on stage carries it. */}
                {projects.map((project, i) => (
                  <SharedMedia key={project.slug} slug={project.slug} enabled={hydrated && !isDesktop && i === active}>
                    <div
                      aria-hidden={i !== active}
                      className={`absolute inset-0 transition-opacity duration-500 ease-out-expo reduced:transition-none ${i === active ? "opacity-100" : "opacity-0"}`}
                    >
                      <PhonePlate project={project} first={i === 0} />
                    </div>
                  </SharedMedia>
                ))}
              </div>
            </div>

            {current ? (
              <div className="grid gap-y-3 px-5 pt-3 short:col-start-2 short:row-start-2 short:min-w-0 short:self-end short:px-0 short:pt-0">
                {live ? (
                  <LiveSiteLink
                    href={live.href}
                    label={liveLabel}
                    project={current.name}
                    className="h-14 w-full px-4 text-[0.9375rem]"
                  />
                ) : null}
                <Link
                  href={`/work/${current.slug}`}
                  transitionTypes={["page"]}
                  className="meta justify-self-start py-1 text-paper underline decoration-1 underline-offset-4"
                >
                  {copy.open}
                </Link>
              </div>
            ) : null}
          </div>
        </div>

        {/* The projects by name, as on desktop. The row on stage is lit and
            carries its category, year and stack; a tap on another brings its
            plate on stage. */}
        <nav aria-label={copy.rail} className="glass-dark mx-5 mb-10 mt-5 p-2">
          <ol className="grid gap-1">
            {projects.map((project, i) => {
              const on = i === active;
              return (
                <li key={project.slug}>
                  <button
                    type="button"
                    onClick={() => choose(i)}
                    aria-label={copy.thumbnail.replace("{name}", project.name)}
                    aria-current={on ? "true" : undefined}
                    className={`grid w-full grid-cols-[2rem_minmax(0,1fr)] rounded-glass-sm px-3.5 pb-4 pt-3.5 text-left transition-[color,background-color,box-shadow] duration-500 ease-out-expo focus-visible:outline-paper ${
                      on
                        ? "bg-white/[0.09] text-paper shadow-[inset_0_1px_0_var(--color-glass-shine-dark),inset_0_0_0_1px_var(--color-glass-dark-edge)]"
                        : "text-paper/62"
                    }`}
                  >
                    <span className={`meta pt-[0.3em] tabular-nums ${on ? "" : "text-paper/80"}`}>{recordNumber(i)}</span>
                    <span className="min-w-0">
                      {/* "KB Patient" on one line in the narrowest row. */}
                      <DisplayTitle
                        as="span"
                        lines={displayLinesOf(project)}
                        className="whitespace-nowrap text-[min(9.5vw,3rem)]"
                      />
                      <span className={`grid transition-[grid-template-rows] duration-500 ease-out-expo ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                        <span className="overflow-hidden">
                          <span className="meta block pt-3 tabular-nums">
                            {project.category} / {project.year}
                          </span>
                          <span className="meta block pt-1 text-paper/90">{project.stack.slice(0, 3).join(" / ")}</span>
                        </span>
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
          <p aria-hidden="true" className="meta px-3.5 pb-1.5 pt-3 tabular-nums text-paper">
            {recordNumber(active)} <span className="text-glass-paper-2">/ {recordNumber(count - 1)}</span>
          </p>
        </nav>
      </div>
    </div>
  );
}
