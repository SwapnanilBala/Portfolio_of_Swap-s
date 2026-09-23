import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { DisplayTitle } from "@/components/DisplayTitle";
import { ProjectCover } from "@/components/index/ProjectCover";
import { MagneticLink } from "@/components/MagneticLink";
import { PageTransition, SharedMedia } from "@/components/PageTransition";
import { SiteFooter } from "@/components/SiteFooter";
import { WarmOnIntent } from "@/components/WarmOnIntent";
import { CaseSection } from "@/components/work/CaseSection";
import { MediaPlate } from "@/components/work/MediaPlate";
import { ProjectHero } from "@/components/work/ProjectHero";
import { content } from "@/lib/content";
import { displayLinesOf, hasCaseStudy, isResolvedLink } from "@/lib/types";

const cases = content.projects.filter(hasCaseStudy);

// Every case study is known at build time; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return cases.map((project) => ({ slug: project.slug }));
}

interface Params {
  readonly params: Promise<{ readonly slug: string }>;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = cases.find((candidate) => candidate.slug === slug);
  return project ? { title: project.name, description: project.summary } : {};
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const index = cases.findIndex((candidate) => candidate.slug === slug);
  const project = cases[index];
  if (!project) notFound();

  const next = cases[(index + 1) % cases.length];
  const links = project.links.filter(isResolvedLink);
  const { ui } = content;

  return (
    <PageTransition>
      <main id="main" data-tone="dark" className="bg-paper text-ink">
        <ProjectHero project={project} meta={ui.caseMeta} />

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
            <CaseSection section={section} label={ui.caseSectionLabels[section.id]} />
            {section.plate ? <MediaPlate media={section.plate} /> : null}
          </Fragment>
        ))}

        {links.length > 0 ? (
          <ul className="flex flex-wrap gap-x-10 gap-y-3 border-t border-paper-rule px-5 py-10 md:px-8">
            {links.map((link) => (
              <li key={link.role}>
                <MagneticLink
                  href={link.href}
                  className="meta inline-block py-1 underline decoration-1 underline-offset-4"
                >
                  {ui.linkLabels[link.role]}
                </MagneticLink>
              </li>
            ))}
          </ul>
        ) : null}

        {next && next.slug !== project.slug ? (
          <WarmOnIntent image={next.hero ?? next.cover}>
            <Link
              href={`/work/${next.slug}`}
              transitionTypes={["page"]}
              data-cursor="view"
              className="group grid grid-cols-12 items-end gap-x-5 border-t border-paper-rule px-5 py-16 md:px-8 md:py-24"
            >
              <span className="meta col-span-12 text-paper-muted md:col-span-3">{ui.nextProject}</span>
              <div className="col-span-12 mt-6 md:col-span-6 md:mt-0">
                <DisplayTitle
                  as="p"
                  lines={displayLinesOf(next)}
                  className="text-[min(11vw,11rem)] transition-transform duration-700 ease-out-expo group-hover:translate-x-3 reduced:transition-none"
                />
              </div>
              <div className="col-span-12 mt-8 md:col-span-3 md:mt-0">
                <SharedMedia slug={next.slug}>
                  <div className="overflow-hidden">
                    <div className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.04] reduced:transition-none">
                      <ProjectCover project={next} sizes="(min-width: 48rem) 22vw, 90vw" />
                    </div>
                  </div>
                </SharedMedia>
              </div>
            </Link>
          </WarmOnIntent>
        ) : null}

        <SiteFooter />
      </main>
    </PageTransition>
  );
}
