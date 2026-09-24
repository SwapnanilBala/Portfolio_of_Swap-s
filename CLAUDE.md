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
app/layout.tsx              the shared shell: fonts, metadata, nav, home link
app/(desktop)/layout.tsx    desktop tree: smooth scroll, cursor
app/(desktop)/page.tsx      Selected — the WebGL slider, one viewport
app/(desktop)/work/...      Index, and case studies (static params; unknown slug = 404)
app/(desktop)/about/
app/m/layout.tsx            phone tree: PhoneReveals
app/m/...                   the same four pages for phones, served at the same URLs
components/home/            ProjectSlider, SliderCanvas, ProjectThumbnailRail,
                            MobileProjects, HomeMasthead
components/index/           IndexPage, IndexView (Flip + preview), parts
                            (grid, list, toggle, links), ProjectCover
components/work/            CaseStudy, ProjectHero, CaseSection, MediaPlate,
                            MediaPair, CaseNav
components/about/           About
components/kits/            desktopKit (GSAP), phoneKit (CSS)
components/phone/           PhoneReveals, PhoneIndexView
components/                 PageTransition + SharedMedia, SplitTextReveal,
                            RevealLines, RevealPlate, DisplayTitle,
                            MagneticLink, CharShift, CustomCursor, SiteNav,
                            HomeLink, SiteFooter, LocalTime, SmoothScroll,
                            WarmOnIntent, DotField
lib/content.ts              every word on the site
lib/types.ts                the contract
lib/blur.ts                 generated — run `node scripts/build-blur.mjs`
lib/media.ts                hero brightness, plate, case-hero and portrait sizes, record numbers
lib/preload.ts              media-scoped preloads, warming a hero on intent
lib/slider.ts               slider maths (step, presence) + DESKTOP_QUERY
lib/motion.ts               easings, durations, media-query hooks
lib/kit.ts                  the motion kit's contract
lib/links.ts                internal/external links, canonicalPath
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

## Two trees, one design

Phones get their own component tree, on request: the same design, without
the desktop's motion code. It cut every phone page's initial JavaScript from
~245 KB gzipped to ~180 KB and halved main-thread work on Lighthouse's
throttled phone (0.5–0.7s from 1.0–1.4s), Speed Index 0.8–0.9s from
1.2–1.5s.

