import { HomeMasthead } from "@/components/home/HomeMasthead";
import { MobileProjects } from "@/components/home/MobileProjects";
import { ProjectSlider } from "@/components/home/ProjectSlider";
import { PageTransition } from "@/components/PageTransition";
import { content } from "@/lib/content";
import { CASE_HERO, PLATE_SIZES } from "@/lib/media";
import { preloadFor } from "@/lib/preload";
import { DESKTOP_QUERY } from "@/lib/slider";
import { isSelected } from "@/lib/types";

/**
 * Selected work: one cinematic viewport. Both sliders are server-rendered and
 * CSS shows the one that fits the device, so there is no layout shift while
 * JavaScript decides which one to wire up.
 *
 * Each slider's first plate is the page's largest paint on its own devices,
 * so each is preloaded under its own media query and nowhere else.
 */
export default function Home() {
  const projects = content.projects.filter(isSelected);
  const { profile, ui } = content;
  const first = projects[0];
  if (first) {
    preloadFor(first.hero, CASE_HERO.sizes, DESKTOP_QUERY);
    preloadFor(first.heroMobile, PLATE_SIZES.phone, "(max-width: 47.99rem) and (orientation: portrait)");
  }

  return (
    <PageTransition>
      <main id="main" data-tone="dark" className="relative h-svh overflow-hidden bg-ink text-paper">
        <ProjectSlider projects={projects} copy={ui.slider} />
        <MobileProjects projects={projects} copy={ui.slider} profile={profile} />
        <HomeMasthead
          profile={profile}
          className="absolute inset-x-0 top-0 z-10 hidden px-8 pt-7 desktop:grid"
        />
      </main>
    </PageTransition>
  );
}
