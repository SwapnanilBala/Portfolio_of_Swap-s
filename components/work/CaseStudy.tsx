import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { PageTransition } from "@/components/PageTransition";
import { SiteFooter } from "@/components/SiteFooter";
import { CaseNav } from "@/components/work/CaseNav";
import { CaseSection } from "@/components/work/CaseSection";
import { MediaPair } from "@/components/work/MediaPair";
import { MediaPlate } from "@/components/work/MediaPlate";
import { ProjectHero } from "@/components/work/ProjectHero";
import { content } from "@/lib/content";
import type { MotionKit } from "@/lib/kit";
import { hasCaseStudy, isResolvedLink } from "@/lib/types";

const cases = content.projects.filter(hasCaseStudy);

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
 * A case study, whole: the hero, the figures, each section with what follows
 * it, the links, previous and next, the footer. One view for both trees; the
 * kit decides how it moves.
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
      <main id="main" data-tone="dark" className="bg-paper text-ink">
        <ProjectHero project={project} meta={ui.caseMeta} kit={kit} />

        {project.figures.length > 0 ? (
          <dl className="grid grid-cols-2 px-5 md:grid-cols-3 md:px-8 lg:grid-cols-6">
            {project.figures.map((figure) => (
              <div
                key={figure.label}
                className="flex flex-col-reverse justify-end gap-3 border-b border-paper-rule py-8 pr-4 md:py-10"
              >
                <dt className="meta text-paper-muted">{figure.label}</dt>
                <dd className="display text-[clamp(2.5rem,5vw,4.75rem)] tabular-nums">{figure.value}</dd>
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

        {links.length > 0 ? (
          <ul className="flex flex-wrap gap-x-10 gap-y-3 border-t border-paper-rule px-5 py-10 md:px-8">
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

        <SiteFooter kit={kit} />
      </main>
    </PageTransition>
  );
}
