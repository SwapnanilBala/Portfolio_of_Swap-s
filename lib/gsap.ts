import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

/**
 * The one place GSAP plugins are registered. Import from here rather than from
 * "gsap" directly, so a component can never run a plugin that was not
 * registered. Only client components import this module.
 */
gsap.registerPlugin(Flip, ScrollTrigger, SplitText, useGSAP);

export { gsap, Flip, ScrollTrigger, SplitText, useGSAP };
