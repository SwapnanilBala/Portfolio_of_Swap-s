"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { DisplayTitle } from "@/components/DisplayTitle";
import { SharedMedia } from "@/components/PageTransition";
import { ProjectThumbnailRail } from "@/components/home/ProjectThumbnailRail";
import { gsap, useGSAP } from "@/lib/gsap";
import { blurFor, HERO_BRIGHTNESS, HERO_ZOOM, recordNumber } from "@/lib/media";
import { DURATION, EASE, META_LAG, useMediaQuery, useReducedMotion } from "@/lib/motion";
import {
  clamp,
  DESKTOP_QUERY,
  SLIDE_SPACING,
  slideOffset,
  wrapIndex,
  type SliderMotion,
} from "@/lib/slider";
import { displayLinesOf, type SelectedProject, type UiCopy } from "@/lib/types";

// three.js only ever loads here, and only once the desktop slider decides to
// use it -- never on the other pages, and never on touch devices.
const SliderCanvas = dynamic(
  () => import("@/components/home/SliderCanvas").then((mod) => mod.SliderCanvas),
  { ssr: false },
);

interface Props {
  readonly projects: readonly SelectedProject[];
  readonly copy: UiCopy["slider"];
}

let webglSupport: boolean | null = null;
function detectWebGL(): boolean {
  if (webglSupport === null) {
    try {
      const canvas = document.createElement("canvas");
      webglSupport = Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
    } catch {
      webglSupport = false;
    }
  }
  return webglSupport;
}
const noopSubscribe = () => () => {};

/** Lerp factor per frame: the inertia the whole slider moves with. */
const FOLLOW = 0.085;
/** After this long without input, the slider settles on the nearest plate. */
const SETTLE_MS = 160;

/**
 * The desktop home page: a looping horizontal run of full-bleed project
 * plates, driven by drag, wheel, arrow keys and the thumbnail rail.
 *
 * One physics loop on GSAP's ticker owns the state -- a target position, a
 * current position that follows it with inertia, and the velocity between
 * them -- and shares it by reference with the WebGL layer, which only draws.
 * The DOM plates underneath are the no-WebGL and reduced-motion path, the
 * largest-contentful-paint frame, and the element a page transition morphs
 * from, so they are always rendered and always in position.
 */
