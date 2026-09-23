"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE, useReducedMotion } from "@/lib/motion";

interface Props {
  readonly children: ReactNode;
  readonly className?: string;
}

/**
 * A large plate that uncovers from the bottom as it scrolls into view, the
 * image settling from a slight zoom inside the opening mask. Once only: a
 * plate that re-hides when scrolled back past is decoration, not a reveal.
 * Never hidden under reduced motion or without JavaScript.
 */
export function RevealPlate({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced) return;
      const inner = el.firstElementChild;
      const timeline = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
      timeline.fromTo(
        el,
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: EASE.inOut },
      );
      if (inner) timeline.fromTo(inner, { scale: 1.08 }, { scale: 1, duration: 1.6, ease: EASE.out }, 0);
    },
    { dependencies: [reduced], scope: ref },
  );

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
