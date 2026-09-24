import type { ReactNode } from "react";
import { CustomCursor } from "@/components/CustomCursor";
import { SmoothScroll } from "@/components/SmoothScroll";
import { content } from "@/lib/content";

/**
 * The desktop tree: Lenis smooth scrolling and the crop-mark cursor, both of
 * which only mean something under a mouse. Phones are served app/m instead
 * (see next.config.mjs), so neither ships to them.
 */
export default function DesktopLayout({ children }: { readonly children: ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <CustomCursor labels={content.ui.cursor} />
      {children}
    </>
  );
}
