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

/** The gap between two travelling plates, as a fraction of a plate's width. */
const PLATE_GAP = 0.06;

/**
 * Distance between neighbouring plates, in CSS pixels. One plate is on stage
 * and its neighbours wait just past the edges of the window, whatever the
 * window's shape -- so the step is derived from the stage and plate widths,
 * never fixed. The DOM plates and the WebGL plates both move by it.
 */
export function slideStep(stageWidth: number, plateWidth: number): number {
  return (stageWidth + plateWidth) / 2 + plateWidth * PLATE_GAP;
}

/** How lit a plate is when it is not on stage. */
const PRESENCE_FLOOR = 0.42;

/**
 * 1 on stage, falling to PRESENCE_FLOOR a slide away: plates dim as they
 * leave and light as they arrive. Applied as the DOM plate's opacity over the
 * ink ground, and as the same mix toward ink in the shader, so the two layers
 * agree at every offset.
 */
export function presenceAt(offset: number): number {
  return 1 - (1 - PRESENCE_FLOOR) * Math.min(Math.abs(offset), 1);
}

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
