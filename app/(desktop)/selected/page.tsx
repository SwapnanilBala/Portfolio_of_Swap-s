import type { Metadata } from "next";
import { MobileProjects } from "@/components/home/MobileProjects";
import { ProjectSlider } from "@/components/home/ProjectSlider";
import { SliderMasthead } from "@/components/home/SliderMasthead";
import { PageTransition } from "@/components/PageTransition";
import { content } from "@/lib/content";
import { CASE_HERO, PHONE_QUALITY, PLATE_SIZES } from "@/lib/media";
import { preloadFor } from "@/lib/preload";
import { DESKTOP_QUERY } from "@/lib/slider";
import { isSelected } from "@/lib/types";

export const metadata: Metadata = { title: content.ui.nav.selected };

/**
 * Selected work: one cinematic viewport. Both sliders are server-rendered and
 * CSS shows the one that fits the device, so there is no layout shift while
 * JavaScript decides which one to wire up.
 *
 * Each slider's first plate is the page's largest paint on its own devices,
 * so each is preloaded under its own media query and nowhere else.
 */
export default function Page() {
  const projects = content.projects.filter(isSelected);
  const { profile, ui } = content;
  const first = projects[0];
  if (first) {
    preloadFor(first.hero, CASE_HERO.sizes, DESKTOP_QUERY);
    preloadFor(first.heroMobile, PLATE_SIZES.phone, "(max-width: 47.99rem) and (orientation: portrait)", PHONE_QUALITY);
  }

  return (
    <PageTransition>
      <main id="main" data-tone="dark" className="relative h-svh overflow-hidden bg-ink text-paper">
        <ProjectSlider projects={projects} copy={ui.slider} liveLabel={ui.linkLabels.live} />
        <MobileProjects projects={projects} copy={ui.slider} liveLabel={ui.linkLabels.live} profile={profile} />
        <SliderMasthead
          heading={ui.slider.heading}
          intro={profile.intro}
          className="absolute inset-x-0 top-0 z-10 hidden px-8 pt-7 desktop:grid"
        />
      </main>
    </PageTransition>
  );
}
