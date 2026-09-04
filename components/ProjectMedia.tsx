"use client";

import { useState } from "react";
import Image from "next/image";
import type { Media, MediaLabels, VideoMedia } from "@/lib/types";

interface Props {
  readonly media: Media;
  readonly labels: MediaLabels;
}

/**
 * The width the image actually occupies, per layout arrangement. Measured, not
 * assumed: at most 40.79rem beside its annotation at 74rem and up, at most
 * 44.75rem in the middle band where a figure spans the plate, and at most
 * 84.5vw below 46rem. Each is rounded up to the next whole unit.
 *
 * This is not decorative. The old value claimed 48rem above 46rem, which was
 * true of the symmetric layout this started as; once the figures moved into a
 * 30rem rail it made every wide viewport fetch a 1080px-wide file for a 430px
 * slot. `sizes` cannot read a custom property, so these track the tokens by
 * hand -- if `--rail`, `--measure`, `--annotation` or the frame padding change,
 * re-measure. Under-declaring is the worse direction: it serves an image the
 * browser then has to upscale.
 */
const FIGURE_SIZES =
  "(min-width: 74rem) 41rem, (min-width: 46rem) 45rem, 85vw";

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

export function ProjectMedia({ media, labels }: Props) {
  return (
    <figure>
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
          />
        )}
      </div>
      {media.caption === undefined ? null : (
        <figcaption>{media.caption}</figcaption>
      )}
    </figure>
  );
}
