import Image from "next/image";
import { blurFor } from "@/lib/media";
import type { Project } from "@/lib/types";

interface Props {
  readonly project: Project;
  /** Passed straight to next/image; must describe the slot, not the source. */
  readonly sizes: string;
  readonly className?: string;
}

/**
 * A project's cover: its capture where there is an honest one to show, and
 * otherwise a typographic plate set from its own headline figure. The plate is
 * never invented imagery -- every number on it is one the project produced.
 */
export function ProjectCover({ project, sizes, className = "" }: Props) {
  const image = project.cover ?? project.hero;

  if (image) {
    return (
      <div className={`relative overflow-hidden bg-ink ${className}`}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          placeholder="blur"
          blurDataURL={blurFor(image.src)}
          className="object-cover"
        />
      </div>
    );
  }

  const figure = project.figures[0];
  return (
    <div
      className={`flex flex-col justify-between bg-ink p-[6%] text-paper ${className}`}
      role="img"
      aria-label={figure ? `${project.name}: ${figure.value} ${figure.label}` : project.name}
    >
      <span className="meta text-ink-muted">{project.category}</span>
      {figure ? (
        <span>
          <span className="display block text-[clamp(2.25rem,5.2vw,5.5rem)] tabular-nums">
            {figure.value}
          </span>
          <span className="meta mt-3 block">{figure.label}</span>
        </span>
      ) : null}
    </div>
  );
}
