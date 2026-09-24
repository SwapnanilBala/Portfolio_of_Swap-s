import Image from "next/image";
import type { MotionKit } from "@/lib/kit";
import { blurFor, PLATE_FRAME, SCREENSHOT_QUALITY } from "@/lib/media";
import type { MediaPair as MediaPairContent, PairedImage } from "@/lib/types";

interface Props {
  readonly media: MediaPairContent;
  readonly kit: MotionKit;
}

/** The space between the two captures, in px: Tailwind's `gap-5`. */
const GAP = 20;

const ratio = (image: PairedImage) => image.width / image.height;

/**
 * Two captures read together, with a short explanation beside them: in the
 * label column from 48rem, above the pair below it.
 *
 * Side by side, each capture's column is as wide as its own ratio, so the two
 * share one height whatever their shapes -- a portrait panel beside a
 * landscape one still makes a single band, with no cropping to force it.
 * Stacked below 48rem, one to a row.
 *
 * Never fewer image pixels than screen pixels, as with every plate. Stacked,
 * each capture is capped at its own width over the screen's density. Side by
 * side, the band's height binds -- the shorter capture caps it -- and the
 * band's width follows from that height and the two ratios. A band narrower
 * than its column stays beside the explanation rather than against the right
 * edge as a lone plate does: on a 2x screen the gap between them was wider
 * than either capture, and the words no longer read as belonging to them.
 */
export function MediaPair({ media, kit }: Props) {
  const { Plate } = kit;
  const [first, second] = media.images;
  const band = `calc(${GAP}px + ${(ratio(first) + ratio(second)) * Math.min(first.height, second.height)}px / var(--dpr))`;

  return (
    <figure className="grid grid-cols-12 gap-x-5 gap-y-8 px-5 py-10 md:px-8 md:py-16">
      <figcaption className="col-span-12 md:col-span-3">
        <p className="meta border-t border-paper-rule pt-3">{media.title}</p>
        <p className="mt-4 max-w-[46ch] text-[0.9375rem] leading-[1.55] text-paper-muted">{media.body}</p>
      </figcaption>
      <div className="col-span-12 md:col-span-9">
        <div
          className="flex flex-col gap-8 md:max-w-(--band) md:flex-row md:gap-5"
          style={{ "--band": band }}
        >
          {media.images.map((image) => (
            <figure
              key={image.src}
              className="min-w-0 md:basis-0"
              style={{ flexGrow: ratio(image), "--cap": `calc(${image.width}px / var(--dpr))` }}
            >
              <div className="max-w-(--cap) md:max-w-none">
                <Plate className={PLATE_FRAME}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    sizes={`(min-width: 48rem) ${image.width}px, 100vw`}
                    quality={SCREENSHOT_QUALITY}
                    placeholder="blur"
                    blurDataURL={blurFor(image.src)}
                    className="h-auto w-full"
                  />
                </Plate>
              </div>
              <figcaption className="meta mt-3 text-paper-muted">{image.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </figure>
  );
}
