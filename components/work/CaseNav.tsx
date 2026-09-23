import Link from "next/link";
import { DisplayTitle } from "@/components/DisplayTitle";
import { WarmOnIntent } from "@/components/WarmOnIntent";
import { displayLinesOf, type ProjectWithCase, type UiCopy } from "@/lib/types";

interface Props {
  readonly previous?: ProjectWithCase;
  readonly next?: ProjectWithCase;
  readonly copy: UiCopy["caseNav"];
}

/** A hairline arrow that travels a few pixels its own way on hover. */
function Arrow({ back }: { readonly back: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 40 10"
      className={`h-2.5 w-10 shrink-0 overflow-visible transition-transform duration-500 ease-out-expo reduced:transition-none ${
        back
          ? "-scale-x-100 group-hover:-translate-x-2 group-focus-visible:-translate-x-2"
          : "group-hover:translate-x-2 group-focus-visible:translate-x-2"
      }`}
    >
      <path
        d="M0 5h39M34 1l5 4-5 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

interface NeighbourProps {
  readonly project: ProjectWithCase;
  readonly label: string;
  readonly back: boolean;
  readonly className?: string;
}

function Neighbour({ project, label, back, className = "" }: NeighbourProps) {
  return (
    <WarmOnIntent image={project.hero ?? project.cover} className={className}>
      <Link
        href={`/work/${project.slug}`}
        transitionTypes={["page"]}
        data-cursor="view"
        className={`group flex h-full flex-col px-5 py-12 md:px-8 md:py-16 ${
          back ? "items-start" : "items-end text-right"
        }`}
      >
        {/* The marks lock onto the words, not the half: the half runs to the
            window's edge, and marks set outside it would be cut off there. */}
        <div
          data-cursor-frame
          className={`flex flex-col gap-10 transition-transform duration-700 ease-out-expo reduced:transition-none md:gap-14 ${
            back
              ? "items-start group-hover:-translate-x-3 group-focus-visible:-translate-x-3"
              : "items-end group-hover:translate-x-3 group-focus-visible:translate-x-3"
          }`}
        >
          <span className="meta flex items-center gap-4 text-paper-muted">
            {back ? <Arrow back /> : null}
            {label}
            {back ? null : <Arrow back={false} />}
          </span>
          <DisplayTitle as="p" lines={displayLinesOf(project)} className="text-[clamp(2.5rem,6.5vw,7rem)]" />
          <span className="meta text-paper-muted">
            {project.category} / {project.year}
          </span>
        </div>
      </Link>
    </WarmOnIntent>
  );
}

/**
 * The foot of a case study: the previous project and the next, as type. It
 * replaced a card that carried the next project's cover as a shared element,
 * so opening it flew that small cover up into the next hero -- often a
 * different image from the cover, crossfading while the box grew, which read
 * as a glitch. Words carry it now and the page transition does the rest.
 * Each half is one link, edge to edge; on a fine pointer the crop marks lock
 * onto its words, which lean a few pixels the way the link goes.
 */
export function CaseNav({ previous, next, copy }: Props) {
  if (!previous && !next) return null;
  return (
    <nav
      aria-label={copy.label}
      className="grid divide-y divide-paper-rule border-t border-paper-rule md:grid-cols-2 md:divide-x md:divide-y-0"
    >
      {previous ? <Neighbour project={previous} label={copy.previous} back /> : null}
      {next ? (
        <Neighbour
          project={next}
          label={copy.next}
          back={false}
          className={previous ? undefined : "md:col-start-2"}
        />
      ) : null}
    </nav>
  );
}
