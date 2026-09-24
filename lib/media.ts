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
 * Encode quality for every screenshot the optimizer serves: heroes, plates,
 * covers. Interface text is fine detail on flat colour, which is exactly what
 * lossy compression smears -- at Next's default 75 the re-encode rings around
 * small type (43.5 dB against the source, 49 dB at 90). Allowed by
 * `images.qualities` in next.config.mjs; anything asking for a screenshot's
 * URL (preloads, textures) must pass the same value or it names a different
 * file.
 */
export const SCREENSHOT_QUALITY = 90;

/**
 * Phone captures stay at Next's default. At three device pixels to the CSS
 * pixel the ringing is below what the eye resolves, and the first phone plate
 * is the phone's largest paint: at 90 it grows from 60 to 103 KB.
 */
export const PHONE_QUALITY = 75;

/**
 * A transparent pixel, as the `<img>` fallback inside every art-directed
 * `<picture>` (and as the source a hidden layout resolves to). React builds a
 * picture's `<img>` and sets its attributes before the element is inside the
 * picture, so for a moment it cannot see the `<source>`s and starts fetching
 * its own `src`/`srcset`: on a phone, navigating to a case study downloaded the
 * desktop hero it never showed. With every real image in a `<source>` and this
 * as the `<img>`'s own, that moment costs nothing.
 */
export const TRANSPARENT_PIXEL =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

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

/**
 * A hairline over a capture's edge, drawn inside it so it changes no size a
 * plate's sharpness depends on. Light captures -- the clinic's beige pages --
 * otherwise run into the paper ground with no edge at all, and read as part
 * of this page; on a dark capture the line all but vanishes into its border.
 */
export const PLATE_FRAME =
  "relative after:pointer-events-none after:absolute after:inset-0 after:border after:border-ink/15";

/**
 * The portrait's widest, in CSS pixels: the About page's 15rem column. The
 * image is shown at this or at half its own pixel width, whichever is less,
 * so a 2x screen always has an image pixel behind every screen pixel and a
 * large upload is downsized rather than laid out at half its size.
 */
export const PORTRAIT_MAX_WIDTH = 240;

/** "01", "02" -- the record number the rail and the index both cite. */
export function recordNumber(index: number): string {
  return String(index + 1).padStart(2, "0");
}
