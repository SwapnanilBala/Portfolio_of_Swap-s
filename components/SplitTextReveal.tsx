"use client";

import { createElement, useRef, type ReactNode } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { DURATION, EASE, useReducedMotion } from "@/lib/motion";

type Tag = "h1" | "h2" | "h3" | "p" | "div" | "span";

interface Props {
  readonly as?: Tag;
  readonly children: ReactNode;
  readonly className?: string;
  /** Split granularity. Lines for prose and titles, chars for short labels. */
  readonly by?: "lines" | "words" | "chars";
  readonly delay?: number;
  readonly stagger?: number;
  /** Reveal on mount, or when the element scrolls into view. */
  readonly when?: "mount" | "view";
}

/**
 * Text revealed through clipping masks: each line (or word, or letter) rises
 * out of an overflow-clipped wrapper. SplitText re-splits on resize and on
 * font load (`autoSplit`), which is why the animation is returned from
 * `onSplit` -- so it can be rebuilt against the new lines.
 *
 * Starts hidden via `data-reveal` only once JavaScript is running, and marks
 * itself `data-revealed` the moment it has split. Under reduced motion it is
 * never hidden at all.
 */
export function SplitTextReveal({
  as = "div",
  children,
  className,
  by = "lines",
  delay = 0,
  stagger = 0.08,
  when = "mount",
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (reduced) {
        el.dataset.revealed = "";
        return;
      }
      const split = SplitText.create(el, {
        type: by,
        mask: by,
        autoSplit: true,
        // SplitText's default labels the element and hides its pieces. A
        // heading can carry that label; a <p> cannot -- aria-label is
        // prohibited there, and a reader that ignores it would find every
        // piece hidden and read nothing. Elsewhere the pieces stay exposed:
        // they are the same text, in order, wrapped in spans.
        aria: as === "h1" || as === "h2" || as === "h3" ? "auto" : "none",
        // Spans, not divs: these often live inside a <p>.
        tag: "span",
        // Room below the baseline inside each mask, so a comma's tail is not
        // shaved off at display line heights (see .split-piece in globals.css).
        linesClass: "split-piece",
        wordsClass: "split-piece",
        charsClass: "split-piece",
        onSplit(self) {
          el.dataset.revealed = "";
          const targets = by === "chars" ? self.chars : by === "words" ? self.words : self.lines;
          return gsap.from(targets, {
            yPercent: 110,
            duration: DURATION.title,
            ease: EASE.out,
            stagger,
            delay,
            scrollTrigger:
              when === "view" ? { trigger: el, start: "top 88%", once: true } : undefined,
          });
        },
      });
      return () => split.revert();
    },
    { dependencies: [reduced, as, by, delay, stagger, when], scope: ref },
  );

  return createElement(as, { ref, className, "data-reveal": "" }, children);
}
