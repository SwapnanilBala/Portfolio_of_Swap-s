import Image from "next/image";
import { blurFor, recordNumber } from "@/lib/media";
import type { SelectedProject, UiCopy } from "@/lib/types";

interface Props {
  readonly projects: readonly SelectedProject[];
  readonly active: number;
  readonly onSelect: (index: number) => void;
  readonly copy: UiCopy["slider"];
}

/**
 * The narrow navigator on the right edge, on a glass strip. The active plate
 * is at full opacity and ringed by a hairline; the rest recede until hovered,
 * when they expand a little (the strip's padding leaves them the room). Each is a real button, so it can be reached and operated from the
 * keyboard, and the counter below cites the same record numbers the Index
 * uses.
 */
export function ProjectThumbnailRail({ projects, active, onSelect, copy }: Props) {
  return (
    <nav
      aria-label={copy.rail}
      // In a portrait window the right edge's middle is the plate's lower
      // corner, and the strip would cover the bezel there; so it drops to
      // the live link's line, under the bezel (the slider's frame variables),
      // and the live link keeps its width clear.
      className="glass-dark absolute right-5 top-1/2 z-10 -translate-y-1/2 rounded-glass-sm p-2 md:right-8 portrait:top-[calc(var(--plate-top)+var(--plate-w)*10/16+var(--bezel)+0.875rem)] portrait:translate-y-0"
    >
      <ol className="flex flex-col gap-2.5">
        {projects.map((project, i) => {
          const current = i === active;
          return (
            <li key={project.slug} className="flex">
              <button
                type="button"
                onClick={() => onSelect(i)}
                aria-label={copy.thumbnail.replace("{name}", project.name)}
                aria-current={current ? "true" : undefined}
                className={`group relative block h-10 w-16 overflow-hidden rounded-[calc(var(--radius-glass-sm)-0.5rem)] outline-offset-4 ring-paper transition-[opacity,scale,box-shadow] duration-500 ease-out-expo hover:scale-110 ${
                  current ? "opacity-100 ring-1" : "opacity-40 ring-0 hover:opacity-90"
                }`}
              >
                <Image
                  src={project.hero.src}
                  alt=""
                  fill
                  sizes="64px"
                  placeholder="blur"
                  blurDataURL={blurFor(project.hero.src)}
                  className="object-cover"
                  draggable={false}
                />
              </button>
            </li>
          );
        })}
      </ol>
      <p aria-hidden="true" className="meta mb-0.5 mt-3 text-center tabular-nums text-paper">
        {recordNumber(active)} <span className="text-glass-paper-2">/ {recordNumber(projects.length - 1)}</span>
      </p>
    </nav>
  );
}
