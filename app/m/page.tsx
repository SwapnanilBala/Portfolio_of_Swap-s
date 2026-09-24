import { MobileProjects } from "@/components/home/MobileProjects";
import { PageTransition } from "@/components/PageTransition";
import { content } from "@/lib/content";
import { PHONE_QUALITY, PLATE_SIZES } from "@/lib/media";
import { preloadFor } from "@/lib/preload";
import { isSelected } from "@/lib/types";

/**
 * Selected work on a phone: the scroll-snapped plates alone. The desktop
 * home renders the WebGL slider beside these and lets CSS pick; here there is
 * nothing to pick between, so neither the slider nor its preload is sent.
 */
export default function Page() {
  const projects = content.projects.filter(isSelected);
  const { profile, ui } = content;
  const first = projects[0];
  if (first) {
    preloadFor(first.heroMobile, PLATE_SIZES.phone, "(max-width: 47.99rem) and (orientation: portrait)", PHONE_QUALITY);
  }

  return (
    <PageTransition>
      <main id="main" data-tone="dark" className="relative h-svh overflow-hidden bg-ink text-paper">
        <MobileProjects projects={projects} copy={ui.slider} profile={profile} />
      </main>
    </PageTransition>
  );
}
