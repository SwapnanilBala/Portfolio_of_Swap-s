"use client";

import { useState } from "react";
import Image from "next/image";
import type { Media, MediaLabels, VideoMedia } from "@/lib/types";

interface Props {
  readonly media: Media;
  readonly labels: MediaLabels;
}

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
          sizes="(max-width: 46rem) 100vw, 34rem"
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
            sizes="(max-width: 46rem) 100vw, 34rem"
          />
        )}
      </div>
      {media.caption === undefined ? null : (
        <figcaption>{media.caption}</figcaption>
      )}
    </figure>
  );
}
