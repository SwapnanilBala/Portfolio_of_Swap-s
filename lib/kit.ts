import type { ComponentType, ReactNode } from "react";

/**
 * The motion kit: the four animated wrappers every shared view is built from.
 *
 * The site is two trees with one design. Desktops get `desktopKit`
 * (components/kits/desktop.ts): GSAP line splitting, scroll-triggered plates,
 * magnetic links. Phones get `phoneKit` (components/kits/phone.tsx): the same
 * reveals in CSS, driven by one small observer, and plain links -- so no page
 * a phone loads imports GSAP at all. Views take a kit as a prop and never
 * import one, which is what keeps GSAP out of the phone tree's bundles.
 *
 * The props are the desktop components' own. A phone component accepts all of
 * them and ignores what it has no use for (a stagger, a split granularity).
 */

export type TextTag = "h1" | "h2" | "h3" | "p" | "div" | "span";

export interface TextRevealProps {
  readonly as?: TextTag;
  readonly children: ReactNode;
  readonly className?: string;
  /** Split granularity. Lines for prose and titles, chars for short labels. */
  readonly by?: "lines" | "words" | "chars";
  readonly delay?: number;
  readonly stagger?: number;
  /** Reveal on mount, or when the element scrolls into view. */
  readonly when?: "mount" | "view";
}

export interface LinesRevealProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly delay?: number;
}

export interface PlateRevealProps {
  readonly children: ReactNode;
  readonly className?: string;
}

export interface KitLinkProps {
  readonly href: string;
  readonly children: ReactNode;
  readonly className?: string;
  readonly ariaLabel?: string;
}

export interface MotionKit {
  /** Text that rises into place: line by line on desktop, as a block on phones. */
  readonly Text: ComponentType<TextRevealProps>;
  /** A display title's lines rising in their masks, metadata a beat behind. */
  readonly Lines: ComponentType<LinesRevealProps>;
  /** A plate uncovered from the bottom as it comes into view. */
  readonly Plate: ComponentType<PlateRevealProps>;
  /** A contact or project link: magnetic under a fine pointer on desktop. */
  readonly Link: ComponentType<KitLinkProps>;
}
