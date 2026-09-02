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
      "M.S. Data Science at Northeastern's Khoury College. Looking for a Spring 2027 co-op in full-stack, AI engineering, or AI product engineering.",
    location: "Boston, Massachusetts",
    email: "bala.s@northeastern.edu",
    github: "https://github.com/SwapnanilBala",
    linkedin: "https://linkedin.com/in/swapnanil-bala-854b722a7",
    // TODO: drop the actual PDF at public/resume.pdf. This link 404s until you do.
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
        // TODO: paste the live URL. Until href is set this link is filtered out, not rendered dead.
        { role: "live" },
        // TODO: paste the repo URL.
        { role: "source" },
      ],
      // TODO: record the palm-reading flow — the one interaction a visitor will never
      // perform on a stranger's site, so it cannot be replaced by a link. Then fill in:
      //
      // media: [
      //   {
      //     kind: "video",
      //     src: "/media/lagna-palm-reading.webm",
      //     poster: "/media/lagna-palm-reading-poster.webp",
      //     alt: "A hand photograph being analysed into labelled palm lines with confidence scores.",
      //     caption: "Uploading a palm photograph and receiving per-line confidence scores.",
      //     width: 1280,
      //     height: 720,
      //     durationSeconds: 0, // measured length, under 15
      //   },
      // ],
      // Keep it WebM/VP9, under ~2 MB, under 15 seconds.
    },

    {
      slug: "robust-health",
      name: "Robust Health",
      period: "2025",
      status: "shipped",
      // TODO: replace with your one plain sentence describing what this does for a user.
      summary:
        "TODO — one plain sentence describing what Robust Health does for a user.",
      gutter: [
        { value: "−50%", label: "load time, web" },
        { value: "−67%", label: "load time, mobile" },
      ],
      details: [
        "Both reductions came from next/image compression and route-level code splitting of the dashboard.",
      ],
      // TODO: complete the stack. Next.js is inferred from the use of next/image; the rest is unknown.
      stack: ["Next.js", "TODO — rest of the stack"],
      links: [
        // TODO: paste the live URL.
        { role: "live" },
        // TODO: paste the repo URL.
        { role: "source" },
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
        "TODO — what you actually did here, and what was hard about it. One line, specific enough that it could not appear on someone else's page.",
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
      // TODO: this 404s until you drop the PDF at public/resume.pdf.
      label: "download the resume (PDF)",
      href: "/resume.pdf",
    },
  ],

  colophon:
    "Built with Next.js and plain CSS — no component library, no CSS framework, no analytics, no cookies. Type is Newsreader and JetBrains Mono, self-hosted at build time.",
};
