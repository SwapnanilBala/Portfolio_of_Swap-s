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
}

/**
 * The one piece of media that persists across a route change: a project's
 * image, named by slug, morphing from its card or slide into the case-study
 * hero. `default="none"` keeps it out of unrelated transitions, and the
 * explicit `share` is what keeps the pair morphing once it has that.
 */
export function SharedMedia({ slug, children }: SharedProps) {
  return (
    <ViewTransition name={`project-${slug}`} share="morph" default="none">
      {children}
    </ViewTransition>
  );
}
