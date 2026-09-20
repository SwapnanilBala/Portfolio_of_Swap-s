# CLAUDE.md

Working notes for this repository. These are decisions, not preferences — they
were made deliberately and should survive sessions where the original brief is
not in context. If you are about to break one, say so explicitly and explain
why rather than doing it quietly.

## What this is

A personal portfolio for Swapnanil Bala, M.S. Data Science at Northeastern's
Khoury College, targeting a Spring 2027 co-op in full-stack, AI engineering, or
AI product engineering.

The site is itself a work sample. It is read by people deciding whether its
author can build things, which means the implementation is part of the content.
A sloppy portfolio is a negative work sample no matter what the copy says.

Two readers, and the page serves both without asking either to pick a mode:

- A recruiter, 40–90 seconds, does not read paragraphs, scanning for evidence
  and contact details. Their path is the right-hand edge of the spec tables,
  where every figure on the page is aligned into one column.
- An engineer who arrives later and reads exactly one project closely. Their
  path is the prose and the detail list above each spec table.

Both paths work because the figures are a table rather than a paragraph: the
recruiter reads down the figure edge without reading a sentence, and the
engineer reads the prose without stepping over numbers.

## Stack — non-negotiable

- Next.js App Router, React, TypeScript in strict mode.
- Plain CSS in a single `app/globals.css`. Tokens as custom properties in
  `:root`.
- **No** Tailwind, CSS-in-JS, styled-components, UI component library,
  animation library, CMS, or state management library.
- `next/font` for typefaces, self-hosted at build time. No runtime request to
  Google, no layout shift.
- Zero `any`. Zero `@ts-ignore`. Zero `as` used to silence the compiler. If a
  type fights you, the model is wrong — fix the type, not the call site.

Note on the last rule: setting a CSS custom property via an inline `style` prop
requires an `as` cast in React's types. That is why the reveal stagger is driven
by `data-reveal` attributes with delays in the stylesheet, not inline styles.

## Architecture

```
app/layout.tsx        fonts, metadata
app/page.tsx          composition only, no copy
app/globals.css       tokens + every style rule
components/           presentational, typed props
lib/types.ts          the contract
lib/content.ts        every word on the site
public/media/         posters, clips and the portrait
public/resume.pdf
```

**All copy lives in `lib/content.ts`.** If you are about to write a sentence of
English inside a `.tsx` file, stop and put it in the content file. Components
take typed props and render. This exists so prose can be rewritten without
reading JSX, and so copy changes review as a clean diff of English.

Metadata in `layout.tsx` is derived from `content.profile`, not written inline,
for the same reason.

**All types live in `lib/types.ts`.** The domain is modelled so the compiler
catches incomplete content before a recruiter does:

- `Media` is a discriminated union on `kind`. The video variant requires
  `poster`, `caption` and `durationSeconds`. A poster-less video downloads bytes
  on page load, so that state is made impossible to express rather than merely
  discouraged.
- Links store `role`, not a label string. Labels resolve through
  `LINK_LABELS: Readonly<Record<LinkRole, string>>`, so vocabulary stays
  consistent and adding a role fails to compile until it is labelled.
- `STATUS_LABELS` is keyed by `Exclude<ProjectStatus, "shipped">`. A shipped
  project renders no badge because saying "shipped" is noise, and the exclusion
  makes that a fact about the type rather than a rule to remember.
- Everything is `readonly`. Sorting therefore copies: `[...projects].sort(...)`,
  never in-place mutation.
- Projects order by `flagship`, not chronology.

## Design direction

The organising metaphor is a **dossier** — a technical spec sheet. This
replaced the ephemeris-page metaphor on request, in a full visual overhaul
chosen from four mocked directions. The subject matter still drives it: the
flagship is a hand-written calculation engine, and the claim the whole page
makes is that its figures are checkable. A spec sheet is the form that argues
for itself.

Do not restore the almanac reading of this — the plates, the right rail, the
asymmetric two-arrangement layout, Newsreader. Those were deliberate and are
now deliberately gone.

