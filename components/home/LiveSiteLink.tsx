import type { Ref } from "react";
import { OutArrow } from "@/components/OutArrow";

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

/**
 * The way from a slider plate to the product itself: a filled block of paper
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
      <OutArrow />
    </a>
  );
}
