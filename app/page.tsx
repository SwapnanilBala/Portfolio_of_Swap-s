import { HomeMasthead } from "@/components/home/HomeMasthead";
import { MobileProjects } from "@/components/home/MobileProjects";
import { ProjectSlider } from "@/components/home/ProjectSlider";
import { PageTransition } from "@/components/PageTransition";
import { content } from "@/lib/content";
import { isSelected } from "@/lib/types";

/**
 * Selected work: one cinematic viewport. Both sliders are server-rendered and
 * CSS shows the one that fits the device, so there is no layout shift while
 * JavaScript decides which one to wire up.
 */
export default function Home() {
  const projects = content.projects.filter(isSelected);
  const { profile, ui } = content;

  return (
    <PageTransition>
      <main id="main" data-tone="dark" className="relative h-svh overflow-hidden bg-ink text-paper">
        <ProjectSlider projects={projects} copy={ui.slider} />
        <MobileProjects projects={projects} copy={ui.slider} profile={profile} />
        <HomeMasthead
          profile={profile}
          className="absolute inset-x-0 top-0 z-10 hidden desktop:grid"
        />
      </main>
    </PageTransition>
  );
}
