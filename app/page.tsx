import { PageTransition } from "@/components/PageTransition";
import { SplitTextReveal } from "@/components/SplitTextReveal";
import { content } from "@/lib/content";

// Stub for the foundation compile; replaced by the slider in M2.
export default function Home() {
  return (
    <PageTransition>
      <main id="main" data-tone="dark" className="min-h-svh px-5 pt-24 md:px-8">
        <SplitTextReveal as="h1" className="display text-[12vw]">
          {content.profile.name}
        </SplitTextReveal>
      </main>
    </PageTransition>
  );
}
