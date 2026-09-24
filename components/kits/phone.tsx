import Link from "next/link";
import { createElement } from "react";
import type {
  KitLinkProps,
  LinesRevealProps,
  MotionKit,
  PlateRevealProps,
  TextRevealProps,
} from "@/lib/kit";
import { isExternal, isInternalRoute } from "@/lib/links";

/*
 * The phone tree's motion, with no JavaScript of its own. Each wrapper renders
 * the element the desktop one would, marked with the reveal it wants; the
 * rise, the line reveal and the uncovering are CSS transitions in globals.css
 * ("Phone reveals"), started when PhoneReveals marks the element in view.
 * Server components, so nothing here is sent to the phone as script.
 */

/**
 * Text that rises into place as one block. The desktop kit splits it into
 * lines first; a phone reads a narrow column where a block reads the same,
 * and splitting would cost the whole of SplitText.
 */
function PhoneText({ as = "div", children, className, delay }: TextRevealProps) {
  return createElement(
    as,
    {
      className,
      "data-m-reveal": "rise",
      style: delay ? { transitionDelay: `${delay}s` } : undefined,
    },
    children,
  );
}

/** A display title's lines rising in their masks, metadata a beat behind. */
function PhoneLines({ children, className }: LinesRevealProps) {
  return (
    <div data-m-reveal="lines" className={className}>
      {children}
    </div>
  );
}

/** A plate uncovered from the bottom, its image settling from a slight zoom. */
function PhonePlate({ children, className = "" }: PlateRevealProps) {
  return (
    <div data-m-reveal="plate" className={`overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

/** An ordinary link: there is no pointer to lean toward. */
function PhoneLink({ href, children, className, ariaLabel }: KitLinkProps) {
  if (isInternalRoute(href)) {
    return (
      <Link href={href} transitionTypes={["page"]} className={className} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  const external = isExternal(href);
  return (
    <a
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

export const phoneKit: MotionKit = {
  Text: PhoneText,
  Lines: PhoneLines,
  Plate: PhonePlate,
  Link: PhoneLink,
};
