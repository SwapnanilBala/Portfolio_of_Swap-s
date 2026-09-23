"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { DURATION, useFinePointer, useReducedMotion } from "@/lib/motion";

type Gesture = "drag" | "view";

interface Props {
  readonly labels: Readonly<Record<Gesture, string>>;
}

function gestureAt(target: EventTarget | null): Gesture | null {
  if (!(target instanceof Element)) return null;
  const value = target.closest<HTMLElement>("[data-cursor]")?.dataset.cursor;
  return value === "drag" || value === "view" ? value : null;
}

/**
 * A labelled cursor that appears only over regions declaring a gesture with
 * `data-cursor`. It follows the pointer through `gsap.quickTo`, so it trails
 * slightly instead of snapping. Not rendered for touch or coarse pointers, or
 * under reduced motion -- the native cursor is the fallback everywhere.
 */
export function CustomCursor({ labels }: Props) {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  // A gesture belongs to the page it was read on. After a navigation the
  // element under a still pointer is gone, so the old label must not linger
  // until the pointer next moves.
  const [reading, setReading] = useState<{ readonly gesture: Gesture | null; readonly path: string }>({
    gesture: null,
    path: "",
  });
  const gesture = reading.path === pathname ? reading.gesture : null;
  const active = fine && !reduced;

  useEffect(() => {
    const el = ref.current;
    if (!active || !el) return;
    const root = document.documentElement;
    root.classList.add("has-cursor");
    const xTo = gsap.quickTo(el, "x", { duration: DURATION.micro, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: DURATION.micro, ease: "power3.out" });
    const onMove = (event: PointerEvent) => {
      xTo(event.clientX);
      yTo(event.clientY);
      const next = gestureAt(event.target);
      const path = window.location.pathname;
      setReading((previous) =>
        previous.gesture === next && previous.path === path ? previous : { gesture: next, path },
      );
    };
    const onLeave = () => setReading({ gesture: null, path: window.location.pathname });
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      root.classList.remove("has-cursor");
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[90] mix-blend-difference"
    >
      <span
        className={`meta flex size-[4.75rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-paper text-ink transition-[scale,opacity] duration-300 ease-out-expo ${
          gesture ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      >
        {gesture ? labels[gesture] : null}
      </span>
    </div>
  );
}
