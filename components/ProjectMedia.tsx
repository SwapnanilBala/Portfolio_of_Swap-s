"use client";

import { useState } from "react";
import Image from "next/image";
import type { Media, MediaLabels, VideoMedia } from "@/lib/types";

interface Props {
  readonly media: Media;
  readonly labels: MediaLabels;
  /** The citation this plate carries, already resolved, e.g. "Fig 1.2". */
  readonly reference: string;
}

/**
 * The width the image actually occupies, per layout arrangement. Measured on
 * the running layout, not derived on paper: 28.5rem with two plates abreast
 * once the sheet caps at its 64rem max-width, and at most 84.5vw below 46rem
 * where a plate spans the column alone.
 *
 * `sizes` cannot read a custom property, so these track the tokens by hand. If
 * `--sheet`, `--index` or `--gap` change, re-measure. Under-declaring is the
 * worse direction: it serves an image the browser then has to upscale.
 */
const FIGURE_SIZES = "(min-width: 46rem) 29rem, 90vw";

/** A strip capture earns the full body column; a tall one does not. */
const WIDE_RATIO = 2.2;

function formatDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

/**
 * Poster-gated video.
 *
 * The <video> element does not exist in the document until the visitor asks
 * for it, so a clip costs nothing on page load. `preload="none"` covers the
 * case where a browser mounts it eagerly anyway, and `playsInline` stops iOS
 * from hijacking playback into fullscreen.
 */
function GatedVideo({
  media,
  labels,
}: {
  readonly media: VideoMedia;
  readonly labels: MediaLabels;
}) {
  const [playing, setPlaying] = useState(false);

  if (!playing) {
    return (
      <button
        type="button"
        className="poster-gate"
        onClick={() => setPlaying(true)}
        aria-label={labels.playAria.replace("{caption}", media.caption)}
      >
        <Image
          src={media.poster}
          alt={media.alt}
          width={media.width}
          height={media.height}
          sizes={FIGURE_SIZES}
          placeholder="blur"
          blurDataURL={media.blurDataURL}
        />
        <span className="poster-gate-label">
          <span>{labels.play}</span>
          <span>{formatDuration(media.durationSeconds)}</span>
        </span>
      </button>
    );
  }

  return (
    <video
      src={media.src}
      poster={media.poster}
      width={media.width}
      height={media.height}
      preload="none"
      controls
      autoPlay
      muted
      loop
      playsInline
    />
  );
}

export function ProjectMedia({ media, labels, reference }: Props) {
  const wide = media.width / media.height >= WIDE_RATIO;

  return (
    <figure data-wide={wide ? "true" : undefined}>
      <div className="media-frame">
        {media.kind === "video" ? (
          <GatedVideo media={media} labels={labels} />
        ) : (
          <Image
            src={media.src}
            alt={media.alt}
            width={media.width}
            height={media.height}
            sizes={FIGURE_SIZES}
            placeholder="blur"
            blurDataURL={media.blurDataURL}
          />
        )}
        {media.caption === undefined ? null : (
          <figcaption>
            {/* The dash between citation and caption is punctuation, so the
                stylesheet draws it rather than this file holding prose. */}
            <span className="figure-ref">{reference}</span>
            {media.caption}
          </figcaption>
        )}
      </div>
    </figure>
  );
}
