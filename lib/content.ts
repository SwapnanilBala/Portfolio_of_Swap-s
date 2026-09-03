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
      "AI engineer. M.S. Data Science at Northeastern's Khoury College.",
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
      "I build the calculation layer myself. Lagna Atelier computes sidereal astronomical positions in hand-written TypeScript, with no ephemeris service behind it.",
    ],
    // The keys below feed LiveEphemeris, which is currently unmounted from
    // Hero.tsx. They are kept so restoring the demo stays a one-line change.
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
        "A local-first sidereal astrology engine. The whole calculation stack is hand-written TypeScript: no database, no accounts, no server-side compute. Charts are computed in the browser and saved to localStorage across five device-scoped profiles.",
      gutter: [
        { value: "63,000", label: "lines of TypeScript" },
        { value: "561", label: "tests" },
        { value: "23", label: "divisional charts" },
        { value: "6", label: "locales" },
      ],
      details: [
        "The ayanamsha model is IAU-2006 precession over astronomy-engine, calibrated against Swiss Ephemeris epochs. Six ayanamshas across six house systems, with Meeus true-node, retrograde and combustion handling.",
        "Fifteen derived engines sit above that core: 23 divisional charts from D1 to D60, Vimshottari dashas, 51 yogas, Shadbala, Ashtakavarga, transits, Varshaphal, and Panchanga muhurta search.",
        "Interpretation is rules-as-data. The DSL is Zod-validated over a closed 15-operator predicate union with build-time binding checks, so a malformed rule fails at build time.",
        "Rarity claims are measured, not asserted: a seeded Monte Carlo harness runs them over population-weighted birth sampling.",
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
        {
          kind: "image",
          src: "/media/lagna-atelier-chart.webp",
          alt: "The Lagna Atelier natal wheel, showing planetary glyphs across twelve houses around a Cancer lagna, beneath three summary cards.",
          caption:
            "The computed chart. The three cards above the wheel are picked from its matched findings.",
          width: 1600,
          height: 1202,
        },
        {
          kind: "image",
          src: "/media/lagna-atelier-ashtakavarga.webp",
          alt: "The Lagna Atelier Ashtakavarga panel, showing a 92.6%-of-average dial for the first house beside a twelve-house bindus bar chart.",
          caption:
            "Ashtakavarga support per house, scored against the 28.1 average. The note flags why these twelve total 367 against a 337 pool.",
          width: 1600,
          height: 1028,
        },
        {
          kind: "image",
          src: "/media/lagna-atelier-report.webp",
          alt: "The Lagna Atelier report index, listing placements, dasha periods, twenty divisional charts from D1 to D60, and the matched findings.",
          caption:
            "The report index. Twenty vargas from D1 to D60, dasha periods, and 14 matched findings, each behind its own view.",
          width: 1560,
          height: 994,
        },
        {
          kind: "image",
          src: "/media/lagna-atelier-tools.webp",
          alt: "The Lagna Atelier end-of-reading panel, offering current transits, partner comparison, and the full advanced tool list.",
          caption:
            "The end of a reading. Three next tools, each picking up without repeating what was just covered.",
          width: 1600,
          height: 539,
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
        "Both reductions are Lighthouse-measured, from next/image compression and route-level code splitting of the dashboard.",
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
          caption: "The landing page. Everything below is behind sign-in.",
          width: 1600,
          height: 1000,
        },
        {
          kind: "image",
          src: "/media/robust-health-onboarding.webp",
          alt: "The Robust Health onboarding screen, offering a personalised plan or a quick start on an existing programme.",
          caption:
            "Onboarding. A new member either answers for a tailored week or starts on a ready-made programme.",
          width: 1600,
          height: 840,
        },
        {
          kind: "image",
          src: "/media/robust-health-dashboard.webp",
          alt: "The Robust Health member dashboard, showing the next workout beside a five-session week and the active programme's day, calorie and sleep targets.",
          caption:
            "The member dashboard. Next session, the week's five workouts, and the active programme's targets.",
          width: 1600,
          height: 1053,
        },
        {
          kind: "image",
          src: "/media/robust-health-workout.webp",
          alt: "The Robust Health workout player, showing a dips exercise with four tappable sets, rest, RPE and tempo, above an embedded form video.",
          caption:
            "The workout player. Sets are tapped off as they are completed, with rest, RPE and tempo carried per exercise.",
          width: 1600,
          height: 1284,
        },
        {
          kind: "image",
          src: "/media/robust-health-analytics.webp",
          alt: "The Robust Health analytics view on a new account, with zeroed workout, weight and calorie-compliance cards above empty trend charts.",
          caption:
            "Analytics, on an account with nothing logged yet. Weight, frequency and calorie compliance fill in from there.",
          width: 1600,
          height: 1088,
        },
      ],
    },

    {
      slug: "fake-news-classifier",
      name: "Fake news classifier",
      period: "Fall 2025",
      status: "shipped",
      summary:
        "Multi-class misinformation detection over the LIAR dataset, fine-tuning DistilBERT and RoBERTa and reporting both against a classical baseline.",
      gutter: [
        { value: "2", label: "transformers fine-tuned" },
        { value: "3", label: "approaches compared" },
      ],
      details: [
        "Both transformers are benchmarked against a TF-IDF and logistic-regression baseline. The output is a precision, recall and F1 comparison across all three approaches.",
        "SHAP runs at token level, so each classification comes with the phrases that drove it.",
      ],
      stack: [
        "Python",
        "PyTorch",
        "DistilBERT",
        "RoBERTa",
        "SHAP",
        "Scikit-Learn",
      ],
      links: [
        // TODO: paste the repo URL.
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
        "Cleaned and consolidated the operational Excel datasets behind the internal dashboards: resolved missing values, recovered lost source files, and standardised records so weekly reporting could run off them.",
        "Wrote SQL against the production database and built the recurring operational reports the project lead worked from.",
        "Went out on field customer acquisition, pitching the pay-to-own financing programme to e-rickshaw operators and the lithium-ion upgrade against the lead-acid batteries they were already running.",
      ],
    },
  ],

  contact: [
    "Email is the fastest way to reach me. I read it daily and reply the same day on weekdays.",
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
