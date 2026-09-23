# CLAUDE.md

Working notes for this repository. These are decisions, not preferences — they
were made deliberately and should survive sessions where the original brief is
not in context. If you are about to break one, say so explicitly and explain
why rather than doing it quietly.

## What this is

A personal portfolio for Swapnanil Bala — AI engineer, M.S. Data Science at
Northeastern's Khoury College (Sep 2025 – Dec 2027), looking for a Spring 2027
co-op.

The site is itself a work sample, read by people deciding whether its author
can build things. The implementation is part of the content: a sloppy
portfolio is a negative work sample no matter what the copy says.

## History, so nothing gets "restored" by accident

The site has had three designs. Each replaced the last on request.

1. **Ephemeris** — an astronomical almanac: beige and brass, Newsreader,
   bordered plates with a hover lift, an asymmetric right rail.
2. **Dossier** — a technical spec sheet: one ruled sheet, IBM Plex, numbered
   records, spec tables, no plates, no hover. Last at `17e793e` on `main`.
3. **Editorial** (current) — built to a detailed brief for a cinematic,
   motion-led portfolio: a WebGL project slider, an Index archive, case
   studies, an oversized footer and global page transitions.

Do not reintroduce anything from the first two because an older note or commit
describes it. In particular the dossier's stack rules ("no Tailwind, no
animation library, plain CSS only") are reversed, deliberately.

## Stack

- Next.js 16 App Router, React 19, TypeScript in strict mode (with
  `noUncheckedIndexedAccess`).
- **Tailwind CSS v4**, configured in `app/globals.css` (`@theme`,
  `@custom-variant`, `@utility`) — there is no `tailwind.config`.
- **GSAP 3.15** with ScrollTrigger, SplitText and Flip, registered once in
  `lib/gsap.ts`. Import GSAP from there, never from `"gsap"` directly, so no
  component can use an unregistered plugin.
- **Lenis** for smooth scrolling, driven by GSAP's ticker.
- **three.js**, plain, for the home slider only. Not React Three Fiber: three
  plates need no reconciler, and R3F's own `react-reconciler` has to agree with
  the canary React the App Router runs — a coupling not worth carrying.
- Inter Tight via `next/font`, variable, self-hosted at build time.
- Zero `any`, zero `@ts-ignore`, zero `as` used to silence the compiler. The
  `ViewTransition` canary API is typed through `types/react-canary.d.ts`, not
  a cast.

## Architecture

```
app/layout.tsx              fonts, metadata, nav, cursor, smooth scroll
app/page.tsx                Selected — the slider, one viewport
app/work/page.tsx           Index — the archive
app/work/[slug]/page.tsx    case studies (static params; unknown slug = 404)
app/about/page.tsx
components/home/            ProjectSlider, SliderCanvas, ProjectThumbnailRail,
                            MobileProjects, HomeMasthead
components/index/           IndexView (grid + list + preview), ProjectCover
components/work/            ProjectHero, CaseSection, MediaPlate
components/                 PageTransition + SharedMedia, SplitTextReveal,
                            RevealLines, RevealPlate, DisplayTitle,
                            MagneticLink, CharShift, CustomCursor, SiteNav,
                            SiteFooter, LocalTime, SmoothScroll, WarmOnIntent
lib/content.ts              every word on the site
lib/types.ts                the contract
lib/blur.ts                 generated — run `node scripts/build-blur.mjs`
lib/media.ts                hero brightness, plate and case-hero sizes, record numbers
lib/preload.ts              media-scoped preloads, warming a hero on intent
lib/slider.ts               slider maths (step, presence) + DESKTOP_QUERY
lib/motion.ts               easings, durations, media-query hooks
```

**The Index lives at `/work`, not `/index`.** Next has historically normalised
a request for `/index` to `/`, and a static build cannot prove the runtime
router will not. `/work` also gives the right hierarchy: case studies nest at
`/work/[slug]`. The nav label is still "Index".

**All copy lives in `lib/content.ts`.** If you are about to write English in a
`.tsx` file, put it in the content file. Title line breaks are content too
(`displayLines`), so a three-word name cannot wrap three ways and overrun its
share of the viewport.

