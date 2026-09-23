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
  /** A layout rearranging in place: the Index's grid and list. */
  layout: 0.8,
  /** Titles and line reveals. */
  title: 1.1,
} as const;

/** Metadata trails the title by this much, per the brief's 50-100ms. */
export const META_LAG = 0.08;

type Subscribe = (onChange: () => void) => () => void;

interface QueryStore {
  readonly list: MediaQueryList;
  readonly listeners: Set<() => void>;
}

const queryStores = new Map<string, QueryStore>();
const subscribers = new Map<string, Subscribe>();

/**
 * One MediaQueryList per query, with one change listener that notifies every
 * subscriber inside the same callback, so React re-renders every consumer of a
 * query in a single commit. With a list per consumer, each list's change event
 * is its own callback and React commits between them -- which is how both
 * sliders' first plates came to hold the same view-transition name for a frame
 * whenever the window crossed the desktop breakpoint. Client only.
 */
function storeFor(query: string): QueryStore {
  const existing = queryStores.get(query);
  if (existing) return existing;
  const store: QueryStore = { list: window.matchMedia(query), listeners: new Set() };
  store.list.addEventListener("change", () => {
    for (const listener of store.listeners) listener();
  });
  queryStores.set(query, store);
  return store;
}

/**
 * The same subscribe function for a query on every render: a new one each
 * time makes React unsubscribe and resubscribe on every render. Creating it
 * touches nothing on the window, so it is safe during server render.
 */
function subscribeTo(query: string): Subscribe {
  const existing = subscribers.get(query);
  if (existing) return existing;
  const subscribe: Subscribe = (onChange) => {
    const { listeners } = storeFor(query);
    listeners.add(onChange);
    return () => {
      listeners.delete(onChange);
    };
  };
  subscribers.set(query, subscribe);
  return subscribe;
}

/**
 * A media query as React state. The server snapshot is `fallback`, so markup
 * is identical on both sides of hydration and the real value arrives on the
 * first client render.
 */
export function useMediaQuery(query: string, fallback = false): boolean {
  return useSyncExternalStore(
    subscribeTo(query),
    () => storeFor(query).list.matches,
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
