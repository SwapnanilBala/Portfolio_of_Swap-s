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

Components in `components/` take typed props and render. They should not contain
English prose.

Read `CLAUDE.md` before making design changes — it records why the page looks
the way it does, and lists the patterns that are deliberately avoided.

## Outstanding TODOs

The site ships with visible `TODO` markers wherever a fact was not available.
They are intentional: a `TODO` a reader can see is better than invented filler.
Search the repo with `git grep -n TODO` at any time.

**`lib/content.ts`**

- Lagna Atelier — live URL and repo URL (`links`). Until an `href` is set these
  links are filtered out, so nothing renders as a dead link.
- Robust Health — live URL, repo URL, the one plain sentence describing what it
  does for a user (`summary`), and the rest of the stack.
- Co-op discovery pipeline — gutter figures, stack, repo URL.
- P2G Mobility Tech — the accomplishment line.
- The palm-reading clip for Lagna Atelier. A commented-out `media` block with
  the required shape is in place; fill in real `width`, `height` and
  `durationSeconds` once recorded.

**`public/`**

- `resume.pdf` is referenced but not present. The resume link 404s until you
  add it.

**`components/LiveEphemeris.tsx`**

- Ships a clearly marked placeholder engine. Swap-in instructions are in the
  comment banner at the top of the file.

## Adding media

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

- Fonts are Newsreader and JetBrains Mono, self-hosted at build time by
  `next/font`. There is no runtime request to Google and no layout shift.
- The hero computes its table in your browser on load and reports the measured
  elapsed time. Nothing about it touches a server.
- Line endings are normalised to LF by `.gitattributes`, which overrides
  `core.autocrlf` on Windows checkouts.