- **One ruled sheet, not a stack of plates.** Records are separated by
  hairlines. Nothing is a bordered panel, nothing lifts on hover, nothing has a
  shadow. A record is a row in a reference document, not a control; the links
  inside it are the interactive part and they keep the focus ring.

  **This reverses two earlier amendments.** Entries used to be plates with a
  hover transition, a brass edge tab and a 2px rise, added because the page was
  judged too static. The dossier has no plates to lift, and a hover effect on a
  non-interactive row is decoration. If the page reads as too static again, the
  answer is not to re-add the lift.

- **Two columns, one threshold.** A locator column and a body column, on the
  same grid from the section heads down through every record. The locator
  carries the record number and the period; the body carries everything else.
  Below 46rem the locator stops being a column and becomes a line above the
  record. Above 74rem only the column width and the sheet padding change.

  There is no third arrangement. The old layout had two that had to be kept in
  sync and a documented bug from exactly that; this has one structure and two
  widths of it.

- **The spec table is the point.** Gutter facts render as label-left,
  figure-right, dotted rule between rows, two abreast above 46rem. The figures
  land on a common right edge, so the eye runs that edge and reads the numbers
  as data rather than as a list. It lives in the **body** column — at the
  locator column's 132px a label like "lines of TypeScript" wraps and the
  figure loses the edge it is supposed to line up on.

  The DOM order is value then label, which is the correct reading order for a
  screen reader; the visual order is reversed in CSS. Do not "fix" the markup
  to match the visual order.

- **The gutter is for numbers a stranger could independently verify** — dates,
  line counts, test counts, measured deltas. **Never put an adjective in the
  gutter.** Its entire authority comes from containing no claims about quality.
  An unmeasured figure renders as a marked `TODO`, not as an omission.

- **Records and figures are numbered, and that is a reversal.** The forbidden
  list still bans decorative `01 / 02 / 03` sequence markers, and this is the
  documented exception rather than a loophole: the record locator and the
  figure citation are one system. "Fig 2.1" is findable from record 02 without
  counting, which is the entire reason a caption can be pointed at in
  conversation. The number is a reference, not a rank. A bare `01` on a block
  with nothing citing it is still banned.

- **Figures span both columns, below the record.** A plate confined to either
  column is too small to be evidence. Two abreast above 46rem; a capture wider
  than 2.2:1 takes the full width via `data-wide`.

- **Palette is unchanged by the overhaul.** Warm beige field (`#ede4d3`), deep
  brass accent (`#73550e`), dark warm-brown text, paired with the cyanotype
  dark theme (`#0e2233` field, brass lifted to `#d9a842`) under
  `@media (prefers-color-scheme: dark)`. It follows the OS; there is no toggle
  and one was not asked for.

  Colour lives only in the two token blocks at the top of `globals.css`. No
  rule below them holds a literal colour — that is why a second theme is ten
  lines rather than an audit. Two invariants hold across both: `--mat` is
  darker than the field so a mounted capture reads the same either way, and
  `--field-veil` is its own theme's `--field` at 92% so a poster label stays
  legible.

- **Type.** IBM Plex Sans for prose, IBM Plex Mono for every figure, label,
  citation and structural mark. They are siblings on one skeleton, so the spec
  tables and the prose belong to the same system and the digits align.

  This replaced Newsreader and JetBrains Mono. Newsreader is a reading face
  built for continuous prose and its warmth works against a page whose argument
  is that the numbers are checkable. `font-variant-numeric: tabular-nums` on
  every column of figures; proportional numerals make a numeric column ragged
  and the design rests on that column being straight.

  Both faces need explicit weights in `next/font` — neither is variable here,
  so an omitted weight silently yields 400 only and every 500/600 rule falls
  back to synthetic bold.

- **Measure.** Prose constrained to ~66ch. Wider than the old 34rem because the
  body column no longer competes with a figure rail for the same run.

### Forbidden

These are the current tells of generated design. Do not produce any of them,
even if asked to make the page "more impressive":

- Tracked-out ALL-CAPS eyebrow labels above headings (small mono labels *in*
  the locator column and section heads are structural, not eyebrows)
