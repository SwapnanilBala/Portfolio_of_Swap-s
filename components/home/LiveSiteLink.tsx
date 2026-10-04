import type { Ref } from "react";

interface Props {
  readonly href: string;
  readonly label: string;
  /** Joins the label in the accessible name, which is often read out of context. */
  readonly project: string;
  readonly className?: string;
  readonly tabIndex?: number;
  /** The address line, which the desktop slider fades as the project changes. */
  readonly hostRef?: Ref<HTMLSpanElement>;
}

/** A hairline arrow pointing out of the page, travelling a little that way on hover. */
function Arrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 12"
      className="size-[0.95em] shrink-0 overflow-visible transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-focus-visible:-translate-y-0.5 group-focus-visible:translate-x-0.5 reduced:transition-none"
    >
      <path
        d="M1 11L11 1M3 1h8v8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/**
 * The way from a home plate to the product itself: a filled block of paper
 * under the plate, so a visitor who wants the real thing never has to read a
 * case study to find it. It is the site's one filled control, on request --
 * big and plainly visible against the ink. Its address line says where it
 * goes before anyone clicks; the accessible name says which project.
 */
export function LiveSiteLink({ href, label, project, className = "", tabIndex, hostRef }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={tabIndex}
      aria-label={`${label}, ${project}`}
      className={`group flex items-center justify-between gap-8 bg-paper text-ink focus-visible:outline-paper focus-visible:outline-offset-4 ${className}`}
    >
      <span className="grid gap-1.5">
        <span className="font-semibold uppercase leading-none tracking-[-0.01em]">{label}</span>
        <span ref={hostRef} className="meta text-paper-muted">
          {new URL(href).host}
        </span>
      </span>
      <Arrow />
    </a>
  );
}
