import { Fragment } from "react";

interface Props {
  readonly lines: readonly string[];
  readonly className?: string;
  /** `p` where the title labels a link rather than heading a section. */
  readonly as?: "h1" | "h2" | "p";
}

/**
 * An enormous title whose lines each sit in their own overflow-clipped mask,
 * so motion can raise a line into view without any wrapper around it moving.
 * Animation targets the inner `[data-line]` spans.
 *
 * The padding-and-negative-margin pair gives glyphs room below the baseline
 * inside a mask set at 0.84 line height, without changing the spacing.
 *
 * Lines are separated by real space characters. They collapse to nothing
 * visually between block spans, but keep the accessible name "Lagna Atelier"
 * rather than "LagnaAtelier".
 */
export function DisplayTitle({ lines, className = "", as: Tag = "h2" }: Props) {
  return (
    <Tag className={`display ${className}`}>
      {lines.map((line, i) => (
        <Fragment key={line}>
          {i > 0 ? " " : null}
          <span className="-mb-[0.08em] block overflow-clip pb-[0.08em]">
            <span data-line className="block will-change-transform">
              {line}
            </span>
          </span>
        </Fragment>
      ))}
    </Tag>
  );
}
