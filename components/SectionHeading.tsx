import type { SectionHeading as SectionHeadingContent } from "@/lib/types";

interface Props {
  readonly heading: SectionHeadingContent;
}

/**
 * The count sits in the gutter column so it aligns with the figures below it.
 * It is a real quantity, not a sequence marker.
 */
export function SectionHeading({ heading }: Props) {
  return (
    <div className="section-heading">
      <p className="section-count">{heading.count}</p>
      <h2 id={heading.id}>{heading.title}</h2>
    </div>
  );
}
