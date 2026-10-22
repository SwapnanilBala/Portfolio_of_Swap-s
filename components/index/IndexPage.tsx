import type { Metadata } from "next";
import type { ComponentType } from "react";
import { IndexCaptures } from "@/components/index/IndexCaptures";
import { PageTransition } from "@/components/PageTransition";
import { SiteFooter } from "@/components/SiteFooter";
import { content } from "@/lib/content";
import type { MotionKit } from "@/lib/kit";
import type { Project, UiCopy } from "@/lib/types";

export const indexMetadata: Metadata = { title: content.ui.index.heading };

interface Props {
  readonly kit: MotionKit;
  /** The grid and list: GSAP Flip on desktop, a plain fade on phones. */
  readonly View: ComponentType<{ readonly projects: readonly Project[]; readonly copy: UiCopy["index"] }>;
}

/**
 * The archive: a deliberate contrast with the Projects page -- paper instead of
 * imagery, one enormous word instead of a slider. The year range is computed
 * from the projects' first-commit years, never typed, so it cannot drift from
 * the work it describes. One view for both trees, which pass their own kit and
 * their own grid-and-list.
 */
export function IndexPage({ kit, View }: Props) {
  const { Text } = kit;
  const { projects, ui } = content;
  const years = projects.map((project) => project.started);
  const range = `${Math.min(...years)}—${Math.max(...years)}`;

  return (
    <PageTransition>
      <main id="main" data-tone="light" className="min-h-svh bg-paper text-ink">
        {/* The word shares its line with the description, about a third of
            the height it had when it was fitted to the full measure: there it
            took half the first screen and pushed every project below it. */}
        <header className="grid grid-cols-12 items-end gap-x-5 px-5 pb-6 pt-20 md:px-8 md:pb-8 md:pt-24">
          <Text
            as="h1"
            by="chars"
            stagger={0.035}
            className="display col-span-12 -ml-[0.04em] text-[clamp(4.5rem,12vw,11rem)] md:col-span-7"
          >
            {ui.index.heading}
          </Text>
          <div className="meta col-span-12 mt-5 flex justify-between gap-5 md:col-span-5 md:mt-0 md:flex-col md:items-end md:gap-1 md:pb-[0.4em] md:text-right">
            <span>{ui.index.description}</span>
            <span className="whitespace-nowrap tabular-nums">{range}</span>
          </div>
        </header>

        <View projects={projects} copy={ui.index} />
        <IndexCaptures projects={projects} copy={ui.index} kit={kit} />
        <SiteFooter kit={kit} />
      </main>
    </PageTransition>
  );
}
