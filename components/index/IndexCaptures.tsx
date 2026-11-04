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
 * beside it the frames two to a row from 40rem. The heading, the label and
 * every frame are glass cards on the page's radiant ground.
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
      <div className="glass-light flex items-baseline justify-between gap-5 rounded-glass-sm px-5 py-4 md:rounded-glass md:px-7 md:py-5">
        <SectionLabel id="captures">{copy.captures.heading}</SectionLabel>
        <span className="meta text-right text-glass-ink-2">{copy.captures.note}</span>
      </div>

      {records.map(({ project, index, captures }) => {
        const live = liveLinkOf(project);
        return (
          <article
            key={project.slug}
            aria-labelledby={`captures-${project.slug}`}
            className="mt-4 grid grid-cols-12 gap-4 md:mt-5 md:gap-5"
          >
            <header className="glass-light col-span-12 self-start rounded-glass-sm p-5 md:col-span-3 md:rounded-glass md:p-6">
              <p className="meta tabular-nums text-glass-ink-2">{recordNumber(index)}</p>
              <h3
                id={`captures-${project.slug}`}
                className="mt-2 text-[1.375rem] font-semibold leading-[1.15] tracking-[-0.02em] md:text-[clamp(1.125rem,1.7vw,1.625rem)]"
              >
                {project.name}
              </h3>
              <p className="meta mt-2 text-glass-ink-2">
                {project.category} / {copy.captures.count.replace("{count}", String(captures.length))}
              </p>
              {live ? (
                <a
                  href={live.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${copy.destinations.live}, ${project.name}`}
                  className="meta mt-3 inline-block py-1 underline decoration-1 underline-offset-4 transition-colors duration-300 hover:text-glass-ink-2"
                >
                  {new URL(live.href).host}
                </a>
              ) : null}
            </header>

            <ol className="col-span-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:col-span-9 md:gap-5">
              {captures.map((capture) => (
                <li key={capture.src}>
                  {/* Each frame a glass card; the capture's own corners are
                      rounded inside it, its hairline following them. */}
                  <figure className="glass-light h-full rounded-glass-sm p-2 pb-3 md:rounded-glass md:p-2.5 md:pb-3.5">
                    <Plate className={`${PLATE_FRAME} rounded-glass-xs after:rounded-[inherit]`}>
                      <Image
                        src={capture.src}
                        alt={capture.alt}
                        width={capture.width}
                        height={capture.height}
                        sizes="(min-width: 48rem) 35vw, (min-width: 40rem) calc(50vw - 3rem), calc(100vw - 3.5rem)"
                        quality={SCREENSHOT_QUALITY}
                        placeholder="blur"
                        blurDataURL={blurFor(capture.src)}
                        className="h-auto w-full"
                      />
                    </Plate>
                    <figcaption className="meta mt-3 px-1">{capture.label}</figcaption>
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
