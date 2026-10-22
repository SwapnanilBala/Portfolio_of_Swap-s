import Image from "next/image";
import type { ReactNode } from "react";
import { Portraits } from "@/components/about/Portraits";
import { OutArrow } from "@/components/OutArrow";
import { PageTransition } from "@/components/PageTransition";
import { SectionLabel } from "@/components/SectionLabel";
import { SiteFooter } from "@/components/SiteFooter";
import { content } from "@/lib/content";
import type { MotionKit } from "@/lib/kit";
import { blurFor, PLATE_FRAME } from "@/lib/media";

/** One part of the record: a hairline, its label, then what it holds. */
function Cell({
  id,
  label,
  className,
  children,
}: {
  readonly id: string;
  readonly label: string;
  readonly className: string;
  readonly children: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className={`border-t border-paper-rule pb-10 pt-5 md:pb-12 ${className}`}>
      <SectionLabel id={id} className="mb-6">
        {label}
      </SectionLabel>
      {children}
    </section>
  );
}

/**
 * The landing page, as a two-up grid so it reads in under three screens on a
 * desktop. It opens on what a recruiter came for -- the name, the role and
 * when he is free, the ways to reach him, and the resume -- with the statement
 * on the resume's line. Then the person, his portraits beside the intro, and
 * the record two parts to a row: experience beside education, technologies
 * beside current work. The photographs close it, one row of three, before a
 * compact footer. Technologies are plain text lists joined by em dashes --
 * not a wall of coloured logos, which say only that a logo exists. One view
 * for both trees; the kit decides how it moves.
 */
