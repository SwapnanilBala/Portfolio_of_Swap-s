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
 * The narrow navigator on the right edge. The active plate is at full opacity
 * and marked by a hairline; the rest recede until hovered, when they expand a
 * little. Each is a real button, so it can be reached and operated from the
 * keyboard, and the counter below cites the same record numbers the Index
 * uses.
 */
export function ProjectThumbnailRail({ projects, active, onSelect, copy }: Props) {
  return (
    <nav
      aria-label={copy.rail}
      className="absolute right-5 top-1/2 z-10 -translate-y-1/2 md:right-8"
    >
      <ol className="flex flex-col items-end gap-2.5">
        {projects.map((project, i) => {
          const current = i === active;
          return (
            <li key={project.slug} className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className={`h-px bg-paper transition-[width,opacity] duration-500 ease-out-expo ${
                  current ? "w-4 opacity-100" : "w-0 opacity-0"
                }`}
              />
              <button
                type="button"
                onClick={() => onSelect(i)}
                aria-label={copy.thumbnail.replace("{name}", project.name)}
                aria-current={current ? "true" : undefined}
                className={`group relative block h-10 w-16 overflow-hidden outline-offset-4 transition-[opacity,scale] duration-500 ease-out-expo hover:scale-110 ${
                  current ? "opacity-100" : "opacity-40 hover:opacity-90"
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
      <p aria-hidden="true" className="meta mt-4 text-right tabular-nums text-paper">
        {recordNumber(active)} <span className="text-ink-muted">/ {recordNumber(projects.length - 1)}</span>
      </p>
    </nav>
  );
}
