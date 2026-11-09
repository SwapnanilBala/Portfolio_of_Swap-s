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
  | "/media/fens-nov-4-pond.webp"
  | "/media/fens-nov-4-rocks.webp"
  | "/media/fens-nov-4-trees.webp"
  | "/media/fens-oct-25.webp"
  | "/media/fens-oct-26-leaves.webp"
  | "/media/fens-oct-26-water.webp"
  | "/media/kb-clinic-booking.webp"
  | "/media/kb-clinic-doctor.webp"
  | "/media/kb-clinic-live-bangla.webp"
  | "/media/kb-clinic-live-chamber.webp"
  | "/media/kb-clinic-live-chambers.webp"
  | "/media/kb-clinic-live-day.webp"
  | "/media/kb-clinic-mobile.webp"
  | "/media/kb-clinic-signin.webp"
  | "/media/lagna-atelier-android-birth-details.webp"
  | "/media/lagna-atelier-android-chart-hindi.webp"
  | "/media/lagna-atelier-android-home.webp"
  | "/media/lagna-atelier-android-preferences.webp"
  | "/media/lagna-atelier-android-reading.webp"
  | "/media/lagna-atelier-android-timing.webp"
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
  | "/media/robust-health-android-coach-plan.webp"
  | "/media/robust-health-android-coach.webp"
  | "/media/robust-health-android-dashboard.webp"
  | "/media/robust-health-android-onboarding.webp"
  | "/media/robust-health-android-plan.webp"
  | "/media/robust-health-android-workout.webp"
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
  "/media/fens-nov-4-pond.webp":
    "data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAACwAQCdASoMAAkAAwBSJZACdADaPx8AAP22XKMES7n7j8xiEW3TJxPveMGeAN9bT28E84VQRML5ebBLSqGCio/rMAA=",
  "/media/fens-nov-4-rocks.webp":
    "data:image/webp;base64,UklGRlwAAABXRUJQVlA4IFAAAADwAQCdASoMAAkAAwBSJaACdAD0Z5DXBwAA/FsM5Q1Y3hHsvUb8wruaA6wbAomS43I/LN44dgoh+W9qv/C5oPtsOJ7dSB/l9f1SP3kVv4AAAA==",
  "/media/fens-nov-4-trees.webp":
    "data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAADwAQCdASoMAAkAAwBSJZgCdADhZQzzzQAA+0YhTHM4nVwbG+1Xs1XKa1Esd4tsoe/+WK2CAxYgFCsna3pjCfIAAAA=",
  "/media/fens-oct-25.webp":
    "data:image/webp;base64,UklGRlYAAABXRUJQVlA4IEoAAADwAQCdASoMAAkAAwBSJbACdAEDe8wfMAAA/pTiLJoqcvWujP5t+bHclFTHUisj/GL/W7oHXVs7HCEvCOnVxgut481r2X+gfVYAAA==",
  "/media/fens-oct-26-leaves.webp":
    "data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAADQAQCdASoMAAkAAwBSJbACdADdSGa+UADOOUhMcG0vi7T7zyfiu0b5n/zUlg+CmnOc6XWTcUSmSRq676H4P8QAAAA=",
  "/media/fens-oct-26-water.webp":
    "data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAADwAQCdASoMAAkAAwBSJbACdADhlIUj0OAA/swuGRbPiNCyCIu6G83pP8bxV81Yw2oUuCL+gompwYj1ELXEbB1mAAA=",
  "/media/kb-clinic-booking.webp":
    "data:image/webp;base64,UklGRiYAAABXRUJQVlA4IBoAAAAwAQCdASoMAAkAAwBSJaQAA3AA/vT6EXEAAA==",
  "/media/kb-clinic-doctor.webp":
    "data:image/webp;base64,UklGRjgAAABXRUJQVlA4ICwAAABQAQCdASoMAAsAAwBSJZQABAAAAP700pxjZta+2rbzTfHa100hkF7V+5eAAA==",
  "/media/kb-clinic-live-bangla.webp":
    "data:image/webp;base64,UklGRjgAAABXRUJQVlA4ICwAAADQAQCdASoMAAgAAwBSJaQAAp3Jmi32gAD+9ttC3sb2FsrZeLVBQFEFsVgAAA==",
  "/media/kb-clinic-live-chamber.webp":
    "data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAAAwAQCdASoMAAgAAwBSJaQAA3AA/vU3r1BIRPk4SMMrlbvqzhgAAA==",
  "/media/kb-clinic-live-chambers.webp":
    "data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAAAwAQCdASoMAAgAAwBSJZQAA3AA/vU5ATYhPje2OFzO5AndPAAAAA==",
  "/media/kb-clinic-live-day.webp":
    "data:image/webp;base64,UklGRjQAAABXRUJQVlA4ICgAAACwAQCdASoMAAgAAwBSJaQAAujaXxjAAP74V+DE4IQZB1uUzY37wAAA",
  "/media/kb-clinic-mobile.webp":
    "data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAADwAwCdASoMABoAPt1apkyopSOiMAgBEBuJaQAAUozLCICIt/xttGAAAP7vH4vfsGDIxAqSy7oF5tx6g/z4f2f7VFDS9S/zlFTO1xIE/Kpes//aPRPZDOk7ygFPX4G6snKmxWwAAAA=",
  "/media/kb-clinic-signin.webp":
    "data:image/webp;base64,UklGRjAAAABXRUJQVlA4ICQAAACQAQCdASoMAAIAAwBSJaQAAudZtgAA/vhOp6oOhNrGU44AAAA=",
  "/media/lagna-atelier-android-birth-details.webp":
    "data:image/webp;base64,UklGRoQAAABXRUJQVlA4IHgAAADQAwCdASoMABkAPt1apkyopSOiMAgBEBuJaQAAWp71WEMz4gv7mwAA/vIvcqrnzXhaut9adSaMcCQZ6FV+PBs01nDm19PFrFVBnW7VBa7O0bimFeAWFta/PtNsq4M8U/EJxbvehK4o//Wfp/k2w3/pNKcLA6IQAAA=",
  "/media/lagna-atelier-android-chart-hindi.webp":
    "data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAACQAgCdASoMABkAAwBSJaQAD43xduQ1Uoi9hZ/AkAD+94bq7sWaVB5uU6QfBWfcpbUO96JEIjBCHg/6hfNEf3f2NlzFjyKWJHfvGPAZQOSUPGfCxzSn3gd6rLYyZ+0n555cisUAAAA=",
  "/media/lagna-atelier-android-home.webp":
    "data:image/webp;base64,UklGRm4AAABXRUJQVlA4IGIAAADwAwCdASoMABkAPt1apkyopSOiMAgBEBuJZwAAWsfc82BLtBKvhEAAAP7rMS8itkRdbh7p/F4GpZlUclDXchNGD7yNtdw3MXpiw6a1HW5qGkyUZL15d1j7NVTe7XMK8CAAAA==",
  "/media/lagna-atelier-android-preferences.webp":
    "data:image/webp;base64,UklGRowAAABXRUJQVlA4IIAAAADwAwCdASoMABkAPt1cpkyopSOiMAgBEBuJaQAD43oGufLO7vK6zZiAAP7p+aHpr1EQfWfOyogznLRjqTMC+pq0FS8JvZdm9R2f0Lwvpe3M6daX+ZhRKvpwclWCOk5+XguqYvu8JcnN1fSpLzgf+aNGepL/8PVdDpIsHLIe7YAAAA==",
  "/media/lagna-atelier-android-reading.webp":
    "data:image/webp;base64,UklGRn4AAABXRUJQVlA4IHIAAAAwAwCdASoMABkAPt1qqU4opqQiMAgBEBuJaQAAev+3eeAwAP7w1BOUmtIQyImwUK6ZGN8Pj3uS/w1SgfUDaPSJN/ztsP4iofuX9v3aMci9zAn0XnKJVDiv3w2g/tt568AZri2bFV8f+P+Do3jpBBgAAAA=",
  "/media/lagna-atelier-android-timing.webp":
    "data:image/webp;base64,UklGRmoAAABXRUJQVlA4IF4AAADwAwCdASoMABkAPt1qqU4opqQiMAgBEBuJaQAAWp/5X6ym2s6MyrUEAP7x6xd8tmlmzUg48Kax15y+6idMWo/fhcVDPfFaaFlU5bVovQjWtG5rxs/c6vh+xEMAAAAA",
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
  "/media/robust-health-android-coach-plan.webp":
    "data:image/webp;base64,UklGRmgAAABXRUJQVlA4IFwAAABQAwCdASoMABkAPt1eqU2opSQiMAgBEBuJZQAAetkLwnQBqgD+8N0CME7QUVCjlAPslvaEC07BVN9l3N3DXcNbl8iZdl+A/xO74bxJsh8/i3eia2b2YgmzPQAAAA==",
  "/media/robust-health-android-coach.webp":
    "data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAAAwAwCdASoMABkAPt1apkyopSOiMAgBEBuJYwAASqPd+PbgAP4dfgcg3aftYvEV91LKeExA583rCiJjYpB64k3flYHZ9/3NvA6FRSzQXm3QB7Y+3W++EkAA",
  "/media/robust-health-android-dashboard.webp":
    "data:image/webp;base64,UklGRnoAAABXRUJQVlA4IG4AAAAQBACdASoMABkAPt1apkyopSOiMAgBEBuJZgCdACPLtcBpD/7fBSuPAAD6Kl15spl6FQdEkktjMr5UBS/5VC60IP8VfAPDcLSRARgm/aXCb032ATuT1WtG948kXYn5Fe/E3OwoHIFXQMG16IwAAA==",
  "/media/robust-health-android-onboarding.webp":
    "data:image/webp;base64,UklGRnYAAABXRUJQVlA4IGoAAACwAwCdASoMABkAPt1apkyopSOiMAgBEBuJbACw7BwswJ7OKHchgAD+JeMTXhXtdfeggoZJX1CiFmL6sk1R79odQenFFyTGxgLFitesClPtaKg9jJ85IYzj5h4KT1h8Pvi69CI2i1DMsAAA",
  "/media/robust-health-android-plan.webp":
    "data:image/webp;base64,UklGRoYAAABXRUJQVlA4IHoAAADQAwCdASoMABkAPt1cpkyopSOiMAgBEBuJYgCdABZmY5rw8zZ6YAAA/TU0WA4hTvSy5VieTh7/UY6LSmySMy+tIL9xbq5OsxR0whO+K1F9k2qe8BVkvW9mpycfu9khsUIAbvSKh/V/ZSwDHN51HR+VXr/8PvdnLZAAAA==",
  "/media/robust-health-android-workout.webp":
    "data:image/webp;base64,UklGRogAAABXRUJQVlA4IHwAAABQBACdASoMABkAPt1ep00opSOiMAgBEBuJYgCdIIjDAeCXLvmn83GVHmjIAP7y1+AhIv7K7HzqNsayo/uN4QOW9BaxJVGHobChwafIni5emi+pC44GbZetUr0kYDaofhyBvt/qVFyPoLkA/f+n/H9RUm9DY966HwMHoAAA",
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
