import { useSyncExternalStore } from "react";

/**
 * Motion vocabulary. Large motion for navigation, small motion for feedback:
 * the durations below are the whole range, so nothing reaches for a one-off.
 */
export const EASE = {
  /** Arrivals: titles, reveals, the slider settling. */
  out: "expo.out",
  /** Departures and anything that must both start and stop visibly. */
  inOut: "power4.inOut",
} as const;

export const DURATION = {
  /** Feedback: hover, cursor, thumbnails. */
  micro: 0.3,
  /** Metadata following a title. */
  meta: 0.6,
  /** Titles and line reveals. */
  title: 1.1,
} as const;

/** Metadata trails the title by this much, per the brief's 50-100ms. */
export const META_LAG = 0.08;

function subscribeTo(query: string) {
  return (onChange: () => void) => {
    const list = window.matchMedia(query);
    list.addEventListener("change", onChange);
    return () => list.removeEventListener("change", onChange);
  };
}

/**
 * A media query as React state. The server snapshot is `fallback`, so markup
 * is identical on both sides of hydration and the real value arrives on the
 * first client render.
 */
export function useMediaQuery(query: string, fallback = false): boolean {
  return useSyncExternalStore(
    subscribeTo(query),
    () => window.matchMedia(query).matches,
    () => fallback,
  );
}

const noopSubscribe = () => () => {};

/**
 * `?motion=reduce` forces the reduced path. The head script in the root layout
 * copies it onto `<html data-motion>` before first paint; the stylesheet reads
 * the attribute too. It exists so the reduced-motion path can be checked in a
 * browser that cannot emulate the media query.
 */
function useForcedReducedMotion(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => document.documentElement.dataset.motion === "reduce",
    () => false,
  );
}

export function useReducedMotion(): boolean {
  const query = useMediaQuery("(prefers-reduced-motion: reduce)");
  const forced = useForcedReducedMotion();
  return query || forced;
}

/**
 * False during server render and hydration, true from the first client
 * render after. Anything that depends on a media query's real value -- not
 * its server fallback -- should wait for it.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

/** A mouse or trackpad: hover exists and the pointer is precise. */
export function useFinePointer(): boolean {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}
