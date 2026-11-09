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
import { LiveSiteLink } from "@/components/home/LiveSiteLink";
import { gsap, useGSAP } from "@/lib/gsap";
import { blurFor, CASE_HERO, HERO_BRIGHTNESS, recordNumber, SCREENSHOT_QUALITY } from "@/lib/media";
import { warmCaseHero } from "@/lib/preload";
import {
  DURATION,
  EASE,
  META_LAG,
  useHydrated,
  useMediaQuery,
  useReducedMotion,
} from "@/lib/motion";
import {
  clamp,
  DESKTOP_QUERY,
  presenceAt,
  slideOffset,
  slideStep,
  wrapIndex,
  type SliderMotion,
} from "@/lib/slider";
import { displayLinesOf, liveLinkOf, type SelectedProject, type UiCopy } from "@/lib/types";

// three.js only ever loads here, and only once the desktop slider decides to
// use it -- never on the other pages, and never on touch devices.
const SliderCanvas = dynamic(
  () => import("@/components/home/SliderCanvas").then((mod) => mod.SliderCanvas),
  { ssr: false },
);

interface Props {
  readonly projects: readonly SelectedProject[];
  readonly copy: UiCopy["slider"];
  /** The live site's label, shared with the case studies' links. */
  readonly liveLabel: string;
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

/** How long the pointer rests on a row of the list before its plate comes on stage. */
const HOVER_INTENT_MS = 90;

/**
 * The desktop Projects page: the projects listed by name on the left, and a
 * looping run of framed project plates on the right, one on stage at a time,
 * driven by the list (hover, click, focus), drag, wheel and arrow keys. The
 * plates travel inside a clipped stage, so their neighbours wait past its
 * edges rather than the window's.
 *
 * The plates are framed rather than full-bleed on purpose. Every capture is a
 * landing page with its own headline; filling the viewport with one put two
 * headlines on top of each other. In a frame, the product's typography is part
 * of the picture.
 *
 * One physics loop on GSAP's ticker owns the state -- a target position, a
 * current position that follows it with inertia, and the velocity between
 * them -- and shares it by reference with the WebGL layer, which only draws.
 * The DOM plates underneath are the no-WebGL and reduced-motion path, the
 * largest-contentful-paint frame, and the element a page transition morphs
 * from, so they are always rendered and always in position. Their layout box
 * is also the geometry the WebGL plates copy: CSS sizes the frame once.
 */
export function ProjectSlider({ projects, copy, liveLabel }: Props) {
  const router = useRouter();
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  // The shared view-transition name waits for the real media query. During
  // hydration isDesktop reads as false, so the mobile plate would claim the
  // name, and the commit that corrects it would briefly name both.
  const hydrated = useHydrated();
  const reduced = useReducedMotion();
  const webgl = useSyncExternalStore(noopSubscribe, detectWebGL, () => false);
  const [canvasLost, setCanvasLost] = useState(false);
  const useCanvas = isDesktop && !reduced && webgl && !canvasLost;
  const count = projects.length;
  // Stable across renders: the canvas rebuilds its whole scene when this
  // reference changes, and the slider re-renders on every plate change.
  const sources = useMemo(() => projects.map((project) => project.hero), [projects]);

  const regionRef = useRef<HTMLElement>(null);
  // The clipped box the plates travel in, and the canvas fills.
  const stageRef = useRef<HTMLDivElement>(null);
  const plateRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Every plate shares one layout box; the first one is measured for it.
  const frameRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef(0);
  const listRef = useRef<HTMLElement>(null);
  const liveRef = useRef<HTMLDivElement>(null);
  const intentTimer = useRef(0);
  const hostRef = useRef<HTMLSpanElement>(null);
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

  /** Fetch the case-study hero behind a plate once a visit looks likely. */
  const warm = useCallback((index: number) => warmCaseHero(projects[index]?.hero), [projects]);

  // Keyboard visitors never hover: warm the plate they settle on instead.
  useEffect(() => {
    if (isDesktop && document.activeElement === regionRef.current) warm(active);
  }, [active, isDesktop, warm]);

  /** Hovering a row brings its plate on stage once the pointer settles on it. */
  const intend = useCallback(
    (index: number) => {
      window.clearTimeout(intentTimer.current);
      intentTimer.current = window.setTimeout(() => {
        if (index !== activeRef.current) goTo(index);
        warm(index);
      }, HOVER_INTENT_MS);
    },
    [goTo, warm],
  );
  const cancelIntent = useCallback(() => window.clearTimeout(intentTimer.current), []);
  useEffect(() => cancelIntent, [cancelIntent]);

  // The distance between plates follows the stage, not the window: the
  // neighbours wait just past the stage's clipped edges.
  useEffect(() => {
    const stage = stageRef.current;
    if (!isDesktop || !stage) return;
    const measure = () => {
      const frame = frameRef.current;
      if (frame) stepRef.current = slideStep(stage.clientWidth, frame.offsetWidth);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    return () => observer.disconnect();
  }, [isDesktop]);

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

      const distance = stepRef.current;
      plateRefs.current.forEach((plate, i) => {
        if (!plate) return;
        const offset = slideOffset(i, state.current, count);
        plate.style.transform = `translate3d(${offset * distance}px, 0, 0)`;
        plate.style.opacity = String(presenceAt(offset));
        // Off stage once a full step away: at rest the neighbours wait past
        // the window's edges, and their bezels' shadows must not reach in.
        // The WebGL plates keep their own, wider margin for the bow.
        plate.style.visibility = Math.abs(offset) < 1 ? "visible" : "hidden";
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
    let hovering = false;

    /** Whether the pointer is over the plate on stage -- the one a click opens. */
    const overStage = (event: PointerEvent) => {
      const rect = plateRefs.current[activeRef.current]?.getBoundingClientRect();
      return (
        rect !== undefined &&
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom
      );
    };

    const setHover = (next: boolean) => {
      if (next === hovering) return;
      hovering = next;
      if (next) warm(activeRef.current);
      gsap.to(motion.current, { hover: next ? 1 : 0, duration: 0.6, ease: EASE.out });
    };

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
      if (!dragging.current || event.pointerId !== pointerId) {
        setHover(overStage(event));
        return;
      }
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
      // A press that barely moved is a click. On the plate on stage it opens
      // the project; on the ink around it, it does nothing.
      if (travel < 6 && event.timeStamp - downAt < 350) {
        if (overStage(event)) openActive();
        return;
      }
      target.current = Math.round(target.current + clamp(-speed * 0.35, -1, 1));
      lastInput.current = performance.now();
    };

    const onLeave = () => setHover(false);

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
    region.addEventListener("pointerleave", onLeave);
    window.addEventListener("keydown", onKey);
    return () => {
      region.removeEventListener("wheel", onWheel);
      region.removeEventListener("pointerdown", onDown);
      region.removeEventListener("pointermove", onMove);
      region.removeEventListener("pointerup", onUp);
      region.removeEventListener("pointercancel", onUp);
      region.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("keydown", onKey);
    };
  }, [isDesktop, count, goTo, step, openActive, warm]);

  // First reveal: the list's names rise into place once, on arrival, and the
  // line under the plate follows them in.
  useGSAP(
    () => {
      if (!isDesktop) return;
      const list = listRef.current;
      const liveBox = liveRef.current;
      if (list) list.dataset.revealed = "";
      if (liveBox) liveBox.dataset.revealed = "";
      if (reduced || !list) return;
      gsap.from(list.querySelectorAll("[data-line]"), {
        yPercent: 110,
        duration: DURATION.title,
        ease: EASE.out,
        stagger: 0.05,
        delay: 0.25,
      });
      if (liveBox) {
        gsap.from(liveBox, {
          autoAlpha: 0,
          y: 10,
          duration: DURATION.meta,
          ease: EASE.out,
          delay: 0.25 + META_LAG + 0.2,
        });
      }
    },
    { dependencies: [isDesktop], scope: regionRef },
  );

  // Every change after that: the list's own CSS transitions carry the names
  // and their details. One live link serves every plate, so a visitor focused
  // on it keeps focus while the arrow keys change project; only its address
  // changes, and that follows the plate in.
  useGSAP(
    () => {
      const from = previousActive.current;
      if (from === active || !isDesktop) return;
      previousActive.current = active;
      const host = hostRef.current;
      if (!host) return;
      gsap.killTweensOf(host);
      if (reduced) {
        gsap.set(host, { autoAlpha: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        host,
        { autoAlpha: 0, y: 6 },
        { autoAlpha: 1, y: 0, duration: DURATION.meta, ease: EASE.out, delay: META_LAG },
      );
    },
    { dependencies: [active, isDesktop, reduced], scope: regionRef },
  );

  const current = projects[active];
  const live = current ? liveLinkOf(current) : undefined;
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
      onFocus={(event) => {
        if (event.target === event.currentTarget) warm(activeRef.current);
      }}
      data-cursor="drag"
      data-lenis-prevent
      // The frame is defined once, in glass-projects.css: the list's width,
      // the stage beside it, and the plate, its position and the line under
      // it. The ground is the page's radiant one, so the section paints none.
      className="projects-frame projects-list-frame absolute inset-0 hidden touch-none select-none overflow-hidden focus-visible:outline-2 focus-visible:-outline-offset-[12px] focus-visible:outline-paper desktop:block"
    >
      <p id="slider-hint" className="sr-only">
        {copy.hint}
      </p>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>

      {/* The gold glow behind the plate on stage. It holds still while the
          plates travel across it, and reaches under the list's glass. */}
      <div
        aria-hidden="true"
        className="projects-glow pointer-events-none absolute left-[calc(var(--plate-x)-var(--plate-w)*0.3)] top-[calc(var(--plate-top)-var(--plate-w)*0.12)] h-[calc(var(--plate-w)*0.95)] w-[calc(var(--plate-w)*1.6)]"
      />

      {/* The projects by name. The row on stage is lit and carries its
          category, year and stack; the others recede until hovered. Each row
          is a real button. */}
      <nav
        ref={listRef}
        aria-label={copy.rail}
        data-reveal=""
        className="projects-list glass-dark absolute left-(--list-l) top-(--list-top) flex h-(--list-h) w-(--list-w) flex-col p-2.5"
      >
        <ol className="grid gap-1.5">
          {projects.map((project, i) => {
            const on = i === active;
            return (
              <li key={project.slug}>
                <button
                  type="button"
                  onClick={() => {
                    cancelIntent();
                    goTo(i);
                  }}
                  onPointerEnter={() => intend(i)}
                  onPointerLeave={cancelIntent}
                  onFocus={() => warm(i)}
                  aria-label={copy.thumbnail.replace("{name}", project.name)}
                  aria-current={on ? "true" : undefined}
                  className={`grid w-full grid-cols-[2.25rem_minmax(0,1fr)] rounded-glass-sm px-4 pb-5 pt-4 text-left outline-offset-2 transition-[color,background-color,box-shadow] duration-500 ease-out-expo focus-visible:outline-paper ${
                    on
                      ? "bg-white/[0.09] text-paper shadow-[inset_0_1px_0_var(--color-glass-shine-dark),inset_0_0_0_1px_var(--color-glass-dark-edge)]"
                      : "text-paper/62 hover:text-paper/85"
                  }`}
                >
                  <span className={`meta pt-[0.35em] tabular-nums ${on ? "" : "text-paper/80"}`}>
                    {recordNumber(i)}
                  </span>
                  <span className="min-w-0">
                    <DisplayTitle
                      as="span"
                      lines={displayLinesOf(project)}
                      className="whitespace-nowrap text-(length:--name-size)"
                    />
                    {/* Opens on the row on stage: a grid row from 0fr to 1fr,
                        so the height follows the content without measuring. */}
                    <span
                      className={`grid transition-[grid-template-rows] duration-500 ease-out-expo ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                    >
                      <span className="overflow-hidden">
                        <span className="meta block pt-4 tabular-nums">
                          {project.category} / {project.year}
                        </span>
                        <span className="meta block pt-1 text-paper/90">
                          {project.stack.slice(0, 3).join(" / ")}
                        </span>
                      </span>
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        {/* The project on stage, in brief, at the panel's foot: its summary
            and first two figures, the Index's own copy. Every project's is
            stacked in one cell and the one on stage crossfades in, so the
            panel never changes height. Shown only where the panel has the
            room (glass-projects.css); the names give it that room. The live
            region names the project; this repeats it at more length, so it
            is read where it is, on stage only. */}
        <div className="projects-brief mt-auto px-4 pb-3">
          {projects.map((project, i) => (
            <div
              key={project.slug}
              aria-hidden={i !== active}
              className={`border-t border-paper/15 pt-5 [grid-area:1/1] transition-opacity duration-500 ease-out-expo reduced:transition-none ${
                i === active ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <p className="max-w-[36rem] text-pretty text-[0.875rem] leading-[1.45] text-paper/85">{project.summary}</p>
              {/* Values on one row and labels on the next, through a
                  subgrid, so a label that wraps never lifts its value. */}
              <dl className="mt-4 grid grid-cols-2 grid-rows-[auto_auto] gap-x-5">
                {project.figures.slice(0, 2).map((figure) => (
                  <div key={figure.label} className="row-span-2 grid min-w-0 grid-rows-subgrid gap-y-1.5">
                    <dt className="meta row-start-2 text-glass-paper-2">{figure.label}</dt>
                    <dd className="display row-start-1 text-[1.75rem] tabular-nums">{figure.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </nav>

      {/* Under the list, on the plate's line: the counter, which cites the
          same record numbers the Index uses, in line with the rows' numbers. */}
      <p
        aria-hidden="true"
        className="meta absolute left-(--list-l) top-(--count-top) flex h-(--count-h) items-center px-[1.625rem] tabular-nums text-paper"
      >
        {recordNumber(active)}&nbsp;<span className="text-glass-paper-2">/ {recordNumber(count - 1)}</span>
      </p>

      {/* The stage: the plates travel inside it and it clips them, so at
          rest the neighbours wait just past its edges. The WebGL canvas
          fills it, and measures the first plate's box inside it. It lets
          the pointer through to the list, which it covers in a portrait
          window; only the plates take it. */}
      <div ref={stageRef} className="pointer-events-none absolute inset-y-0 left-(--stage-l) right-(--stage-r) overflow-hidden">
        {projects.map((project, i) => (
          <div
            key={project.slug}
            ref={(plate) => {
              plateRefs.current[i] = plate;
              if (i === 0) frameRef.current = plate;
            }}
            role="group"
            aria-roledescription="slide"
            aria-label={project.name}
            aria-hidden={i !== active}
            // The plate on stage opens on a click; the cursor's marks lock onto it.
            data-cursor="open"
            data-cursor-frame
            // The plate is the image's box, which the WebGL plates measure; its
            // bezel is drawn outside it, so neither the geometry nor the morph
            // changes. The WebGL plate is drawn over the image only, with the
            // same corners, and this bezel shows around it, travelling and
            // dimming with its plate on the same tick.
            className="pointer-events-auto absolute left-[calc(50%-var(--plate-w)/2)] top-(--plate-top) aspect-[16/10] w-(--plate-w) rounded-(--plate-r) bg-ink will-change-transform"
            // Until the loop's first tick only the first plate is on stage.
            style={i === 0 ? undefined : { visibility: "hidden" }}
          >
            <div aria-hidden="true" className="glass-bezel pointer-events-none absolute -inset-(--bezel)" />
            {/* The view-transition name is the image's, never the bezel's:
                the case-study hero sits in the same bezel, and only the
                media morphs between the two. */}
            <SharedMedia slug={project.slug} enabled={hydrated && isDesktop && i === active}>
              <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
                {/* Lazy, so the hidden phone layout never fetches it; the page
                    preloads the first plate under the desktop query instead.
                    Sized as the case-study hero, not as this plate: see
                    CASE_HERO. */}
                <Image
                  src={project.hero.src}
                  alt={project.hero.alt}
                  fill
                  fetchPriority={i === 0 ? "high" : undefined}
                  sizes={CASE_HERO.sizes}
                  quality={SCREENSHOT_QUALITY}
                  placeholder="blur"
                  blurDataURL={blurFor(project.hero.src)}
                  draggable={false}
                  className="object-cover object-top"
                  style={{ filter: `brightness(${HERO_BRIGHTNESS})` }}
                />
              </div>
            </SharedMedia>
          </div>
        ))}

        {useCanvas ? (
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${canvasReady ? "opacity-100" : "opacity-0"}`}
          >
            <SliderCanvas
              sources={sources}
              motion={motion}
              frameRef={frameRef}
              initialIndex={0}
              onReady={() => setCanvasReady(true)}
              onLost={() => setCanvasLost(true)}
            />
          </div>
        ) : null}
      </div>

      {/* Under the plate, edge to edge with its bezel: the way into the case
          study on the left, as type, and the live site on the right, the
          page's one solid control. The counter shares its line. */}
      {current ? (
        <div
          ref={liveRef}
          data-reveal=""
          className="absolute left-[calc(var(--plate-x)-var(--bezel))] top-(--foot) flex h-(--foot-h) w-[calc(var(--plate-w)+2*var(--bezel))] items-center justify-between gap-x-6 text-paper"
        >
          <Link
            href={`/work/${current.slug}`}
            transitionTypes={["page"]}
            onFocus={() => warm(active)}
            onPointerEnter={() => warm(active)}
            className="meta shrink-0 underline decoration-1 underline-offset-4"
          >
            {copy.open}
          </Link>
          {live ? (
            <LiveSiteLink
              href={live.href}
              label={liveLabel}
              project={current.name}
              hostRef={hostRef}
              className="h-full w-[min(22rem,60%)] shrink-0 px-6 text-[clamp(1rem,1.1vw,1.375rem)]"
            />
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
