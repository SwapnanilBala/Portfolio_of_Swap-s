import Image from "next/image";
import { RevealPlate } from "@/components/RevealPlate";
import { blurFor } from "@/lib/media";
import type { ImageMedia } from "@/lib/types";

interface Props {
  readonly media: ImageMedia;
}

// Wide enough to run the full measure of the page without being upscaled.
const FULL_BLEED_MIN_WIDTH = 1400;

/**
 * A very large screenshot between sections: no device mockup, no frame beyond
 * its own edge. Never shown wider than it was captured -- an upscaled
 * screenshot is a soft screenshot -- so narrower captures sit right-aligned
 * at their native width, which also breaks the column rhythm on purpose.
 */
export function MediaPlate({ media }: Props) {
  const fullBleed = media.width >= FULL_BLEED_MIN_WIDTH;
  return (
    <figure className="px-5 py-10 md:px-8 md:py-16">
      <RevealPlate className={fullBleed ? "" : "md:ml-auto"}>
        <div style={fullBleed ? undefined : { maxWidth: `${media.width}px` }}>
          <Image
            src={media.src}
            alt={media.alt}
            width={media.width}
            height={media.height}
            sizes={fullBleed ? "(min-width: 48rem) 95vw, 100vw" : `(min-width: 48rem) ${media.width}px, 100vw`}
            placeholder="blur"
            blurDataURL={blurFor(media.src)}
            className="h-auto w-full"
          />
        </div>
      </RevealPlate>
      {media.caption ? (
        <figcaption className="mt-4 grid md:grid-cols-12">
          <span className="text-[0.8125rem] leading-snug text-paper-muted md:col-span-5 md:col-start-8">
            {media.caption}
          </span>
        </figcaption>
      ) : null}
    </figure>
  );
}