**The contract makes rules structural.** A `SelectedProject` cannot exist
without a hero and a case study. An image `src` is typed as a key of the
generated placeholder map, so a capture cannot be referenced until
`scripts/build-blur.mjs` has been run over it; the placeholder is looked up
from `src` rather than stored beside it. Links store a `role`, labels resolve
through `content.ui.linkLabels`, and a link with no `href` is filtered out, never
rendered dead.

## Content — do not invent

Every claim is traceable: the September 21 2026 resume, the project READMEs,
GitHub code search and commit history, and the live sites. Where a source was
wrong or stale, the correction is noted beside the claim in `content.ts`.
Known corrections, so they are not "fixed" back from an older source:

- **Lagna Atelier computes charts on the server**, in API routes
  (`app/api/chart/route.ts` imports `chart-service`). The resume's "computes
  full Vedic charts client-side" is wrong. Its Neon schema does persist saved
  charts, so the README's "accounts and sessions, nothing else yet" is stale.
- **Palm reading runs on Claude vision** (Anthropic in 18 files, `claude-opus`
  in 11). The README's `OPENAI_API_KEY` line is stale.
- **Robust Health runs entirely on Supabase**, so NeonDB is not in its stack,
  and its server uses the service-role client with authorisation in
  application code — so "Row-Level Security" is not claimed.
- **Dates come from first commits.** Lagna Atelier and Robust Health start in
  March 2026. The old sites' "2025" was never backed by a repository.
- The Robust Health landing page shows marketing counters ("84% satisfaction").
  They are not repeated as portfolio figures: nobody can check them.

A fact that is not to hand is left out and listed as a TODO in the README —
never written plausibly. Fabricated detail is the one failure a portfolio
cannot recover from in an interview.

## Design direction

Swiss/editorial publication meets cinematic showcase. Typography carries it:
enormous display type against tiny editorial metadata, nothing in between that
competes.

- **Palette** — paper `#F3F2ED`, ink `#111111`, per the brief. No accent: active
  and focus states use weight, opacity and `currentColor`. The dossier's
  OS-driven dark theme is gone — each page has its own ground by design.
  Colour lives only in the `@theme` block.
- **A page's tone is the ground it opens on** (`data-tone` on `<main>`), and
  the root takes it — which is the ground a page transition crossfades through.
  Home and case studies are dark (a case study's body is paper, but it opens on
  an ink hero and closes on the ink footer); the Index and About are light.
  Marking case studies light made the root flash paper mid-transition between
  two dark screens. Text selection is one highlight for both grounds (paper on
  `paper-muted`, 5.9:1), because a tone-keyed one went paper-on-paper inside a
  dark-toned page's light body.
- **Contrast is computed, not assumed** — ink on paper 16.85:1, `paper-muted`
  on paper 5.80:1, `ink-muted` on ink 6.61:1. Text over imagery is checked
  against the pixels under each text box (the brightest 2% for light text), not
  against the image's average; `HERO_BRIGHTNESS` is the lever.
