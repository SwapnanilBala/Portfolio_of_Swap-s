/**
 * Blur placeholders, generated from the files in `public/media`.
 *
 * Dark captures decoding onto a beige field snap in one at a time. The
 * frame already reserves their space, so this is not about layout shift -- it
 * is that a dark rectangle appearing from nothing is a harder cut than one
 * resolving out of its own average tone.
 *
 * Each value is a 12px-wide WebP, around 80 bytes, inlined as a data URL
 * because `next/image` only derives a placeholder itself for statically
 * imported images and these are addressed by path.
 *
 * Kept out of `lib/content.ts` on purpose: that file holds the site's prose and
 * is meant to review as a clean diff of English. These are build output.
 *
 * To regenerate after re-cropping a capture, resize it to 12px wide, encode
 * WebP at quality 45, and base64 the result.
 */

/**
 * The media paths that have a placeholder. Adding a capture and referencing it
 * from content fails to compile until it is listed here and given a value --
 * the same guarantee `LINK_LABELS` gives link roles.
 */
export type BlurredMedia =
  | "/media/lagna-atelier-ashtakavarga.webp"
  | "/media/lagna-atelier-chart.webp"
  | "/media/lagna-atelier.webp"
  | "/media/robust-health-dashboard.webp"
  | "/media/robust-health-onboarding.webp"
  | "/media/robust-health-workout.webp";

export const BLUR_PLACEHOLDERS: Readonly<Record<BlurredMedia, string>> = {
  "/media/lagna-atelier-ashtakavarga.webp":
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAADQAQCdASoMAAgAAwBSJaQAAujfdz6AAAD+8PmOpOYrbfcOaCleMzV/OFU4HgAA",
  "/media/lagna-atelier-chart.webp":
    "data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACwAQCdASoMAAgAAwBSJZwAAveEH7zgAP70fo/L4cOyDDmnYJeAAA==",
  "/media/lagna-atelier.webp":
    "data:image/webp;base64,UklGRj4AAABXRUJQVlA4IDIAAADwAQCdASoMAAgAAwBSJZwC7AEPhke376AA/vhNlBLZj3B1Z/XZrT8B+rzc1tKifxAAAA==",
  "/media/robust-health-dashboard.webp":
    "data:image/webp;base64,UklGRjQAAABXRUJQVlA4ICgAAABwAQCdASoMAAcAAwBSJZQC06FAAAD+9S2Lznqchw8usRlgTFCoQAAA",
  "/media/robust-health-onboarding.webp":
    "data:image/webp;base64,UklGRjgAAABXRUJQVlA4ICwAAACwAQCdASoMAAgAAwBSJZwAAsaYcR0AAP7zLrNp+lupYC/TExYmMcuGcjgAAA==",
  "/media/robust-health-workout.webp":
    "data:image/webp;base64,UklGRlYAAABXRUJQVlA4IEoAAACwAwCdASoMABIAPt1apkyopSOiMAgBEBuJZwAAW+gc4mIfKW5gEAD+8qMakbSA5kIUj5Ea6Uz7+HtD8QNT4TRnNOgU3Pg2kAAAAA==",
};
