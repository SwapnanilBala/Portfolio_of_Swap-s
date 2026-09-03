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
  and contact details. Their path is the column of figures down the left.
- An engineer who arrives later and reads exactly one project closely. Their
  path is the prose on the right.

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
public/media/         posters and clips
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

The organising metaphor is an **ephemeris page** — an astronomical almanac.
This comes from the subject matter: the flagship project is a hand-written
sidereal calculation engine, and that world's vernacular is dense numeric
tables, precise alignment, and marginal annotation.

- **Layout.** A narrow left gutter of checkable figures in monospace; prose to
  the right in a text serif. Entries separated by a single hairline rule.
- **The gutter is for numbers a stranger could independently verify** — dates,
  line counts, test counts, measured deltas. **Never put an adjective in the
  gutter.** Its entire authority comes from containing no claims about quality.
- **Palette.** Warm beige field (`#ede4d3`), deep brass accent (`#73550e`),
  dark warm-brown text, muted brown secondary. Beige and brass is aged-almanac
  paper rather than instrument panel, which suits the ephemeris metaphor as
  well as the navy did.

  This replaced the original deep navy field (`#10192b`) on request. Brass was
  kept and darkened rather than swapped for terracotta, which keeps the page
  clear of the forbidden cream-and-terracotta tell below. Do not revert to navy
  as a "correction" — the lighter field is the decision now.
- **Type.** Newsreader for all prose. JetBrains Mono for numeric data and
  index-like structural labels only — never as decoration for small text.
  `font-variant-numeric: tabular-nums` on every column of figures; proportional
  numerals make a numeric column look ragged and the whole design rests on that
  column being straight.
- **Measure.** Prose constrained to ~34rem, keeping lines under ~75 characters.
  Serif body line-height 1.65.

### Forbidden

These are the current tells of generated design. Do not produce any of them,
even if asked to make the page "more impressive":

- Tracked-out ALL-CAPS eyebrow labels above headings
- Meta strings joined with middle dots (`A · B · C`)
- Arrows appended to link or button text
- Identical rounded cards with the same soft grey shadow under each (entries
  are now plates, on request — square corners, hairline border, brass edge tab,
  no shadow and no blur. The tell is the shadowed rounded card, not the panel)
- Gradient washes used as decoration
- Numbered `01 / 02 / 03` markers (the content is not a sequence)
- A cream background with high-contrast serif and terracotta accent (the field
  is beige, but the accent is brass and the serif is not maximum-contrast — the
  banned thing is that specific trio, not a light background)
- Near-black with a single acid-green or vermilion accent
- Accenting one word of a headline in a different colour or weight
- Tinted near-black (`#0b0b0b`, `#111`) standing in for black

### Motion budget

One page-load reveal, staggered across at most three sections. No
scroll-triggered fade-ins.

**Amended on request:** entries and the ephemeris plate now carry a hover and
focus-within transition — border to brass, a brass edge tab, a one-step tonal
lift and a 2px rise over 160ms. The original rule said no hover transitions on
entries; the page was judged too static without them. The constraint that
survived is that the interaction is legible without motion: colour and the tab
carry the state, and only the transform and the transitions sit inside
`prefers-reduced-motion: no-preference`. Do not add shadow, blur or scale to
this — those are what the card ban is actually about.

The animation lives inside `@media (prefers-reduced-motion: no-preference)`.
Nothing is hidden outside that query, so reduced-motion visitors get the
finished page immediately rather than a permanently invisible one.

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
  Atelier and Robust Health each carry one WebP screenshot of their landing
  state (51 KB and 82 KB). They earn their place differently from video: a
  skimming reader gets something to look at without a click, and the cost is a
  lazy-loaded image rather than a media element. Do not remove them as a
  "correction" to the rule above.
- **Figures break out of the prose measure to the full content width.** A
  screenshot squeezed into the 34rem column is illegible, which turns evidence
  into decoration. The breakout is disabled below the 46rem breakpoint. If you
  add a figure, check it at 360px and just above 736px, where the maths is
  tightest.
- A link whose `href` is unset must not render as a dead link. Filter it out.

## The hero demo

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
- Colour contrast verified against the beige field by computation, not assumed.
  Every foreground token clears WCAG AA for normal text against both `--field`
  and `--field-inset`.
- Responsive to 360px: the gutter collapses above the prose and its figures
  reflow horizontally.

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
