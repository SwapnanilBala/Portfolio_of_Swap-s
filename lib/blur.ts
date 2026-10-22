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
  | "/media/about-smile.webp"
  | "/media/about-snow.webp"
  | "/media/about-suit.webp"
  | "/media/fenway.webp"
  | "/media/kb-clinic-admin.webp"
  | "/media/kb-clinic-booking.webp"
  | "/media/kb-clinic-doctor.webp"
  | "/media/kb-clinic-hero.webp"
  | "/media/kb-clinic-live-bangla.webp"
  | "/media/kb-clinic-live-chamber.webp"
  | "/media/kb-clinic-live-chambers.webp"
  | "/media/kb-clinic-live-day.webp"
  | "/media/kb-clinic-mobile.webp"
  | "/media/lagna-atelier-cover.webp"
  | "/media/lagna-atelier-hero.webp"
  | "/media/lagna-atelier-houses.webp"
  | "/media/lagna-atelier-live-hindi.webp"
  | "/media/lagna-atelier-live-languages.webp"
  | "/media/lagna-atelier-live-light.webp"
  | "/media/lagna-atelier-mobile.webp"
  | "/media/lagna-atelier-reading.webp"
  | "/media/lagna-atelier-settings.webp"
  | "/media/lagna-atelier-week.webp"
  | "/media/lagna-atelier-wheel.webp"
  | "/media/lagna-atelier-yogas.webp"
  | "/media/northeastern-street.webp"
  | "/media/northeastern-window.webp"
  | "/media/robust-health-hero.webp"
  | "/media/robust-health-intake.webp"
  | "/media/robust-health-live-coach.webp"
  | "/media/robust-health-live-next.webp"
  | "/media/robust-health-live-onboarding.webp"
  | "/media/robust-health-live-plans.webp"
  | "/media/robust-health-live-session.webp"
  | "/media/robust-health-live-week.webp"
  | "/media/robust-health-member.webp"
  | "/media/robust-health-mobile.webp"
  | "/media/robust-health-phone-activity.webp"
  | "/media/robust-health-phone-workout.webp"
  | "/media/robust-health-progress.webp"
  | "/media/robust-health-start.webp"
  | "/media/robust-health-trainer.webp"
  | "/media/robust-health-weeks.webp";

