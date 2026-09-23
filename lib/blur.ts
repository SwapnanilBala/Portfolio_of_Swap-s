/**
 * Blur placeholders for every still in `public/media`. Generated -- do not
 * edit by hand. Run `node scripts/build-blur.mjs` after adding or re-cropping
 * a capture.
 *
 * Kept out of `lib/content.ts` on purpose: that file holds the site's prose
 * and reviews as a clean diff of English. These are build output.
 */

/**
 * The media paths that have a placeholder. Referencing a capture from content
 * fails to compile until the script has been run over it -- the same guarantee
 * `LINK_LABELS` gives link roles.
 */
export type BlurredMedia =
  | "/media/kb-clinic-hero.webp"
  | "/media/lagna-atelier-ashtakavarga.webp"
  | "/media/lagna-atelier-chart.webp"
  | "/media/lagna-atelier-hero.webp"
  | "/media/lagna-atelier.webp"
  | "/media/robust-health-dashboard.webp"
  | "/media/robust-health-hero.webp"
  | "/media/robust-health-onboarding.webp"
  | "/media/robust-health-workout.webp"
  | "/media/swapnanil-bala.webp";

export const BLUR_PLACEHOLDERS: Readonly<Record<BlurredMedia, string>> = {
  "/media/kb-clinic-hero.webp":
    "data:image/webp;base64,UklGRjgAAABXRUJQVlA4ICwAAADQAQCdASoMAAgAAwBSJZwAAxf83caAAAD+9dMH+xXaUXohcOssLL11QEAAAA==",
  "/media/lagna-atelier-ashtakavarga.webp":
    "data:image/webp;base64,UklGRj4AAABXRUJQVlA4IDIAAADQAQCdASoMAAgAAwBSJaQAAuR/FqNpAAD+8OF0iuBawxpsClinuBSxH4yXAJWJFw8AAA==",
  "/media/lagna-atelier-chart.webp":
    "data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACwAQCdASoMAAgAAwBSJZwAAudLYxsAAP70fo/mT8gceI2RrDyAAA==",
  "/media/lagna-atelier-hero.webp":
    "data:image/webp;base64,UklGRjAAAABXRUJQVlA4ICQAAABwAQCdASoMAAgAAwBSJZQC7AFAAAD+86lKAaphCMCZ81W4AAA=",
  "/media/lagna-atelier.webp":
    "data:image/webp;base64,UklGRj4AAABXRUJQVlA4IDIAAAAQAgCdASoMAAgAAwBSJZwC7AERHovDoU0AAP73go+bPcexAqwN0AKIwd248lEtFnboAA==",
  "/media/robust-health-dashboard.webp":
    "data:image/webp;base64,UklGRjQAAABXRUJQVlA4ICgAAABwAQCdASoMAAcAAwBSJZQC06FAAAD+9S2Lznqchw8usXK+n7/U2gAA",
  "/media/robust-health-hero.webp":
    "data:image/webp;base64,UklGRlIAAABXRUJQVlA4IEYAAADQAQCdASoMAAgAAwBSJYwAAlpBv/smwAD+9F19RmG3v6oZHe4SL3ktxxzX1iNN2dU5LndKSo4N6tRG/FHpLY7Pgg9iAAAA",
  "/media/robust-health-onboarding.webp":
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACwAQCdASoMAAgAAwBSJZwAAu18yXxgAP7zMLTNq3F9adzD7nYjfusD2I1JNHAA",
  "/media/robust-health-workout.webp":
    "data:image/webp;base64,UklGRlwAAABXRUJQVlA4IFAAAABwAwCdASoMABIAPt1apkyopSOiMAgBEBuJZwAAW7fw7FIG8SoA/vKjGpG08+vcInKFi4Cq9L3TReLOXWlE4HblDx+/nYqBdugU3Pg2kAAAAA==",
  "/media/swapnanil-bala.webp":
    "data:image/webp;base64,UklGRlYAAABXRUJQVlA4IEoAAABQAgCdASoMAAwAAwBSJYwCdIEyu/xBAIhpaAAA/olmquLAyhCvZ8L86L3UeXk0guXHAE4m6k8dfOj6sBDW8g6N/+B3njxtJb4AAA==",
};
