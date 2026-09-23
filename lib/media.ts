import { BLUR_PLACEHOLDERS, type BlurredMedia } from "@/lib/blur";

export function blurFor(src: BlurredMedia): string {
  return BLUR_PLACEHOLDERS[src];
}

/**
 * How bright a hero is allowed to be under white display type. One value,
 * applied as a CSS filter to the DOM image and as a uniform in the slider's
 * shader, so the WebGL frame and the image it hands over to during a page
 * transition are the same brightness and the morph does not flash.
 */
export const HERO_BRIGHTNESS = 0.58;

/**
 * Heroes are shown slightly zoomed. It gives the shader's parallax room to
 * travel without sampling past the image edge, and it is applied to the DOM
 * image too so the two stay registered.
 */
export const HERO_ZOOM = 1.14;

// Next's default device sizes. The optimizer rejects any other width, and
// since Next 16 it accepts only quality 75 unless configured otherwise.
const OPTIMIZER_WIDTHS = [640, 750, 828, 1080, 1200, 1920, 2048, 3840] as const;
const OPTIMIZER_QUALITY = 75;

/** An optimizer URL for a still, sized to the display it will fill. */
export function optimizedUrl(src: string, cssWidth: number, pixelRatio: number): string {
  const needed = Math.min(cssWidth * pixelRatio, 3840);
  const width = OPTIMIZER_WIDTHS.find((w) => w >= needed) ?? 3840;
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${OPTIMIZER_QUALITY}`;
}

/** "01", "02" -- the record number the rail and the index both cite. */
export function recordNumber(index: number): string {
  return String(index + 1).padStart(2, "0");
}