- Meta strings joined with middle dots (`A · B · C`)
- Arrows appended to link or button text
- Identical rounded cards with the same soft grey shadow under each
- Gradient washes used as decoration
- Numbered `01 / 02 / 03` markers used as decoration. The record locators and
  figure citations are the documented exception above, because something cites
  them; a number on a block nothing references is still banned
- A cream background with high-contrast serif and terracotta accent (the field
  is beige, but the accent is brass — the banned thing is that specific trio,
  not a light background)
- Near-black with a single acid-green or vermilion accent
- Accenting one word of a headline in a different colour or weight
- Tinted near-black (`#0b0b0b`, `#111`) standing in for black

### Motion budget

One page-load reveal, staggered across at most three sections. No
scroll-triggered fade-ins. No hover transitions — see the plate reversal above.

The animation lives inside `@media (prefers-reduced-motion: no-preference)`.
Nothing is hidden outside that query, so reduced-motion visitors get the
finished page immediately rather than a permanently invisible one.

### Cascade order in `globals.css`

The responsive blocks must stay at the bottom of the file, after every base
rule they override. They win on source order at equal specificity, so moving
them up silently loses every one of them. That is not hypothetical: the old
asymmetric block sat mid-file for a while and `.section-heading` never
actually applied.

## Performance

This is self-consistency, not preference. The site claims a 50% / 67% page-load
improvement on one of its own projects. A slow portfolio refutes its own copy.

- Video is **poster-gated**: the poster is a `<button>`, and the `<video>`
  element mounts only after a click. `preload="none"`, `muted`, `loop`,
  `playsInline`. Without `playsInline`, iOS hijacks playback into fullscreen.
- WebM/VP9 preferred. Each clip under ~2 MB and under 15 seconds.
- Every image and video carries explicit `width` and `height`. Omitting them
  causes reflow on load and a Cumulative Layout Shift penalty.
- Images go through `next/image`.
- **Only *record* what cannot be linked.** A video of a clickable site is a
  worse version of the click. The one clip worth its bandwidth is the
  palm-reading flow, because no visitor will upload a photo of their hand to a
  stranger's portfolio, so that interaction is otherwise invisible.
- **Static screenshots are a deliberate exception, added on request.** Lagna
  Atelier and Robust Health each carry three WebP plates from inside the
  product, 260 KB across all six. They earn their place differently from video:
  a skimming reader gets something to look at without a click, and the cost is a
  lazy-loaded image rather than a media element. Do not remove them as a
  "correction" to the rule above.
- **Three plates per project, not five.** Ten figures put 3,590px of screenshot
  on a page read in 40–90 seconds. Adding a fourth means arguing that it is
  stronger evidence than one already there, and dropping that one.
- **Crop to the content, not to the viewport.** A capture is cropped to the
  app's own content column and ends on a container boundary — never mid-word,
  mid-card, or under a sticky nav that overlaps what is behind it. A 1600px
  browser-viewport shot rendered at 456px puts its UI text near 5px, which
  turns evidence into texture. Drop app chrome that carries no evidence; it is
  also where the blur redactions live. Aim for 16:10, and if the content will
  not take it without loss, keep the content and pick a clean ratio of its own
  (the workout plate is exactly 2:3 for this reason).
- **Figures are never inside the prose measure.** A screenshot squeezed into
  the body column's ~66ch is illegible, which turns evidence into decoration.
  They are a grid area of their own (`.entry-figures`) spanning both columns
  below the record, not a child of `.prose`: one per row below 46rem, two
  abreast above it. If you add a figure, check it at 360px, 900px and 1280px,
  and re-measure `FIGURE_SIZES` in `components/ProjectMedia.tsx` if the slot
  changed. It is currently 29rem / 90vw against a measured 456px maximum —
  under-declaring is the worse direction, because it serves an image the
  browser then upscales.
