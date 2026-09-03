import type { SiteContent } from "@/lib/types";

/**
 * Every word on the site lives here.
 *
 * If you are about to write a sentence of English inside a .tsx file, it
 * belongs in this file instead. Components take typed props and render.
 *
 * TODO markers are deliberate. A visible TODO is strictly better than a
 * confident-sounding invention, so nothing here is filler.
 */
export const content: SiteContent = {
  profile: {
    name: "Swapnanil Bala",
    seeking:
      "AI Engineer. M.S. Data Science at Northeastern's Khoury College. Spring 2027 co-op.",
    location: "Boston, Massachusetts",
    email: "bala.s@northeastern.edu",
    github: "https://github.com/SwapnanilBala",
    linkedin: "https://linkedin.com/in/swapnanil-bala-854b722a7",
    // Scrubbed copy of the Sep 2026 resume: phone number removed and the
    // personal address swapped for the Northeastern one, since the repo is
    // public. Regenerate with the same treatment if you replace the PDF.
    resumeHref: "/resume.pdf",
  },

  hero: {
    statement: [
      "I build systems where the hard part is the arithmetic, not the plumbing. My main project computes sidereal astronomical positions from first principles in hand-written TypeScript, with no ephemeris service behind it.",
      "The table below is not a screenshot. It was computed in your browser while this page loaded, and the elapsed time underneath it was measured, not written down.",
    ],
    ephemerisCaption: "Sidereal positions, computed on load",
    // Honest while the placeholder is in place. See the TODO in LiveEphemeris.tsx.
    ephemerisNote:
      "Placeholder arithmetic until the Lagna Atelier ephemeris core is extracted. The timing is real; the positions are not yet.",
    ephemerisLoading: "Computing in your browser...",
    ephemerisColumns: {
      body: "Body",
      position: "Sidereal",
      sign: "Sign",
      motion: "Motion",
    },
    // TODO: drop the "PLACEHOLDER — " prefix when the real engine is swapped in.
    ephemerisTableCaption:
      "PLACEHOLDER — {ayanamsha} ayanamsha {value}° at {time}",
    // Reads correctly both ways: "...in 1.42 ms, with no..." and
    // "...in less time than the browser clock can resolve, with no...".
    ephemerisFoot:
      "{bodies} bodies computed on your machine in {elapsed}, with no network request.",
    ephemerisBelowResolution: "less time than the browser clock can resolve",
    ephemerisRetrograde: "R",
  },

  sections: {
    projects: { id: "projects", title: "Projects", count: "3 entries" },
    experience: { id: "experience", title: "Experience", count: "1 role" },
    contact: { id: "contact", title: "Contact", count: "4 routes" },
  },

  projects: [
    {
      slug: "lagna-atelier",
      name: "Lagna Atelier",
      period: "2025—",
      status: "shipped",
      flagship: true,
      summary:
        "A local-first sidereal astrology engine whose entire calculation stack is hand-written TypeScript. No database, no accounts, no server-side compute — charts are computed in the browser and persisted to localStorage across five device-scoped profiles.",
      gutter: [
        { value: "63,000", label: "lines of TypeScript" },
        { value: "561", label: "tests" },
        { value: "23", label: "divisional charts" },
        { value: "6", label: "locales" },
      ],
      details: [
        "The ayanamsha model is IAU-2006 precession over astronomy-engine, calibrated against Swiss Ephemeris epochs. Six ayanamshas across six house systems, with Meeus true-node, retrograde and combustion handling.",
        "Fifteen derived engines sit above that core: 23 divisional charts from D1 to D60, Vimshottari dashas, 51 yogas, Shadbala, Ashtakavarga, transits, Varshaphal, and Panchanga muhurta search.",
        "Interpretation is rules-as-data. The DSL is Zod-validated over a closed 15-operator predicate union with build-time binding checks, so a malformed rule fails the build rather than the render.",
        "Rarity claims come from a seeded Monte Carlo harness over population-weighted birth sampling. They are measured rather than asserted.",
        "Palm readings run GPT-4o Vision with per-line confidence normalised against MediaPipe hand landmarks, exported as a PDF report.",
      ],
      stack: [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "Zod",
        "astronomy-engine",
        "GPT-4o Vision",
        "MediaPipe",
        "PWA",
      ],
      links: [
        { role: "live", href: "https://large-astro-web-app.vercel.app/" },
        // TODO: paste the repo URL. Until href is set this link is filtered
        // out, not rendered dead.
        { role: "source" },
      ],
      media: [
        {
          kind: "image",
          src: "/media/lagna-atelier.webp",
          alt: "The Lagna Atelier chart builder: a four-step birth-details form beside a live sky preview panel.",
          caption:
            "The chart builder. The sky preview fills in as each birth detail is entered.",
          width: 1600,
          height: 1000,
        },
      ],
      // TODO: still worth recording the palm-reading flow as a clip — it is the
      // one interaction a visitor will never perform on a stranger's site, so a
      // link cannot substitute for it. WebM/VP9, under ~2 MB, under 15 seconds.
    },

    {
      slug: "robust-health",
      name: "Robust Health",
      period: "2025",
      status: "shipped",
      summary:
        "A training and nutrition planner with separate member and trainer dashboards. Workout plans are generated per member through the Anthropic API.",
      gutter: [
        { value: "−50%", label: "load time, web" },
        { value: "−67%", label: "load time, mobile" },
      ],
      details: [
        "Both reductions are Lighthouse-measured, and came from next/image compression and route-level code splitting of the dashboard.",
        "Authentication is Supabase Row-Level Security with OAuth 2.0 through Google, GitHub and Discord.",
        "Members and trainers get separate dashboards, with tiered subscriptions and CSRF protection.",
      ],
      stack: [
        "TypeScript",
        "Next.js",
        "Anthropic API",
        "NeonDB (Postgres)",
        "Supabase Auth",
        "Vercel",
      ],
      links: [
        { role: "live", href: "https://app.robusthealth.in/" },
        // TODO: paste the repo URL.
        { role: "source" },
      ],
      media: [
        {
          kind: "image",
          src: "/media/robust-health.webp",
          alt: "The Robust Health landing page, showing the weekly programming pitch above counters for plans generated and workouts completed.",
          caption:
            "The landing page. Everything past this point is behind sign-in, so this is where a visitor without an account stops.",
          width: 1600,
          height: 1000,
        },
      ],
    },

    {
      slug: "coop-discovery-pipeline",
      name: "Co-op discovery pipeline",
      period: "2026—",
      status: "in-progress",
      summary:
        "A scheduled ingestion pipeline over Workday's public job API. It normalises postings, scores them against a structured candidate profile using embeddings, and surfaces the few worth a tailored application.",
      // TODO: fill these in once the pipeline has run for a while. The sparse gutter
      // beside two populated ones is intentional — it should read as an admission.
      gutter: [
        { value: "TODO", label: "postings ingested" },
        { value: "TODO", label: "surfaced per week" },
      ],
      details: [
        "Polling happens server-side against the Workday CXS JSON endpoint, because that API sends no CORS headers and a browser-only architecture is therefore ruled out.",
        "Postings dedupe on requisition ID, so re-polling is idempotent.",
        "Ranking is embedding similarity followed by an LLM pass that produces a one-line rationale per match.",
        "It stops short of automated submission by design. Work-authorisation and sponsorship questions answered by a bot are a false statement on an employment application, and no throughput gain justifies that.",
      ],
      // TODO: complete the stack once it settles.
      stack: ["TODO — stack for the discovery pipeline"],
      links: [
        // TODO: paste the repo URL if and when this becomes public.
        { role: "source" },
      ],
    },
  ],

  experience: [
    {
      slug: "p2g-mobility-tech",
      org: "P2G Mobility Tech (Pointo)",
      role: "Program Analyst Intern",
      team: "Technology",
      period: "Nov 2024 — Jan 2025",
      location: "Kolkata, India",
      gutter: [{ value: "3 mo", label: "duration" }],
      details: [
        "Cleaned and consolidated the operational Excel datasets behind the internal dashboards: resolving missing values, recovering lost source files, and standardising records so weekly reporting could run off them.",
        "Wrote SQL against the production database and built the recurring operational reports the project lead worked from.",
        "Went out on field customer acquisition, pitching the pay-to-own financing programme to e-rickshaw operators and framing the lithium-ion upgrade against the lead-acid batteries they were running.",
      ],
    },
  ],

  contact: [
    "The fastest way to reach me is email. I read it daily and reply the same day on weekdays.",
  ],

  contactRoutes: [
    {
      key: "email",
      label: "bala.s@northeastern.edu",
      href: "mailto:bala.s@northeastern.edu",
    },
    {
      key: "github",
      label: "github.com/SwapnanilBala",
      href: "https://github.com/SwapnanilBala",
    },
    {
      key: "linkedin",
      label: "linkedin.com/in/swapnanil-bala-854b722a7",
      href: "https://linkedin.com/in/swapnanil-bala-854b722a7",
    },
    {
      key: "resume",
      label: "download the resume (PDF)",
      href: "/resume.pdf",
    },
  ],

  mediaLabels: {
    play: "Play clip",
    playAria: "Play the clip: {caption}",
  },

  colophon:
    "Built with Next.js and plain CSS — no component library, no CSS framework, no analytics, no cookies. Type is Newsreader and JetBrains Mono, self-hosted at build time.",
};
