/**
 * Must match the `desktop` custom variant in app/globals.css exactly: CSS
 * decides which slider is visible, this decides which one is wired up.
 */
export const DESKTOP_QUERY = "(min-width: 48rem) and (hover: hover) and (pointer: fine)";

/**
 * The slider's continuous state, shared by reference between the input loop
 * that writes it and the WebGL scene that reads it every frame. Deliberately
 * not React state: it changes sixty times a second and nothing should
 * re-render when it does.
 */
export interface SliderMotion {
  /** Position in slides; unbounded, wrapped for display. */
  current: number;
  /** Slides moved since the previous frame. */
  velocity: number;
  /** 0 to 1, eased while the pointer is over the slider. */
  hover: number;
}

/** Spacing between slides as a fraction of the viewport width. */
export const SLIDE_SPACING = 1.04;

export function wrapIndex(value: number, count: number): number {
  return ((value % count) + count) % count;
}

/**
 * How far slide `index` sits from the current position, wrapped to the
 * nearest side: [-count/2, count/2). The slider loops, so the slide after the
 * last is the first, and a slide swaps sides only while it is off screen.
 */
export function slideOffset(index: number, current: number, count: number): number {
  let offset = wrapIndex(index - current, count);
  if (offset >= count / 2) offset -= count;
  return offset;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