- **The portrait is `priority`, not lazy.** It is above the fold and the likely
  LCP element; deferring it trades a measurable delay for bytes fetched a
  moment later anyway. It is also the only image on the site rendered without
  `sizes`. That is deliberate: a px-only `sizes` string makes `next/image` emit
  the full fifteen-candidate ladder up to 3840w, and for a 400px source most of
  those resolve to the same file. Passing the display box instead yields a
  short srcset. Height is derived from the asset's own ratio, so a non-square
  replacement still reserves the right space.

  It is 104px wide (`--portrait`, and `PORTRAIT_WIDTH` in `components/Hero.tsx`
  — change both together). Down from 200px with the overhaul: the dossier is
  dense, and a portrait twice that size becomes the loudest thing in a masthead
  whose job is to state three facts. The 400px source covers 2x comfortably.
- A link whose `href` is unset must not render as a dead link. Filter it out.

## The hero demo

**Currently unmounted.** It shipped a placeholder engine, which meant the hero
led with a table of positions that were not real and a caption admitting it. An
unfinished demo above the fold is a worse first impression than no demo, and the
Lagna Atelier screenshot immediately below already shows the real product. The
component, its content keys and its styles all remain; restoring it is the one
line described in `components/Hero.tsx`. Everything below still governs it, and
should be re-read before it goes back in.

`components/LiveEphemeris.tsx` demonstrates rather than claims. On load it
computes sidereal positions in the visitor's browser and reports the measured
elapsed milliseconds beneath a real `<table>`.

Rules that are easy to break by accident:

- The calculation runs inside `useEffect` with a `null` initial state, never
  during render. Calling `new Date()` during render makes server and client
  disagree and produces an intermittent, confusing hydration mismatch. Running
  client-only is also the point — the claim is that no server is involved, so
  the architecture should enforce it.
- `performance.now()` brackets **the calculation only** — not the render, not
  the state update. The number displayed must be true, because converting a
  claim into an observation is the entire value of the component.
- Real `<table>` markup with `<th scope="row">`. Tabular data gets tabular
  markup.
- The loading state is not decoration. It is the mechanism that makes the
  deferred computation correct.
- Keep it swappable: replacing it with a static hero is one line in `Hero.tsx`.

It currently ships a **placeholder engine**, clearly marked in the source and in
the table caption. Swap-in instructions are in the comment banner at the top of
the file. When the real engine lands, remove the `PLACEHOLDER` caption text and
update `hero.ephemerisNote` in `lib/content.ts`, which currently tells the
reader the positions are not real.

## Accessibility floor

- Visible keyboard focus on every interactive element: `:focus-visible`, brass
  outline, 3px offset.
- Semantic elements: `<table>` for tabular data, `<button>` for the poster gate,
  headings in document order, `<figure>`/`<figcaption>` for media.
- Colour contrast verified by computation, not assumed, **in both themes**.
  Every foreground token clears WCAG AA for normal text against `--field`,
  `--field-inset` **and `--mat`** of its own theme — the dark pair's ratios are
  computed against the cyanotype grounds, never inherited from the beige ones.
  Last audited live after the overhaul: 116 text-bearing elements in each
  theme, zero failures; worst case 5.00:1 light, 4.93:1 dark.

  `--mat` was added to that contract by a real failure. Figcaptions sit on the
  mat, which is darker than either plate ground, and `--ink-faint` on `--mat`
  measures 4.41:1 — under AA. Captions use `--ink-muted`. Any new text placed
  on the mat has to be checked against the mat, not against the field.
- Responsive to 360px: the locator column becomes a line above each record and
  the figures go one per row. Verified at 360px with no horizontal overflow.

## Copy standard

Every sentence must fail this test: **could it appear unchanged on someone
else's portfolio?** If yes, rewrite it. "Built a scalable full-stack application
using modern technologies" fails. "Cut mobile load time by two thirds via
route-level code splitting" passes.

Sentence case throughout. Active voice. No filler. No selling — describe what
something is and what was hard about it. Link text says what happens: "open the
live site", never "Learn more".

## Do not invent

Leave a clearly marked `TODO` anywhere a fact is missing. Never write plausible
filler for URLs, metrics, dates, job accomplishments, or project descriptions.
Fabricated detail on a portfolio is the one failure mode that cannot be
recovered in an interview. A visible `TODO` is strictly better than a
confident-sounding invention.

Outstanding `TODO`s are listed in the README.

## Checks before committing

```bash
npm run typecheck && npm run build
```
