import Image from "next/image";
import type { MotionKit } from "@/lib/kit";
import { blurFor } from "@/lib/media";
import type { ImageAsset } from "@/lib/types";

interface Props {
  readonly portraits: readonly [ImageAsset, ImageAsset, ImageAsset];
  readonly kit: MotionKit;
}

/** The cluster's widest, in CSS pixels: 18rem, the About section's first column. */
const WIDTH = 288;

/**
 * A triangle of circles, positioned in percent of the cluster's width -- two
 * across the top, the third tucked under between them -- so the whole thing
 * scales as one. `top` is a percentage of the cluster's height, which is 94%
 * of its width (the `aspect-[100/94]` below), hence the division.
 */
const PLACES = [
  { left: 0, top: 0, size: 56 },
  { left: 54, top: 10 / 0.94, size: 46 },
  { left: 26, top: 50 / 0.94, size: 42 },
] as const;

/**
 * Three portraits as a triangle of circles, largest first. Where two meet,
 * the upper one's paper-coloured edge cuts cleanly into the one beneath, so
 * they read as a group rather than as three separate badges. The site's only
 * round forms besides the dot field's dots, and there on request.
 */
export function Portraits({ portraits, kit }: Props) {
  const { Plate } = kit;
  return (
    <div className="relative aspect-[100/94] w-full max-w-[18rem]">
      {portraits.map((portrait, i) => {
        const place = PLACES[i] ?? PLACES[0];
        return (
          <div
            key={portrait.src}
            className="absolute aspect-square overflow-hidden rounded-full border-4 border-paper bg-paper"
            style={{ left: `${place.left}%`, top: `${place.top}%`, width: `${place.size}%` }}
          >
            <Plate className="size-full rounded-full">
              <Image
                src={portrait.src}
                alt={portrait.alt}
                width={portrait.width}
                height={portrait.height}
                sizes={`${Math.round((WIDTH * place.size) / 100)}px`}
                placeholder="blur"
                blurDataURL={blurFor(portrait.src)}
                className="size-full object-cover"
              />
            </Plate>
          </div>
        );
      })}
    </div>
  );
}
