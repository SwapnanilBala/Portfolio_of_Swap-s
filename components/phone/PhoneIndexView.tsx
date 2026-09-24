"use client";

import { useState } from "react";
import { IndexGrid, IndexList, IndexToggle, type Layout } from "@/components/index/parts";
import type { Project, UiCopy } from "@/lib/types";

interface Props {
  readonly projects: readonly Project[];
  readonly copy: UiCopy["index"];
}

/**
 * The Index on a phone: the same grid and list as the desktop's, from the
 * same parts, switched with a short fade rather than GSAP Flip, and with no
 * preview trailing a pointer a phone does not have. Keyed by layout, so each
 * switch mounts the new layout and its fade plays once.
 */
export function PhoneIndexView({ projects, copy }: Props) {
  const [layout, setLayout] = useState<Layout>("grid");

  return (
    <div>
      <IndexToggle layout={layout} onSwitch={setLayout} copy={copy} count={projects.length} />
      <div key={layout} className="animate-[m-fade_0.5s_var(--ease-out-expo)_both] reduced:animate-none">
        {layout === "grid" ? (
          <IndexGrid projects={projects} copy={copy} />
        ) : (
          <IndexList projects={projects} copy={copy} />
        )}
      </div>
    </div>
  );
}
