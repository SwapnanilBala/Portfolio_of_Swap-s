import Image from "next/image";
import { SectionLabel } from "@/components/SectionLabel";
import type { MotionKit } from "@/lib/kit";
import { blurFor, PLATE_FRAME, recordNumber, SCREENSHOT_QUALITY } from "@/lib/media";
import { liveLinkOf, type Project, type UiCopy } from "@/lib/types";

interface Props {
  readonly projects: readonly Project[];
  readonly copy: UiCopy["index"];
  readonly kit: MotionKit;
}

/**
 * The live sites, frame by frame, after the grid or list: one record per
 * project with frames, in the label column its number, name and address, and
 * beside it the frames two to a row from 40rem.
 *
 * Every frame is a 1440×900 window at 2x, so they share one 16:10 shape and
 * the rows line up without cropping anything. The number is the project's
 * Index record, which the grid and list above already cite.
 *
 * Shared by both trees, which pass their own kit: it renders on the server
 * and holds no state, so the grid-to-list Flip above never has to know it is
 * here.
 */
export function IndexCaptures({ projects, copy, kit }: Props) {
  const { Plate } = kit;
  const records = projects
    .map((project, index) => ({ project, index, captures: project.captures ?? [] }))
    .filter((record) => record.captures.length > 0);
  if (records.length === 0) return null;

  return (
    <section aria-labelledby="captures" className="px-5 pb-24 md:px-8 md:pb-32">
      <div className="flex items-baseline justify-between gap-5 border-t border-paper-rule pt-4">
        <SectionLabel id="captures">{copy.captures.heading}</SectionLabel>
        <span className="meta text-right text-paper-muted">{copy.captures.note}</span>
      </div>

      {records.map(({ project, index, captures }) => {
        const live = liveLinkOf(project);
        return (
          <article
            key={project.slug}
            aria-labelledby={`captures-${project.slug}`}
            className="mt-12 grid grid-cols-12 gap-x-5 gap-y-6 border-t border-paper-rule pt-4 md:mt-16"
          >
            <header className="col-span-12 md:col-span-3">
              <p className="meta tabular-nums text-paper-muted">{recordNumber(index)}</p>
              <h3
                id={`captures-${project.slug}`}
                className="mt-2 text-[1.375rem] font-semibold leading-[1.15] tracking-[-0.02em] md:text-[clamp(1.125rem,1.7vw,1.625rem)]"
              >
                {project.name}
              </h3>
              <p className="meta mt-2 text-paper-muted">
                {project.category} / {copy.captures.count.replace("{count}", String(captures.length))}
              </p>
              {live ? (
                <a
                  href={live.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${copy.destinations.live}, ${project.name}`}
                  className="meta mt-3 inline-block py-1 underline decoration-1 underline-offset-4 transition-colors duration-300 hover:text-paper-muted"
                >
                  {new URL(live.href).host}
                </a>
              ) : null}
            </header>

            <ol className="col-span-12 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 md:col-span-9">
              {captures.map((capture) => (
                <li key={capture.src}>
                  <figure>
                    <Plate className={PLATE_FRAME}>
                      <Image
                        src={capture.src}
                        alt={capture.alt}
                        width={capture.width}
                        height={capture.height}
                        sizes="(min-width: 48rem) 36vw, (min-width: 40rem) calc(50vw - 2.25rem), calc(100vw - 2.5rem)"
                        quality={SCREENSHOT_QUALITY}
                        placeholder="blur"
                        blurDataURL={blurFor(capture.src)}
                        className="h-auto w-full"
                      />
                    </Plate>
                    <figcaption className="meta mt-3">{capture.label}</figcaption>
                  </figure>
                </li>
              ))}
            </ol>
          </article>
        );
      })}
    </section>
  );
}