- **Heroes are framed plates, not full-bleed backgrounds.** This reverses the
  first build of this design, which filled the viewport with each capture at
  0.58 brightness and 1.14 zoom. Every capture is a landing page with its own
  headline, so the slider's title sat on top of the product's ("Create your
  Vedic birth chart", "Structured programming…") and read as two sites stacked;
  the zoom also cut each product's nav bar at the viewport edge. Now a capture
  is shown whole, anchored to its top so its header stays intact, and the title
  only crosses the plate's lower edge. Dimming and scrims were tried first and
  did not work: a legible headline competes at any brightness that keeps the
  capture worth showing. Full-bleed only comes back with imagery that carries
  no headline of its own — an in-product view such as the chart wheel — and
  those sit behind forms and logins, so they have to come from him.
- **Type** — Inter Tight throughout. `display` utility: 650 weight, −0.05em
  tracking, 0.84 line height, uppercase. `meta` utility: 11px, 500, uppercase.
  No mono: it is the developer-portfolio tell the brief asks to avoid.
- **The name** is medium size (`clamp(1.25rem, 1.55vw, 1.875rem)`) and appears
  only on the home page, where it is the h1 — per his instruction. Elsewhere
  the footer's tiny © is the only mention.
- **Separators are `/`**, not the brief's `·` — the brief itself uses `/` in the
  case-study STACK line, and middle-dot meta strings were a generated-design
  tell in the old forbidden list. One token to flip if he prefers `·`.
- **Numbers are references.** `01 / Category` in the slider is cited by the
  thumbnail rail's counter and the Index's record numbers; a number on a block
  nothing refers to is still decoration.
- **No cards, no drop shadows, no glass, no gradient washes, no pills, no icon
  badges for technologies.** Technologies are text lists joined by em dashes.

## Motion

Large motion for navigation, small motion for feedback. `lib/motion.ts` holds
the whole vocabulary (`EASE`, `DURATION`, `META_LAG`); reach for it, not for
one-off values.

- **Reduced motion is a full path, not a fallback.** Everything positional is
  removed: no inertia, no distortion, no Flip, no line reveals, page
  transitions become a 150ms crossfade, Lenis is off, the custom cursor is off.
  `?motion=reduce` forces the same path (the head script copies it onto
  `<html data-motion>`), because the preview browser cannot emulate the media
  query. Use the `reduced:` Tailwind variant, which honours both — not
  `motion-reduce:`, which only knows the media query.
- **Revealed text starts hidden only once JS has run** (`html.js
  [data-reveal]`), and a 2.5s CSS failsafe makes it visible regardless, so a
  script error can never leave a heading invisible. `.split-piece` padding
  stops SplitText masks shaving descenders at display line heights.
- **The custom cursor replaces the native one only over regions declaring a
  gesture** (`data-cursor="drag" | "view"`). Everyone keeps their system cursor
  everywhere else.

## The home slider

- **One physics loop** on `gsap.ticker` in `ProjectSlider` owns the state —
  target, current (following with inertia), velocity — and shares it by
  reference (`SliderMotion`) with `SliderCanvas`, which only draws, on the same
  tick. A wheel gesture moves at most one plate, so a trackpad's momentum tail
  cannot skip past everything.
- **One plate on stage.** The frame is 16:10, `min(99.2vh, 76vw)` wide, under
  the masthead. Neighbours rest just past the window's edges: the step between
  plates is derived from the stage and plate widths (`slideStep`), never fixed,
  so no window shape shows a sliver of the next project. Plates dim as they
  leave the stage and light as they arrive (`presenceAt`) — DOM opacity over
  the ink, and the same mix toward ink in the shader. A click opens a project
  only on the plate on stage; the ink around it does nothing.
- **CSS defines the frame once.** The WebGL plates measure a DOM plate's
  layout box (`frameRef`) and step by the same `slideStep`; nothing restates
  the geometry in JavaScript.
- **The DOM plates are always rendered and always in position.** They are the
  no-WebGL and reduced-motion path, the LCP frame, and the element a page
  transition morphs from.
- **`HERO_BRIGHTNESS` is shared by the shader and the DOM image.** The
  renderer does not re-encode colour and textures are not decoded, so a plate at
  rest is exactly the CSS-filtered image — which is what keeps the handover to a
  case study from flashing.
- **Textures are painted, not uploaded.** Each capture is resampled by the
  browser to the plate's size in device pixels and sampled one texel to one
  pixel, repainted when the frame's size settles. Uploading the full capture and
  letting mipmaps minify it drew the plate about 9% softer than the DOM image
  beneath it (edge strength, measured at 2x); painted, the gap is about 2%.
- **The distortion is original, not the reference site's.** The brief's
  reference (G. Colombel, 2024) is a rotating film-reel cylinder; this is flat
  framed plates whose leading edge bows forward with speed while the trailing
  edge holds, a long-exposure smear, a faint leading-edge channel split and a
  slight push-in. The bow only ever grows a plate: shrinking one would expose
  the DOM plate registered beneath it. There is no parallax — it needed a zoom
  that cropped the capture at the frame. Keep it that way.
- **`sources` passed to the canvas must be referentially stable.** A new array
  rebuilds the whole scene; it is memoised in the slider for that reason.
- Touch and narrow screens get `MobileProjects`: one framed plate per screen on
  native vertical scroll-snap, no WebGL. A portrait screen shows the project's
  phone capture (`heroMobile`), a landscape one its desktop capture. CSS
  (`desktop:` variant) decides which slider shows and JS (`DESKTOP_QUERY`)
  decides which is wired up — keep the two queries identical.
- **`useMediaQuery` shares one `MediaQueryList` per query**, notifying every
  subscriber from one listener, so all consumers of a query re-render in one
  commit. With a list per consumer, React committed between their change events
  and both sliders held the same shared name for a frame.

## The Index

- **Three projects to a row from 64rem, two from 48rem, one below**, each slot
  at its own column, span and offset (`GRID_SLOTS`). Offsets are in `vw`: the
  grid is sized by width, and `vh` offsets on a tall window left one project to
  a row.
- **A capture keeps its own aspect ratio.** Forcing covers into slot shapes cut
  headlines mid-word. Only the typographic plates take the slot's shape, and
  their figures are sized in container units so a narrow slot cannot overflow.
- Captions stack (name, then type and year): side by side they wrapped into
  each other in narrow slots. The name's box hugs its text, because Flip scales
  that box into the list row.
- Robust Health's cover is its dashboard, not its landing page: the Index shows
  the product, not its marketing photography.

## Page transitions

React `<ViewTransition>`, native in Next 16's App Router (see
`node_modules/next/dist/docs/01-app/02-guides/view-transitions.md`).

