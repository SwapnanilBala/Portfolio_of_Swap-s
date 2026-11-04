import { getImageProps } from "next/image";
import { DisplayTitle } from "@/components/DisplayTitle";
import { DotField, DotSwatch } from "@/components/DotField";
import { SharedMedia } from "@/components/PageTransition";
import { PLATE_CORNERS } from "@/components/work/frame";
import type { MotionKit } from "@/lib/kit";
import {
  blurFor,
  CASE_HERO,
  HERO_BRIGHTNESS,
  PHONE_QUALITY,
  SCREENSHOT_QUALITY,
  TRANSPARENT_PIXEL,
} from "@/lib/media";
import { preloadFor } from "@/lib/preload";
import {
  displayLinesOf,
  type DotField as DotFieldData,
  type ImageAsset,
  type ProjectWithCase,
  type UiCopy,
} from "@/lib/types";

interface Props {
  readonly project: ProjectWithCase;
  readonly meta: UiCopy["caseMeta"];
  readonly kit: MotionKit;
}

const { wide: WIDE, narrow: NARROW, sizes: SIZES } = CASE_HERO;

/**
 * The picture for a project with no screen to show: its data as a field of
 * dots, framed like every other hero, under a legend of the real counts. The
 * legend has its own row, so no arrangement of the field can run under it.
 */
function FieldPlate({ field }: { readonly field: DotFieldData }) {
  return (
    <div className="absolute inset-0 flex flex-col gap-4">
      <ul className="meta flex flex-wrap justify-end gap-x-5 gap-y-1 text-ink-muted">
        {field.groups.map((group) => (
          <li key={group.label} className="flex items-center gap-2 tabular-nums">
            <DotSwatch tone={group.tone} />
            <span>
              {group.label} {group.count.toLocaleString("en-US")}
            </span>
          </li>
        ))}
      </ul>
      <div className="relative min-h-0 flex-1">
        <DotField field={field} shape="wide" className="absolute inset-0 hidden size-full md:block" />
        <DotField field={field} shape="tall" className="absolute inset-0 size-full md:hidden" />
      </div>
    </div>
  );
}

/**
 * The desktop capture on wide screens, the phone capture on narrow ones. Only
 * the source the browser picks is fetched, and each is preloaded under its own
 * query, so neither device downloads the other's image.
 */
function HeroPicture({ wide, narrow }: { readonly wide: ImageAsset; readonly narrow: ImageAsset }) {
  preloadFor(wide, SIZES, WIDE);
  preloadFor(narrow, SIZES, NARROW, PHONE_QUALITY);
  const {
    props: { srcSet: narrowSet },
  } = getImageProps({
    src: narrow.src,
    alt: "",
    width: narrow.width,
    height: narrow.height,
    sizes: SIZES,
    quality: PHONE_QUALITY,
  });
  const { props: img } = getImageProps({
    src: wide.src,
    alt: wide.alt,
    width: wide.width,
    height: wide.height,
    sizes: SIZES,
    quality: SCREENSHOT_QUALITY,
    loading: "eager",
    fetchPriority: "high",
    // Arriving from a plate, the image is already downloaded; a synchronous
    // decode puts it in the first frame, which is the frame the page
    // transition snapshots. Asynchronous, the morph lands on the placeholder.
    decoding: "sync",
    placeholder: "blur",
    blurDataURL: blurFor(wide.src),
    style: { objectFit: "cover", objectPosition: "top", filter: `brightness(${HERO_BRIGHTNESS})` },
  });
  // Both captures are <source>s; the <img>'s own is a transparent pixel (see
  // TRANSPARENT_PIXEL), so a client-side render never starts the wrong one.
  const { srcSet: wideSet, ...fallback } = img;
  return (
    <picture>
      <source media={NARROW} srcSet={narrowSet} sizes={SIZES} />
      <source media={WIDE} srcSet={wideSet} sizes={SIZES} />
      <img {...fallback} src={TRANSPARENT_PIXEL} sizes={undefined} alt={wide.alt} className="absolute inset-0 size-full" />
    </picture>
  );
}

/**
 * The first viewport, on the dark radiant ground: a plate in its glass bezel
 * under the navigation, the title crossing the plate's lower edge, and the
 * ROLE / YEAR / STACK / TYPE row in a dark glass strip under the title. The
 * plate is the far end of the shared-element morph from the slider or the
 * index, and it is wider than either, so arriving reads as the media opening
 * out.
 *
 * The view-transition name sits on the plate inside the bezel, never on the
 * bezel: the slider's plate is in the same bezel, and the morph is the
 * capture's, not its frame's. Nothing is laid over the capture itself -- no
 * glass, no scrim -- and the bezel's lighter rim and padding keep it apart
 * from the product's own glass (Robust Health's hero is dark glass and
 * orange), so the capture still reads as a work sample inside a frame.
 */
export function ProjectHero({ project, meta, kit }: Props) {
  const { Lines } = kit;
  const image = project.hero ?? project.cover;
  const field = project.selected ? undefined : project.dotField;
  const plated = Boolean(image || field);

  return (
    <section className="radiant-dark relative flex h-svh min-h-[36rem] flex-col overflow-hidden px-5 pb-7 pt-[4.75rem] md:px-8 md:pb-9">
      {plated ? (
        <div className="glass-bezel flex min-h-0 flex-1 flex-col">
          <SharedMedia slug={project.slug}>
            <div className={`relative min-h-0 flex-1 overflow-hidden bg-ink ${PLATE_CORNERS}`}>
              {image ? (
                <HeroPicture wide={image} narrow={project.heroMobile ?? image} />
              ) : field ? (
                <div className="absolute inset-3 md:inset-4">
                  <FieldPlate field={field} />
                </div>
              ) : null}
            </div>
          </SharedMedia>
        </div>
      ) : (
        <div className="min-h-0 flex-1" />
      )}

      {/* The title crosses the bezel's lower edge, and its cap line sits on
          the capture's: the bezel's padding and rim (0.6875rem) plus the
          space above the capitals in the title's line box (0.03em of its
          size). Deeper, the capitals ran over the capture's own type --
          Lagna Atelier's "What should we call you?" at 1440px measured
          2.26:1 under the letters -- and the capture's buttons showed
          between them. On the frame, nothing of the product sits under the
          title, so Robust Health's own glass and orange stay its own. */}
      <Lines className={`relative ${plated ? "-mt-[calc(0.6875rem+0.03*min(13vh,12.5vw))]" : ""}`}>
        <DisplayTitle as="h1" lines={displayLinesOf(project)} className="text-[min(13vh,12.5vw)]" />
        <dl
          data-reveal-meta
          className="glass-dark meta mt-6 grid grid-cols-2 gap-x-8 gap-y-4 rounded-glass-sm px-4 py-3.5 md:mt-8 md:grid-cols-12 md:px-5 md:py-4"
        >
          <div className="md:col-span-2">
            <dt className="text-glass-paper-2">{meta.role}</dt>
            <dd className="mt-1">{project.role}</dd>
          </div>
          <div className="md:col-span-2">
            <dt className="text-glass-paper-2">{meta.year}</dt>
            <dd className="mt-1 tabular-nums">{project.year}</dd>
          </div>
          <div className="col-span-2 md:col-span-5">
            <dt className="text-glass-paper-2">{meta.stack}</dt>
            <dd className="mt-1">{project.stack.join(" / ")}</dd>
          </div>
          <div className="md:col-span-3">
            <dt className="text-glass-paper-2">{meta.type}</dt>
            <dd className="mt-1">{project.type}</dd>
          </div>
        </dl>
      </Lines>
    </section>
  );
}
