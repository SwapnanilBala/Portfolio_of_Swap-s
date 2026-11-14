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
        // Seven since October 2026: English, Spanish, Bengali, Hindi, Italian,
        // French and German, per the live language menu (confirmed by him).
        { value: "7", label: "languages" },
        { value: "719", label: "commits" },
      ],
      // The Android app, from its repository (SwapnanilBala/Lagna_Atelier,
      // public) and SIGN_IN.md, checked 2026-11-04: first commit 2026-11-02,
      // 56 commits, all his; version 1.0, not on the Play Store. Not the
      // March 2026 Kotlin scaffold (Astro_Android_Version, two commits) or
      // the Flutter attempt (Atalier_Android, never committed): this is a
      // fresh app. It sends every chart question to lagnaatelier.site's API,
      // so charts are still computed on the server. Readings written by the
      // site come back in English whatever the language (its own settings
      // screen says so). The screens are a chart cast for an invented
      // reader, Tara, on the emulator, signed out.
      companion: {
        name: "Lagna Atelier for Android",
        body: [
          "A native app, begun in November 2026 and still a prototype: it is not on the Play Store. It puts its questions to lagnaatelier.site's own API, so a chart is cast on the server, as on the website, and the two give the same answers; the phone keeps up to five charts of its own.",
          "Four tabs carry the website's reading: the chart in South or North Indian style with its dasha timeline, planet positions and yogas; the running periods, written out, with the week ahead and compatibility; a palm read from a photograph, for signed-in readers; and the account. It is in the website's seven languages, in light and dark. Google sign-in, which keeps saved charts in step with the website account, was added last.",
        ],
        stack: ["Kotlin", "Jetpack Compose", "Material 3", "Credential Manager", "Android Keystore", "JUnit"],
        note: "Version 1.0 on an Android 16 emulator, November 2026, signed out, with a chart cast for an invented reader: the name, birth date, time and place are made up.",
        screens: [
          {
            src: "/media/lagna-atelier-android-home.webp",
            width: 1080,
            height: 2260,
            label: "First screen",
            alt: "The app's first screen on a pale ground: “Read the Sky You Were Born Under”, a line on the birth chart in six traditions, the period of life and the palm, a Start your chart button, cards for today's sky — Moon in Leo — the chapter you are in and 36 traditions, 205 yogas checked on every chart, and Sign in with Google beside Saved charts.",
          },
          {
            src: "/media/lagna-atelier-android-birth-details.webp",
            width: 1080,
            height: 2260,
            label: "Birth details",
            alt: "The birth details form filled in for an invented reader: 17 January 1990 at 06:30, the exact time switched on, Pune, Maharashtra, India chosen from the place search with its time zone, UTC+5:30, sex at birth left at Prefer not to say, and the tradition — Lahiri, whole sign houses — above a Cast my chart button.",
          },
          {
            src: "/media/lagna-atelier-android-reading.webp",
            width: 1080,
            height: 2260,
            label: "The reading",
            alt: "The reading for the invented chart: the chapter now, Jupiter and Saturn, 67% through, from 18 February 2025 to 1 September 2027; four cards for the lagna, Sagittarius, the Moon sign, Virgo, the nakshatra, Hasta, and the mahadasha, Jupiter; a dasha timeline of the whole life; the top of the birth chart; and the dock: Reading, Timing, Palm, Account.",
          },
          {
            src: "/media/lagna-atelier-android-timing.webp",
            width: 1080,
            height: 2260,
            label: "Timing",
            alt: "The Timing tab: running now, Jupiter, Saturn and Mars, a paragraph on what the three periods mean together, then each period — maha, antar and pratyantar — as a bar showing how far through it is, its dates and a Read this period button, and the next one, Rahu, from 12 December 2026.",
          },
          {
            src: "/media/lagna-atelier-android-preferences.webp",
            width: 1080,
            height: 2260,
            label: "Dark, and settings",
            alt: "The Account tab in the dark theme: the one saved chart, kept on this phone only, then preferences — appearance set to dark, chart style South or North Indian, the language as the phone's or one of English, Hindi, Bengali, Spanish, French, Italian and German, with a note that written readings still arrive in English — and the tradition new charts use.",
          },
          {
            src: "/media/lagna-atelier-android-chart-hindi.webp",
            width: 1080,
            height: 2260,
            label: "In Hindi",
            alt: "The same chart in Hindi and the dark theme, drawn in the North Indian style: a diamond of twelve houses with the rising house filled and planets abbreviated in Devanagari, the Rasi and Navamsa switch, and the planet positions table beneath, its headings and sign names in Hindi too.",
          },
        ],
      },
      links: [
        { role: "live", href: "https://lagnaatelier.site" },
        {
          role: "source",
          href: "https://github.com/SwapnanilBala/Large_Astro_Web_App",
        },
      ],
      selected: true,
      // The product, not its landing page (November 2026, on request): a
      // chart cast on the live site, signed out, for an invented reader
      // (no real person's birth details), on 2026-11-09. The details travel
      // in the address and nothing was saved.
      hero: {
        src: "/media/lagna-atelier-chart.webp",
        width: 2880,
        height: 1800,
        alt: "A Lagna Atelier chart for an invented reader: the birth chart (Rashi, D1) as a constellation wheel with Aquarius rising, a table of each planet's sign, house and degree, and beside it the week's energy as a line from Saturday 7 to Friday 13 November, peaking on Monday the 9th, over four forecast cards.",
      },
      heroMobile: {
        src: "/media/lagna-atelier-mobile.webp",
        width: 1170,
        height: 2532,
        alt: "Lagna Atelier on a phone: question one of four, “What should we call you?”, a name field, an optional choice of sex at birth, and a continue button held at the foot of the screen.",
      },
      cover: {
        src: "/media/lagna-atelier-cover.webp",
        width: 1674,
        height: 962,
        alt: "A circular chart on a starfield, its rim ringed with zodiac glyphs and numbered houses, the centre reading Cancer, beside a week-long line chart of daily energy that peaks on Thursday above four forecast cards.",
      },
      // Taken from the live site on 2026-10-21, signed out. The landing
      // screen is as far as a visitor gets without typing birth details, so
      // these are its themes and its languages; the chart itself is in the
      // case study.
      captures: [
        {
          src: "/media/lagna-atelier-hero.webp",
          width: 2880,
          height: 1800,
          label: "Dark theme",
          alt: "Lagna Atelier's landing screen in its dark theme: gold capitals on a starfield, the four-step birth-details form and the Live sky build panel.",
        },
        {
          src: "/media/lagna-atelier-live-light.webp",
          width: 2880,
          height: 1800,
          label: "Light theme",
          alt: "The same screen in the light theme: “Create your Vedic birth chart” in dark serif capitals on a pale rose ground, the form's first step, and the sky panel's Sun, Moon, MC and ascendant markers.",
        },
        {
          src: "/media/lagna-atelier-live-languages.webp",
          width: 2880,
          height: 1800,
          label: "Languages",
          alt: "The language menu open over the landing screen: English, Español, বাংলা, हिन्दी, Italiano, Français and Deutsch.",
        },
        {
          src: "/media/lagna-atelier-live-hindi.webp",
          width: 2880,
          height: 1800,
          label: "In Hindi",
          alt: "The landing screen in Hindi: the headline, the form's four steps, its questions and the sky panel all translated, the Sign in button too.",
        },
      ],
      caseStudy: {
        sections: [
          {
            id: "overview",
            body: [
              "Lagna Atelier builds a Vedic natal chart from four details — name, birth date, birth time and birthplace — and reads it. The chart is the full working set: lagna, houses and planetary positions, then 23 divisional charts from D1 to D60, Vimshottari dasha timelines and 51 yoga detections on top.",
              "It is live at lagnaatelier.site in seven languages.",
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
            // Both crops sit clear of anything that dates a birth: the natal
            // degree table beside the week is cut away, and the dasha and
            // nakshatra screens from the same round are not published.
            // The week's method is from lib/engines/weekly-energy-engine.ts.
            media: {
              kind: "pair",
              title: "A lifetime, and a week",
              body: "Yogas are read once, from the birth chart: every one the chart matches, grouped by strength, with its classical meaning and the planets that form it. The week is read against the moving sky, scored once a day at local sunrise — half from the panchanga everyone shares, half counted from the reader's natal Moon, so two people in one city do not get the same week.",
              images: [
                {
                  src: "/media/lagna-atelier-yogas.webp",
                  width: 996,
                  height: 828,
                  label: "Yogas",
                  alt: "A Your Planetary Yogas panel: a note that every yoga detected in the birth chart is listed by strength, then Strong Yogas (9) and three cards — Dhanakaraka, Adhi and Lagna Benefic Flank yoga — each with a manifestation chance of 92 or 93%, an activation window, the planets involved, a classical meaning and its effects.",
                },
                {
                  src: "/media/lagna-atelier-week.webp",
                  width: 883,
                  height: 626,
                  label: "The week",
                  alt: "A Your Weekly Energy panel for October 3 to 9, 2026: a line across seven days against low, balanced and high bands, peaking on Monday the 5th under the words Peak Grace, above four forecast cards — Creative Spark, New Opportunities, Steady Progress and Emotional Flow.",
                },
              ],
            },
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
              "Live at lagnaatelier.site in seven languages, with 561 tests and 719 commits behind it.",
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
        // 900+ exercises and English and Spanish, per the live landing page
        // (October 2026, confirmed by him); Portuguese is no longer offered.
        { value: "900+", label: "exercises modelled" },
        { value: "−50%", label: "load time, web" },
        { value: "−67%", label: "load time, mobile" },
        { value: "2", label: "languages" },
      ],
      // The Android app, from its CLAUDE.md and history (checked 2026-11-04,
      // no commits since 1.0.7): first commit 2026-10-30, all his; version
      // 1.0.7, side-loaded, not on the Play Store. Its repository is private,
      // so no source link and nothing on how sign-in or the API are secured.
      // The screens are its debug build's sample data, signed out: every name
      // is invented, and none is a real account.
      companion: {
        name: "Robust Health for Android",
        body: [
          "A native app for members and coaches, begun in October 2026 and still a prototype: builds are installed by hand, not from the Play Store. It runs on the website's own API, so plans, AI plans and diets are worked out on the server rather than copied into the phone, and the logic the phone runs itself is tested against the website's own test vectors. Health Connect and push notifications are not built yet.",
        ],
        stack: ["Kotlin", "Jetpack Compose", "OkHttp", "Retrofit", "kotlinx.serialization", "Credential Manager", "JUnit"],
        note: "Version 1.0.7 on an Android 16 emulator, November 2026, showing the app's built-in sample data: the people are invented.",
        screens: [
          {
            src: "/media/robust-health-android-onboarding.webp",
            width: 1080,
            height: 2260,
            label: "Getting started",
            alt: "Two ways to start: “How do you want to start?” above a recommended Personalised card, about three to five minutes, with a Build my plan button, and a Quick start card, ready right away, with a Browse programmes button.",
          },
          {
            src: "/media/robust-health-android-plan.webp",
            width: 1080,
            height: 2260,
            label: "The plan",
            alt: "Here's your plan: week one of four, accumulation, Push Pull Legs — four days a week, about 52 minutes, 2,450 kcal — with Workout, Fuel and Recovery tabs, day chips for Legs, Pull, Push and Arms, and Day 1, Legs, opening on a warm-up of four moves, back squat and Romanian deadlift, each with a swap button, above Save my plan.",
          },
          {
            src: "/media/robust-health-android-dashboard.webp",
            width: 1080,
            height: 2260,
            label: "The dashboard",
            alt: "A sample member's dashboard greeting Maya: up next, Day 1, Legs — quads, glutes and hamstrings, six exercises, 61 minutes, week 6 of a push, pull, legs split — with a Start workout button, none of four workouts done this week, a three-week streak, a Monday-to-Sunday strip of training and rest days, and the dock: Dashboard, Programme, Progress, Inbox, More.",
          },
          {
            src: "/media/robust-health-android-workout.webp",
            width: 1080,
            height: 2260,
            label: "Mid-workout",
            alt: "The workout screen at Day 1, Legs, exercise one of six: a warm-up row, the exercise's demo video, then back squat — four sets of six to eight reps, set buttons one to four, 150 seconds' rest, a 3-1-1 tempo and RPE 8 — a Mark exercise done switch, Romanian deadlift up next, and a Next exercise button.",
          },
          {
            src: "/media/robust-health-android-coach.webp",
            width: 1080,
            height: 2260,
            label: "A coach's clients",
            alt: "The coach's side with sample clients: six clients, two quiet this week and listed first, counts of who logged, who needs a plan and who powerlifts, filters, and a row per client with this week's adherence as a ring, the last log and the plan's age, above the coach's dock: Clients, Progress, Inbox, You.",
          },
          {
            src: "/media/robust-health-android-coach-plan.webp",
            width: 1080,
            height: 2260,
            label: "A coach editing a plan",
            alt: "A coach editing a sample client's Upper / Lower plan: a Monday-to-Sunday strip of training days and rest days, chips for days one to four, Add day and Food, then Day 1, Upper — chest and back, 60 minutes — with bench press, barbell row, incline dumbbell press and lateral raise, each with its sets, reps and rest, an Add exercise button, and Cancel and Save.",
          },
        ],
      },
      links: [
        { role: "live", href: "https://app.robusthealth.in" },
        // Private repository: no source link.
        { role: "source" },
      ],
      selected: true,
      // The product, not its landing page (November 2026, on request): the
      // signed-out quick-start plan, from the same round as the Index frames.
      hero: {
        src: "/media/robust-health-live-plan.webp",
        width: 2880,
        height: 1800,
        alt: "A quick-start preview of German Volume Training: six days a week, about 72 minutes a session, 3,187 kcal and 165 g of protein a day, and a note that with no details entered the calorie, macro and water numbers are for a reference adult of 75 kg, 175 cm and 24 years, above the top of the daily targets and the week's workouts.",
      },
      heroMobile: {
        src: "/media/robust-health-mobile.webp",
        width: 1170,
        height: 2532,
        alt: "Robust Health on a phone: “Train. Eat. Recover. Adapt.”, the line on workouts, targets and sleep, Get my plan and How it works buttons, sign-in links for members and coaches, three overlapping gym photographs, and the first counters — 900+ exercises and EN+ES.",
      },
      // The product, not the landing page: the Index shows the app rather
      // than its marketing photography. The quick-start catalogue, signed
      // out, on 2026-11-03; the age, height and weight are the page's own
      // defaults.
      cover: {
        src: "/media/robust-health-live-programmes.webp",
        width: 2880,
        height: 1800,
        alt: "Robust Health's quick start, “Start from a known programme”: 23 published programmes, a Your numbers panel of sex, age, height, weight and activity with a maintenance estimate of about 2,551 kcal a day from the Mifflin-St Jeor equation, a search box, filters for training days and experience, and the first programme cards — Krissy Cela Glute Days, German Volume Training and DoggCrapp Training.",
      },
      // Taken from the live site on 2026-11-03, signed out, after the
      // redesign: the landing page's second screen, How It Works, onboarding
      // and its first questions (nothing typed), a quick-start plan, and the
      // landing page in Spanish. The account screens are not shown.
      captures: [
        {
          src: "/media/robust-health-live-inside.webp",
          width: 2880,
          height: 1800,
          label: "What's inside",
          alt: "The landing page's second screen, “For lifters, powerlifters and their coaches.”: three photographs, each under a panel from the product — week four's upper-body day, a back squat set logged at RPE 7.5, a coach's board of twelve clients — then four notes: plates from your kitchen and budget, sets logged with no signal, next week built from your logs, English and Spanish.",
        },
        {
          src: "/media/robust-health-live-how.webp",
          width: 2880,
          height: 1800,
          label: "How it works",
          alt: "The How It Works page, “A few answers in, a plan that keeps up.”, in three steps: an intake of goal and training days; this week's upper-body session beside 2,140 kcal, 160 g of protein and an eight-hour sleep target; and a notice that week five is ready, the press up 2.5 kg and Thursday a rest day. Below, a line for members training with a coach.",
        },
        {
          src: "/media/robust-health-live-onboarding.webp",
          width: 2880,
          height: 1800,
          label: "Getting started",
          alt: "Onboarding: “Your plan, built around your week” beside two ways to start — personalised, recommended, in about three to five minutes, or a quick start from a published programme, ready right away.",
        },
        {
          src: "/media/robust-health-live-questions.webp",
          width: 2880,
          height: 1800,
          label: "The questions",
          alt: "The personalised questionnaire's first step, body stats: empty name fields, age, sex, height and weight at the page's defaults, a BMI reading, and optional body fat and body type — between the four steps on the left and a running summary on the right of about 2,051 kcal a day, an upper/lower split four days a week and a full gym.",
        },
        {
          src: "/media/robust-health-live-plan.webp",
          width: 2880,
          height: 1800,
          label: "A quick-start plan",
          alt: "A quick-start preview of German Volume Training: six days a week, about 72 minutes a session, 3,187 kcal and 165 g of protein a day, and a note that with no details entered the calorie, macro and water numbers are for a reference adult of 75 kg, 175 cm and 24 years, above the top of the daily targets and the week's workouts.",
        },
        {
          src: "/media/robust-health-live-spanish.webp",
          width: 2880,
          height: 1800,
          label: "In Spanish",
          alt: "The landing page in Spanish: “Entrena. Come. Recupérate. Adáptate.”, with the same buttons, panels and counters.",
        },
      ],
      caseStudy: {
        sections: [
          {
            id: "overview",
            body: [
              "Robust Health turns a member's profile into a weekly plan — training, nutrition and recovery — and gives trainers a portal of their own to author plans, assign them and follow each client's adherence.",
              "It is live at app.robusthealth.in in English and Spanish.",
            ],
            media: {
              kind: "image",
              src: "/media/robust-health-start.webp",
              width: 2460,
              height: 970,
              alt: "Robust Health's onboarding over a dimmed gym photograph: “Your plan, built around your week” and a line on three to five minutes of questions, beside a panel asking How do you want to start? with two choices — Personalised, recommended, about three to five minutes, and Quick start, ready right away.",
              caption:
                "Two ways in: three to five minutes of questions that build a first week around the member's goal, days, gear and injuries, or a published programme to browse now, with optional body details for calorie targets. Switching between them keeps whatever has already been typed.",
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
              // Both panels are from the How It Works page, which walks the
              // loop with example values rather than a member's own.
              body: "The intake asks for a goal and the days a member can train, then the gear, the food and any injury around them. Once a week is logged, the weekly update writes the next one and says what moved. The How It Works page walks it through: the press goes up 2.5 kg, and Thursday becomes a rest day.",
              images: [
                {
                  src: "/media/robust-health-intake.webp",
                  width: 724,
                  height: 462,
                  label: "The intake",
                  alt: "An intake panel: What are you training for? with Build strength selected over Lose fat and General fitness, and Days you can train with three selected from two to five.",
                },
                {
                  src: "/media/robust-health-week-five.webp",
                  width: 728,
                  height: 466,
                  label: "The weekly update",
                  alt: "A Week five panel: a notice that week five is ready, built from last week's logs — the press up 2.5 kg and Thursday a rest day — above tabs for weeks five back to two.",
                },
              ],
            },
          },
          {
            id: "approach",
            body: [
              "A plan can come from four places: a deterministic planner, the Claude API, a trainer's own scaffold, or a curated catalogue. The member flow runs onboarding, generate, track, then regenerate.",
              "Programmes are data rather than code — 15 of them over more than 900 exercises, each carrying sets, reps, rest and RPE-based progression — and calorie targets come from the Mifflin-St Jeor equation.",
            ],
            points: [
              "Trainers author and assign their own plans, and track each client's adherence over an adjustable window.",
              "A powerlifting module logs RPE, calculates the working weight for the next set, and flags clients who stop logging.",
            ],
            media: {
              kind: "image",
              // A quick-start plan, signed out: the body details are the
              // page's defaults, not a member's.
              src: "/media/robust-health-plan-week.webp",
              width: 2880,
              height: 1644,
              alt: "Further down a quick-start plan for German Volume Training: daily targets of 3,187 kcal, 165 g protein, 463 g carbs and 75 g fat against a 2,551 kcal TDEE, 3.6 litres of water and a meal timeline, beside the workouts — day one chest and back, day two legs and abs, each with its warm-up and exercises at ten sets of ten, 90 seconds' rest and RPE 8.",
              caption:
                "A published programme as data: each day's warm-up, then every exercise with its sets, reps, rest and target RPE, beside calorie, macro and water targets for the member's height, weight and age — a reference adult's until they are entered. A quick-start plan like this one opens without an account.",
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
            // Signed out, in a browser with no saved logins: both fields show
            // only their placeholders.
            media: {
              kind: "image",
              src: "/media/robust-health-sign-in.webp",
              width: 2440,
              height: 1590,
              alt: "The member sign-in page: “Sign in to your plans” beside a panel with Sign in and New here tabs, Sign in with Google, Discord and GitHub, an email and password form with a Cloudflare human check and a Keep me signed in switch, and a link to email a code instead.",
              caption:
                "The member sign-in: Google, Discord or GitHub, a password, or a one-time code by email, behind a human check. Coaches sign in to their own portal from a separate page.",
            },
          },
          {
            id: "outcome",
            body: [
              "Live at app.robusthealth.in. Load time is the measured part: next/image compression and route-level code splitting cut Lighthouse load time by about half on web and two thirds on mobile.",
            ],
            // The same quick-start plan at 360 pixels wide, signed out; the
            // reference body is the page's default.
            media: {
              kind: "pair",
              title: "On a phone",
              body: "On a phone the plan splits into Workout, Fuel and Recovery, one day at a time. Each exercise carries its sets, rest and target RPE and a box to tick off as it is done.",
              images: [
                {
                  src: "/media/robust-health-phone-plan.webp",
                  width: 720,
                  height: 1600,
                  label: "The plan",
                  alt: "A quick-start preview of German Volume Training on a phone: six days a week, about 72 minutes, 3,187 kcal; a note that the numbers are for a reference body of 75 kg, 175 cm and 24 years; Workout, Fuel and Recovery tabs; day one, chest and back, with its three warm-up moves folded away; and a Sign in to save button.",
                },
                {
                  src: "/media/robust-health-phone-day.webp",
                  width: 720,
                  height: 1600,
                  label: "Day one",
                  alt: "Day one's exercises on a phone under the Workout tab: barbell bench press and pull-ups at ten sets of ten, incline dumbbell flyes and one-arm dumbbell rows at three sets of ten to twelve, each at 90 seconds' rest and RPE 8, with a box to tick and a play button.",
                },
              ],
            },
          },
        ],
      },
    },

    {
      slug: "kb-patient-booking",
      name: "KB Patient Booking",
      displayLines: ["KB Patient", "Booking"],
      category: "Clinic booking system",
      // First commit 2026-03-02; resumed in October 2026, last push
      // 2026-11-05. The copy below follows the repository's README as
      // deployed on 2026-11-05 (Neon Postgres, Twilio WhatsApp): the SQL
      // files still say "Supabase", but the app left it for Neon.
      year: "2026",
      started: 2026,
      type: "Built for a practice",
      // Sole contributor: 51 of 51 commits (checked 2026-11-05).
      role: "Sole developer",
      stack: ["JavaScript", "Node.js", "Express", "PostgreSQL", "Neon", "Twilio", "HTML / CSS"],
      summary:
        "Appointment booking for an orthopaedic practice with five chambers in three towns: a four-step booking in English, Bengali or Hindi, a dashboard where the doctor confirms each visit, and an admin panel with a full change history.",
      // Chambers and towns from the live site's Where to find us; languages
      // from its switcher and the README.
      figures: [
        { value: "3", label: "portals: patient, doctor, admin" },
        { value: "5", label: "chambers in three towns" },
        { value: "3", label: "languages: English, Bengali, Hindi" },
      ],
      links: [
        // drkbalaortho.com no longer resolves, so the Vercel URL is used.
        { role: "live", href: "https://k-bala-clinic-app.vercel.app" },
        // Private repository: no source link.
        { role: "source" },
      ],
      selected: true,
      // The product, not its landing page (November 2026, on request): the
      // booking's day-and-time step, from the same round as the Index frames.
      hero: {
        src: "/media/kb-clinic-live-day.webp",
        width: 2880,
        height: 1800,
        alt: "The clinic's booking at its third step, at the Salt Lake chamber: the days ahead, those without a chamber marked closed, Monday chosen, and half-hourly times from 10:00 am to 5:30 pm in morning, afternoon and evening rows, with the visit summary beside it.",
      },
      heroMobile: {
        src: "/media/kb-clinic-mobile.webp",
        width: 1170,
        height: 2532,
        alt: "The clinic's booking page on a phone: the doctor's name, English, Bengali and Hindi switches, the headline, Book a visit and See all chambers, and this week's three chamber days.",
      },
      // Taken from the live site on 2026-11-05, after its redesign, signed
      // out. The booking was walked to the details step and no further:
      // nothing was typed and nothing was sent.
      captures: [
        {
          src: "/media/kb-clinic-live-chamber.webp",
          width: 2880,
          height: 1800,
          label: "Chamber",
          alt: "The second step, after choosing Kolkata: two chambers, Laboni Estate and Salt Lake, each with its address and the days it is open this week, and the visit summary filling in beside them.",
        },
        {
          src: "/media/kb-clinic-live-day.webp",
          width: 2880,
          height: 1800,
          label: "Day and time",
          alt: "The third step at the Salt Lake chamber: the days ahead, those without a chamber marked closed, Monday chosen, and half-hourly times from 10:00 am to 5:30 pm in morning, afternoon and evening rows, with the visit summary beside it.",
        },
        {
          src: "/media/kb-clinic-live-chambers.webp",
          width: 2880,
          height: 1800,
          label: "Five chambers",
          alt: "Where to find us: five chambers across Dinhata, Kolkata and Rampurhat, each with its address, the days it is open this week and a button to book there, then how booking works in three steps: choose a day, tell us who you are, wait for the doctor.",
        },
        {
          src: "/media/kb-clinic-live-bangla.webp",
          width: 2880,
          height: 1800,
          label: "In Bengali",
          alt: "The booking page in Bengali: the headline, the week, the steps, the visit summary and the help card translated, the town and chamber names left in English.",
        },
      ],
      caseStudy: {
        sections: [
          {
            id: "overview",
            body: [
              "A booking system for an orthopaedic practice that sees patients at five chambers in three towns. A patient picks a town, a chamber, a day and a time, and gets an account in the same step; nothing is confirmed until the doctor approves. Every label, message and date is in English, Bengali or Hindi, and the choice is remembered on the device.",
            ],
          },
          {
            id: "problem",
            body: [
              "Three people need three different things from one appointment. A patient needs to know where the doctor will be this week and when; the doctor needs the day's requests in one place, to confirm or decline; the clinic needs every patient, booking and change on record.",
            ],
          },
          {
            id: "approach",
            body: [
              "Three surfaces over one set of records. Patients book, then see their next visit, past visits with the doctor's notes, and their prescriptions. The doctor's dashboard opens on the day's numbers and a week of bookings: each request is confirmed or declined with a reason the patient will read, availability is set per chamber, and prescriptions are typed on the clinic's letterhead, with a translation into Bengali or Hindi, or uploaded as a photo. The admin panel holds every patient and booking, the history of every change, and a CSV export.",
            ],
            // Public, signed-out pages only. The form is cropped to its
            // fields, all empty; the doctor's page to its description, past
            // the sign-in form.
            media: {
              kind: "pair",
              title: "The patient's form, the doctor's day",
              body: "A patient books in one form: name, age and sex, a WhatsApp number, which becomes the account, an optional reason for the visit, and an optional email, height and weight. The doctor signs in to bookings, schedule and prescriptions in one place: every booking for the day, a visit to confirm or decline, prescriptions in English, Bengali or Hindi, and the days and hours patients can book.",
              images: [
                {
                  src: "/media/kb-clinic-booking.webp",
                  width: 1456,
                  height: 1088,
                  label: "Booking",
                  alt: "The booking form's fields, all empty, on the dark theme: full name, age, sex as Male, Female or Other, a WhatsApp number with a +91 prefix, an optional reason for the visit, and optional email, height in centimetres and weight in kilograms.",
                },
                {
                  src: "/media/kb-clinic-doctor.webp",
                  width: 1008,
                  height: 920,
                  label: "The doctor's day",
                  alt: "The doctor's sign-in page: bookings, schedule and prescriptions in one place. See every booking for the day, confirm or decline visits, write prescriptions in English, Bengali or Hindi, and set the days and hours patients can book; then two cards, today's bookings and those waiting.",
                },
              ],
            },
          },
          {
            id: "engineering",
            body: [
              "An Express server over PostgreSQL on Neon, run on Vercel as one serverless function that also serves the pages. Accounts are keyed to the patient's phone number, so a returning patient signs in with the number they booked with. Staff sign in with tokens and are signed out after three minutes idle, and database triggers write an audit row for every insert, update and delete. The doctor's decision goes to the patient as a WhatsApp message through Twilio; each one is logged as sent, failed or skipped, and the dashboard warns the doctor when one does not go out.",
            ],
            media: {
              kind: "image",
              src: "/media/kb-clinic-signin.webp",
              width: 2308,
              height: 420,
              alt: "Already booked? A sign-in strip under the booking page: sign in to see your visits and prescriptions, a phone number with a +91 prefix and a password, both empty, the note “Use the phone number you booked with”, and a Sign in button.",
              caption:
                "A returning patient signs in with the phone number they booked with, to see their visits and prescriptions.",
            },
          },
          {
            id: "outcome",
            // README, Known issues: the Twilio credentials are test ones and
            // no message templates are approved yet.
            body: [
              "Live on Vercel, with all three surfaces deployed. WhatsApp delivery is built and logged, and waits on production Twilio credentials and approved message templates.",
            ],
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
        // Coursera's record of the certificate. Its PDF (api/certificate.v1/
        // pdf/GKQ88KX0EUB6) reads: completed the Professional Certificate
        // Meta Database Engineer, 9 courses, Jan 23 2025 (checked 2026-09-24).
        // First, so the Index tile opens it.
        {
          role: "certificate",
          href: "https://www.coursera.org/account/accomplishments/specialization/certificate/GKQ88KX0EUB6",
        },
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
      { label: "Languages", items: ["TypeScript", "Python", "JavaScript", "SQL", "R"] },
      {
        label: "ML and AI",
        items: [
          "Claude API, text and vision",
          "RAG",
          "PyTorch",
          "TensorFlow",
          "Scikit-Learn",
          "XGBoost",
          "DistilBERT and RoBERTa fine-tuning",
        ],
      },
      {
        label: "Data",
        items: [
          "Pandas",
          "NumPy",
          "EDA",
          "Hypothesis testing",
          "A/B testing",
          "Excel",
          "Matplotlib",
          "Seaborn",
          "Plotly",
        ],
      },
      {
        label: "Web",
        items: ["React", "Next.js", "Node.js", "FastAPI", "PWAs", "REST", "OAuth 2.0", "i18n"],
      },
      {
        label: "Data stores and tooling",
        items: [
          "PostgreSQL (Neon, Supabase)",
          "pgvector",
          "MySQL",
          "Upstash Redis",
          "Google BigQuery",
          "ETL",
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
    // Squares, cropped so a circle frames the face. The snow photograph is
    // cut to head and shoulders, which also leaves out the entrance of the
    // building behind him. The suit portrait's source is 400px whole, so it
    // takes the smallest circle, where 250px of it stays sharp on a 2x screen.
    portraits: [
      {
        src: "/media/about-smile.webp",
        width: 675,
        height: 675,
        alt: "Swapnanil Bala smiling broadly, in an orange collared shirt, indoors.",
      },
      {
        src: "/media/about-snow.webp",
        width: 720,
        height: 720,
        alt: "Swapnanil Bala in a grey beanie and a blue hooded coat, snow falling around him on a city street.",
      },
      {
        src: "/media/about-suit.webp",
        width: 250,
        height: 250,
        alt: "Swapnanil Bala in a grey suit and dark red tie, standing at a railing above a pond.",
      },
    ],
    // The six shared on 2026-11-04, replacing the campus pair and the old
    // Fenway plate. Place and dates are from each original's own record:
    // all six in the Back Bay Fens, between October 25 and November 4. In
    // the order taken, so the leaves turn across the grid. No people in any
    // of them; GPS and the rest of the metadata are stripped from the WebPs.
    photos: {
      place: "The Fens, Boston",
      dates: "October 25 — November 4, 2026",
      images: [
        {
          src: "/media/fens-oct-25.webp",
          width: 1600,
          height: 1200,
          caption: "October 25, still green",
          alt: "A pond under a clear blue sky, its far bank lined with trees still mostly in green leaf, a few touched with yellow, reeds at the water's edge and a paved path running off the corner.",
        },
        {
          src: "/media/fens-oct-26-leaves.webp",
          width: 1600,
          height: 1200,
          caption: "October 26, under turning leaves",
          alt: "Copper-orange leaves on a low branch frame the view across a pond to a line of trees, some still green, some turning, under a sky of scattered white clouds.",
        },
        {
          src: "/media/fens-oct-26-water.webp",
          width: 1600,
          height: 1200,
          caption: "October 26, yellow over the water",
          alt: "A white-barked tree leaning out over dark water among others in bright yellow leaf, their colour reflected below, fallen leaves floating on the surface.",
        },
        {
          src: "/media/fens-nov-4-pond.webp",
          width: 1600,
          height: 1200,
          caption: "November 4, leaves on the water",
          alt: "A pond with its surface covered in fallen leaves, a clump of tall grass on the near bank and a weeping willow at the right, trees in russet and gold behind it under a bright sun.",
        },
        {
          src: "/media/fens-nov-4-trees.webp",
          width: 1600,
          height: 1200,
          caption: "November 4, in full colour",
          alt: "A tall tree in red-orange leaf beside younger trees in gold, the ground beneath them deep in fallen leaves and long shadows, still water and a low stone building through the trunks.",
        },
        {
          src: "/media/fens-nov-4-rocks.webp",
          width: 1600,
          height: 1200,
          caption: "November 4, from the rocks",
          alt: "Seen from a grey outcrop of rock, a narrow stretch of water winds between trees in red, orange and yellow, the bright colours mirrored in it under a deep blue sky.",
        },
      ],
    },
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
      // The November 13 AI Engineer resume, built from
      // Resume_Hub/_source/content/portfolio-site.json: the Northeastern
      // address and no phone number, because this repository is public. That
      // build fails if either private detail appears.
      key: "resume",
      href: "/resume.pdf",
      detail: "Resume, November 2026 (PDF)",
    },
  ],

  ui: {
    nav: { projects: "Projects", index: "Index", about: "About" },
    skipLink: "Skip to content",
    linkLabels: { live: "Open the live site", source: "Read the source", certificate: "View the certificate" },
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
    landing: {
      availability: "Seeking a {availability}",
      // The resume contact's detail says the same: "Resume, November 2026
      // (PDF)". Change both when the file is replaced.
      resumeNote: "November 2026 / PDF",
    },
    slider: {
      heading: "Projects",
      announce: "Project {index} of {total}: {name}",
      region: "Projects",
      rail: "Choose a project",
      thumbnail: "Show {name}",
      open: "Open the case study",
      hint: "Drag, scroll or use the arrow keys; Enter opens the case study",
    },
    cursor: { drag: "Drag", view: "View", open: "Open", dragLeft: "← Drag", dragRight: "Drag →" },
    index: {
      heading: "Index",
      description: "Selected software projects and experiments",
      destinations: { live: "Live site", source: "Repository", certificate: "Certificate" },
      captures: {
        heading: "From the live sites",
        note: "Captured October and November 2026, signed out",
        count: "{count} frames",
      },
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
