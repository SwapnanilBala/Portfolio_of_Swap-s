import { MagneticLink } from "@/components/MagneticLink";
import { RevealLines } from "@/components/RevealLines";
import { RevealPlate } from "@/components/RevealPlate";
import { SplitTextReveal } from "@/components/SplitTextReveal";
import type { MotionKit } from "@/lib/kit";

/**
 * The desktop tree's motion: SplitText line reveals, scroll-triggered plates
 * and magnetic links, all on GSAP. Imported only by pages under app/(desktop),
 * so GSAP stays out of every phone page (see lib/kit.ts).
 */
export const desktopKit: MotionKit = {
  Text: SplitTextReveal,
  Lines: RevealLines,
  Plate: RevealPlate,
  Link: MagneticLink,
};
