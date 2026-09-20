# Swapnanil Bala — portfolio

Personal portfolio site. Next.js App Router, React, TypeScript in strict mode,
and plain CSS. No Tailwind, no component library, no CMS, no analytics.

## Run it

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:3000.

Other scripts:

| Command             | What it does                                  |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Dev server with hot reload                     |
| `npm run build`     | Production build — run this before pushing     |
| `npm run start`     | Serve the production build locally             |
| `npm run typecheck` | `tsc --noEmit`, no build output                |

## Where to edit things

Almost everything you will want to change is in one of two files.

**`lib/content.ts` — every word on the site.** Copy never lives in a `.tsx`
file. Change a sentence here and nothing else needs touching. This includes the
page metadata, which is derived from `content.profile`.

**`lib/types.ts` — the shape that content must satisfy.** If you add a field or
a link role, the compiler will point at every place that now needs updating.
That is deliberate.

**`app/globals.css` — every style rule.** Design tokens are custom properties at
the top under `:root`. Change `--brass` there and the whole accent moves.

**`lib/blur.ts` — generated blur placeholders**, keyed by media path. Build
output rather than copy, which is why it is not in the content file. Adding a
capture and referencing it from content will not compile until it has an entry
here.

The site ships two themes: the beige field in `:root`, and a cyanotype dark
pair in the `@media (prefers-color-scheme: dark)` block directly below it. It
follows the operating system — there is no toggle. Only the ten colour tokens
differ between them; no rule further down the file holds a literal colour, which
is what keeps a second theme to ten lines. If you add one, add it as a token in
both blocks or the themes drift.

Components in `components/` take typed props and render. They should not contain
English prose.

Read `CLAUDE.md` before making design changes — it records why the page looks
the way it does, and lists the patterns that are deliberately avoided.

## Outstanding TODOs

The site ships with visible `TODO` markers wherever a fact was not available.
They are intentional: a `TODO` a reader can see is better than invented filler.
Search the repo with `git grep -n TODO` at any time.

**`lib/content.ts`**

- Robust Health — repo URL. Nothing public matches: the account has
  `Vibe_Robust_Health_Android` and `Vibe_Robust_Health_IOS_App`, which are the
  mobile prototypes rather than the web app these screenshots come from. Until
  an `href` is set the link is filtered out, so nothing renders as a dead link.
- Expected graduation date, in `profile.availability`. Someone sizing the
  Spring 2027 co-op wants to know what follows it.
- P2G Mobility Tech — the two experience gutter figures, datasets consolidated
  and recurring reports built. These render as visible `TODO` markers on the
  page, which is the intended behaviour until the counts are to hand.
- The palm-reading clip for Lagna Atelier. Its screenshot is in place, but the
  clip is still the one thing a link cannot substitute for.

Lagna Atelier and the fake news classifier now carry both a live and a source
link. The classifier's gutter figures come from `RESULTS.md` in its repo.

**`public/`**

- `resume.pdf` is the Sep 2026 resume with the phone number redacted and the
  personal email replaced by the Northeastern one, because this repo is public.
  The redaction removes the glyphs from the content stream rather than drawing
  over them, so the old values are not recoverable by selecting or extracting
  text. If you drop in a newer resume, give it the same treatment.

**`components/LiveEphemeris.tsx`**

- Ships a clearly marked placeholder engine, and is unmounted from the hero
  until a real one exists. Swap-in instructions are in the comment banner at
  the top of the file; the restore is described in `components/Hero.tsx`.

## Adding media

Screenshots live in `public/media/` as WebP and are declared in `lib/content.ts`
with explicit `width` and `height`, plus a `blurDataURL` drawn from
`lib/blur.ts`. All three are required by the type, so a plate cannot ship
without reserving its space or without a placeholder.

A figure is never confined to the body column's ~66ch measure, because a
screenshot that narrow is too small to read. Figures span both columns below
the record: one per row under 46rem, two abreast above it, which works out to
a 456px image at the sheet's widest.

Three plates per project. Adding a fourth means arguing it is stronger
evidence than one already there, and dropping that one.

To add a screenshot, **crop to the app's own content column, not to the
browser viewport**, and end the crop on a container boundary rather than
through a card, a word, or under a sticky nav. A full-viewport capture spends
most of its pixels on empty page ground, and at the rendered width that puts
the UI text inside it near 5px. Then:

```bash
node -e "require('sharp')('in.png').extract({left:0,top:0,width:0,height:0}).webp({quality:82,effort:6}).toFile('public/media/out.webp')"
```

Fill in the `extract` box from the crop you chose. Aim for 16:10; if the
content will not take it without losing something, keep the content and pick a
clean ratio of its own. Afterwards, regenerate the placeholder — a 12px-wide
WebP at quality 45, base64'd into `lib/blur.ts` — and re-sync `width` and
`height` in `lib/content.ts` to the new file.

Video is poster-gated — the `<video>` element does not mount until a visitor
clicks the poster, so clips cost nothing on page load. Put files in
`public/media/` and describe them in `lib/content.ts`.

Keep clips WebM/VP9, under ~2 MB, under 15 seconds. `width`, `height`,
`poster`, `caption` and `durationSeconds` are all required by the type — a
poster-less video will not compile.

Only record what cannot be linked. A video of a site you can click is a worse
version of the click.

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

- Fonts are IBM Plex Sans and IBM Plex Mono, self-hosted at build time by
  `next/font`. There is no runtime request to Google and no layout shift.
  Both need explicit weights — neither is a variable font here, so an omitted
  weight silently ships 400 only and every 500/600 rule falls back to
  synthetic bold.
- The hero's live ephemeris table is currently unmounted. It shipped a
  placeholder engine, so it displayed positions that were not real. The
  component and its content keys are still in the repo; see the comment in
  `components/Hero.tsx` for the one-line restore.
- Line endings are normalised to LF by `.gitattributes`, which overrides
  `core.autocrlf` on Windows checkouts.
