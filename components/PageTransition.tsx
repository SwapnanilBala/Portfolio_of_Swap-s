import { ViewTransition, type ReactNode } from "react";

interface Props {
  readonly children: ReactNode;
}

/**
 * Wraps a page so a navigation tagged `page` clips the old one away and
 * reveals the new one (see the "Page transitions" block in globals.css).
 *
 * It goes in each page.tsx rather than the layout: layouts persist across
 * navigations, so enter and exit never fire there. Untyped transitions --
 * browser back and forward -- fall through to `none` and swap instantly.
 */
export function PageTransition({ children }: Props) {
  return (
    <ViewTransition
      enter={{ page: "page", default: "none" }}
      exit={{ page: "page", default: "none" }}
      default="none"
    >
      {children}
    </ViewTransition>
  );
}

interface SharedProps {
  readonly slug: string;
  readonly children: ReactNode;
  /**
   * Whether this instance carries the name. Two rendered elements sharing a
   * view-transition name cancel the whole transition, so where a project's
   * image appears more than once -- a slide per breakpoint, say -- only the
   * one actually on screen is named. Toggling the name rather than the
   * wrapper keeps the image mounted.
   */
  readonly enabled?: boolean;
}

/**
 * The one piece of media that persists across a route change: a project's
 * image, named by slug, morphing from its card or slide into the case-study
 * hero. `default="none"` keeps it out of unrelated transitions, and the
 * explicit `share` is what keeps the pair morphing once it has that.
 */
export function SharedMedia({ slug, children, enabled = true }: SharedProps) {
  return (
    <ViewTransition
      name={enabled ? `project-${slug}` : undefined}
      share="morph"
      default="none"
    >
      {children}
    </ViewTransition>
  );
}
