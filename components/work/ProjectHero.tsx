import { getImageProps } from "next/image";
import { DisplayTitle } from "@/components/DisplayTitle";
import { SharedMedia } from "@/components/PageTransition";
import { RevealLines } from "@/components/RevealLines";
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
  type DataHero,
  type ImageAsset,
  type ProjectWithCase,
  type UiCopy,
} from "@/lib/types";

interface Props {
  readonly project: ProjectWithCase;
  readonly meta: UiCopy["caseMeta"];
}

const { wide: WIDE, narrow: NARROW, sizes: SIZES } = CASE_HERO;

/**
 * Bars on a zero-to-one scale, so a 0.033 gap looks like the 0.033 it is. A
 * scale starting at the lowest score would have made the winner look twice
 * the baseline.
 */
function DataHeroChart({ hero }: { readonly hero: DataHero }) {
  return (
    <figure className="pt-[10vh]">
      <p className="meta text-ink-muted">{hero.metric}</p>
      <ul className="mt-6 grid gap-5">
        {hero.bars.map((bar) => (
          <li
            key={bar.label}
            className="grid grid-cols-[minmax(0,11rem)_1fr_3.5rem] items-center gap-x-5 md:grid-cols-[16rem_1fr_4rem]"
          >
            <span className="meta">{bar.label}</span>
            <span className="h-2 bg-ink-rule">
              <span className="block h-full bg-paper" style={{ width: `${bar.value * 100}%` }} />
            </span>
            <span className="meta text-right tabular-nums">{bar.value.toFixed(3)}</span>
          </li>
        ))}
      </ul>
      <figcaption className="mt-6 max-w-[48ch] text-[0.8125rem] leading-snug text-ink-muted">
        {hero.caption}
      </figcaption>
    </figure>
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
 * The first viewport: a framed plate under the navigation, the title crossing
 * its lower edge, and the ROLE / YEAR / STACK / TYPE row under the title. The
 * plate is the far end of the shared-element morph from the slider or the
 * index, and it is wider than either, so arriving reads as the media opening
 * out.
 */
export function ProjectHero({ project, meta }: Props) {
  const image = project.hero ?? project.cover;
  const dataHero = project.selected ? undefined : project.dataHero;

  return (
    <section className="relative flex h-svh min-h-[36rem] flex-col overflow-hidden bg-ink px-5 pb-7 pt-[4.75rem] text-paper md:px-8 md:pb-9">
      {image ? (
        <SharedMedia slug={project.slug}>
          <div className="relative min-h-0 flex-1 overflow-hidden bg-ink">
            <HeroPicture wide={image} narrow={project.heroMobile ?? image} />
          </div>
        </SharedMedia>
      ) : (
        <div className="min-h-0 flex-1">{dataHero ? <DataHeroChart hero={dataHero} /> : null}</div>
      )}

      {/* The title's cap line just crosses the plate's lower edge. Any deeper
          and the capture's own buttons show between the letters. */}
      <RevealLines className={`relative ${image ? "-mt-3 md:-mt-5" : ""}`}>
        <DisplayTitle as="h1" lines={displayLinesOf(project)} className="text-[min(13vh,12.5vw)]" />
        <dl
          data-reveal-meta
          className="meta mt-8 grid grid-cols-2 gap-x-8 gap-y-4 border-t border-ink-rule pt-4 md:grid-cols-12"
        >
          <div className="md:col-span-2">
            <dt className="text-ink-muted">{meta.role}</dt>
            <dd className="mt-1">{project.role}</dd>
          </div>
          <div className="md:col-span-2">
            <dt className="text-ink-muted">{meta.year}</dt>
            <dd className="mt-1 tabular-nums">{project.year}</dd>
          </div>
          <div className="col-span-2 md:col-span-5">
            <dt className="text-ink-muted">{meta.stack}</dt>
            <dd className="mt-1">{project.stack.join(" / ")}</dd>
          </div>
          <div className="md:col-span-3">
            <dt className="text-ink-muted">{meta.type}</dt>
            <dd className="mt-1">{project.type}</dd>
          </div>
        </dl>
      </RevealLines>
    </section>
  );
}
