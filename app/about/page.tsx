import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { PageTransition } from "@/components/PageTransition";
import { RevealPlate } from "@/components/RevealPlate";
import { SiteFooter } from "@/components/SiteFooter";
import { SplitTextReveal } from "@/components/SplitTextReveal";
import { content } from "@/lib/content";
import { blurFor } from "@/lib/media";

export const metadata: Metadata = { title: content.ui.aboutSectionLabels.about };

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
      <h2 id={id} className="meta col-span-12 text-paper-muted md:col-span-3">
        {label}
      </h2>
      <div className="col-span-12 mt-6 md:col-span-8 md:col-start-5 md:mt-0">{children}</div>
    </section>
  );
}

/**
 * The oversized statement, then the person, then the record. Technologies are
 * plain text lists joined by em dashes -- not a wall of coloured logos, which
 * say only that a logo exists.
 */
export default function AboutPage() {
  const { about, profile, ui } = content;
  const labels = ui.aboutSectionLabels;
  const portrait = profile.portrait;

  return (
    <PageTransition>
      <main id="main" data-tone="light" className="min-h-svh bg-paper text-ink">
        <header className="px-5 pb-20 pt-28 md:px-8 md:pb-28 md:pt-36">
          <SplitTextReveal
            as="h1"
            stagger={0.08}
            className="display max-w-[16ch] text-[clamp(3.25rem,8.6vw,10rem)]"
          >
            {about.statement.join(" ")}
          </SplitTextReveal>
        </header>

        <Section id="about" label={labels.about}>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,15rem)_1fr]">
            {/* Shown at half its pixel width, so it stays sharp on a 2x screen;
                a larger upload grows the slot with no change here. */}
            <RevealPlate className="w-full">
              <div style={{ maxWidth: `${portrait.width / 2}px` }}>
                <Image
                  src={portrait.src}
                  alt={portrait.alt}
                  width={portrait.width}
                  height={portrait.height}
                  sizes={`${portrait.width / 2}px`}
                  placeholder="blur"
                  blurDataURL={blurFor(portrait.src)}
                  className="h-auto w-full"
                />
              </div>
            </RevealPlate>
            <div className="grid max-w-[60ch] gap-5">
              {about.intro.map((paragraph) => (
                <SplitTextReveal
                  key={paragraph}
                  as="p"
                  when="view"
                  stagger={0.05}
                  className="text-lg leading-[1.55] md:text-xl"
                >
                  {paragraph}
                </SplitTextReveal>
              ))}
            </div>
          </div>
        </Section>

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

        <SiteFooter />
      </main>
    </PageTransition>
  );
}