export function ProjectSlider({ projects, copy }: Props) {
  const router = useRouter();
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const reduced = useReducedMotion();
  const webgl = useSyncExternalStore(noopSubscribe, detectWebGL, () => false);
  const [canvasLost, setCanvasLost] = useState(false);
  const useCanvas = isDesktop && !reduced && webgl && !canvasLost;
  const count = projects.length;
  // Stable across renders: the canvas rebuilds its whole scene when this
  // reference changes, and the slider re-renders on every plate change.
  const sources = useMemo(() => projects.map((project) => project.hero), [projects]);

  const regionRef = useRef<HTMLElement>(null);
  const plateRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const motion = useRef<SliderMotion>({ current: 0, velocity: 0, hover: 0 });
  const target = useRef(0);
  const lastInput = useRef(0);
  const gestureOrigin = useRef(0);
  const dragging = useRef(false);
  const activeRef = useRef(0);
  const previousActive = useRef(0);

  const [active, setActive] = useState(0);
  const [canvasReady, setCanvasReady] = useState(false);

  /** Move to a plate by the shortest way round the loop. */
  const goTo = useCallback(
    (index: number) => {
      const from = Math.round(target.current);
      target.current = from + slideOffset(index, from, count);
      lastInput.current = performance.now();
    },
    [count],
  );

  const step = useCallback((delta: number) => {
    target.current = Math.round(target.current) + delta;
    lastInput.current = performance.now();
  }, []);

  const openActive = useCallback(() => {
    const project = projects[activeRef.current];
    if (project) router.push(`/work/${project.slug}`, { transitionTypes: ["page"] });
  }, [projects, router]);

  // The physics loop.
  useEffect(() => {
    if (!isDesktop) return;
    const tick = () => {
      const state = motion.current;
      const previous = state.current;
      if (!dragging.current && performance.now() - lastInput.current > SETTLE_MS) {
        target.current = Math.round(target.current);
      }
      if (reduced) {
        state.current = target.current;
      } else {
        state.current += (target.current - state.current) * FOLLOW;
        if (Math.abs(target.current - state.current) < 0.0004) state.current = target.current;
      }
      state.velocity = state.current - previous;

      plateRefs.current.forEach((plate, i) => {
        if (!plate) return;
        const offset = slideOffset(i, state.current, count);
        plate.style.transform = `translate3d(${offset * SLIDE_SPACING * 100}%, 0, 0)`;
        plate.style.visibility = Math.abs(offset) < 1.25 ? "visible" : "hidden";
      });

      const index = wrapIndex(Math.round(state.current), count);
      if (index !== activeRef.current) {
        activeRef.current = index;
        setActive(index);
      }
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, [isDesktop, reduced, count]);

  // Input: wheel, drag with a flick, hover, keyboard.
  useEffect(() => {
    const region = regionRef.current;
    if (!isDesktop || !region) return;

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const now = performance.now();
      // A new gesture starts after a pause. A single gesture -- including a
      // trackpad's long momentum tail -- can move at most one plate, so a
      // flick never skips past everything.
      if (now - lastInput.current > 220) gestureOrigin.current = Math.round(target.current);
      const raw = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      const pixels = event.deltaMode === 1 ? raw * 16 : raw;
      const next = target.current + clamp(pixels, -120, 120) * 0.0025;
      target.current = clamp(next, gestureOrigin.current - 1, gestureOrigin.current + 1);
      lastInput.current = now;
    };

    let pointerId = -1;
    let startX = 0;
    let startTarget = 0;
    let lastX = 0;
    let lastTime = 0;
    let speed = 0;
    let travel = 0;
    let downAt = 0;

    const onDown = (event: PointerEvent) => {
      if (event.button !== 0 || !event.isPrimary) return;
      // Links and buttons inside the slider keep their own clicks.
      if (event.target instanceof Element && event.target.closest("a, button")) return;
      pointerId = event.pointerId;
      region.setPointerCapture(pointerId);
      dragging.current = true;
      startX = lastX = event.clientX;
      startTarget = target.current;
      lastTime = downAt = event.timeStamp;
      speed = 0;
      travel = 0;
    };

    const onMove = (event: PointerEvent) => {
      if (!dragging.current || event.pointerId !== pointerId) return;
      const dx = event.clientX - startX;
      travel = Math.max(travel, Math.abs(dx));
      target.current = startTarget - (dx / window.innerWidth) * 1.1;
      const dt = event.timeStamp - lastTime;
      if (dt > 0) speed = (event.clientX - lastX) / dt;
      lastX = event.clientX;
      lastTime = event.timeStamp;
      lastInput.current = performance.now();
    };

    const onUp = (event: PointerEvent) => {
      if (!dragging.current || event.pointerId !== pointerId) return;
      dragging.current = false;
      if (region.hasPointerCapture(pointerId)) region.releasePointerCapture(pointerId);
      // A press that barely moved is a click: open what is on screen.
      if (travel < 6 && event.timeStamp - downAt < 350) {
        openActive();
        return;
      }
      target.current = Math.round(target.current + clamp(-speed * 0.35, -1, 1));
      lastInput.current = performance.now();
    };

    const onEnter = () => gsap.to(motion.current, { hover: 1, duration: 0.6, ease: EASE.out });
    const onLeave = () => gsap.to(motion.current, { hover: 0, duration: 0.6, ease: EASE.out });

    const onKey = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
        case "PageDown":
          event.preventDefault();
          step(1);
          break;
        case "ArrowLeft":
        case "ArrowUp":
        case "PageUp":
          event.preventDefault();
          step(-1);
          break;
        case "Home":
          event.preventDefault();
          goTo(0);
          break;
        case "End":
          event.preventDefault();
          goTo(count - 1);
          break;
        case "Enter":
          // Only when nothing else has focus: a focused link or button keeps
          // its own Enter.
          if (event.target === region || event.target === document.body) {
            event.preventDefault();
            openActive();
          }
          break;
      }
    };

    region.addEventListener("wheel", onWheel, { passive: false });
    region.addEventListener("pointerdown", onDown);
    region.addEventListener("pointermove", onMove);
    region.addEventListener("pointerup", onUp);
    region.addEventListener("pointercancel", onUp);
    region.addEventListener("pointerenter", onEnter);
    region.addEventListener("pointerleave", onLeave);
    window.addEventListener("keydown", onKey);
    return () => {
      region.removeEventListener("wheel", onWheel);
      region.removeEventListener("pointerdown", onDown);
      region.removeEventListener("pointermove", onMove);
      region.removeEventListener("pointerup", onUp);
      region.removeEventListener("pointercancel", onUp);
      region.removeEventListener("pointerenter", onEnter);
      region.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("keydown", onKey);
    };
  }, [isDesktop, count, goTo, step, openActive]);

  // First reveal: the opening title rises into place once, on arrival.
  useGSAP(
    () => {
      if (!isDesktop) return;
      titleRefs.current.forEach((wrapper, i) => {
        if (wrapper && i !== activeRef.current) gsap.set(wrapper, { autoAlpha: 0 });
      });
      const first = titleRefs.current[activeRef.current];
      if (!first) return;
      first.dataset.revealed = "";
      if (reduced) return;
      gsap.from(first.querySelectorAll("[data-line]"), {
        yPercent: 110,
        duration: DURATION.title,
        ease: EASE.out,
        stagger: 0.07,
        delay: 0.25,
      });
      gsap.from(first.querySelectorAll("[data-title-meta]"), {
        autoAlpha: 0,
        y: 10,
        duration: DURATION.meta,
        ease: EASE.out,
        delay: 0.25 + META_LAG + 0.2,
      });
    },
    { dependencies: [isDesktop], scope: regionRef },
  );

  // Every change after that: the old title leaves in the direction of travel,
  // the new one arrives behind it, and the metadata trails the title.
  useGSAP(
    () => {
      const from = previousActive.current;
      const to = active;
      if (from === to || !isDesktop) return;
      previousActive.current = to;

      const outgoing = titleRefs.current[from];
      const incoming = titleRefs.current[to];
      if (!outgoing || !incoming) return;
      const outLines = outgoing.querySelectorAll("[data-line]");
      const inLines = incoming.querySelectorAll("[data-line]");
      const outMeta = outgoing.querySelectorAll("[data-title-meta]");
      const inMeta = incoming.querySelectorAll("[data-title-meta]");
      incoming.dataset.revealed = "";

      gsap.killTweensOf([outgoing, incoming, ...outLines, ...inLines, ...outMeta, ...inMeta]);

      if (reduced) {
        gsap.set(outgoing, { autoAlpha: 0 });
        gsap.set(incoming, { autoAlpha: 1 });
        gsap.set([...inLines], { yPercent: 0 });
        gsap.set([...inMeta], { autoAlpha: 1, y: 0 });
        return;
      }

      const direction = slideOffset(to, from, count) >= 0 ? 1 : -1;
      gsap.set(incoming, { autoAlpha: 1 });
      gsap.to(outLines, { yPercent: -110 * direction, duration: 0.7, ease: EASE.inOut, stagger: 0.04 });
      gsap.to(outMeta, { autoAlpha: 0, duration: 0.3 });
      gsap.set(outgoing, { autoAlpha: 0, delay: 0.75 });
      gsap.fromTo(
        inLines,
        { yPercent: 110 * direction },
        { yPercent: 0, duration: DURATION.title, ease: EASE.out, stagger: 0.06, delay: 0.12 },
      );
      gsap.fromTo(
        inMeta,
        { autoAlpha: 0, y: 10 },
        { autoAlpha: 1, y: 0, duration: DURATION.meta, ease: EASE.out, delay: 0.12 + META_LAG },
      );
    },
    { dependencies: [active, isDesktop, reduced], scope: regionRef },
  );

  const current = projects[active];
  const announcement = current
    ? copy.announce
        .replace("{index}", String(active + 1))
        .replace("{total}", String(count))
        .replace("{name}", current.name)
    : "";

  return (
    <section
      ref={regionRef}
      aria-roledescription="carousel"
      aria-label={copy.region}
      aria-describedby="slider-hint"
      tabIndex={0}
      data-cursor="drag"
      data-lenis-prevent
      className="absolute inset-0 hidden touch-none select-none overflow-hidden bg-ink outline-none desktop:block"
    >
      <p id="slider-hint" className="sr-only">
        {copy.hint}
      </p>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>

      {projects.map((project, i) => (
        <div
          key={project.slug}
          ref={(plate) => {
            plateRefs.current[i] = plate;
          }}
          role="group"
          aria-roledescription="slide"
          aria-label={project.name}
          aria-hidden={i !== active}
          className="absolute inset-0 overflow-hidden will-change-transform"
          style={{ transform: `translate3d(${slideOffset(i, 0, count) * SLIDE_SPACING * 100}%, 0, 0)` }}
        >
          <SharedMedia slug={project.slug} enabled={isDesktop && i === active}>
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={project.hero.src}
                alt={project.hero.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                placeholder="blur"
                blurDataURL={blurFor(project.hero.src)}
                draggable={false}
                className="object-cover"
                style={{ filter: `brightness(${HERO_BRIGHTNESS})`, scale: String(HERO_ZOOM) }}
              />
            </div>
          </SharedMedia>
        </div>
      ))}

      {useCanvas ? (
        <div
          aria-hidden="true"
          className={`absolute inset-0 transition-opacity duration-700 ${canvasReady ? "opacity-100" : "opacity-0"}`}
        >
          <SliderCanvas
            sources={sources}
            motion={motion}
            initialIndex={0}
            onReady={() => setCanvasReady(true)}
            onLost={() => setCanvasLost(true)}
          />
        </div>
      ) : null}

      <div className="pointer-events-none absolute inset-x-5 bottom-[8vh] md:inset-x-8">
        {projects.map((project, i) => (
          <div
            key={project.slug}
            ref={(wrapper) => {
              titleRefs.current[i] = wrapper;
            }}
            data-reveal={i === 0 ? "" : undefined}
            aria-hidden={i !== active}
            className={`absolute bottom-0 left-0 w-full ${i === 0 ? "" : "invisible"}`}
          >
            <DisplayTitle
              lines={displayLinesOf(project)}
              className="text-[min(15.5vh,12.5vw)] text-paper"
            />
            <div
              data-title-meta
              className="meta mt-7 grid max-w-[64rem] grid-cols-[minmax(12rem,auto)_6rem_1fr_auto] items-baseline gap-x-10 text-paper"
            >
              <span className="tabular-nums">
                {recordNumber(i)} / {project.category}
              </span>
              <span className="tabular-nums">{project.year}</span>
              <span>{project.stack.slice(0, 3).join(" / ")}</span>
              <Link
                href={`/work/${project.slug}`}
                transitionTypes={["page"]}
                tabIndex={i === active ? 0 : -1}
                className="pointer-events-auto underline decoration-1 underline-offset-4"
              >
                {copy.open}
              </Link>
            </div>
          </div>
        ))}
      </div>

      <ProjectThumbnailRail projects={projects} active={active} onSelect={goTo} copy={copy} />
    </section>
  );
}
