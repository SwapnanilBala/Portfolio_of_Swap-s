"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import type { LinesRevealProps } from "@/lib/kit";
import { DURATION, EASE, META_LAG, useReducedMotion } from "@/lib/motion";

/**
 * Raises every `[data-line]` inside it out of its mask on arrival, then fades
 * in `[data-reveal-meta]` a beat behind -- the title-then-metadata cadence the
 * home page uses, for any enormous title built with DisplayTitle.
 */
export function RevealLines({ children, className, delay = 0.35 }: LinesRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      el.dataset.revealed = "";
      if (reduced) return;
      gsap.from(el.querySelectorAll("[data-line]"), {
        yPercent: 110,
        duration: DURATION.title,
        ease: EASE.out,
        stagger: 0.07,
        delay,
      });
      gsap.from(el.querySelectorAll("[data-reveal-meta]"), {
        autoAlpha: 0,
        y: 10,
        duration: DURATION.meta,
        ease: EASE.out,
        stagger: 0.05,
        delay: delay + 0.3 + META_LAG,
      });
    },
    { dependencies: [reduced, delay], scope: ref },
  );

  return (
    <div ref={ref} data-reveal="" className={className}>
      {children}
    </div>
  );
}
