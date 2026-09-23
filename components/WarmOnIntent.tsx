"use client";

import type { ReactNode } from "react";
import { warmCaseHero } from "@/lib/preload";
import type { ImageAsset } from "@/lib/types";

interface Props {
  /** The destination case study's hero. */
  readonly image?: ImageAsset;
  readonly className?: string;
  readonly children: ReactNode;
}

/**
 * Fetches a case study's hero when the pointer or focus reaches a link to it,
 * for links rendered by server components. Takes the image alone, not the
 * project, so none of the case study's copy is serialised to the client.
 */
export function WarmOnIntent({ image, className, children }: Props) {
  const warm = () => warmCaseHero(image);
  return (
    <div className={className} onPointerEnter={warm} onFocus={warm}>
      {children}
    </div>
  );
}
