import type { ReactNode } from "react";
import { Portraits } from "@/components/about/Portraits";
import { OutArrow } from "@/components/OutArrow";
import { PageTransition } from "@/components/PageTransition";
import { SectionLabel } from "@/components/SectionLabel";
import { SiteFooter } from "@/components/SiteFooter";
import { MediaPair } from "@/components/work/MediaPair";
import { MediaPlate } from "@/components/work/MediaPlate";
import { content } from "@/lib/content";
import type { MotionKit } from "@/lib/kit";

function Section({
  id,
  label,
  children,
}: {
  readonly id: string;
  readonly label: string;
  readonly children: ReactNode;
}) {
  return (
    <section
      aria-labelledby={id}
      className="grid grid-cols-12 gap-x-5 border-t border-paper-rule px-5 py-14 md:px-8 md:py-20"
    >
      <SectionLabel id={id}>{label}</SectionLabel>
      <div className="col-span-12 mt-8 md:col-span-8 md:col-start-5 md:mt-0">{children}</div>
    </section>
  );
}

/**
 * The landing page. It opens on what a recruiter came for -- the name, the
 * role and when he is free, the resume and the ways to reach him -- then the
 * record, experience and education, before the person: the statement, the
 * intro beside his portraits, the technologies and current work. The
 * photographs keep to what they belong to: the campus after the education,
 * him beside the intro, the city to close. Technologies are plain text lists
 * joined by em dashes -- not a wall of coloured logos, which say only that a
 * logo exists. One view for both trees; the kit decides how it moves.
 */
