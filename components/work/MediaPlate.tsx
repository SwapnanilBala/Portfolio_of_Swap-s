import Image from "next/image";
import { FRAME, PLATE_CORNERS } from "@/components/work/frame";
import type { MotionKit } from "@/lib/kit";
import { blurFor, PLATE_FRAME, SCREENSHOT_QUALITY } from "@/lib/media";
import type { ImageMedia } from "@/lib/types";

interface Props {
  readonly media: ImageMedia;
  readonly kit: MotionKit;
}

/**
 * A very large screenshot between sections, in a light glass frame: no
 * device mockup, and no glass over the capture itself -- the frame is its
 * padding and rim, so a capture with glass of its own still reads as the
 * product's.
 *
 * Never shown with fewer image pixels than screen pixels. The cap is the
 * capture's width divided by the screen's pixel density (`--dpr`, set from
 * resolution queries in globals.css): a 1041px capture runs 1041px wide on a
 * 1x screen, 833px at 125% scaling and 520px on a 2x one, and is sharp on all
 * three. Capping at the capture's width in CSS pixels alone -- the old rule --
 * still stretched it 1.25x at 125% and 2x on a Retina screen, which is where
 * the plates went soft. The frame's padding and rim are added outside the
 * cap. A plate narrower than the page sits against the right edge, which
 * breaks the column rhythm on purpose; its caption is a small panel of its
 * own at the left, on the plate's baseline, from 48rem.
 */
export function MediaPlate({ media, kit }: Props) {
  const { Plate } = kit;
  return (
    <figure className="flex flex-col gap-3 md:flex-row-reverse md:items-end md:justify-between md:gap-5">
      <div
        className="glass-light min-w-0 p-2.5 md:flex-1"
        style={{ maxWidth: `calc(${media.width}px / var(--dpr) + ${FRAME * 2}px)` }}
      >
        <Plate className={`${PLATE_FRAME} ${PLATE_CORNERS}`}>
          <Image
            src={media.src}
            alt={media.alt}
            width={media.width}
            height={media.height}
            sizes={`(min-width: 48rem) ${media.width}px, 100vw`}
            quality={SCREENSHOT_QUALITY}
            placeholder="blur"
            blurDataURL={blurFor(media.src)}
            className="h-auto w-full"
          />
        </Plate>
      </div>
      {media.caption ? (
        <figcaption className="glass-light rounded-glass-sm px-5 py-4 text-[0.8125rem] leading-snug text-glass-ink-2 md:w-[clamp(15rem,24vw,21rem)] md:shrink-0">
          {media.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
