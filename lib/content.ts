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
        alt: "Lagna Atelier's landing screen in its dark theme: “Create your Vedic birth chart” in gold capitals on a starfield, the first of four steps — name, birth date, birth time, birthplace — asking what to call the reader, and a Live sky build panel waiting for its six details.",
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
      // The Android app, from its CLAUDE.md and history (checked 2026-11-03):
      // first commit 2026-10-30, 97 commits, all his; version 1.0.7,
      // side-loaded, not on the Play Store. Its repository is private, so no
      // source link and nothing on how sign-in or the API are secured. The
      // screens are its debug build's sample data, signed out: every name is
      // invented, and none is a real account.
      companion: {
        name: "Robust Health for Android",
        body: [
          "A native app for members and coaches, begun in late October 2026 and still a prototype: builds are installed by hand rather than from the Play Store. It calls the website's own API unchanged, so plans, AI plans, diets and the streak are worked out once, on the server, and never copied into the phone.",
          "Logic that has to run on the phone — the training schedule, missed days, allergens — is ported from the website and tested against the website's own test vectors, so the two give the same answers. Runs and walks are tracked by GPS, and the strings come from the website's English and Spanish. Health Connect and push notifications are still to come.",
        ],
        stack: ["Kotlin", "Jetpack Compose", "OkHttp", "Retrofit", "kotlinx.serialization", "Credential Manager", "JUnit"],
        note: "Version 1.0.7 on an Android 16 emulator, November 2026, showing the app's built-in sample data: the people are invented.",
        screens: [
          {
            src: "/media/robust-health-android-home.webp",
            width: 1080,
            height: 2260,
            label: "Signed out",
            alt: "The app's first screen, over an orange and blue gradient: slide one of three, Train — “A split that fits your week.”, workout split plus progression — above a Get started button and sign-in buttons for a member or a coach.",
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
            src: "/media/robust-health-android-diet.webp",
            width: 1080,
            height: 2260,
            label: "Diet",
            alt: "Build your diet: daily targets of 2,453 against 2,450 kcal, with protein, carbs and fat as bars, then the week's plates by weekday and meal, breakfast at 7:30 drawn as a 554 kcal ring, and a Build new meals button.",
          },
          {
            src: "/media/robust-health-android-runs.webp",
            width: 1080,
            height: 2260,
            label: "Runs and walks",
            alt: "Runs and walks: a walk or run switch with a Start run button, 5,482 steps today against yesterday, the daily average and the best day, and past runs and walks with their distance, date, time and calories.",
          },
          {
            src: "/media/robust-health-android-coach.webp",
            width: 1080,
            height: 2260,
            label: "A coach's clients",
            alt: "The coach's side with sample clients: six clients, two quiet this week and listed first, counts of who logged, who needs a plan and who powerlifts, filters, and a row per client with this week's adherence as a ring, the last log and the plan's age, above the coach's dock: Clients, Progress, Inbox, You.",
          },
        ],
      },
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
        alt: "Robust Health's landing page: “Train. Eat. Recover. Adapt.” in large white type, Adapt in orange, over a dimmed photograph of a woman training; a line on workouts, calorie and macro targets and sleep from about five minutes of questions; Get my plan and How it works buttons and sign-in links for members and coaches; and a row of glass panels — workouts, food targets, sleep goal, changes weekly, and 900+ exercises, EN+ES and $0 to bring your coach.",
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
        alt: "The clinic's booking page in its dark theme: “Book a visit with Dr. Kamalesh Bala”, four steps — town, chamber, day and time, your details — with the first open on Dinhata, Kolkata and Rampurhat, the doctor's chamber days this week, and an empty visit summary.",
      },
      heroMobile: {
        src: "/media/kb-clinic-mobile.webp",
        width: 1170,
        height: 2532,
        alt: "The clinic's booking page on a phone: the doctor's name and speciality, English, Bengali and Hindi switches, this week's chamber days, and the first step, choosing a town.",
      },
      // Taken from the live site on 2026-10-21, signed out. The booking was
      // walked as far as a day and time and no further: the details step
      // asks for a patient's own, and nothing was submitted.
      captures: [
        {
          src: "/media/kb-clinic-live-chamber.webp",
          width: 2880,
          height: 1800,
          label: "Chamber",
          alt: "The second step, after choosing Kolkata: two chambers, Laboni Estate and Salt Lake, each with its address.",
        },
        {
          src: "/media/kb-clinic-live-day.webp",
          width: 2880,
          height: 1800,
          label: "Day and time",
          alt: "The third step at the Salt Lake chamber: the days ahead, those without a chamber marked closed, and half-hourly times from 10:00 am to 5:30 pm, with the visit summary filled in beside it.",
        },
        {
          src: "/media/kb-clinic-live-chambers.webp",
          width: 2880,
          height: 1800,
          label: "Five chambers",
          alt: "Where to find us: five chambers across Dinhata, Kolkata and Rampurhat, each with its address, the days it is open this week and a button to book there, then the three steps of a booking and a sign-in for patients who have booked before.",
        },
        {
          src: "/media/kb-clinic-live-bangla.webp",
          width: 2880,
          height: 1800,
          label: "In Bengali",
          alt: "The booking page in Bengali: the headline, the steps, the visit summary and the help card translated, the town names left in English.",
        },
      ],
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
    photos: [
      {
        src: "/media/northeastern-street.webp",
        width: 1200,
        height: 900,
        caption: "Northeastern, from the street",
        alt: "A long pale-brick university building with tall windows behind a fenced tram line and young trees, a red Northeastern banner on a lamppost, under a blue sky.",
      },
      {
        src: "/media/northeastern-window.webp",
        width: 1200,
        height: 900,
        caption: "Northeastern, from a window above",
        alt: "Seen from a window above a tram platform: a long glass-walled building among trees, towers and a construction crane on the skyline under a cloudy blue sky.",
      },
      {
        src: "/media/fenway.webp",
        width: 2040,
        height: 1020,
        caption: "The Fenway, Boston",
        alt: "A still river between tall trees in full leaf, the trees and a clear blue sky mirrored in the water, a pale building on the far bank.",
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
      detail: "Resume, October 2026 (PDF)",
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
      // The resume contact's detail says the same: "Resume, October 2026
      // (PDF)". Change both when the file is replaced.
      resumeNote: "October 2026 / PDF",
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
      grid: "Grid",
      list: "List",
      toggle: "Layout",
      columns: { name: "Project", category: "Category", year: "Year" },
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
