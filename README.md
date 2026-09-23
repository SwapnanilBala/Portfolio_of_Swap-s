# Swapnanil Bala — portfolio

A cinematic, editorial portfolio: a WebGL project slider, an Index archive,
case studies and an About page, joined by page transitions. Next.js App Router,
React, TypeScript in strict mode, Tailwind CSS v4, GSAP, Lenis and three.js.

## Run it

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:3000.

| Command                     | What it does                                         |
| --------------------------- | ---------------------------------------------------- |
| `npm run dev`               | Dev server with hot reload                           |
| `npm run build`             | Production build — run this before pushing           |
| `npm run start`             | Serve the production build locally                   |
| `npm run typecheck`         | `tsc --noEmit`, no build output                      |
| `node scripts/build-blur.mjs` | Regenerate image placeholders after adding media   |

Add `?motion=reduce` to any URL to see the reduced-motion version of the site
without changing your system settings.

## Where to edit things

**`lib/content.ts` — every word on the site.** Projects, case studies, the
About page, the footer, every label. Copy never lives in a `.tsx` file.
Comments beside a claim say where it came from, and what an older source got
wrong, so check them before "correcting" anything.

**`lib/types.ts` — the shape content must satisfy.** Add a field and the
compiler points at every place that needs it. A project in the home slider
cannot compile without a desktop hero, a phone hero and a case study.

**`app/globals.css` — tokens and the few rules Tailwind cannot express.** The
palette, the `display` and `meta` type styles, the `reduced:` and `desktop:`
variants, the page-transition choreography and the reduced-motion overrides.

Read `CLAUDE.md` before changing the design. It records the decisions, the
reversals from the two earlier designs, and why each constraint exists.

## Pages

| Route          | What it is                                                         |
| -------------- | ------------------------------------------------------------------ |
| `/`            | Selected work — the slider. Drag, scroll, arrow keys or thumbnails |
| `/work`        | The Index — grid or list, animated between                         |
| `/work/[slug]` | Case studies, for the projects that have one                       |
| `/about`       | About, experience, education, technologies, current work           |

The Index is at `/work`, not `/index`, because Next.js has historically treated
a request for `/index` as `/`.

## Outstanding TODOs

Nothing on the site is filler. These are the facts not yet to hand, and the
loose ends found while scraping.

**Waiting on you**

- **Portrait.** A higher-resolution photo is coming. Put it in `public/media/`,
  update `profile.portrait` (`src`, `width`, `height`) in `lib/content.ts`, then
  run `node scripts/build-blur.mjs`. The About page sizes the slot from the
  image, so nothing else changes.
- **What you learned**, per project. The brief's Outcome sections are meant to
  cover it; nothing documents it yet, so Outcome states results only.
- **The palm-reading clip** for Lagna Atelier: the one interaction a visitor
  will never try on a stranger's site. The poster-gated video player from the
  previous design is at commit `17e793e` (`components/ProjectMedia.tsx`).
- **2x recaptures of the six in-product screenshots** — Lagna Atelier's
  signed-in landing, chart and ashtakavarga; Robust Health's onboarding,
  dashboard and workout. They are 1x captures, so on a 125% or Retina screen
  they render smaller to stay sharp (see *Adding media*). Take each screen at
  the same framing with your display at 200%, or in the browser's device mode
  at a device pixel ratio of 2, and replace the file under the same name.

**Found while scraping — worth fixing at the source**

- **KB Patient Booking admin login.** The private repo's README documents a
  default admin username and password for a panel holding patient names, ages
  and contact details. Confirm the deployed password has been changed to a
  strong, unique one — this site now links to the app — and take the defaults
  out of that README. (They are deliberately not repeated here: this repository
  is public.)
- `drkbalaortho.com` no longer resolves, though the clinic README says the app
  is live there. The portfolio links the Vercel URL instead.
