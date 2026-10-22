import type { ReactNode } from "react";

interface Props {
  readonly id: string;
  readonly children: ReactNode;
  /** Where it sits: a column of a section's grid, or above a cell's content. */
  readonly className?: string;
}

/**
 * A section's label as display type: the About page's sections and the case
 * studies' share it, so the two cannot drift. Sized to head a section without
 * taking a screen's worth of it -- 1.375rem on phones, growing with the window
 * to 1.875rem -- after the larger first pass made the About page a long
 * scroll.
 */
export function SectionLabel({ id, children, className = "" }: Props) {
  return (
    <h2 id={id} className={`display text-[clamp(1.375rem,1.9vw,1.875rem)] ${className}`}>
      {children}
    </h2>
  );
}
