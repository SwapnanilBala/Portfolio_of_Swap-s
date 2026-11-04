/**
 * The glass frames around the case study's captures share one geometry with
 * the hero's `glass-bezel`: 0.625rem of padding inside a 1px rim, and the
 * capture's corners cut to the frame's radius less that padding, so the two
 * curves run parallel.
 */

/** Padding plus rim on each side of a frame, in px. */
export const FRAME = 11;

/** A capture's corners inside a frame; the hairline (`PLATE_FRAME`) follows them. */
export const PLATE_CORNERS = "rounded-[calc(var(--radius-glass)-0.625rem)] after:rounded-[inherit]";
