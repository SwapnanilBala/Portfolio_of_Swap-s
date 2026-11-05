"use client";

import { useState } from "react";
import { SharedMedia } from "@/components/PageTransition";
import { hasTile, IndexCover, IndexRows, ProjectLink } from "@/components/index/parts";
import { useMediaQuery } from "@/lib/motion";
import { hasCaseStudy, type Project, type UiCopy } from "@/lib/types";

interface Props {
  readonly projects: readonly Project[];
  readonly copy: UiCopy["index"];
}

/** Where the detail is shown beside the list; below it, rows carry covers. */
const WIDE = "(min-width: 48rem)";

/**
 * The archive as a list beside a detail (November 2026, chosen from four
 * mock-ups): the names down the left, and the project under the pointer or
 * keyboard focus open on the right -- its cover, summary, stack and figures.
 * It opens on the first project.
 *
 * Every project's detail is rendered, stacked in one cell, and the open one
 * crossfades in: switching rows never waits on an image, and the panel's
 * height never changes under the pointer. The detail repeats what the rows
 * say, so it is hidden from assistive technology and its cover is not a tab
 * stop; the rows are the links.
 *
 * The open cover carries the page transition's shared name, so opening a row
 * morphs it into the case-study hero. Below 48rem the detail is hidden and
 * each row shows a small cover instead, which carries the name there.
 *
 * A certificate has no screen and no dataset to draw, and a cover this size
 * would be a large ink box holding one number -- what the October redesign
 * removed. Its summary takes the cover's place instead, large, on glass.
 */
export function IndexView({ projects, copy }: Props) {
  const [active, setActive] = useState(projects[0]?.slug);
  // The desktop tree is served to desktop user agents, so assume the wide
  // layout until the query says otherwise: one shared name either way.
  const wide = useMediaQuery(WIDE, true);

  return (
    <div className="grid grid-cols-12 gap-4 px-5 pb-16 pt-5 md:gap-5 md:px-8 md:pb-20 md:pt-6">
      <div className="col-span-12 self-start md:col-span-5">
        <IndexRows
          projects={projects}
          copy={copy}
          active={active}
          onActivate={setActive}
          covers="narrow"
          sharedCovers={!wide}
        />
      </div>

      <div aria-hidden="true" className="col-span-7 hidden self-start md:grid">
        {projects.map((project, index) => {
          const open = project.slug === active;
          const words = !hasTile(project) && (project.selected || !project.dotField);
          return (
            <article
              key={project.slug}
              className={`glass-light col-start-1 row-start-1 rounded-glass p-3 transition-[opacity,visibility] duration-500 ease-out-expo reduced:transition-none ${
                open ? "visible opacity-100" : "invisible opacity-0"
              }`}
            >
              <ProjectLink project={project} cursor="view" tabIndex={-1} className="group block">
                <div data-cursor-frame className="overflow-hidden rounded-glass-sm">
                  {words ? (
                    <div className="flex aspect-[16/10] flex-col justify-between rounded-glass-sm border border-ink/10 bg-glass-light-edge p-[6%]">
                      <span className="meta text-glass-ink-2">
                        {project.type} / {project.year}
                      </span>
                      <span className="max-w-[30ch] text-[clamp(1.375rem,2.2vw,2.125rem)] font-medium leading-[1.15] tracking-[-0.02em]">
                        {project.summary}
                      </span>
                    </div>
                  ) : (
                    <SharedMedia slug={project.slug} enabled={open && wide && hasCaseStudy(project)}>
                      <div className="overflow-hidden rounded-glass-sm transition-transform duration-700 ease-out-expo group-hover:scale-[1.02] reduced:transition-none reduced:group-hover:scale-100">
                        <IndexCover project={project} sizes="calc(58vw - 4rem)" eager={index === 0} />
                      </div>
                    </SharedMedia>
                  )}
                </div>
              </ProjectLink>
              <div className="grid grid-cols-7 gap-x-5 px-3 pb-3 pt-6">
                <div className="col-span-4">
                  <p className="text-[clamp(2rem,3.6vw,3.5rem)] font-semibold uppercase leading-[0.92] tracking-[-0.035em]">
                    {project.name}
                  </p>
                  {words ? null : (
                    <p className="mt-4 text-[0.9375rem] leading-snug text-glass-ink-2">{project.summary}</p>
                  )}
                  <p className="meta mt-5 leading-relaxed text-glass-ink-2">{project.stack.join(" / ")}</p>
                </div>
                <dl className="col-span-3 grid content-start gap-4">
                  {project.figures.slice(0, 3).map((figure) => (
                    <div key={figure.label} className="flex items-baseline justify-between gap-3 border-b border-ink/10 pb-2">
                      <dt className="meta text-glass-ink-2">{figure.label}</dt>
                      <dd className="text-[1.5rem] font-semibold tabular-nums tracking-[-0.03em]">{figure.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
