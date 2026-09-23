import { BLUR_PLACEHOLDERS, type BlurredMedia } from "@/lib/blur";

export function blurFor(src: BlurredMedia): string {
  return BLUR_PLACEHOLDERS[src];
}

/**
 * How bright a hero plate is. Heroes are framed captures on the ink ground,
 * not full-bleed backgrounds -- a landing page carries its own headline, and
 * under the slider's title that read as two sites stacked -- so the title only
 * crosses a plate's lower edge and the plate can stay close to true colour.
 * One value, applied as a CSS filter to the DOM image and as a uniform in the
 * slider's shader, so the WebGL frame and the image it hands over to during a
 * page transition are the same brightness and the morph does not flash.
 */
export const HERO_BRIGHTNESS = 0.82;

/**
 * `sizes` for plates that run the width of the page less its margins: the
 * case-study hero on wide screens, and every plate on a phone.
 */
export const PLATE_SIZES = {
  phone: "calc(100vw - 2.5rem)",
  wide: "calc(100vw - 4rem)",
} as const;

/**
 * The case-study hero's `<picture>`: the desktop capture from 48rem, the phone
 * capture below it.
 *
 * Everything that leads to a case study asks for its hero with these same
 * `sizes` -- the home slider's plates (narrower than this on screen, on
 * purpose), their WebGL textures, and every preload. The browser then picks
 * one candidate for all of them, so the image the page transition lands on is
 * already downloaded and decoded instead of arriving a moment after the morph
 * has finished on its placeholder.
 */
export const CASE_HERO = {
  wide: "(min-width: 48rem)",
  narrow: "(max-width: 47.99rem)",
  sizes: `(min-width: 48rem) ${PLATE_SIZES.wide}, ${PLATE_SIZES.phone}`,
} as const;

/** "01", "02" -- the record number the rail and the index both cite. */
export function recordNumber(index: number): string {
  return String(index + 1).padStart(2, "0");
}
