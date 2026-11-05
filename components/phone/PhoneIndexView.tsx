"use client";

import { IndexRows } from "@/components/index/parts";
import type { Project, UiCopy } from "@/lib/types";

interface Props {
  readonly projects: readonly Project[];
  readonly copy: UiCopy["index"];
}

/**
 * The Index on a phone: the desktop's list, from the same parts, with a
 * small cover in every row in place of the detail beside it. Each cover
 * carries the page transition's shared name, so opening a row morphs it into
 * the case-study hero.
 */
export function PhoneIndexView({ projects, copy }: Props) {
  return (
    <div className="px-5 pb-16 pt-5">
      <IndexRows projects={projects} copy={copy} covers="always" sharedCovers />
    </div>
  );
}
