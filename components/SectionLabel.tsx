import type { ReactNode } from "react";

/**
 * A section's label in the left column of a 12-column section, as display
 * type: the About page's sections and the case studies' share it, so the two
 * cannot drift. 1.875rem on phones, where it has the full width; from 48rem it
 * has four columns, and grows with the window so the longest label
 * ("Technologies") fits them at every width.
 */
export function SectionLabel({ id, children }: { readonly id: string; readonly children: ReactNode }) {
  return (
    <h2 id={id} className="display col-span-12 text-[1.875rem] md:col-span-4 md:text-[clamp(1.625rem,3.1vw,3.25rem)]">
      {children}
    </h2>
  );
}