- **Routing is a rewrite, not a Proxy.** `next.config.mjs` rewrites the four
  page routes to `app/m/...` when the user agent is a phone (`beforeFiles`,
  `has` on `user-agent`). Vercel evaluates those rules at the edge, so every
  page stays a static file on the CDN; a Proxy (Next 16's middleware) runs
  as a function on every request and would have cost more time than the
  tree saves. Page loads, client navigations and prefetches all carry the
  user agent, so a phone never mixes the trees. `/m` is never an address:
  direct visits redirect to the real path. iPads send a desktop user agent
  and get the desktop tree, which is responsive — as is every narrow
  desktop window, which still gets `MobileProjects` from the desktop home.
- **One set of views, two kits.** Pages under `app/(desktop)` and `app/m` are
  a few lines each: they render the same views (`CaseStudy`, `About`,
  `IndexPage`, `SiteFooter`, `ProjectHero`, `CaseSection`, `MediaPlate`,
  `MediaPair`) and pass a `MotionKit` (`lib/kit.ts`) — `desktopKit` is
  SplitText, RevealLines, RevealPlate and MagneticLink on GSAP; `phoneKit`
  renders the same elements marked `data-m-reveal`. **A view never imports
  a kit**, or GSAP comes back into the phone bundles; the build's
  per-page chunks are the check. The Index's grid, list and toggle live in
  `components/index/parts.tsx` and both Index views render them, so the
  markup cannot drift; only Flip and the pointer preview are desktop-only.
- **Phone reveals are CSS** ("Phone reveals" in `globals.css`): the same
  rise, line reveal and uncovering, with the desktop kit's timings.
  `PhoneReveals`, the tree's only motion script, marks elements
  `data-inview` once as they come into view. Hidden only under `html.js`,
  from before first paint, so nothing flashes; a 2.5s failsafe applies
  until it starts (`html.m-observing`), and it marks what is on screen
  before switching the failsafe off if it starts late. Text rises as a
  block rather than line by line: SplitText is most of GSAP's weight.
- **Read the pathname through `canonicalPath`.** A phone page is
  prerendered at `/m/...` and read by the browser at its real path, so a
  component rendering from `usePathname()` directly hydrates with a
  mismatch (see the bundled usePathname docs). `SiteNav` and `HomeLink` do.
- **Test phones with a phone user agent.** Screen size alone is served the
  desktop tree. The CDP driver sets one whenever it emulates `mobile`.

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
  They are not repeated as portfolio figures: nobody can check them. Its
  member portal's badges (encryption, uptime, "HIPAA compliant") are left out
  the same way, and so is that capture: a compliance claim is a legal one.

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
  the footer's tiny © is the only mention. The home link's "SB" is the
  favicon's monogram, a mark rather than the name, and it is absent on the
  one page the name is on.
- **Separators are `/`**, not the brief's `·` — the brief itself uses `/` in the
  case-study STACK line, and middle-dot meta strings were a generated-design
  tell in the old forbidden list. One token to flip if he prefers `·`.
- **Numbers are references.** `01 / Category` in the slider is cited by the
  thumbnail rail's counter and the Index's record numbers; a number on a block
  nothing refers to is still decoration.
- **No cards, no drop shadows, no glass, no gradient washes, no pills, no icon
  badges for technologies.** Technologies are text lists joined by em dashes.
- **The way home is top left, on every page but home** (`HomeLink`, in the
  layout, hidden on `/` where the name holds that corner). Crop marks around
  the monogram — the cursor's mark, in the plates' 16:10 — opening a few
  pixels on hover, then "Home" in the nav's type. `mix-blend-difference`
  like the nav, so it reads on paper, on ink and over imagery, and it sits on
  the nav's line (both centre at 42.5px from 48rem, checked). It comes
  before the nav in the DOM, so it is first in tab order, as it is on screen.
- **A case study ends on previous and next, as type** (`CaseNav`): two
  halves, each one link edge to edge, the neighbour's display title with a
  hairline arrow and its category and year. The loop wraps both ways. It
  replaced a card that carried the next project's cover as a shared element;
  opening it flew that small cover up into the next hero — often a different
  image, crossfading while the box grew — and he reported it as a weird
  preview. **Nothing at the foot of a case study is a shared element.** The
  crop marks lock onto a half's words rather than the half, which runs to
  the window's edge where marks set outside it were cut off.

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
- **The custom cursor is crop marks**, and replaces the native one only over
  regions declaring a gesture (`data-cursor="drag" | "view" | "open"`).
  Four hairline corners bound a small 16:10 box — the plates' proportion —
  under a meta label. Over anything marked `data-cursor-frame` (the plate on
  stage, Index covers) they lock onto its edges and say what a click does;
  while dragging they spread with speed and the label points the way. A link
  or button inside a gesture region keeps the system pointer and the marks
  step aside. Everyone keeps their system cursor everywhere else. This
  replaced a filled circle — the only round element on the site, and the
  stock agency-portfolio cursor.

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
  native vertical scroll-snap, no WebGL — alone in the phone tree, beside the
  WebGL slider in the desktop tree for narrow windows. Its first plate is
  eager and high priority, the rest low: within lazy-load distance, they
  downloaded alongside the first and shared its bandwidth. A portrait screen shows the project's
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
- **An entry without a case study lists where it leads** under the tile, one
  small section per link — Meta Database Engineer's certificate and its
  repository side by side — in both layouts. The tile still opens the first
  link, so order `links` by what the entry is: the certificate before the
  code. The row sits outside the tile's link, which cannot contain another.
  Its labels are `ui.index.destinations`, a word or two per role: the
  narrowest slot is about 13rem, and the case pages' sentences wrapped there.
- **The fake news classifier has no screen, so its picture is its data**
  (`DotField`): LIAR's 10,269 training claims at one dot per five, laid down
  as fake, set aside, real — the class imbalance the project fought, in plain
  sight. Every count is from its RESULTS.md, and the hero's legend states
  them. It is the Index cover and the case-study hero. Two arrangements of
  the same dots: `wide` (vertical bands, ~16:10) for the cover and the hero
  on a wide screen, so that morph is one picture growing; `tall` (stacked
  bands, portrait) for the hero on a phone, where the wide one filled less
  than half the plate.
- **Each line of dots is one stroke**: a round-capped dash per cell. Drawn
  as 2,054 arcs it was ~100 KB of markup, sent twice (HTML and the RSC
  payload); as strokes it is under 2 KB. A ring is a dot with its middle
  stroked in ink, so the field assumes the ink ground both of its plates
  have. The dash is 0.01 long, not 0, which not every renderer paints.

## Case-study media

A section may be followed by one plate (`MediaPlate`) or a pair
(`MediaPair`): `section.media`, a union on `kind`.

- **A pair is two captures read together**, side by side from 48rem with a
  short explanation in the label column, stacked below it. Each capture's
  column is as wide as its own ratio (`flex-grow`), so the two share one
  height whatever their shapes — no cropping to force a match. The band is
  capped so the shorter capture is never upscaled, and it stays beside its
  explanation rather than against the right edge: on a 2x screen the capped
  band pushed right left a gap wider than either capture.
- **Pairs are for compact captures, plates for wide ones.** These are 1x
  captures of a large window, so interface text is ~16px at full size. Two
  wide page regions at half width put it near 6px; a single card or panel at
  half width keeps it near 11px. Choose a pair's halves by that, not by
  which screens would be nice together.
- **Every capture carries a hairline** (`PLATE_FRAME`), drawn inside its
  edge so no dimension changes. The clinic's pages are beige, and without it
  they ran into the paper ground and read as part of this page.
- **What a capture must never show**, checked before cropping: an account's
  email in an app header, a client's biometrics, another person's name,
  birth details — the synastry form's date, time and place, and dasha screens
  whose dates and nakshatra degree give a birth date away — and the clinic's
  stated password format. Crop past it; do not blur what can be cropped.
  Clinic captures are signed-out public pages only.

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
first frame, the one the transition captures. Index covers are different
images, and the case nav has none, so both warm the hero on hover and focus
(`warmCaseHero`, `WarmOnIntent`). Phones need none of it: their slide and
their hero already ask for the same candidate.

## Performance

The site claims a 50% / 67% load-time cut on one of its own projects. A slow
portfolio refutes its own copy.

- three.js arrives by dynamic import on the desktop home page only (131 KB
  gzipped, after first paint), and appears in no page's initial scripts —
  check the built HTML if that ever changes. Initial JS is about 245 KB gzipped
  per desktop page, ~155 KB of it the React canary and Next runtime, and about
  180 KB per phone page, which carries no GSAP (see *Two trees, one design*).
- Every image carries intrinsic `width` and `height`, and goes through
  `next/image` (or `getImageProps` where a `<picture>` needs art direction).
- **A screenshot never has fewer image pixels than the screen pixels it
  covers.** `MediaPlate` caps each plate at its width divided by the screen's
  density (`--dpr`, stepped from resolution queries in `globals.css`), and
  right-aligns what that leaves narrower than the page. The earlier rule —
  never wider than captured, in CSS pixels — still stretched a 1x capture 1.25x
  at 125% scaling and 2x on Retina, which is where the plates went soft. The
  in-product captures are 1x — his 2560-wide screen at 100% — cropped to the
  component, so on dense screens they render smaller; 2x recaptures restore
  their size.
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
- **Images are served as AVIF, WebP where a browser cannot take it**
  (`images.formats`). The files in `public/media` stay WebP; the optimiser
  negotiates the format from the `Accept` header on the same URL, so
  preloads and the slider's textures are untouched. Measured on this site's
  own captures: 25–31% smaller for the phone plates, 35–48% for the
  screenshots and heroes. Next maps quality to AVIF at ×5/8 (90 → 56) and
  keeps full-resolution colour, so there is no chroma smear on coloured
  interface text. The screenshots measure 42–45 dB PSNR against their
  source (WebP q90: 45–51) and 1–2% less edge contrast; at 3x
  magnification the text is indistinguishable. Recheck with an enlarged
  side-by-side before raising compression further.
- **The stylesheet is inlined** (`experimental.inlineCss`): one render-
  blocking request fewer for a first-time visitor, who is most of this
  site's audience. Next writes the CSS twice into the HTML (the style tag
  and the RSC payload); brotli, which Vercel serves, compresses the second
  copy away, leaving about +5–6 KB per page against a separate 7.8 KB
  stylesheet. **Measure it compressed with brotli, not locally:** `next
  start` sends gzip, whose 32 KB window cannot reach the first copy of a
  42 KB stylesheet, so a local Lighthouse run shows the page 26 KB heavier
  and the saving cancelled.
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