1. Shared project media morphs toward the viewport (`SharedMedia`, class
   `.morph`).
2. Outgoing typography clips away (`.page`, old).
3. The root ground crossfades (`html:has(main[data-tone])` flips it).
4. Incoming typography reveals (`.page`, new), then GSAP line reveals.

Every step ends inside 600–1000ms. `PageTransition` goes in each `page.tsx`, not
the layout — layouts persist, so enter and exit never fire there. Internal
links pass `transitionTypes={["page"]}`; untyped navigations (browser back and
forward) swap instantly.

**Two rendered elements with one view-transition name cancel the whole
transition.** `SharedMedia` takes `enabled` for exactly this: only the slide on
screen, only the visible breakpoint's slider, only the list preview or the grid
tile — never both.

**React's development build warns about duplicates that are not there.** It
records a named `<ViewTransition>` when it mounts or updates, but forgets it
only on unmount, reading the name the boundary has *then*. A plate whose name
was switched off keeps a stale entry, so the next page's tile for the same
project logs "two <ViewTransition name=…>" — and so does crossing the desktop
breakpoint live. The map exists only in development; production has no trace of
it. Fresh loads at either size log nothing. Chase a duplicate only if it
appears on a fresh load.

**The morph stays above the pages** (`z-index: 1` on its group). A name only
the new page has — the entering page's own boundary — is layered after every
name the old page had, so without it the incoming page covered the morph as soon
as its clip opened.

**The morph lands on a loaded image.** The transition snapshots the new page
as soon as it renders, and the hero is wider than anything that leads to it, so
by default it wants a larger image than the one on screen and the morph ended on
its blur placeholder. Instead, everything that leads to a case study asks for
its hero with `CASE_HERO.sizes`: the home plates (larger than they display, on
purpose), their WebGL textures — decoded from an image carrying the same
`srcset` and `sizes`, never a hand-built URL, because the browser's choice
between neighbouring candidates is its own — and the page's preload. One
download serves all three, and the hero decodes synchronously so it is in the
first frame, the one the transition captures. Index covers and the
next-project card are different images, so they warm the hero on hover and
focus (`warmCaseHero`, `WarmOnIntent`). Phones need none of it: their slide and
their hero already ask for the same candidate.

## Performance

The site claims a 50% / 67% load-time cut on one of its own projects. A slow
portfolio refutes its own copy.

- three.js arrives by dynamic import on the desktop home page only (131 KB
  gzipped, after first paint), and appears in no page's initial scripts —
  check the built HTML if that ever changes. Initial JS is about 245 KB gzipped
  per page, ~155 KB of it the React canary and Next runtime.
