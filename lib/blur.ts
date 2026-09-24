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
  | "/media/kb-clinic-admin.webp"
  | "/media/kb-clinic-booking.webp"
  | "/media/kb-clinic-doctor.webp"
  | "/media/kb-clinic-hero.webp"
  | "/media/kb-clinic-mobile.webp"
  | "/media/lagna-atelier-cover.webp"
  | "/media/lagna-atelier-hero.webp"
  | "/media/lagna-atelier-houses.webp"
  | "/media/lagna-atelier-mobile.webp"
  | "/media/lagna-atelier-reading.webp"
  | "/media/lagna-atelier-settings.webp"
  | "/media/lagna-atelier-wheel.webp"
  | "/media/robust-health-hero.webp"
  | "/media/robust-health-intake.webp"
  | "/media/robust-health-member.webp"
  | "/media/robust-health-mobile.webp"
  | "/media/robust-health-progress.webp"
  | "/media/robust-health-start.webp"
  | "/media/robust-health-trainer.webp"
  | "/media/robust-health-weeks.webp"
  | "/media/swapnanil-bala.webp";

export const BLUR_PLACEHOLDERS: Readonly<Record<BlurredMedia, string>> = {
  "/media/kb-clinic-admin.webp":
    "data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACwAQCdASoMAAQAAwBSJZwAAudQDaMAAP73Jz897cFy0oeNzIAAAA==",
  "/media/kb-clinic-booking.webp":
    "data:image/webp;base64,UklGRjAAAABXRUJQVlA4ICQAAABQAQCdASoMAA8AAwBSJZwABDOAAP70s+nf9LwGC3hVbOrbAAA=",
  "/media/kb-clinic-doctor.webp":
    "data:image/webp;base64,UklGRiwAAABXRUJQVlA4ICAAAACQAQCdASoMAAgAAwBSJZwAAudUxLAA/vcKVlcppZgAAA==",
  "/media/kb-clinic-hero.webp":
    "data:image/webp;base64,UklGRjgAAABXRUJQVlA4ICwAAADQAQCdASoMAAgAAwBSJZwAAxf83caAAAD+9dMH+xXaUXohcOssLL11QEAAAA==",
  "/media/kb-clinic-mobile.webp":
    "data:image/webp;base64,UklGRlwAAABXRUJQVlA4IFAAAACQAwCdASoMABoAPt1cp0yopSOiMAgBEBuJZwAAV/qoJ/d/A1YAAP7vTCKaVD7NtNgxMDMPfNuMnxot8ZTvOJ0KaF+5OT6l4jkVqS7IsAFAAA==",
  "/media/lagna-atelier-cover.webp":
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACwAQCdASoMAAcAAwBSJZQCdADsj24AAP73glukekzGhzujOExQKByho0HuAAAA",
  "/media/lagna-atelier-hero.webp":
    "data:image/webp;base64,UklGRjAAAABXRUJQVlA4ICQAAABwAQCdASoMAAgAAwBSJZQC7AFAAAD+86lKAaphCMCZ81W4AAA=",
  "/media/lagna-atelier-houses.webp":
    "data:image/webp;base64,UklGRmwAAABXRUJQVlA4IGAAAADwAwCdASoMABQAPt1cpkyopSOiMAgBEBuJZwDA3CIGv4S2kBiFHkdAAP7NEKt/sc+9twrO1N8+je6sZVkiAxEAp88mbo22VHgIwfI2aeA0+a2GjHus8liF0NLnAA6pAAA=",
  "/media/lagna-atelier-mobile.webp":
    "data:image/webp;base64,UklGRloAAABXRUJQVlA4IE4AAABwAwCdASoMABoAPt1cp0yopSOiMAgBEBuJZwDLLCzfQu78ahAA/vAJEHwPuBLA7csuW3nR1vSzbXahGOd5nUDyLzfOoQxZn+gQhWmCgAA=",
  "/media/lagna-atelier-reading.webp":
    "data:image/webp;base64,UklGRjQAAABXRUJQVlA4ICgAAACwAQCdASoMAAUAAwBSJZwCdADyfvaAAP71gnccjo2zaM3XxJW5oAAA",
  "/media/lagna-atelier-settings.webp":
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAADwAQCdASoMAAYAAwBSJZwCdAD0sb7vh+AA/vasPI3xVK5PbhL8ZCnwePQGFQAA",
  "/media/lagna-atelier-wheel.webp":
    "data:image/webp;base64,UklGRkoAAABXRUJQVlA4ID4AAADQAwCdASoMABEAPt1cpkyopSOiMAgBEBuJZwCdACHftMm7itx4iwAA/vDJtzzrmrnWZfxVfV3SvEnch1kAAA==",
  "/media/robust-health-hero.webp":
    "data:image/webp;base64,UklGRlIAAABXRUJQVlA4IEYAAADQAQCdASoMAAgAAwBSJYwAAlpBv/rUAAD+9F19RmG3v6oZHe4SL3ktxxzX1iNN2dU5LndKSo4N6tRG/FHpLZpX8EHsQAAA",
  "/media/robust-health-intake.webp":
    "data:image/webp;base64,UklGRjAAAABXRUJQVlA4ICQAAABwAQCdASoMAAkAAwBSJYwCdAFAAAD+80MDfqKSPIm7DtujwAA=",
  "/media/robust-health-member.webp":
    "data:image/webp;base64,UklGRkIAAABXRUJQVlA4IDYAAADQAQCdASoMAAUAAwBSJZQCdAEOPBOwAAD+9qJTjHaJbdch4dscl+vejPKI6swSG4H7SswPIAA=",
  "/media/robust-health-mobile.webp":
    "data:image/webp;base64,UklGRp4AAABXRUJQVlA4IJIAAADwAwCdASoMABoAPt0+s1SooiWjmAEQG4lAFcONJzqyqNzVv/T3AZAAAP75JWR6fIbCEq4a14435p4ln7NYQSxWYDuZem33s9gqW2lqfHRP33zW0VE+QHyS2+zu/KbJ4T6SSoosHyPMY4PJrOTJDSM7MnuoAb4jzgCUinSSqOR54Q/mNcpsZVxwcNVuE1ekcgvgAA==",
  "/media/robust-health-progress.webp":
    "data:image/webp;base64,UklGRjQAAABXRUJQVlA4ICgAAACwAQCdASoMAAkAAwBSJZwAAxf+7AGUAP71vtiUIjaB0rVTNE1hwAAA",
  "/media/robust-health-start.webp":
    "data:image/webp;base64,UklGRjwAAABXRUJQVlA4IDAAAADQAQCdASoMAAgAAwBSJZwAAu0eoDTM2AD+8O1O24jlE/L8+gSLxmj2jisAL/xQAAA=",
  "/media/robust-health-trainer.webp":
    "data:image/webp;base64,UklGRiwAAABXRUJQVlA4ICAAAAAwAQCdASoMAAUAAwBSJaQAA3AA/vWaq653tjwZctBAAA==",
  "/media/robust-health-weeks.webp":
    "data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAAAwAQCdASoMAAoAAwBSJZwAA3AA/vIymizPkVLMyJfI1LivhwAAAA==",
  "/media/swapnanil-bala.webp":
    "data:image/webp;base64,UklGRlYAAABXRUJQVlA4IEoAAABQAgCdASoMAAwAAwBSJYwCdIEyu/xBAIhpaAAA/olmquLAyhCvZ8L86L3UeXk0guXHAE4m6k8dfOj6sBDW8g6N/+B3njxtJb4AAA==",
};
