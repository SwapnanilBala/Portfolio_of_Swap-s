import { getImageProps } from "next/image";
import { preload } from "react-dom";
import { CASE_HERO, SCREENSHOT_QUALITY } from "@/lib/media";
import type { ImageAsset } from "@/lib/types";

/**
 * Preload an image under one media query only.
 *
 * `next/image`'s own `preload` cannot be scoped: the home page server-renders
 * both sliders, so it would fetch the desktop plate on phones and the phone
 * plate on desktops. This emits the same `<link rel="preload">` with a `media`
 * attribute and the srcset the `<img>` will choose from -- `sizes` must be the
 * string the image itself is given, or the browser fetches a candidate the
 * image never uses.
 *
 * Works in server components (the link goes into the document head) and in
 * client event handlers (React inserts it on the spot).
 */
export function preloadFor(
  image: ImageAsset,
  sizes: string,
  media: string,
  quality: number = SCREENSHOT_QUALITY,
): void {
  const { props } = getImageProps({
    src: image.src,
    alt: "",
    width: image.width,
    height: image.height,
    sizes,
    quality,
  });
  if (!props.srcSet) return;
  preload(props.src, {
    as: "image",
    imageSrcSet: props.srcSet,
    imageSizes: sizes,
    fetchPriority: "high",
    media,
  });
}

/**
 * Fetch a case study's hero before the visitor arrives -- on hover, on focus,
 * or when the keyboard settles on a plate.
 *
 * The page transition snapshots the new page as soon as it renders. The hero
 * there is wider than any plate that leads to it, so it wants a larger image
 * than the one on screen; unwarmed, the morph lands on its blur placeholder
 * and the capture pops in afterwards. Phones need none of this: their slide
 * and their hero ask for the same candidate, so it is already cached.
 */
export function warmCaseHero(image: ImageAsset | undefined): void {
  if (image) preloadFor(image, CASE_HERO.sizes, CASE_HERO.wide);
}
