import type { Metadata } from "next";
import { IndexView } from "@/components/index/IndexView";
import { PageTransition } from "@/components/PageTransition";
import { SiteFooter } from "@/components/SiteFooter";
import { SplitTextReveal } from "@/components/SplitTextReveal";
import { content } from "@/lib/content";

export const metadata: Metadata = { title: content.ui.index.heading };

/**
 * The archive: a deliberate contrast with the home page -- paper instead of
 * imagery, one enormous word instead of a slider. The year range is computed
 * from the projects' first-commit years, never typed, so it cannot drift from
 * the work it describes.
 */
export default function IndexPage() {
  const { projects, ui } = content;
  const years = projects.map((project) => project.started);
  const range = `${Math.min(...years)}—${Math.max(...years)}`;

  return (
    <PageTransition>
      <main id="main" data-tone="light" className="min-h-svh bg-paper text-ink">
        <header className="px-5 pt-20 md:px-8 md:pt-24">
          <div className="meta grid grid-cols-12 gap-x-5 border-b border-paper-rule pb-3">
            <span className="col-span-8 md:col-span-4">{ui.index.description}</span>
            <span className="col-span-4 text-right tabular-nums md:col-span-2 md:col-start-9 md:text-left">
              {range}
            </span>
          </div>
          {/* Fitted to the measure: "INDEX" sets 2.62 times its font size
              wide in this face, so the size is the content width over that. */}
          <SplitTextReveal
            as="h1"
            by="chars"
            stagger={0.035}
            className="display -ml-[0.04em] text-[calc((100vw-2.5rem)/2.66)] md:text-[calc((100vw-4rem)/2.66)]"
          >
            {ui.index.heading}
          </SplitTextReveal>
        </header>

        <IndexView projects={projects} copy={ui.index} />
        <SiteFooter />
      </main>
    </PageTransition>
  );
}
