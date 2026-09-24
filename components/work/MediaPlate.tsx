import Image from "next/image";
import { RevealPlate } from "@/components/RevealPlate";
import { blurFor, PLATE_FRAME, SCREENSHOT_QUALITY } from "@/lib/media";
import type { ImageMedia } from "@/lib/types";

interface Props {
  readonly media: ImageMedia;
}

/**
 * A very large screenshot between sections: no device mockup, no frame beyond
 * its own edge.
 *
 * Never shown with fewer image pixels than screen pixels. The cap is the
 * capture's width divided by the screen's pixel density (`--dpr`, set from
 * resolution queries in globals.css): a 1041px capture runs 1041px wide on a
 * 1x screen, 833px at 125% scaling and 520px on a 2x one, and is sharp on all
 * three. Capping at the capture's width in CSS pixels alone -- the old rule --
 * still stretched it 1.25x at 125% and 2x on a Retina screen, which is where
 * the plates went soft. A plate narrower than the page sits against the right
 * edge, which breaks the column rhythm on purpose.
 */
export function MediaPlate({ media }: Props) {
  return (
    <figure className="px-5 py-10 md:px-8 md:py-16">
      <div className="md:ml-auto" style={{ maxWidth: `calc(${media.width}px / var(--dpr))` }}>
        <RevealPlate className={PLATE_FRAME}>
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
        </RevealPlate>
      </div>
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
