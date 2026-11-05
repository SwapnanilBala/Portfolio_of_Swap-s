import type { Metadata } from "next";
import { MobileProjects } from "@/components/home/MobileProjects";
import { ProjectSlider } from "@/components/home/ProjectSlider";
import { PageTransition } from "@/components/PageTransition";
import { content } from "@/lib/content";
import { CASE_HERO, PHONE_QUALITY, PLATE_SIZES } from "@/lib/media";
import { preloadFor } from "@/lib/preload";
import { DESKTOP_QUERY } from "@/lib/slider";
import { isSelected } from "@/lib/types";

export const metadata: Metadata = { title: content.ui.nav.projects };

/**
 * Projects: one cinematic viewport. Both sliders are server-rendered and
 * CSS shows the one that fits the device, so there is no layout shift while
 * JavaScript decides which one to wire up.
 *
 * Each slider's first plate is the page's largest paint on its own devices,
 * so each is preloaded under its own media query and nowhere else.
 */
export default function Page() {
  const projects = content.projects.filter(isSelected);
  const { ui } = content;
  const first = projects[0];
  if (first) {
    preloadFor(first.hero, CASE_HERO.sizes, DESKTOP_QUERY);
    preloadFor(first.heroMobile, PLATE_SIZES.phone, "(max-width: 47.99rem) and (orientation: portrait)", PHONE_QUALITY);
  }

  return (
    <PageTransition>
      <main id="main" data-tone="dark" className="radiant-dark relative h-svh overflow-hidden text-paper">
        <ProjectSlider projects={projects} copy={ui.slider} liveLabel={ui.linkLabels.live} />
        <MobileProjects projects={projects} copy={ui.slider} liveLabel={ui.linkLabels.live} />
        {/* The page's h1, visually hidden: the slider is what it names. Only
            the desktop slider's; MobileProjects carries its own. */}
        <h1 className="sr-only hidden desktop:block">{ui.slider.heading}</h1>
      </main>
    </PageTransition>
  );
}
