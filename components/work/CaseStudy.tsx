import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { PageTransition } from "@/components/PageTransition";
import { SiteFooter } from "@/components/SiteFooter";
import { CaseNav } from "@/components/work/CaseNav";
import { CaseSection } from "@/components/work/CaseSection";
import { CompanionApp } from "@/components/work/CompanionApp";
import { MediaPair } from "@/components/work/MediaPair";
import { MediaPlate } from "@/components/work/MediaPlate";
import { ProjectHero } from "@/components/work/ProjectHero";
import { content } from "@/lib/content";
import type { MotionKit } from "@/lib/kit";
import { hasCaseStudy, isResolvedLink } from "@/lib/types";

const cases = content.projects.filter(hasCaseStudy);

/**
 * The figures' grid, by how many there are, so the row is always full: set
 * six across whatever the count, three figures took half the measure and a
 * value wider than its sixth ran into the next ("+0.0330.372"). Two to a
 * row on phones.
 */
const FIGURE_COLUMNS: Readonly<Record<number, string>> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-2 md:grid-cols-3",
  4: "grid-cols-2 lg:grid-cols-4",
  5: "grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
  6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
};

/** Every case study, for both trees' `generateStaticParams`. */
export function caseStudyParams() {
  return cases.map((project) => ({ slug: project.slug }));
}

export function caseStudyMetadata(slug: string): Metadata {
  const project = cases.find((candidate) => candidate.slug === slug);
  return project ? { title: project.name, description: project.summary } : {};
}

interface Props {
  readonly slug: string;
  readonly kit: MotionKit;
}

/**
 * A case study, whole: the hero on its dark ground, then the light band --
 * the figures as stat tiles, each section with what follows it, the links,
 * previous and next, each its own glass panel -- then the footer. One view
 * for both trees; the kit decides how it moves.
 */
export function CaseStudy({ slug, kit }: Props) {
  const index = cases.findIndex((candidate) => candidate.slug === slug);
  const project = cases[index];
  if (!project) notFound();

  // Both ways round the loop. With only two case studies both neighbours
  // would be the same project, so it is offered once, as the next.
  const next = cases.length > 1 ? cases[(index + 1) % cases.length] : undefined;
  const previous = cases.length > 2 ? cases[(index - 1 + cases.length) % cases.length] : undefined;
  const links = project.links.filter(isResolvedLink);
  const { ui } = content;
  const { Link: ProjectLink } = kit;

  return (
    <PageTransition>
      {/* Dark in tone, though most of its length is the light band: it opens
          on the dark hero and closes on the ink footer, and a light tone made
          the root flash paper mid-transition between two dark screens. */}
      <main id="main" data-tone="dark" className="bg-ground-dark text-paper">
        <ProjectHero project={project} meta={ui.caseMeta} kit={kit} />

        {/* The body: one light radiant band, every block on it its own glass
            panel. Previous and next close it, so the band ends where the ink
            footer begins. */}
        <div className="radiant-case-body flex flex-col gap-3 px-4 py-5 md:gap-5 md:px-8 md:py-8">
          {project.figures.length > 0 ? (
            <dl
              className={`grid gap-3 md:gap-4 ${FIGURE_COLUMNS[project.figures.length] ?? FIGURE_COLUMNS[6]}`}
            >
              {project.figures.map((figure) => (
                <div
                  key={figure.label}
                  className="glass-light flex min-w-0 flex-col-reverse justify-end gap-3 rounded-glass-sm px-4 py-5 md:px-6 md:py-6"
                >
                  <dt className="meta text-glass-ink-2">{figure.label}</dt>
                  <dd className="display text-[clamp(2.25rem,4.2vw,4.25rem)] tabular-nums">{figure.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          {project.caseStudy.sections.map((section) => (
            <Fragment key={section.id}>
              <CaseSection section={section} label={ui.caseSectionLabels[section.id]} kit={kit} />
              {section.media?.kind === "pair" ? <MediaPair media={section.media} kit={kit} /> : null}
              {section.media?.kind === "image" ? <MediaPlate media={section.media} kit={kit} /> : null}
            </Fragment>
          ))}

          {project.companion ? (
            <CompanionApp app={project.companion} stackLabel={ui.caseMeta.stack} kit={kit} />
          ) : null}

          {links.length > 0 ? (
            <ul className="glass-light flex flex-wrap gap-x-10 gap-y-3 rounded-glass-sm px-5 py-5 md:px-8">
              {links.map((link) => (
                <li key={link.role}>
                  <ProjectLink
                    href={link.href}
                    className="meta inline-block py-1 underline decoration-1 underline-offset-4"
                  >
                    {ui.linkLabels[link.role]}
                  </ProjectLink>
                </li>
              ))}
            </ul>
          ) : null}

          <CaseNav previous={previous} next={next} copy={ui.caseNav} />
        </div>

        <SiteFooter kit={kit} />
      </main>
    </PageTransition>
  );
}
