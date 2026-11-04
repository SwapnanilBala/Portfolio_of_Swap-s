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
  | "/media/robust-health-live-how.webp"
  | "/media/robust-health-live-inside.webp"
  | "/media/robust-health-live-onboarding.webp"
  | "/media/robust-health-live-plan.webp"
  | "/media/robust-health-live-programmes.webp"
  | "/media/robust-health-live-questions.webp"
  | "/media/robust-health-live-spanish.webp"
  | "/media/robust-health-mobile.webp"
  | "/media/robust-health-phone-day.webp"
  | "/media/robust-health-phone-plan.webp"
  | "/media/robust-health-plan-week.webp"
  | "/media/robust-health-sign-in.webp"
  | "/media/robust-health-start.webp"
  | "/media/robust-health-week-five.webp";

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
    "data:image/webp;base64,UklGRkYAAABXRUJQVlA4IDoAAACwAQCdASoMAAgAAwBSJZwAAp3OSjEAAP74jZYDDIcccB7EgYR38e7mBU3thwe1akH1laHSfRfmgAAA",
  "/media/robust-health-intake.webp":
    "data:image/webp;base64,UklGRjgAAABXRUJQVlA4ICwAAABwAQCdASoMAAgAAwBSJZQCdAF1AAD+7oZSPtjw3+yJ7sKqTJdteopgEgAAAA==",
  "/media/robust-health-live-how.webp":
    "data:image/webp;base64,UklGRlIAAABXRUJQVlA4IEYAAAAwAgCdASoMAAgAAwBSJbACdIDZFxSzSnPeeAD+9dMJD1M1arM9Tdi1gkG+iCzGej13dGD1oJ0UVGGQ00gnTpbbwbQ1yAAA",
  "/media/robust-health-live-inside.webp":
    "data:image/webp;base64,UklGRkYAAABXRUJQVlA4IDoAAACwAQCdASoMAAgAAwBSJZwAAl2IrG2AAP71mzALXmzN3OB4EVvkICKRp10DMyE/jb0whUNkrFMz3wAA",
  "/media/robust-health-live-onboarding.webp":
    "data:image/webp;base64,UklGRkoAAABXRUJQVlA4ID4AAAAQAgCdASoMAAgAAwBSJZQCdH8AFcVMZZrYAP74bVl14KTC67ehabDWSPNi36aT4pUs2CB0AzSM32u55AAAAA==",
  "/media/robust-health-live-plan.webp":
    "data:image/webp;base64,UklGRkgAAABXRUJQVlA4IDwAAADwAQCdASoMAAgAAwBSJZQC7AD0jecmqgAA/vFT9eY4S5+Fo0Bu6e49ldOGoQ/YpAFbqgBDGtTEKXoAAAA=",
  "/media/robust-health-live-programmes.webp":
    "data:image/webp;base64,UklGRj4AAABXRUJQVlA4IDIAAACQAQCdASoMAAgAAwBSJaQAApz73AAA/vGANekirVNqd4mrYuzwAL1nKYW1LUK2KigoAA==",
  "/media/robust-health-live-questions.webp":
    "data:image/webp;base64,UklGRkIAAABXRUJQVlA4IDYAAACQAQCdASoMAAgAAwBSJaQAAltHmQAA/vLf+0igGCksm62LrZLXcnLKcVDpnwDBtBBCzgxeEAA=",
  "/media/robust-health-live-spanish.webp":
    "data:image/webp;base64,UklGRkIAAABXRUJQVlA4IDYAAACwAQCdASoMAAgAAwBSJZwAAp0uZvTAAP74ju4/zv5S/3tMfs4eNwzMPR5RMsE4rJjR+hHAAAA=",
  "/media/robust-health-mobile.webp":
    "data:image/webp;base64,UklGRpwAAABXRUJQVlA4IJAAAAAwBACdASoMABoAPt1cpkyopSOiMAgBEBuJQBdhxAAQGQ1n4xN20tg4uAAA/vxWqqXUlcuK0mB3PemdkNTd956XYqt8X+fIYoC9hl4oGoXH3lQN8dv6bh/oTtAPZ620Kn7gA8JeOYsL+RptbF8UVOD5Y6CRFtqx/ny83PD7AiVgd82fN2PPYbjqpwp5Wr/kAAA=",
  "/media/robust-health-phone-day.webp":
    "data:image/webp;base64,UklGRnYAAABXRUJQVlA4IGoAAADQAwCdASoMABsAPt1ap0yopSOiMAgBEBuJQBlljMIs8NGuamfhQwAA/vwIRMgzb5wkWAlrXuBneEGBlIRWgJVRzmmnZYrpOAegDa6Lx3DKeAmWu8cibUOCGw3yv1XcnY+gX9aRt8dn2cAA",
  "/media/robust-health-phone-plan.webp":
    "data:image/webp;base64,UklGRoQAAABXRUJQVlA4IHgAAADwAwCdASoMABsAPt1cpkyopSOiMAgBEBuJYgDA3Glw9duXN2NMkEAAAP79HKYmSw9hG0Mk4ekGXeMP0LYRxj6oZkDFkk3zFKd2BfwrxclJprJGV0UUGUChC5agvGZMgUcHPJ6HZMWAhZBJhISryrU9L6f6sjAsAAA=",
  "/media/robust-health-plan-week.webp":
    "data:image/webp;base64,UklGRjgAAABXRUJQVlA4ICwAAACQAQCdASoMAAcAAwBSJaQAAkrMYIAA/vK4Auh8rJg48EYctbiTnPLKKAAAAA==",
  "/media/robust-health-sign-in.webp":
    "data:image/webp;base64,UklGRkYAAABXRUJQVlA4IDoAAADQAQCdASoMAAgAAwBSJYwAAp1T1mNTAAD+9stgd2N1Q/BYXQecv8mZRdJmlpL71FKinTHrLNlpMIAA",
  "/media/robust-health-start.webp":
    "data:image/webp;base64,UklGRkQAAABXRUJQVlA4IDgAAACwAQCdASoMAAUAAwBSJQBOgB5vaUYAAP72sMdVQ4yDtc4rnmlfMN8MDNckinFCWz4qgy2GegAAAA==",
  "/media/robust-health-week-five.webp":
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAADQAQCdASoMAAgAAwBSJYwCdAD0iXREAAD+q60OnSz/tN7HC7qm21MWFPxfjrAA",
};