export function About({ kit }: { readonly kit: MotionKit }) {
  const { Text, Link: ContactLink } = kit;
  const { about, contact, profile, ui } = content;
  const labels = ui.aboutSectionLabels;
  const resume = contact.find((route) => route.key === "resume");
  const reach = contact.filter((route) => route.key !== "resume");

  return (
    <PageTransition>
      <main id="main" data-tone="light" className="min-h-svh bg-paper text-ink">
        {/* Nothing up here is revealed by script: it is what a reader came
            for, so it is there in the first paint whatever loads after. The
            name keeps its medium size; the resume is the display type. A
            phone on its side gets tighter spacing, so the resume link is
            still in the first screen. */}
        <header className="px-5 pb-14 pt-28 md:px-8 md:pb-20 md:pt-36 short:pb-10 short:pt-20">
          <div className="grid grid-cols-12 gap-x-5 gap-y-8">
            <div className="col-span-12 md:col-span-7">
              <h1 className="text-[clamp(1.25rem,1.55vw,1.875rem)] font-semibold uppercase leading-[0.95] tracking-[-0.025em]">
                {profile.name}
              </h1>
              <p className="meta mt-2.5 text-paper-muted">
                {profile.role} / {profile.affiliation}
              </p>
              <p className="meta mt-1">{ui.landing.availability.replace("{availability}", profile.availability)}</p>
            </div>
            <ul className="col-span-12 flex flex-wrap gap-x-8 gap-y-3 md:col-span-5 md:justify-self-end">
              {reach.map((route) => (
                <li key={route.key}>
                  <ContactLink
                    href={route.href}
                    ariaLabel={`${ui.contactLabels[route.key]}: ${route.detail}`}
                    className="inline-block py-1 text-[0.9375rem] font-medium uppercase tracking-[0.01em] underline-offset-4 hover:underline"
                  >
                    {ui.contactLabels[route.key]}
                  </ContactLink>
                </li>
              ))}
            </ul>
          </div>

          {/* The PDF opens in a new tab, so the page is still here after. */}
          {resume ? (
            <a
              href={resume.href}
              target="_blank"
              rel="noopener"
              aria-label={`${ui.contactLabels.resume}: ${resume.detail}`}
              className="group mt-14 flex flex-wrap items-end justify-between gap-x-8 gap-y-3 border-t border-paper-rule pt-6 md:mt-20 short:mt-8 short:pt-4"
            >
              <span className="display flex items-start gap-[0.12em] text-[clamp(3.5rem,10vw,10rem)] transition-transform duration-700 ease-out-expo group-hover:translate-x-3 group-focus-visible:translate-x-3 reduced:transition-none">
                {ui.contactLabels.resume}
                <OutArrow className="mt-[0.08em] size-[0.3em]" />
              </span>
              <span className="meta pb-1 text-paper-muted md:pb-3">{ui.landing.resumeNote}</span>
            </a>
          ) : null}
        </header>

        <Section id="experience" label={labels.experience}>
          <ol className="grid gap-12">
            {about.experience.map((role) => (
              <li key={`${role.org}-${role.period}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="text-2xl font-semibold tracking-[-0.02em]">{role.role}</h3>
                  <p className="meta tabular-nums text-paper-muted">{role.period}</p>
                </div>
                <p className="mt-1 text-paper-muted">
                  {role.org} — {role.location}
                </p>
                <ul className="mt-6 grid gap-3 border-t border-paper-rule pt-6">
                  {role.details.map((detail) => (
                    <li key={detail} className="grid grid-cols-[1.25rem_1fr] leading-[1.55]">
                      <span aria-hidden="true" className="mt-[0.75em] h-px w-2.5 bg-ink" />
                      <span className="max-w-[68ch]">{detail}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="education" label={labels.education}>
          <ol className="grid gap-8">
            {about.education.map((entry) => (
              <li
                key={entry.school}
                className="grid gap-x-6 gap-y-1 md:grid-cols-[1fr_auto] md:items-baseline"
              >
                <div>
                  <h3 className="text-2xl font-semibold tracking-[-0.02em]">{entry.degree}</h3>
                  <p className="mt-1 text-paper-muted">
                    {entry.school} — {entry.location}
                  </p>
                </div>
                <p className="meta tabular-nums text-paper-muted">{entry.period}</p>
              </li>
            ))}
          </ol>
          <ul className="mt-12 grid gap-6 border-t border-paper-rule pt-8 md:grid-cols-2">
            {about.certificates.map((certificate) => (
              <li key={certificate.name}>
                <p className="font-semibold">{certificate.name}</p>
                <p className="meta mt-1 text-paper-muted">
                  {certificate.issuer}
                  {certificate.date ? ` / ${certificate.date}` : ""}
                </p>
                <p className="mt-3 max-w-[48ch] text-[0.9375rem] leading-[1.55]">{certificate.note}</p>
              </li>
            ))}
          </ul>
        </Section>

        <MediaPair media={about.campus} kit={kit} />

        <div className="border-t border-paper-rule px-5 pb-16 pt-20 md:px-8 md:pb-24 md:pt-28">
          <Text as="p" when="view" stagger={0.08} className="display max-w-[16ch] text-[clamp(3.25rem,8.6vw,10rem)]">
            {about.statement.join(" ")}
          </Text>
        </div>

        <Section id="about" label={labels.about}>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,18rem)_1fr]">
            <Portraits portraits={about.portraits} kit={kit} />
            <div className="grid max-w-[60ch] gap-5">
              {about.intro.map((paragraph) => (
                <Text
                  key={paragraph}
                  as="p"
                  when="view"
                  stagger={0.05}
                  className="text-lg leading-[1.55] md:text-xl"
                >
                  {paragraph}
                </Text>
              ))}
            </div>
          </div>
        </Section>

        <Section id="technologies" label={labels.technologies}>
          <dl className="grid gap-7">
            {about.technologies.map((group) => (
              <div key={group.label} className="grid gap-2 md:grid-cols-[10rem_1fr] md:gap-6">
                <dt className="meta pt-1.5 text-paper-muted">{group.label}</dt>
                <dd className="text-xl leading-snug tracking-[-0.01em] md:text-2xl">
                  {group.items.join(" — ")}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="exploring" label={labels.exploring}>
          <ul className="grid gap-6">
            {about.exploring.map((item) => (
              <li
                key={item.title}
                className="grid gap-1 border-b border-paper-rule pb-6 md:grid-cols-[1fr_auto] md:items-baseline md:gap-6"
              >
                <p className="text-xl tracking-[-0.01em] md:text-2xl">{item.title}</p>
                <p className="meta text-paper-muted">{item.evidence}</p>
              </li>
            ))}
          </ul>
        </Section>

        <MediaPlate media={about.city} kit={kit} />

        <SiteFooter kit={kit} />
      </main>
    </PageTransition>
  );
}
