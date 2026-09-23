"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useFinePointer, useReducedMotion } from "@/lib/motion";

interface Props {
  readonly href: string;
  readonly children: ReactNode;
  readonly className?: string;
  readonly ariaLabel?: string;
  /** How far the link travels toward the pointer, as a fraction of offset. */
  readonly strength?: number;
}

function isInternalRoute(href: string): boolean {
  // Files under /public are served, not routed: a client-side navigation to
  // /resume.pdf would fail, so only extensionless paths go through <Link>.
  return href.startsWith("/") && !/\.[a-z0-9]+$/i.test(href);
}

/**
 * A link that leans a short way toward the pointer and springs back when it
 * leaves. Fine pointers only; under reduced motion it is an ordinary link.
 * External destinations open in a new tab; internal routes navigate with the
 * page transition.
 */
export function MagneticLink({ href, children, className, ariaLabel, strength = 0.3 }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !fine || reduced) return;
      const xTo = gsap.quickTo(el, "x", { duration: 0.7, ease: "elastic.out(1, 0.45)" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.7, ease: "elastic.out(1, 0.45)" });
      const onMove = (event: PointerEvent) => {
        const box = el.getBoundingClientRect();
        xTo((event.clientX - (box.left + box.width / 2)) * strength);
        yTo((event.clientY - (box.top + box.height / 2)) * strength);
      };
      const onLeave = () => {
        xTo(0);
        yTo(0);
      };
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    },
    { dependencies: [fine, reduced, strength], scope: ref },
  );

  if (isInternalRoute(href)) {
    return (
      <Link
        ref={ref}
        href={href}
        transitionTypes={["page"]}
        className={className}
        aria-label={ariaLabel}
      >
        {children}
      </Link>
    );
  }

  const external = /^https?:/.test(href);
  return (
    <a
      ref={ref}
      href={href}
      className={className}
      aria-label={ariaLabel}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
}
