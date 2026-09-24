import type { SiteContent } from "@/lib/types";

/**
 * Every word on the site lives here.
 *
 * If you are about to write a sentence of English inside a .tsx file, it
 * belongs in this file instead. Components take typed props and render.
 *
 * Sources, so every claim can be traced: the September 21 2026 resume, the
 * project READMEs, GitHub code search and commit history, and the live sites.
 * Where a source was wrong or stale, the correction is noted beside the claim.
 * Nothing here is filler: a fact that is not to hand is left out and listed
 * as a TODO in the README, never written plausibly.
 */
export const content: SiteContent = {
  profile: {
    name: "Swapnanil Bala",
    role: "AI Engineer",
    affiliation: "M.S. Data Science, Northeastern University",
    intro:
      "I build the calculation layer myself: a sidereal ephemeris, a rules engine for astrology, and weekly training plans revised against what people actually log.",
    location: "Boston, MA",
    timeZone: "America/New_York",
    availability: "Spring 2027 co-op",
    // Placeholder until the higher-resolution upload arrives. Swap `src`,
    // `width` and `height` together and rerun scripts/build-blur.mjs.
    portrait: {
      src: "/media/swapnanil-bala.webp",
      width: 400,
      height: 400,
      alt: "Swapnanil Bala in a grey suit and dark red tie, on a deck above a pond, bare autumn treeline behind.",
    },
  },

  projects: [
    {
      slug: "lagna-atelier",
      name: "Lagna Atelier",
      displayLines: ["Lagna", "Atelier"],
      category: "Astrology engine",
      // First commit 2026-03-15. The old site said "2025—", which no repo backs.
      year: "2026—",
      started: 2026,
      type: "Personal project",
      // Sole contributor: 719 of 719 commits (checked 2026-09-23).
      role: "Sole developer",
      stack: [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "astronomy-engine",
        "Zod",
        "Neon Postgres",
        "Drizzle",
        "Claude vision",
        "MediaPipe",
      ],
      summary:
        "A Vedic astrology engine: six ayanamshas across six house systems, 23 divisional charts, and a rules engine whose rarity claims are measured.",
      // No line count: the resume dropped its "~63K lines" and the repo has
      // grown since, so the figure could no longer be checked.
      figures: [
        { value: "561", label: "tests" },
        { value: "23", label: "divisional charts" },
        { value: "51", label: "yogas detected" },
        { value: "6 × 6", label: "ayanamshas × house systems" },
        { value: "6", label: "languages" },
        { value: "719", label: "commits" },
      ],
      links: [
        { role: "live", href: "https://lagnaatelier.site" },
        {
          role: "source",
          href: "https://github.com/SwapnanilBala/Large_Astro_Web_App",
        },
      ],
      selected: true,
      hero: {
        src: "/media/lagna-atelier-hero.webp",
        width: 2880,
        height: 1800,
        alt: "Lagna Atelier's landing screen: “Create your Vedic birth chart” in gold capitals on a dark starfield, above a four-step birth-details form and a live sky panel waiting for input.",
      },
      heroMobile: {
        src: "/media/lagna-atelier-mobile.webp",
        width: 1170,
        height: 2532,
        alt: "Lagna Atelier on a phone: “Create your Vedic birth chart” in gold capitals, then the first step of the birth-details form asking for a name, and a continue button.",
      },
      cover: {
        src: "/media/lagna-atelier-cover.webp",
        width: 1674,
        height: 962,
        alt: "A circular chart on a starfield, its rim ringed with zodiac glyphs and numbered houses, the centre reading Cancer, beside a week-long line chart of daily energy that peaks on Thursday above four forecast cards.",
      },
      caseStudy: {
        sections: [
          {
            id: "overview",
            body: [
              "Lagna Atelier builds a Vedic natal chart from four details — name, birth date, birth time and birthplace — and reads it. The chart is the full working set: lagna, houses and planetary positions, then 23 divisional charts from D1 to D60, Vimshottari dasha timelines and 51 yoga detections on top.",
              "It is live at lagnaatelier.site in six languages.",
            ],
            // The hero is the form that goes in; this is the reading that
            // comes back. The three takeaways are the same selection from
            // matched findings the old chart capture showed above its wheel.
            media: {
              kind: "image",
              src: "/media/lagna-atelier-reading.webp",
              width: 2392,
              height: 1077,
              alt: "A reading's overview tab: the reader's name set large in gold capitals over the words deterministic chart, a one-line chart core, copy-link and download buttons, and a Cancer rising medallion with sun, moon and period beneath it; below, today's sky as nine planets in a row, and three takeaway cards.",
              caption:
                "What comes back is a reading, not a table: the chart core in one line, the sky as it stands today, and three takeaways — the highest signal, the dasha running now, the strongest planet — selected from the chart's own matched findings.",
            },
          },
          {
            id: "problem",
            body: [
              "Vedic astrology is not one system. The ayanamsha — the offset between the tropical and sidereal zodiacs — has competing definitions, so do house systems, and each choice moves the chart. Lagna Atelier supports six ayanamshas across six house systems, so a reader can pick a tradition and see what changes.",
              "Yogas, the named planetary combinations, come with claims about how rare they are. Here that rarity is measured rather than asserted.",
            ],
            media: {
              kind: "image",
              src: "/media/lagna-atelier-settings.webp",
              width: 1451,
              height: 669,
              alt: "Chart settings on a dark page, headed Choose how your chart is calculated: six ayanamshas listed down the left — Lahiri, marked recommended, Raman, Krishnamurti, Fagan-Bradley selected, Pushyapaksha and Yukteshwar — beside a panel of six house-system chips with Placidus selected, and a See my chart button.",
              caption:
                "The choice made in one screen: six ayanamshas, Lahiri recommended, and six house systems, with a note on what the pair decides — where each sign begins, and where the house lines fall.",
            },
          },
          {
            id: "approach",
            body: [
              "Interpretation is rules-as-data. Each yoga is defined in a Zod-validated DSL over a closed union of 15 predicate operators, with binding checks at build time, so a malformed rule fails the build instead of producing a wrong reading.",
              "A seeded Monte Carlo harness runs every rule over population-weighted simulated births and measures how often it actually fires.",
            ],
          },
          {
            id: "engineering",
            body: [
              "The ephemeris layer is hand-written on astronomy-engine: IAU-2006 precession calibrated against Swiss Ephemeris epochs, with Meeus true-node, retrograde and combustion handling. Charts are computed in server API routes, and a signed-in user's charts persist to Neon Postgres through Drizzle, where birth profiles, placements, houses, aspects, dasha periods and findings each have a table of their own.",
              // Vision provider confirmed in source: Anthropic in 18 files,
              // claude-opus in 11. The README's OPENAI_API_KEY line is stale.
              "Chart guidance and palm reading run on Claude vision, with MediaPipe hand landmarks normalising per-line confidence, behind rate-limited edge functions and LLM budget counters. Delivery leans on service workers, web workers and LRU/TTL caching, and 561 tests cover it.",
            ],
            media: {
              kind: "pair",
              title: "The chart, and its houses",
              body: "The wheel places each planet in its house for a Cancer lagna and leads with the three signals worth carrying into a reading. Ashtakavarga then splits a fixed pool of 337 bindus across the twelve houses and reads each against the 28.1 average rather than a maximum. When the houses add up to 367, the page shows the 108.9% instead of hiding it.",
              images: [
                {
                  src: "/media/lagna-atelier-wheel.webp",
                  width: 696,
                  height: 962,
                  label: "The wheel",
                  alt: "A circular Rasi chart on a starfield, zodiac glyphs around the rim and houses numbered one to twelve, the centre reading Cancer lagna; beneath it a Chart at a glance card: Cancer rising, strongest support Moon, dominant tone Earth, most active area house 3, Sagittarius.",
                },
                {
                  src: "/media/lagna-atelier-houses.webp",
                  width: 649,
                  height: 1072,
                  label: "Ashtakavarga",
                  alt: "A House Support panel: a ring gauge reading 92.6% of average for the first house, 26 of 337 bindus, and below it twelve bars, one per house, from 23 to 36 bindus against a dashed 28.1 line, with 7 of 12 houses above average.",
                },
              ],
            },
          },
          {
            id: "outcome",
            body: [
              "Live at lagnaatelier.site in six languages, with 561 tests and 719 commits behind it.",
              "The detail most worth keeping is small: when the Ashtakavarga houses total 367 bindus against a 337 pool, the page says so instead of rounding the numbers into agreement.",
            ],
          },
        ],
      },
    },

    {
      slug: "robust-health",
      name: "Robust Health",
      displayLines: ["Robust", "Health"],
      category: "Fitness platform",
      // First commit 2026-03-02. The old site said "2025", which no repo backs.
      year: "2026",
      started: 2026,
      type: "Personal project",
      // Sole contributor: 441 of 441 commits (checked 2026-09-23).
      role: "Sole developer",
      // From the README. NeonDB is gone: the app "now runs entirely on
      // Supabase".
      stack: [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "Tailwind CSS",
        "Supabase",
        "Claude API",
        "Upstash Redis",
        "Resend",
        "Vitest",
      ],
      summary:
        "A training, nutrition and recovery planner for members and their trainers, with each week's plan revised against what was actually logged.",
      figures: [
        { value: "15", label: "training programmes" },
        { value: "160+", label: "exercises modelled" },
        { value: "−50%", label: "load time, web" },
        { value: "−67%", label: "load time, mobile" },
        { value: "3", label: "languages" },
      ],
      links: [
        { role: "live", href: "https://app.robusthealth.in" },
        // Private repository: no source link.
        { role: "source" },
      ],
      selected: true,
      hero: {
        src: "/media/robust-health-hero.webp",
        width: 2880,
        height: 1800,
        alt: "Robust Health's landing page: the headline “Structured programming, refined every week” beside three gym photographs, above a row of usage counters.",
      },
      heroMobile: {
        src: "/media/robust-health-mobile.webp",
        width: 1170,
        height: 2532,
        alt: "Robust Health on a phone: the headline “Structured programming, refined every week”, sign-up and trainer-login buttons, three gym photographs and a row of usage counters.",
      },
      // A dashboard, not the landing page: the Index shows the product
      // rather than its marketing photography. Cropped below the app's
      // header, which carries the signed-in account's email address.
      cover: {
        src: "/media/robust-health-progress.webp",
        width: 1360,
        height: 1020,
        alt: "Robust Health's progress dashboard, open on Plan Evolution: a timeline of three weekly plans with their dates, calories and training days, beside a table comparing week one with week two line by line.",
      },
      caseStudy: {
        sections: [
          {
            id: "overview",
            body: [
              "Robust Health turns a member's profile into a weekly plan — training, nutrition and recovery — and gives trainers a portal of their own to author plans, assign them and follow each client's adherence.",
              "It is live at app.robusthealth.in in English, Spanish and Portuguese.",
            ],
            media: {
              kind: "image",
              src: "/media/robust-health-start.webp",
              width: 1639,
              height: 1105,
              alt: "Robust Health's onboarding over a blurred gym photograph: the headline Build a plan that fits your real life, then a panel asking How would you like to get started? with two cards — Personalised plan, recommended, about three to five minutes, and Quick start, to browse programmes.",
              caption:
                "Two ways in: a three-to-five minute questionnaire that generates a tailored first week, or a ready-made programme with optional body details for nutrition targets. Switching between them keeps whatever has already been entered.",
            },
          },
          {
            id: "problem",
            body: [
              "A programme written once drifts away from the person following it. The product's own promise is a system that adapts to real adherence and recovery signals, so each week's plan is revised against what the member actually logged the week before, not against what was prescribed.",
            ],
            media: {
              kind: "pair",
              title: "What it asks, and what changed",
              body: "The intake asks for a goal, the days a member can train and the constraints around them: equipment, diet, an injury. Week two is then laid against week one, line by line. Here the macros held, the split moved to an imported programme, and a sixth training day was added.",
              images: [
                {
                  src: "/media/robust-health-intake.webp",
                  width: 568,
                  height: 442,
                  label: "The intake",
                  alt: "An intake card: Build strength selected from three goals, three training days selected from two to five, and three constraint chips — Full gym, No dairy, Left shoulder.",
                },
                {
                  src: "/media/robust-health-weeks.webp",
                  width: 792,
                  height: 668,
                  label: "Week one against week two",
                  alt: "A table of week one against week two: calories, protein, carbs and fat unchanged at 2851 kcal, 155 g, 416 g and 63 g; the training split changed from Push, Pull, Legs to an imported programme; days per week up from five to six; the sleep target unchanged at seven hours.",
                },
              ],
            },
          },
          {
            id: "approach",
            body: [
              "A plan can come from four places: a deterministic planner, the Claude API, a trainer's own scaffold, or a curated catalogue. The member flow runs onboarding, generate, track, then regenerate.",
              "Programmes are data rather than code — 15 of them over 160+ exercises, each carrying sets, reps, rest and RPE-based progression — and calorie targets come from the Mifflin-St Jeor equation.",
            ],
            points: [
              "Trainers author and assign their own plans, and track each client's adherence over an adjustable window.",
              "A powerlifting module logs RPE, calculates the working weight for the next set, and flags clients who stop logging.",
            ],
            media: {
              kind: "image",
              src: "/media/robust-health-member.webp",
              width: 1612,
              height: 690,
              alt: "Robust Health's member dashboard greeting Good morning, Gogol above two wide cards: an RPE-autoregulated powerlifting block with an Open your block button, and a standalone one-day plan with an Access your plan button.",
              caption:
                "Inside a member's account: the powerlifting block, where the RPE of every set is logged as it is lifted and the next load is recalculated from it, and a standalone one-day plan saved beside it.",
            },
          },
          {
            id: "engineering",
            // Deliberately high-level: the repository is private, so no cookie
            // names, lifetimes or internals. The resume's "Row-Level Security"
            // is not repeated either -- the README says server access uses the
            // service-role client, which bypasses RLS, with authorisation
            // checked in application code.
            body: [
              "Members, trainers and admins each get their own portal and their own signed session, and the more a session can reach, the sooner it expires. Requests pass a nonce-based content security policy, per-IP rate limiting on Upstash Redis with an in-memory fallback, and double-submit CSRF checks, and authorisation is checked per route.",
              "Sign-in runs through Supabase with OAuth for Google, GitHub and Discord, plus one-time email codes sent through Resend. Web push carries reminders.",
            ],
            // Cropped below the client's email, age, height, weight and body
            // fat, and the signed-in trainer's name: personal details rather
            // than evidence, and the trainer's name is someone else's.
            media: {
              kind: "image",
              src: "/media/robust-health-trainer.webp",
              width: 1730,
              height: 775,
              alt: "Nutrition targets as four rings — 2851 kcal, 155 g protein, 416 g carbs, 63 g fat — above a notes panel of six points on surplus, carb timing, protein distribution and micronutrients, and a workout plan of six day chips, D1 Legs mainly to D6 Arms, from an imported programme.",
              caption:
                "The trainer's side of one client's active plan: calorie and macro targets, the reasoning behind them in notes, and a six-day programme imported from a file.",
            },
          },
          {
            id: "outcome",
            body: [
              "Live at app.robusthealth.in. Load time is the measured part: next/image compression and route-level code splitting cut Lighthouse load time by about half on web and two thirds on mobile.",
            ],
          },
        ],
      },
    },

    {
      slug: "kb-patient-booking",
      name: "KB Patient Booking",
      displayLines: ["KB Patient", "Booking"],
      category: "Clinic booking system",
      // First commit 2026-03-02; last push 2026-05-23.
      year: "2026",
      started: 2026,
      type: "Built for a practice",
      // Sole contributor: 34 of 34 commits (checked 2026-09-23).
      role: "Sole developer",
      stack: ["JavaScript", "Node.js", "Supabase", "PostgreSQL", "HTML / CSS"],
      summary:
        "Appointment booking for an orthopaedic practice: a patient portal, a doctor's daily view, and an admin panel with CSV export.",
      figures: [
        { value: "3", label: "portals: patient, doctor, admin" },
        { value: "7-day", label: "availability view" },
      ],
      links: [
        // drkbalaortho.com no longer resolves, so the Vercel URL is used.
        { role: "live", href: "https://k-bala-clinic-app.vercel.app" },
        // Private repository: no source link.
        { role: "source" },
      ],
      selected: true,
      hero: {
        src: "/media/kb-clinic-hero.webp",
        width: 2880,
        height: 1800,
        alt: "The clinic's booking page: the practice name above scheduling and dashboard buttons, a doctor-availability card, and a city-and-chamber picker that starts a booking.",
      },
      heroMobile: {
        src: "/media/kb-clinic-mobile.webp",
        width: 1170,
        height: 2532,
        alt: "The clinic's booking page on a phone: the practice name, booking and available-dates buttons, and the top of a doctor-availability card.",
      },
      caseStudy: {
        sections: [
          {
            id: "overview",
            body: [
              "A booking system for an orthopaedic practice that sees patients across more than one chamber. A patient picks a city and a chamber, books against the doctor's published availability, and gets an account in the same step.",
            ],
          },
          {
            id: "problem",
            body: [
              "Three people need three different things from one appointment. The site states the aim in a line: simple scheduling for patients, fast visibility for the doctor and admin teams, and cleaner records across every appointment.",
            ],
          },
          {
            id: "approach",
            body: [
              "Three surfaces over one set of records. Patients book and review their history and prescriptions; the doctor's dashboard lists a chosen day's appointments with each patient's details; the admin panel holds every patient and booking, with a CSV export for backup.",
            ],
            // Public, signed-out pages only. The form is cropped to its fields:
            // the account panel beside it states the password format.
            media: {
              kind: "pair",
              title: "The patient's form, the doctor's day",
              body: "A patient books in one form: a phone number, which becomes the account, an optional email, name, age and sex, and weight and height in whichever units they think in. The doctor signs in to a workspace built around the day: the pending queue, availability, and prescriptions to upload.",
              images: [
                {
                  src: "/media/kb-clinic-booking.webp",
                  width: 832,
                  height: 1015,
                  label: "Booking",
                  alt: "The booking form's fields on a warm grey ground: phone number with a +91 prefix, optional email, full name, age and sex, and optional weight and height, each with a switch to pounds or to feet and inches.",
                },
                {
                  src: "/media/kb-clinic-doctor.webp",
                  width: 966,
                  height: 653,
                  label: "The doctor's day",
                  alt: "A Daily Schedule card: review today's queue, move appointments forward and jump into patient details, over three rows — Pending Appointments, Availability Manager, Upload Prescription.",
                },
              ],
            },
          },
          {
            id: "engineering",
            body: [
              "A Node server over Supabase Postgres, with a confirmation email sent as each appointment is made. Accounts are keyed to the patient's phone number, so a returning patient signs in with the number they booked with.",
            ],
            media: {
              kind: "image",
              src: "/media/kb-clinic-admin.webp",
              width: 1714,
              height: 555,
              alt: "The admin panel's header: Admin Panel set in a serif, Central view for patient records and booking operations, three tags — patient records, booking operations, data exports — an overview card listing the same three, and a link bar back to booking and on to the doctor dashboard.",
              caption:
                "The third surface: patient records, booking operations and data exports behind one sign-in, a link away from the booking page and the doctor's dashboard.",
            },
          },
          {
            id: "outcome",
            body: ["Live on Vercel, with all three surfaces deployed."],
          },
        ],
      },
    },

    {
      slug: "fake-news-classifier",
      name: "Fake news classifier",
      displayLines: ["Fake news", "classifier"],
      category: "Applied NLP",
      // Supplied directly. The repository was uploaded later, in July 2026.
      year: "Fall 2025",
      started: 2025,
      type: "Research project",
      role: "Sole developer",
      stack: [
        "Python",
        "PyTorch",
        "DistilBERT",
        "RoBERTa",
        "SHAP",
        "Scikit-Learn",
      ],
      summary:
        "Binary fake-news classification on LIAR: DistilBERT against RoBERTa and a TF-IDF baseline, with a small win reported at its real size.",
      // Every figure below is from the repository's RESULTS.md.
      figures: [
        { value: "0.558", label: "macro F1, DistilBERT" },
        { value: "+0.033", label: "over the TF-IDF baseline" },
        { value: "0.372", label: "RoBERTa, collapsed to one class" },
      ],
      links: [
        {
          role: "source",
          href: "https://github.com/SwapnanilBala/Fake-News-Classifier",
        },
      ],
      selected: false,
      // LIAR's training split as RESULTS.md reports it: 10,269 rows, collapsed
      // to 6,620 by dropping barely-true and half-true (so 3,649 set aside),
      // leaving 4,121 FAKE and 2,499 REAL. Laid down in truthfulness order.
      dotField: {
        unit: 5,
        alt: "LIAR's 10,269 training claims as a field of dots, one for every five, in order of truthfulness: a bright band of 4,121 fake claims, a hollow band of 3,649 from the ambiguous middle that were set aside, and a grey band of 2,499 real claims.",
        groups: [
          { label: "Fake", count: 4121, tone: "strong" },
          { label: "Set aside", count: 3649, tone: "hollow" },
          { label: "Real", count: 2499, tone: "muted" },
        ],
      },
      caseStudy: {
        sections: [
          {
            id: "overview",
            body: [
              "A binary classifier on LIAR, a dataset of short political claims. Its six-way truthfulness rating is collapsed to FAKE and REAL, the ambiguous middle is dropped, and two fine-tuned transformers are compared against a TF-IDF baseline.",
            ],
          },
          {
            id: "problem",
            body: [
              "Short claims carry very little signal. The baseline's AUC is 0.549, barely above chance, which sets both the bar a transformer has to clear and how carefully the margin needs reporting.",
            ],
          },
          {
            id: "approach",
            body: [
              "DistilBERT and RoBERTa are fine-tuned and benchmarked against TF-IDF with logistic regression on precision, recall and F1. SHAP explains each prediction at token level, so a classification arrives with the phrases that drove it.",
            ],
            points: [
              "Oversampling the minority class backfired: validation loss climbed from 0.68 to 2.37 over ten epochs while accuracy drifted upward.",
              "Undersampling the majority instead gave the flattest run and the best score, on 40% less data.",
            ],
          },
          {
            id: "engineering",
            body: [
              "RoBERTa collapsed to a single class, with recall of exactly 0.5000 every epoch and a score of 0.372 — the same as always predicting the majority class. It stays in the comparison at that number rather than being dropped, and is not yet diagnosed.",
            ],
          },
          {
            id: "outcome",
            body: [
              "DistilBERT reaches 0.558 macro F1 against the baseline's 0.525: a real gain of 0.033, reported at its real size.",
              "The open gap is evaluation. The test split is tokenised but never scored, and validation also drove model selection, so there is no clean held-out estimate yet.",
            ],
          },
        ],
      },
    },

    {
      slug: "google-data-analytics",
      name: "Google Data Analytics",
      category: "Certificate projects",
      // First commits in both repositories: 2024-06-21.
      year: "2024",
      started: 2024,
      type: "Professional certificate",
      role: "Sole developer",
      stack: ["Python", "Pandas", "Scikit-Learn", "XGBoost", "Hypothesis testing"],
      summary:
        "Two models from the Google Advanced Data Analytics certificate: TikTok claims classification at about 99.5% recall, and Waze churn prediction.",
      figures: [
        { value: "~99.5%", label: "recall, TikTok claims" },
        { value: "5 / 3,817", label: "test cases misclassified" },
      ],
      links: [
        { role: "source", href: "https://github.com/SwapnanilBala/Tik-Tok" },
      ],
      selected: false,
    },

    {
      slug: "meta-database-engineer",
      name: "Meta Database Engineer",
      category: "Certificate",
      year: "2025",
      started: 2025,
      type: "Professional certificate",
      role: "Sole developer",
      stack: ["MySQL", "Python", "Data modelling", "Git"],
      summary:
        "Nine courses on relational design, advanced MySQL and data warehousing, closing with a capstone that built and queried a production-style schema end to end.",
      figures: [{ value: "9", label: "courses" }],
      links: [
        {
          role: "source",
          href: "https://github.com/SwapnanilBala/Little_Lemon_Data_base_Plus_Auto_Prescription_App",
        },
      ],
      selected: false,
    },
  ],

  about: {
    statement: ["I like building things that are", "useful, fast and interesting."],
    intro: [
      "I'm Swapnanil, an AI engineer in Boston, working toward an M.S. in Data Science at Northeastern's Khoury College through December 2027.",
      "I build the calculation layer myself. That has meant a sidereal ephemeris written by hand, a rules engine that fails the build when a rule is malformed, and a planner that rewrites next week against what was actually logged.",
      "Before Boston I studied electronics and communication engineering in West Bengal, and worked on the data behind an EV-financing startup's weekly reporting in Kolkata. Away from a keyboard I play piano, with ABRSM Grade 4 at Distinction.",
    ],
    experience: [
      {
        org: "P2G Mobility Tech (Pointo), an EV-financing startup",
        role: "Program Analyst Intern, Technology",
        period: "Nov 2024 — Jan 2025",
        location: "Kolkata, India",
        details: [
          "Cleaned and consolidated the operational Excel datasets behind the internal dashboards: resolved missing values, recovered lost source files, and standardised records so weekly reporting could run off them.",
          "Wrote SQL against the production database and built the recurring operational reports the project lead worked from.",
          "Pitched the pay-to-own financing programme to e-rickshaw operators in the field, and the lithium-ion upgrade against the lead-acid batteries they were already running.",
        ],
      },
    ],
    education: [
      {
        school: "Northeastern University, Khoury College of Computer Sciences",
        degree: "M.S. Data Science",
        period: "Sep 2025 — Dec 2027",
        location: "Boston, MA",
      },
      {
        // From the September 1 resume; the latest one omits it for space.
        school: "Maulana Abul Kalam Azad University of Technology",
        degree: "B.Tech Electronics and Communication Engineering",
        period: "Aug 2019 — Aug 2023",
        location: "West Bengal, India",
      },
    ],
    certificates: [
      {
        name: "Meta Database Engineer",
        issuer: "Coursera",
        date: "Jan 2025",
        note: "Nine courses on relational design, advanced MySQL, data warehousing and Git, closing with a production-style schema built and queried end to end.",
      },
      {
        name: "Google Advanced Data Analytics",
        issuer: "Coursera",
        note: "TikTok claims classification at about 99.5% recall, 5 misclassified across 3,817 test cases; Waze churn prediction with tuned logistic regression, random forest and XGBoost.",
      },
    ],
    technologies: [
      { label: "Languages", items: ["TypeScript", "Python", "JavaScript", "SQL"] },
      {
        label: "ML and AI",
        items: [
          "PyTorch",
          "Scikit-Learn",
          "XGBoost",
          "DistilBERT and RoBERTa fine-tuning",
          "SHAP",
          "Claude API, text and vision",
          "MediaPipe",
        ],
      },
      {
        label: "Data",
        items: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Hypothesis testing"],
      },
      {
        label: "Web",
        items: ["React", "Next.js", "Node.js", "PWAs", "REST", "OAuth 2.0", "i18n"],
      },
      {
        label: "Data stores and tooling",
        items: [
          "PostgreSQL (Neon, Supabase)",
          "MySQL",
          "Zod",
          "Vitest / Jest",
          "Git",
          "Docker",
          "Vercel",
        ],
      },
    ],
    // Derived only from dated evidence, per his instruction.
    exploring: [
      {
        title: "A second pass at fake-news detection",
        evidence: "Fake-News-NLP, a new repository from September 2026",
      },
      {
        title: "Data mining techniques",
        evidence: "Coursework, September 2026",
      },
      {
        title: "Vision models in production",
        evidence: "Claude vision behind Lagna Atelier's palm reading",
      },
    ],
  },

  contact: [
    {
      key: "email",
      href: "mailto:bala.s@northeastern.edu",
      detail: "bala.s@northeastern.edu",
    },
    {
      key: "github",
      href: "https://github.com/SwapnanilBala",
      detail: "github.com/SwapnanilBala",
    },
    {
      key: "linkedin",
      href: "https://www.linkedin.com/in/swapnanil-bala-854b722a7/",
      detail: "linkedin.com/in/swapnanil-bala-854b722a7",
    },
    {
      // The September 21 resume, with the phone number and personal address
      // removed from the content stream and the mailto link rebuilt, because
      // this repository is public. Regenerate the same way if it is replaced.
      key: "resume",
      href: "/resume.pdf",
      detail: "Resume, September 2026 (PDF)",
    },
  ],

  ui: {
    nav: { selected: "Selected", index: "Index", about: "About" },
    skipLink: "Skip to content",
    linkLabels: { live: "Open the live site", source: "Read the source" },
    contactLabels: {
      email: "Email",
      github: "GitHub",
      linkedin: "LinkedIn",
      resume: "Resume",
    },
    caseSectionLabels: {
      overview: "Overview",
      problem: "Problem",
      approach: "Approach",
      engineering: "Engineering",
      outcome: "Outcome",
    },
    aboutSectionLabels: {
      about: "About",
      experience: "Experience",
      education: "Education",
      technologies: "Technologies",
      exploring: "Currently exploring",
    },
    caseMeta: { role: "Role", year: "Year", stack: "Stack", type: "Type" },
    slider: {
      announce: "Project {index} of {total}: {name}",
      region: "Selected projects",
      rail: "Choose a project",
      thumbnail: "Show {name}",
      open: "Open the case study",
      hint: "Drag, scroll or use the arrow keys; Enter opens the case study",
    },
    cursor: { drag: "Drag", view: "View", open: "Open", dragLeft: "← Drag", dragRight: "Drag →" },
    index: {
      heading: "Index",
      description: "Selected software projects and experiments",
      grid: "Grid",
      list: "List",
      toggle: "Layout",
      columns: { name: "Project", category: "Category", year: "Year" },
    },
    caseNav: { label: "More case studies", previous: "Previous project", next: "Next project" },
    homeLink: { label: "Home", monogram: "SB" },
    footer: {
      headline: ["Let's build", "something."],
      localTime: "Local time",
      copyright: "© {year} Swapnanil Bala",
    },
    notFound: {
      heading: "Not found",
      body: "There is nothing at this address. The index lists everything that exists.",
      home: "Go to the index",
    },
  },
};
