import { BLUR_PLACEHOLDERS } from "@/lib/blur";
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
    seeking: "AI engineer. M.S. Data Science at Northeastern's Khoury College.",
    // TODO: add the expected graduation date once it is fixed — a recruiter
    // sizing a Spring 2027 co-op wants to know what follows it. Do not guess.
    availability:
      "Boston, Massachusetts. Available for a Spring 2027 co-op in full-stack, AI engineering or AI product engineering.",
    // Contact details are not repeated here. They live once, in contactRoutes
    // below, which is what both the hero links and the contact list render.
    portrait: {
      src: "/media/swapnanil-bala.webp",
      alt: "Swapnanil Bala in a grey suit and dark red tie, on a deck above a pond, bare autumn treeline behind.",
      width: 400,
      height: 400,
      blurDataURL: BLUR_PLACEHOLDERS["/media/swapnanil-bala.webp"],
    },
  },

  hero: {
    statement: [
      "I build the calculation layer myself. Lagna Atelier computes sidereal astronomical positions in hand-written TypeScript, with no ephemeris service behind it.",
      // The hero led with the astrology engine and stopped there, so the first
      // thing a reader met was one project in one domain. This is the second
      // paragraph the table took with it when the demo was unmounted, rewritten
      // to stand on its own: it names the other two and states the measurement
      // rule the rest of the page is keeping.
      "Two others sit below: a training planner generating weekly plans per member through the Anthropic API, and a LIAR-dataset classifier whose best model beat bag-of-words by 0.033 macro F1. Figures on this page that are not measured yet are marked TODO rather than filled in.",
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
      // Narrowed to what the repo backs now that the source link is live. The
      // previous wording claimed "no database, no accounts, no server-side
      // compute"; the README documents Google sign-in and a Neon Postgres for
      // accounts and sessions. Local-first is still the real and interesting
      // claim — it is the chart data that never leaves the device — so the
      // claim is now the specific true one rather than the broad false one.
      summary:
        "A sidereal astrology engine whose calculation stack is hand-written TypeScript. Chart data is local-first: readings, palm scans and drafts live in the browser across five device-scoped profiles and never sync, so signing in buys an identity rather than a library. Postgres holds accounts and sessions and nothing else.",
      gutter: [
        { value: "63,000", label: "lines of TypeScript" },
        { value: "561", label: "tests" },
        { value: "23", label: "divisional charts" },
        { value: "6", label: "locales" },
      ],
      details: [
        "The ayanamsha model is IAU-2006 precession over astronomy-engine, calibrated against Swiss Ephemeris epochs. Six ayanamshas across six house systems, with Meeus true-node, retrograde and combustion handling.",
        // Recast so the count is not sentence-initial. It previously read
        // "Fifteen derived engines ... 23 divisional charts", spelling one
        // number and not the next inside a single sentence, on a page whose
        // argument is precision.
        "Above that core sit 15 derived engines: 23 divisional charts from D1 to D60, Vimshottari dashas, 51 yogas, Shadbala, Ashtakavarga, transits, Varshaphal, and Panchanga muhurta search.",
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
        "Neon Postgres",
        "Drizzle",
        "GPT-4o Vision",
        "MediaPipe",
        "PWA",
      ],
      links: [
        { role: "live", href: "https://large-astro-web-app.vercel.app/" },
        {
          role: "source",
          href: "https://github.com/SwapnanilBala/Large_Astro_Web_App",
        },
      ],
      media: [
        {
          kind: "image",
          src: "/media/lagna-atelier.webp",
          alt: "Dark two-panel screen. On the left a four-tab stepper with the name field active and a bright gradient button beneath it; on the right a dimmed circular chart preview labelled 0/6 details.",
          caption:
            "A four-step birth-details form, with the sky preview resolving beside it as each field is entered. There is no submit step: the chart is computed in the browser as the form fills.",
          width: 1542,
          height: 964,
          blurDataURL: BLUR_PLACEHOLDERS["/media/lagna-atelier.webp"],
        },
        {
          kind: "image",
          src: "/media/lagna-atelier-chart.webp",
          alt: "Three summary cards above a large circular chart on near-black, its rim ringed with zodiac glyphs and numbered sectors, the centre reading Cancer.",
          caption:
            "The computed wheel for a Cancer lagna, planetary glyphs placed across twelve houses. The three cards above it — first impression, the Mercury dasha running to April 2034, and the strongest planet — are selected from the chart's own matched findings.",
          width: 1528,
          height: 1052,
          blurDataURL: BLUR_PLACEHOLDERS["/media/lagna-atelier-chart.webp"],
        },
        {
          kind: "image",
          src: "/media/lagna-atelier-ashtakavarga.webp",
          alt: "A circular gauge card beside a twelve-bar column chart crossed by a dashed average line, bars coloured by whether they clear it, over three summary rows and a bordered footnote.",
          caption:
            "Every house scored against the 28.1-bindu average rather than against a maximum, with the first house broken out at 92.6% of it. The footnote flags that these twelve total 367 against a 337 pool — a discrepancy reported rather than smoothed over.",
          width: 1571,
          height: 982,
          blurDataURL:
            BLUR_PLACEHOLDERS["/media/lagna-atelier-ashtakavarga.webp"],
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
        // TODO: paste the repo URL. Nothing public matches — the account has
        // Vibe_Robust_Health_Android and Vibe_Robust_Health_IOS_App, which are
        // the mobile prototypes, not the web app these plates come from. If the
        // web repo is private it either stays a TODO or the link role goes.
        { role: "source" },
      ],
      media: [
        {
          kind: "image",
          src: "/media/robust-health-onboarding.webp",
          alt: "A dark hero panel above a second panel offering two side-by-side cards, one tinted violet and one amber, with a line of small print beneath them.",
          caption:
            "Two ways in: a three-to-five minute questionnaire that generates a tailored first week, or a ready-made programme with optional body details for nutrition targets. Switching between them keeps whatever has already been entered.",
          width: 1041,
          height: 701,
          blurDataURL:
            BLUR_PLACEHOLDERS["/media/robust-health-onboarding.webp"],
        },
        {
          kind: "image",
          src: "/media/robust-health-dashboard.webp",
          alt: "A wide card headed Up Next with a prominent start button, a numbered five-row list beside it, and below them a programme card of three figure tiles next to an empty activity panel.",
          caption:
            "Everything from here sits behind sign-in, so this and the plate below it are captured from inside an account. The next session up front, the week's five workouts listed beside it, and the active Push/Pull/Legs programme with its day count, calorie and sleep targets.",
          width: 1054,
          height: 631,
          blurDataURL: BLUR_PLACEHOLDERS["/media/robust-health-dashboard.webp"],
        },
        {
          kind: "image",
          src: "/media/robust-health-workout.webp",
          alt: "A narrow single-column screen: a video thumbnail with a play button, then an exercise card reading four by six to ten, a row of four numbered circular buttons, three labelled chips, and paired back and next controls at the foot.",
          caption:
            "One exercise at a time — three of seven here — with a form video above it. Sets are tapped off individually, and rest, RPE and tempo are carried per exercise rather than set once for the session.",
          width: 728,
          height: 1091,
          blurDataURL: BLUR_PLACEHOLDERS["/media/robust-health-workout.webp"],
        },
      ],
    },

    {
      slug: "fake-news-classifier",
      name: "Fake news classifier",
      period: "Fall 2025",
      status: "shipped",
      // Was "Multi-class misinformation detection". It is binary: the repo's
      // RESULTS.md collapses LIAR's six-way truthfulness rating to FAKE/REAL
      // and drops the ambiguous middle. Every figure below is from that file,
      // which the source link now reaches.
      summary:
        "Binary fake-news classification on the LIAR dataset, collapsing its six-way truthfulness rating to FAKE and REAL and fine-tuning DistilBERT and RoBERTa against a TF-IDF baseline.",
      gutter: [
        { value: "0.558", label: "macro F1, best model" },
        { value: "+0.033", label: "over TF-IDF baseline" },
      ],
      details: [
        "The headline result is a small one, and reported as such: DistilBERT reaches 0.558 macro F1 against the TF-IDF and logistic-regression baseline's 0.525. Short political claims carry very little signal either way — the baseline's AUC is 0.549, barely above chance.",
        "RoBERTa collapsed to a single class, with recall of exactly 0.5000 every epoch, scoring 0.372 — the same as always predicting the majority class. It is reported at that number rather than dropped from the comparison, and is not yet diagnosed.",
        "Oversampling the minority class backfired: validation loss climbed from 0.68 to 2.37 over ten epochs while accuracy drifted upward. Undersampling the majority instead gave the flattest run and the best score, on 40% less data.",
        "SHAP runs at token level, so each classification comes with the phrases that drove it.",
        "The open gap is evaluation: the test split is tokenised but never scored, and validation also drove model selection, so there is no clean held-out estimate.",
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
        {
          role: "source",
          href: "https://github.com/SwapnanilBala/Fake-News-Classifier",
        },
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
      // Was a single "3 mo / duration", which restated the period line sitting
      // directly above it and spent the only gutter slot on something already
      // on screen. These two are the checkable facts the role actually
      // produced; both are visible TODOs until the real counts are to hand.
      gutter: [
        { value: "TODO", label: "datasets consolidated" },
        { value: "TODO", label: "recurring reports built" },
      ],
      details: [
        "Cleaned and consolidated the operational Excel datasets behind the internal dashboards: resolved missing values, recovered lost source files, and standardised records so weekly reporting could run off them.",
        // Reordered: this was the closing line of the whole Experience section,
        // which left a page aimed at AI engineering ending on field sales. It
        // stays -- it is true and it shows range -- but it no longer lands last.
        "Went out on field customer acquisition, pitching the pay-to-own financing programme to e-rickshaw operators and the lithium-ion upgrade against the lead-acid batteries they were already running.",
        "Wrote SQL against the production database and built the recurring operational reports the project lead worked from.",
      ],
    },
  ],

  contact: [
    "Email is the fastest way to reach me. I read it daily and reply the same day on weekdays.",
    // The section was one sentence over four routes already shown in the hero,
    // so it repeated itself and added nothing at the point a reader has just
    // finished the projects. This is what is actually useful there: the time
    // zone, for scheduling, and an explicit offer against the source links.
    "I am on Eastern time. Two of the three projects above link their source, and I am glad to walk through either — including the parts that did not work.",
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
      // Scrubbed copy of the Sep 2026 resume: phone number removed and the
      // personal address swapped for the Northeastern one, since the repo is
      // public. Regenerate with the same treatment if you replace the PDF.
      label: "download the resume (PDF)",
      href: "/resume.pdf",
    },
  ],

  mediaLabels: {
    play: "Play clip",
    playAria: "Play the clip: {caption}",
    figureRef: "Fig {record}.{index}",
  },

  experienceAffiliation: "{org}, {team} team, {location}",

  colophon:
    "Built with Next.js and plain CSS — no component library, no CSS framework, no analytics, no cookies. Type is Newsreader and JetBrains Mono, self-hosted at build time.",
};