- Your resume says Lagna Atelier "computes full Vedic charts client-side". The
  code computes them in server API routes. It also claims Robust Health uses
  Supabase Row-Level Security, but that app's own README says the server uses
  the service-role client, with authorisation in application code. Either could
  come up in an interview.
- The Lagna Atelier README is stale: it still names `OPENAI_API_KEY` for palm
  reading, and says Neon holds "accounts and sessions, and nothing else yet".

**Snapshots that drift**

- Commit counts (719 on Lagna Atelier) and test counts are as of September 23
  2026. Refresh them in `lib/content.ts` when they move meaningfully.

## Adding media

Stills live in `public/media/` as WebP. After adding or re-cropping one:

```bash
node scripts/build-blur.mjs
```

That regenerates `lib/blur.ts` and prints every file's intrinsic size — the
`width` and `height` to put in `lib/content.ts`. An image cannot be referenced
from content until the script has run over it; the compiler enforces that.

- **Capture at 2x and crop to the content**, not the browser viewport. A
  screenshot is never shown with fewer image pixels than the screen pixels it
  covers: a plate is capped at its width divided by the screen's pixel density.
  A 1x capture therefore renders half as wide on a Retina screen as a 2x one
  would. Don't resize a capture down before saving it, for the same reason.
- **Every project in the slider needs two heroes.** `hero` is a 16:10 desktop
  capture — the live site at 1440×900 and 2x, kept at its full 2880×1800.
  `heroMobile` is the same screen on a phone — 390×844 at 3x, so 1170×2532.
  Both are shown framed and anchored to their top edge, so keep the product's
  own header in the capture. Both are toned by `HERO_BRIGHTNESS` in
  `lib/media.ts`, the same value the slider's shader uses.
- **Save WebP at quality 90.** Screenshots are served at quality 90 too
  (`SCREENSHOT_QUALITY`); interface text is exactly what heavier compression
  smears.
- A desktop capture from a live site, with headless Edge and no extra tools:

```bash
"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --headless=new --hide-scrollbars --window-size=1440,900 --force-device-scale-factor=2 --virtual-time-budget=10000 --screenshot=hero.png https://example.com
```

- The phone capture cannot be taken that way: `--screenshot` will not go
  narrower than about 500px and does not emulate a phone. Use the DevTools
  protocol's device emulation (`Emulation.setDeviceMetricsOverride` with
  `mobile: true` and a device scale factor of 3), or your browser's device mode.

- The resume in `public/resume.pdf` is a scrubbed copy: the phone number and
  personal email are removed from the text, the content streams and the
  `mailto:` link, because this repository is public. Give any replacement the
  same treatment.

## Deploy to Vercel

1. Push this repo to GitHub.
2. At [vercel.com/new](https://vercel.com/new), import the repository. Vercel
   detects Next.js; the defaults are correct and no environment variables are
   needed.
3. Every push to `main` deploys. Pull requests get preview URLs.

### Custom domain

Add the domain under **Project → Settings → Domains**, then create the DNS
records Vercel shows you.

> **Copy the DNS values verbatim from the Vercel dashboard.**
>
> Vercel now issues **project-specific CNAME targets** that look like
> `d1d4fc829fe7bc7c.vercel-dns-017.com`. The value is unique to your project.
> Older blog posts and tutorials tell you to point a CNAME at
> `cname.vercel-dns.com`; following that instead of the dashboard will leave the
> domain unverified. Always read the target out of the dashboard.

For an apex domain (`example.com`), Vercel will show either an `A` record or an
`ALIAS`/`ANAME` — again, use whatever the dashboard displays for your project
rather than a value from memory.

## Notes

- Inter Tight is a variable font, self-hosted at build time by `next/font`, so
  every weight the styles use is a real face — no synthetic bold, and no
  runtime request to Google.
- three.js loads only on the desktop home page, after first paint. Touch
  devices and every other page never download it.
- Line endings are normalised to LF by `.gitattributes`, which overrides
  `core.autocrlf` on Windows checkouts.
