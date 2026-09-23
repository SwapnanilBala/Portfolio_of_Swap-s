import Image from "next/image";
import { blurFor } from "@/lib/media";
import type { Project } from "@/lib/types";

interface Props {
  readonly project: Project;
  /** Passed straight to next/image; must describe the slot, not the source. */
  readonly sizes: string;
  /** Shape of the typographic plate. A capture always keeps its own ratio. */
  readonly aspect?: string;
  /** The first cover on a page: in the first viewport, and the phone's largest paint. */
  readonly eager?: boolean;
}

/**
 * A project's cover: its capture where there is an honest one to show, and
 * otherwise a typographic plate set from its own headline figure. The plate is
 * never invented imagery -- every number on it is one the project produced.
 *
 * A capture is shown whole, at its own aspect ratio. Forcing it into the
 * slot's shape cut headlines mid-word, which reads as a mistake rather than a
 * crop. The plate's figure is sized to the plate (container units), so a
 * narrow slot cannot push it past the edge.
 */
export function ProjectCover({ project, sizes, aspect = "aspect-[4/3]", eager = false }: Props) {
  const image = project.cover ?? project.hero;

  if (image) {
    return (
      <div className="overflow-hidden bg-ink">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : undefined}
          placeholder="blur"
          blurDataURL={blurFor(image.src)}
          className="block h-auto w-full"
        />
      </div>
    );
  }

  const figure = project.figures[0];
  return (
    <div
      className={`@container flex flex-col justify-between bg-ink p-[7%] text-paper ${aspect}`}
      role="img"
      aria-label={figure ? `${project.name}: ${figure.value} ${figure.label}` : project.name}
    >
      <span className="meta text-ink-muted">{project.category}</span>
      {figure ? (
        <span>
          <span className="display block text-[17cqw] tabular-nums">{figure.value}</span>
          <span className="meta mt-3 block">{figure.label}</span>
        </span>
      ) : null}
    </div>
  );
}
