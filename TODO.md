# TODO

Facts not yet to hand. Per `CLAUDE.md`, anything the site can't back up is left out
and listed here instead of being written plausibly.

## Waiting on you

- **A sharper suit portrait.** The About page's third circle (`about-suit.webp`)
  is cut from a 400px photo, so on a 3x phone it is shown 1.36x larger than
  its pixels. Any square crop of 360px or more fixes it: drop the original in
  `incoming/`, save the crop over `public/media/about-suit.webp`, update its
  `width` and `height` in `about.portraits` in `lib/content.ts`, and run
  `node scripts/build-blur.mjs`.
- **What you learned**, per project. The brief's Outcome sections are meant to
  cover it; nothing documents it yet, so Outcome states results only.
- **The palm-reading clip** for Lagna Atelier: the one interaction a visitor
  will never try on a stranger's site. The poster-gated video player from the
  previous design is at commit `17e793e` (`components/ProjectMedia.tsx`).
- **2x recaptures of the in-product screenshots** — the reading, chart
  settings, wheel and houses for Lagna Atelier; onboarding, intake, progress,
  dashboard and trainer view for Robust Health; the clinic's booking form,
  doctor and admin pages. They are 1x captures (a 2560-wide screen at 100%),
  so on a 125% or Retina screen they render smaller to stay sharp (see
  *Adding media* in the README). Take each screen at the same framing with display scaling
  at 200%, crop to the same component, and replace the file under the same
  name.

## Snapshots that drift

- Commit counts (719 on Lagna Atelier) and test counts are as of September 23
  2026. Refresh them in `lib/content.ts` when they move meaningfully.