- Every image carries intrinsic `width` and `height`, and goes through
  `next/image` (or `getImageProps` where a `<picture>` needs art direction).
- **A screenshot never has fewer image pixels than the screen pixels it
  covers.** `MediaPlate` caps each plate at its width divided by the screen's
  density (`--dpr`, stepped from resolution queries in `globals.css`), and
  right-aligns what that leaves narrower than the page. The earlier rule —
  never wider than captured, in CSS pixels — still stretched a 1x capture 1.25x
  at 125% scaling and 2x on Retina, which is where the plates went soft. The six
  in-product plates are 1x captures (1600px-wide viewport shots, cropped), so on
  dense screens they now render smaller; 2x recaptures restore their size.
  Heroes are the 2x captures at full size (2880×1800), which covers the widest
  hero plate up to 2x.
- **Screenshots are served at quality 90** (`SCREENSHOT_QUALITY`, allowed by
  `images.qualities` in `next.config.mjs`). At Next's default 75 the re-encode
  rings around small interface text. Anything that builds a screenshot's URL —
  preloads, textures — must pass the same quality, or it names a different file
  and the one-download handover to the case-study hero breaks. Next 16 rejects
  any quality not listed; a rejected request is a blank image. Phone captures
  stay at 75 (`PHONE_QUALITY`): at three device pixels to the CSS pixel the
  ringing is below what the eye resolves, and the first phone plate is the
  phone's largest paint (103 KB at 90, 60 KB at 75).
- **In an art-directed `<picture>`, every real image is a `<source>` and the
  `<img>`'s own is a transparent pixel** (`TRANSPARENT_PIXEL`). React sets a
  picture's `<img>` attributes before the element is inside the picture, so on
  a client-side render the `<img>` briefly cannot see its `<source>`s and starts
  its own `srcset`. On a phone that downloaded the desktop hero on every
  navigation to a case study.
- **Both sliders are server-rendered, so no home image is eager.** Each
  slider's first plate is preloaded under its own media query (`preloadFor`).
  `next/image`'s `preload` cannot take a query and would fetch the desktop
  plate on phones and the phone plate on desktops. (`priority` is deprecated in
  Next 16 anyway.) The case-study hero is a `<picture>` — desktop capture from
  48rem, phone capture below — and each source is preloaded under its own query.
- The canvas redraws only while something moves, fades or is hovered.

## Accessibility floor

- Visible focus on every interactive element (`:focus-visible`, 2px
  `currentColor` outline). Never `outline-none` without a replacement.
- The slider is a labelled carousel with a polite live region ("Project 2 of
  3: …"), arrow keys, Home/End, Enter, and real buttons in the rail. The canvas
  is `aria-hidden`; the DOM is the source of truth.
- Split and per-letter text is announced once, whole (`CharShift` keeps a
  visually hidden copy; `DisplayTitle` separates lines with real spaces).
- Semantic headings in document order; one h1 per rendered page.
- Responsive from 360px with no horizontal overflow.

## Working in this repo

- **Previews run from the main checkout.** The browser preview tool always
  spawns `.claude/launch.json` from the original project root, whatever
  worktree a session is in. Branch previews on Vercel sit behind Vercel
  Authentication. Plan verification accordingly.
- **The preview pane stops painting while its window is hidden**, and
  headless Edge's `--screenshot` misleads in two ways: it enforces a minimum
  window width of about 500px (a `--window-size=375,812` capture is a clipped
  500px layout), and a tall `--window-size` inflates every `vh` unit. For
  phone sizes, touch, reduced motion, input and transition frames, drive Edge
  over the DevTools protocol (`Emulation.setDeviceMetricsOverride` with
  `mobile`, `setTouchEmulationEnabled`, `setEmulatedMedia`, `Input.*`,
  `Animation.setPlaybackRate` to slow a transition down) at a real viewport.
- The Next.js dev badge sits over the bottom-left corner in development; a
  contrast failure there is the badge, not the page. Audit a production build.
- `photo-review` predates both the dossier and this design. Do not merge it.
- `agentRules: false` in `next.config.mjs` stops Next writing an agent block
  into this file. Keep it.

## Checks before committing

```bash
npm run typecheck && npm run build
```
