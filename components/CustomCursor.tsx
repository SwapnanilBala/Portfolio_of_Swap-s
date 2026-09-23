"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useFinePointer, useReducedMotion } from "@/lib/motion";
import type { UiCopy } from "@/lib/types";

type Gesture = "drag" | "view" | "open";

interface Props {
  readonly labels: UiCopy["cursor"];
}

interface Reading {
  readonly gesture: Gesture | null;
  /** What the marks lock onto: the plate on stage, an Index cover. */
  readonly frame: HTMLElement | null;
}

const NONE: Reading = { gesture: null, frame: null };

/** Each tick is a 10px corner; together they bound a 44x28 box, about 16:10. */
const TICK = 10;
const HALF_WIDTH = 22;
const HALF_HEIGHT = 14;
/** How far outside a locked-on frame the marks sit. */
const OUTSET = 6;
const CORNERS = [
  "border-l border-t",
  "border-r border-t",
  "border-l border-b",
  "border-r border-b",
] as const;

function read(target: Element | null): Reading {
  const host = target?.closest<HTMLElement>("[data-cursor]");
  if (!target || !host) return NONE;
  // A link or button inside a gesture region keeps the system pointer: the
  // rail's thumbnails and "Open the case study" are not things to drag.
  const control = target.closest("a, button");
  if (control && control !== host && host.contains(control)) return NONE;
  const value = host.dataset.cursor;
  const gesture = value === "drag" || value === "view" || value === "open" ? value : null;
  const frame = target.closest<HTMLElement>("[data-cursor-frame]");
  return { gesture, frame: frame && host.contains(frame) ? frame : null };
}

/**
 * Crop marks. Four hairline corners bound a small 16:10 box around the
 * pointer -- the plates' own proportion -- with the gesture's label set above
 * them. Over something that declares `data-cursor-frame` (the plate on stage,
 * an Index cover) they lock onto its edges instead, as a camera locks focus,
 * and say what a click does. While dragging they spread with the pointer's
 * speed and the label points the way.
 *
 * Only over regions declaring a gesture with `data-cursor`; everywhere else
 * the system cursor stays. Not rendered for touch or coarse pointers, or under
 * reduced motion. Positions are written straight to the DOM on GSAP's ticker:
 * nothing here re-renders React while the pointer moves.
 */
export function CustomCursor({ labels }: Props) {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const active = fine && !reduced;
  const rootRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const cornerRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const reading = useRef<Reading>(NONE);
  const pathname = usePathname();

  // A navigation removes whatever the pointer was over; forget it until the
  // pointer next moves, so an old label never lingers on the new page.
  useEffect(() => {
    reading.current = NONE;
  }, [pathname]);

  useEffect(() => {
    const root = rootRef.current;
    const label = labelRef.current;
    const corners = cornerRefs.current;
    if (!active || !root || !label) return;
    document.documentElement.classList.add("has-cursor");

    let px = -100;
    let py = -100;
    let x = px;
    let y = py;
    let lastX = x;
    let speed = 0;
    let shown = 0;
    let pressed = false;
    let text = "";
    const cx = [0, 0, 0, 0];
    const cy = [0, 0, 0, 0];

    const onMove = (event: PointerEvent) => {
      px = event.clientX;
      py = event.clientY;
      reading.current = read(event.target instanceof Element ? event.target : null);
    };
    const onDown = (event: PointerEvent) => {
      if (event.button === 0) pressed = true;
    };
    const onUp = () => {
      pressed = false;
    };
    // The page can move under a still pointer; read what is there now.
    const onScroll = () => {
      reading.current = read(document.elementFromPoint(px, py));
    };
    const onLeave = () => {
      reading.current = NONE;
    };

    const tick = () => {
      const { gesture, frame } = reading.current;
      shown += ((gesture ? 1 : 0) - shown) * 0.2;
      if (!gesture && shown < 0.002) {
        root.style.opacity = "0";
        return;
      }

      x += (px - x) * 0.3;
      y += (py - y) * 0.3;
      const dx = x - lastX;
      lastX = x;
      speed += ((pressed ? dx : 0) - speed) * 0.2;
      const spread = Math.min(Math.abs(speed), 12) * 2;

      let left = x - HALF_WIDTH - spread;
      let top = y - HALF_HEIGHT;
      let right = x + HALF_WIDTH + spread;
      let bottom = y + HALF_HEIGHT;
      if (frame && frame.isConnected && !pressed) {
        const box = frame.getBoundingClientRect();
        left = box.left - OUTSET;
        top = box.top - OUTSET;
        right = box.right + OUTSET;
        bottom = box.bottom + OUTSET;
      }
      const tx = [left, right - TICK, left, right - TICK];
      const ty = [top, top, bottom - TICK, bottom - TICK];
      // Appearing: start where they belong rather than flying in from a corner.
      const ease = shown < 0.05 ? 1 : 0.22;
      corners.forEach((corner, i) => {
        const cxi = (cx[i] ?? 0) + ((tx[i] ?? 0) - (cx[i] ?? 0)) * ease;
        const cyi = (cy[i] ?? 0) + ((ty[i] ?? 0) - (cy[i] ?? 0)) * ease;
        cx[i] = cxi;
        cy[i] = cyi;
        if (corner) corner.style.transform = `translate3d(${cxi}px, ${cyi}px, 0)`;
      });

      if (gesture) {
        const next =
          pressed && Math.abs(speed) > 1.2 ? (speed > 0 ? labels.dragRight : labels.dragLeft) : labels[gesture];
        if (next !== text) {
          label.textContent = next;
          text = next;
        }
      }
      label.style.transform = `translate3d(${cx[0] ?? 0}px, ${Math.max(4, (cy[0] ?? 0) - 16)}px, 0)`;
      root.style.opacity = String(shown);
    };

    gsap.ticker.add(tick);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("pointercancel", onUp, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [active, labels]);

  if (!active) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[90] text-paper opacity-0 mix-blend-difference"
    >
      {CORNERS.map((sides, i) => (
        <span
          key={sides}
          ref={(corner) => {
            cornerRefs.current[i] = corner;
          }}
          className={`absolute left-0 top-0 size-2.5 border-paper will-change-transform ${sides}`}
        />
      ))}
      <span ref={labelRef} className="meta absolute left-0 top-0 whitespace-nowrap will-change-transform" />
    </div>
  );
}