export const BLUR_PLACEHOLDERS: Readonly<Record<BlurredMedia, string>> = {
  "/media/about-smile.webp":
    "data:image/webp;base64,UklGRmAAAABXRUJQVlA4IFQAAAAwAgCdASoMAAwAAwBSJZgCdADcUBZvv8zAAAD+23k6DTLdjaAXBr/kHPcfZVINRB/rLwDXa9y609ZbdwBfa2exjyK6X0VFgPFghZHY1qraw4f1wAA=",
  "/media/about-snow.webp":
    "data:image/webp;base64,UklGRlQAAABXRUJQVlA4IEgAAADQAQCdASoMAAwAAwBSJQBOgBX+SrDT1AD+9gtevh65iqVglu1OMZ6Fiek09dBp/Mh+I9nUheetkliapABUBekjfNFIWVRVoAA=",
  "/media/about-suit.webp":
    "data:image/webp;base64,UklGRlIAAABXRUJQVlA4IEYAAADwAQCdASoMAAwAAwBSJYwCdAD0XhetrgAA/qNTMb2RCtUf5VOox3jZcbRrtPUMTd4ftzcdDspIEXAqRraeXF18XmsacAAA",
  "/media/fenway.webp":
    "data:image/webp;base64,UklGRlQAAABXRUJQVlA4IEgAAACwAQCdASoMAAYAAwBSJQBOgBszGSJgAM491KMvsxshnlWYC1FIJbEhcrwlHTXh9K1VxF3a8tXMLJ562E3nTqXwO6NUfen6cAA=",
  "/media/kb-clinic-admin.webp":
    "data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACwAQCdASoMAAQAAwBSJZwAAudQDaMAAP73Jz897cFy0oeNzIAAAA==",
  "/media/kb-clinic-booking.webp":
    "data:image/webp;base64,UklGRjAAAABXRUJQVlA4ICQAAABQAQCdASoMAA8AAwBSJZwABDOAAP70s+nf9LwGC3hVbOrbAAA=",
  "/media/kb-clinic-doctor.webp":
    "data:image/webp;base64,UklGRiwAAABXRUJQVlA4ICAAAACQAQCdASoMAAgAAwBSJZwAAudUxLAA/vcKVlcppZgAAA==",
  "/media/kb-clinic-hero.webp":
    "data:image/webp;base64,UklGRjYAAABXRUJQVlA4ICoAAADwAQCdASoMAAgAAwBSJZQCdAEPhvcDgNAA/vXN3ClpLy/oCvi88OXeAAA=",
  "/media/kb-clinic-live-bangla.webp":
    "data:image/webp;base64,UklGRj4AAABXRUJQVlA4IDIAAADwAQCdASoMAAgAAwBSJZQCdAEfbjbjujAA/vXTCSXdUSWU3/FRCjCfuEGAkc15NYAAAA==",
  "/media/kb-clinic-live-chamber.webp":
    "data:image/webp;base64,UklGRjYAAABXRUJQVlA4ICoAAADwAQCdASoMAAgAAwBSJZQCdAEf/wwbPYAA/vXQPf6lEscVEQyXj9d4gAA=",
  "/media/kb-clinic-live-chambers.webp":
    "data:image/webp;base64,UklGRjYAAABXRUJQVlA4ICoAAADQAQCdASoMAAgAAwBSJZQCdAEO9qYiwAD+9tioNqHtB835Ro/aTKYAAAA=",
  "/media/kb-clinic-live-day.webp":
    "data:image/webp;base64,UklGRjgAAABXRUJQVlA4ICwAAAAQAgCdASoMAAgAAwBSJZQCdAEQUNk32twAAP710BSpjSfMcS8nvFjM+EQAAA==",
  "/media/kb-clinic-mobile.webp":
    "data:image/webp;base64,UklGRnAAAABXRUJQVlA4IGQAAAAQBACdASoMABoAPt1cpkyopSOiMAgBEBuJZQCsACIB/aSSBLU4g7OHgAD+6RQ3XzDWySQYKaHlSBbsGf6Zd4YHhyR/nkUms9EauCgHXd8GrLawr1jV/7k7VcV7zlP6Yr4no2AA",
  "/media/lagna-atelier-cover.webp":
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACwAQCdASoMAAcAAwBSJZQCdADsj24AAP73glukekzGhzujOExQKByho0HuAAAA",
  "/media/lagna-atelier-hero.webp":
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACQAQCdASoMAAgAAwBSJZwAAp02KwAA/vWew3vnPd4ZiNPcC+xnvF4laV9wAAAA",
  "/media/lagna-atelier-houses.webp":
    "data:image/webp;base64,UklGRmwAAABXRUJQVlA4IGAAAADwAwCdASoMABQAPt1cpkyopSOiMAgBEBuJZwDA3CIGv4S2kBiFHkdAAP7NEKt/sc+9twrO1N8+je6sZVkiAxEAp88mbo22VHgIwfI2aeA0+a2GjHus8liF0NLnAA6pAAA=",
  "/media/lagna-atelier-live-hindi.webp":
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACwAQCdASoMAAgAAwBSJZwAAu0dh+wAAP71g3OykGgXr202326hcRMJPl6V9wAA",
  "/media/lagna-atelier-live-languages.webp":
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACQAQCdASoMAAgAAwBSJZwAAp02KwAA/vWew3vnQdLL/DXxSmKiJRMgoEPjyUgA",
  "/media/lagna-atelier-live-light.webp":
    "data:image/webp;base64,UklGRjYAAABXRUJQVlA4ICoAAADQAQCdASoMAAgAAwBSJZwC7AEf/qfDwAD+9xYUdYuE7c4X6AV0a3hdgAA=",
  "/media/lagna-atelier-mobile.webp":
    "data:image/webp;base64,UklGRlIAAABXRUJQVlA4IEYAAAAQAwCdASoMABoAPt1apkyopSOiMAgBEBuJaQAAW+qe6sAA/vDVqH6Syb23Sg1rxXhi6Wxkxw+vLKkd9HTDQ2/CWYzi4AAA",
  "/media/lagna-atelier-reading.webp":
    "data:image/webp;base64,UklGRjQAAABXRUJQVlA4ICgAAACwAQCdASoMAAUAAwBSJZwCdADyfvaAAP71gnccjo2zaM3XxJW5oAAA",
  "/media/lagna-atelier-settings.webp":
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAADwAQCdASoMAAYAAwBSJZwCdAD0sb7vh+AA/vasPI3xVK5PbhL8ZCnwePQGFQAA",
  "/media/lagna-atelier-week.webp":
    "data:image/webp;base64,UklGRjYAAABXRUJQVlA4ICoAAAAwAQCdASoMAAkAAwBSJZwAA3AA/vCiWsG3kUexD1Vd68ckj/nFXmr8AAA=",
  "/media/lagna-atelier-wheel.webp":
    "data:image/webp;base64,UklGRkoAAABXRUJQVlA4ID4AAADQAwCdASoMABEAPt1cpkyopSOiMAgBEBuJZwCdACHftMm7itx4iwAA/vDJtzzrmrnWZfxVfV3SvEnch1kAAA==",
  "/media/lagna-atelier-yogas.webp":
    "data:image/webp;base64,UklGRjgAAABXRUJQVlA4ICwAAABwAQCdASoMAAoAAwBSJZwC7AF1AAD+8r66U9XargG93BcGnipTt6OScgAAAA==",
  "/media/northeastern-street.webp":
    "data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAADQAQCdASoMAAkAAwBSJQBOgBt1Znj5AAD9nTDvpgnK5hfJLQKx6IZ+VVONnJr5de5mvWnvvN9zBpkbBrpAJpm7gAA=",
  "/media/northeastern-window.webp":
    "data:image/webp;base64,UklGRlQAAABXRUJQVlA4IEgAAADQAQCdASoMAAkAAwBSJQBOgBuJVuLcAAD9/A8bUARReJ7ETi6iF3SUnO5VkigExJGGJz6Jj5YG1cAZkOZ/xAFxebYXlsda4AA=",
  "/media/robust-health-hero.webp":
    "data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAACQAQCdASoMAAgAAwBSJYw3AJQQCgwA/vUvf8BMtibhwe7jvOpd1FLloMm5nHZUIrkjhKz/n3l6tIEzbUpmQBiPAAA=",
  "/media/robust-health-intake.webp":
    "data:image/webp;base64,UklGRjAAAABXRUJQVlA4ICQAAABwAQCdASoMAAkAAwBSJYwCdAFAAAD+80MDfqKSPIm7DtujwAA=",
  "/media/robust-health-live-coach.webp":
    "data:image/webp;base64,UklGRj4AAABXRUJQVlA4IDIAAADwAQCdASoMAAgAAwBSJZQAAu1/D25xywAA/viNQDsNOqr4+OWBw718jIm2eIlU6WYAAA==",
  "/media/robust-health-live-next.webp":
    "data:image/webp;base64,UklGRjgAAABXRUJQVlA4ICwAAADQAQCdASoMAAgAAwBSJZQAAureu+acAAD+9771EkkblSN70KZwSOlNA6WYAA==",
  "/media/robust-health-live-onboarding.webp":
    "data:image/webp;base64,UklGRmYAAABXRUJQVlA4IFoAAADwAQCdASoMAAgAAwBSJbACdAEQUC/HgGAA/vXbSPQmXOhcp9xdgKcMFGJcaxH+M95/9JftET+ZX8pBJdklw5CFYOuCpOu/rXOvydxfb+IUxvxbAUOsYLkAAAA=",
  "/media/robust-health-live-plans.webp":
    "data:image/webp;base64,UklGRkIAAABXRUJQVlA4IDYAAADQAQCdASoMAAgAAwBSJZQAAu08AgTSIAD++I1AIcb5u/gJhlfkpoiH2U0fIam2k9xbN4uAAAA=",
  "/media/robust-health-live-session.webp":
    "data:image/webp;base64,UklGRkIAAABXRUJQVlA4IDYAAADQAQCdASoMAAgAAwBSJZQAAxf4S/GIgAD+9771d/97a/CcAJPie2c+IC3nFBWtIQRt3i4AAAA=",
  "/media/robust-health-live-week.webp":
    "data:image/webp;base64,UklGRj4AAABXRUJQVlA4IDIAAACwAQCdASoMAAgAAwBSJZQAAup6R8wYAP73vvWBJKkO1S+ExehL6sRrAT43BirLxcAAAA==",
  "/media/robust-health-member.webp":
    "data:image/webp;base64,UklGRkIAAABXRUJQVlA4IDYAAADQAQCdASoMAAUAAwBSJZQCdAEOPBOwAAD+9qJTjHaJbdch4dscl+vejPKI6swSG4H7SswPIAA=",
  "/media/robust-health-mobile.webp":
    "data:image/webp;base64,UklGRsYAAABXRUJQVlA4ILoAAACQBACdASoMABoAPt1apkyopSOiMAgBEBuJagCdMoMxgEm4rlRVlIczX3iHUaYA/sB9SZCsrYt/lMobk6rAJytnq602qRId3EByBoheNs5hzahw0pUCV/is60bRc7xd8FvDkvgDHYnjBXSxhpHOpgsqpK14jnl30bKhU1DA1ZwWHzl/Tzzp89IhdlL1322PQqBtTdtVwjf6wULakT93oSFlrh6oUlAz4iv/hdGxtSMoDRy/XK0VJfkAAAA=",
  "/media/robust-health-phone-activity.webp":
    "data:image/webp;base64,UklGRkYAAABXRUJQVlA4IDoAAADwAgCdASoMABEAPt1cp0yopSOiMAgBEBuJZwAAiUzLgAD+8LbuSZfy7P0m/nXq/3+fTkco2djTYAAA",
  "/media/robust-health-phone-workout.webp":
    "data:image/webp;base64,UklGRnwAAABXRUJQVlA4IHAAAABQBACdASoMABgAPt1apkyopSOiMAgBEBuJZgCdIKnJimJVgFQojBu2/ahAAP79W9GPKycci14VpLaLthbWTcb6lVf/MD8jCSpO9M3BOPVLOQ9NkXIelSiVbAUNNq6AvGwP7kImxZ50ojep4stFLAAA",
  "/media/robust-health-progress.webp":
    "data:image/webp;base64,UklGRjQAAABXRUJQVlA4ICgAAACwAQCdASoMAAkAAwBSJZwAAxf+7AGUAP71vtiUIjaB0rVTNE1hwAAA",
  "/media/robust-health-start.webp":
    "data:image/webp;base64,UklGRjwAAABXRUJQVlA4IDAAAADQAQCdASoMAAgAAwBSJZwAAu0eoDTM2AD+8O1O24jlE/L8+gSLxmj2jisAL/xQAAA=",
  "/media/robust-health-trainer.webp":
    "data:image/webp;base64,UklGRiwAAABXRUJQVlA4ICAAAAAwAQCdASoMAAUAAwBSJaQAA3AA/vWaq653tjwZctBAAA==",
  "/media/robust-health-weeks.webp":
    "data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAAAwAQCdASoMAAoAAwBSJZwAA3AA/vIymizPkVLMyJfI1LivhwAAAA==",
};