export function About({ kit }: { readonly kit: MotionKit }) {
  const { Text, Plate, Link: ContactLink } = kit;
  const { about, contact, profile, ui } = content;
  const labels = ui.aboutSectionLabels;
  const resume = contact.find((route) => route.key === "resume");
  const reach = contact.filter((route) => route.key !== "resume");

  return (
    <PageTransition>
      <main id="main" data-tone="light" className="min-h-svh bg-paper text-ink">
        <div className="px-5 md:px-8">
          {/* Nothing up here is revealed by script: it is what a reader came
              for, so it is there in the first paint whatever loads after. A
              phone on its side gets tighter spacing, so the resume link is
              still in the first screen. */}
          <header className="pb-8 pt-24 md:pt-28 short:pb-6 short:pt-20">
            <div className="grid grid-cols-12 gap-x-5 gap-y-6">
              <div className="col-span-12 md:col-span-7">
                <h1 className="text-[clamp(1.25rem,1.55vw,1.875rem)] font-semibold uppercase leading-[0.95] tracking-[-0.025em]">
                  {profile.name}
                </h1>
                <p className="meta mt-2.5 text-paper-muted">
                  {profile.role} / {profile.affiliation}
                </p>
                <p className="meta mt-1">{ui.landing.availability.replace("{availability}", profile.availability)}</p>
              </div>
              <ul className="col-span-12 flex flex-wrap gap-x-8 gap-y-2 md:col-span-5 md:justify-self-end">
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

            <div className="mt-8 grid grid-cols-12 items-end gap-x-5 gap-y-5 border-t border-paper-rule pt-5 md:mt-10 short:mt-6 short:pt-4">
              {/* The PDF opens in a new tab, so the page is still here after. */}
              {resume ? (
                <a
                  href={resume.href}
                  target="_blank"
                  rel="noopener"
                  aria-label={`${ui.contactLabels.resume}: ${resume.detail}`}
                  className="group col-span-12 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 md:col-span-5"
                >
                  <span className="display flex items-start gap-[0.12em] text-[clamp(3rem,6vw,5.75rem)] transition-transform duration-700 ease-out-expo group-hover:translate-x-2 group-focus-visible:translate-x-2 reduced:transition-none">
                    {ui.contactLabels.resume}
                    <OutArrow className="mt-[0.08em] size-[0.32em]" />
                  </span>
                  <span className="meta pb-1 text-paper-muted">{ui.landing.resumeNote}</span>
                </a>
              ) : null}
              <p className="display col-span-12 text-balance text-[clamp(1.5rem,2.5vw,2.5rem)] md:col-span-7 md:pb-1 md:text-right">
                {about.statement.join(" ")}
              </p>
            </div>
          </header>

          <section
            aria-labelledby="about"
            className="grid grid-cols-12 gap-x-5 gap-y-6 border-t border-paper-rule pb-10 pt-5 md:pb-12"
          >
            <SectionLabel id="about" className="col-span-12 md:col-span-3">
              {labels.about}
            </SectionLabel>
            <div className="col-span-12 md:col-span-3">
              <Portraits portraits={about.portraits} kit={kit} />
            </div>
            <div className="col-span-12 grid gap-4 md:col-span-6">
              {about.intro.map((paragraph) => (
                <Text key={paragraph} as="p" when="view" stagger={0.05} className="max-w-[60ch] text-[1.0625rem] leading-[1.55]">
                  {paragraph}
                </Text>
              ))}
            </div>
          </section>

          {/* Two parts to a row from 64rem; stacked, in reading order, below. */}
          <div className="grid grid-cols-12 lg:gap-x-10">
            <Cell id="experience" label={labels.experience} className="col-span-12 lg:col-span-7">
              <ol className="grid gap-8">
                {about.experience.map((role) => (
                  <li key={`${role.org}-${role.period}`}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <h3 className="text-lg font-semibold tracking-[-0.02em]">{role.role}</h3>
                      <p className="meta tabular-nums text-paper-muted">{role.period}</p>
                    </div>
                    <p className="mt-1 text-[0.9375rem] text-paper-muted">
                      {role.org} — {role.location}
                    </p>
                    <ul className="mt-4 grid gap-2 border-t border-paper-rule pt-4">
                      {role.details.map((detail) => (
                        <li key={detail} className="grid grid-cols-[1.25rem_1fr] text-[0.9375rem] leading-[1.5]">
                          <span aria-hidden="true" className="mt-[0.72em] h-px w-2.5 bg-ink" />
                          <span className="max-w-[68ch]">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </Cell>

            <Cell id="education" label={labels.education} className="col-span-12 lg:col-span-5">
              <ol className="grid gap-5">
                {about.education.map((entry) => (
                  <li key={entry.school} className="grid gap-x-6 gap-y-1 md:grid-cols-[1fr_auto] md:items-baseline">
                    <div>
                      <h3 className="text-lg font-semibold tracking-[-0.02em]">{entry.degree}</h3>
                      <p className="mt-0.5 text-[0.9375rem] text-paper-muted">
                        {entry.school} — {entry.location}
                      </p>
                    </div>
                    <p className="meta tabular-nums text-paper-muted">{entry.period}</p>
                  </li>
                ))}
              </ol>
              <ul className="mt-6 grid gap-5 border-t border-paper-rule pt-5 md:grid-cols-2 lg:grid-cols-1">
                {about.certificates.map((certificate) => (
                  <li key={certificate.name}>
                    <p className="font-semibold">{certificate.name}</p>
                    <p className="meta mt-1 text-paper-muted">
                      {certificate.issuer}
                      {certificate.date ? ` / ${certificate.date}` : ""}
                    </p>
                    <p className="mt-2 max-w-[52ch] text-[0.875rem] leading-[1.5]">{certificate.note}</p>
                  </li>
                ))}
              </ul>
            </Cell>

            <Cell id="technologies" label={labels.technologies} className="col-span-12 lg:col-span-7">
              <dl className="grid gap-4">
                {about.technologies.map((group) => (
                  <div key={group.label} className="grid gap-1 md:grid-cols-[9rem_1fr] md:gap-6">
                    <dt className="meta pt-1 text-paper-muted">{group.label}</dt>
                    <dd className="text-[1.0625rem] leading-snug tracking-[-0.01em] md:text-lg">
                      {group.items.join(" — ")}
                    </dd>
                  </div>
                ))}
              </dl>
            </Cell>

            <Cell id="exploring" label={labels.exploring} className="col-span-12 lg:col-span-5">
              <ul className="grid gap-4">
                {about.exploring.map((item) => (
                  <li key={item.title} className="grid gap-1 border-b border-paper-rule pb-4">
                    <p className="text-[1.0625rem] tracking-[-0.01em] md:text-lg">{item.title}</p>
                    <p className="meta text-paper-muted">{item.evidence}</p>
                  </li>
                ))}
              </ul>
            </Cell>
          </div>

          {/* The campus twice and the city, cropped to one 4:3 frame so the
              row is one band. Each crop is at least 1200px wide, which covers a
              third of a 1920px screen at 2x. */}
          <div className="grid gap-5 border-t border-paper-rule pb-14 pt-6 md:grid-cols-3">
            {about.photos.map((photo) => (
              <figure key={photo.src} className="min-w-0">
                <Plate className={`${PLATE_FRAME} aspect-[4/3]`}>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 48rem) calc((100vw - 6.5rem) / 3), calc(100vw - 2.5rem)"
                    placeholder="blur"
                    blurDataURL={blurFor(photo.src)}
                    className="object-cover"
                  />
                </Plate>
                <figcaption className="mt-2 text-[0.9375rem] font-medium tracking-[-0.01em]">{photo.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>

        <SiteFooter kit={kit} compact />
      </main>
    </PageTransition>
  );
}
