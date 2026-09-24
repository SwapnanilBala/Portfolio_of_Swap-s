"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Reveal targets not yet shown. */
const PENDING = "[data-m-reveal]:not([data-inview])";

/**
 * When the CSS failsafe ("Phone reveals" in globals.css) shows everything,
 * less a margin: starting later than this, the page is already visible.
 */
const FAILSAFE_MS = 2400;

function markInView(element: Element) {
  if (element instanceof HTMLElement) element.dataset.inview = "";
}

/**
 * The phone tree's one piece of motion code: it marks each `[data-m-reveal]`
 * element `data-inview` as it comes into view, once, and CSS does the rest.
 * Mounted once in the phone layout, it looks again after every navigation.
 *
 * `html.m-observing` switches the failsafe off. If the script starts after
 * the failsafe has already shown the page, whatever is on screen is marked in
 * view first, so switching it off cannot hide what the reader is looking at.
 */
export function PhoneReveals() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reduced =
      root.dataset.motion === "reduce" || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      // CSS never hides anything under reduced motion; nothing to reveal.
      document.querySelectorAll(PENDING).forEach(markInView);
      return;
    }

    if (!root.classList.contains("m-observing") && performance.now() > FAILSAFE_MS) {
      for (const element of document.querySelectorAll(PENDING)) {
        const box = element.getBoundingClientRect();
        if (box.top < window.innerHeight && box.bottom > 0) markInView(element);
      }
    }
    root.classList.add("m-observing");

    // In view once its top clears the bottom tenth of the screen: close to the
    // desktop plates' "top 85%", without the last lines of a page never
    // qualifying because they cannot scroll that high.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          markInView(entry.target);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    for (const element of document.querySelectorAll(PENDING)) observer.observe(element);
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
