import type { DotField as DotFieldData, DotGroup } from "@/lib/types";

/**
 * Two arrangements of the same dots. `wide` fills column by column, 35 rows
 * deep, so each group becomes a vertical band and the field comes out close to
 * 16:10: the Index cover, and the case-study hero on a wide screen, so the
 * morph between them is one picture growing. `tall` fills row by row, 40
 * across, so the bands stack: the hero on a phone, which is portrait.
 */
export type DotShape = "wide" | "tall";

const SHAPES: Readonly<Record<DotShape, { readonly down: boolean; readonly span: number }>> = {
  wide: { down: true, span: 35 },
  tall: { down: false, span: 40 },
};

const CELL = 10;
const PAD = 20;
/** A solid dot's diameter, and a ring's outer and inner diameters. */
const DOT = 6.2;
const RING = 6.1;
const RING_HOLE = 4.3;
/**
 * A dash just long enough to carry its round caps, once per cell: one line
 * of dots is one stroke. Not zero, which not every renderer paints.
 */
const DASH = `0.01 ${CELL - 0.01}`;

const STROKE: Readonly<Record<DotGroup["tone"], string>> = {
  strong: "stroke-paper",
  muted: "stroke-ink-muted",
  hollow: "stroke-ink-muted",
};

/**
 * Dots `start` to `end` as strokes, one per line of the arrangement. Each
 * stroke runs one unit past its last dot, so that dot's dash is inside the
 * path rather than exactly on its end.
 */
function strokes(start: number, end: number, { down, span }: (typeof SHAPES)[DotShape]): string {
  let d = "";
  for (let first = start; first < end; ) {
    const line = Math.floor(first / span);
    const last = Math.min(end, (line + 1) * span) - 1;
    const from = (first % span) * CELL + CELL / 2;
    const to = (last % span) * CELL + CELL / 2 + 1;
    const at = line * CELL + CELL / 2;
    d += down ? `M${at} ${from}V${to}` : `M${from} ${at}H${to}`;
    first = last + 1;
  }
  return d;
}

interface Props {
  readonly field: DotFieldData;
  readonly shape: DotShape;
  readonly className?: string;
}

/**
 * A dataset as a field of dots: one dot for every `unit` rows, laid down in
 * the groups' order, so each group is a band whose size is its share. For the
 * fake news classifier that is LIAR's training split in order of
 * truthfulness -- the fake claims kept, the ambiguous middle set aside, the
 * real claims kept -- which puts the class imbalance the whole project
 * wrestled with in plain sight.
 *
 * Vector, so it is sharp at the Index's cover size and the hero's alike, and
 * drawn on the server from the counts in content: no file, no request. Every
 * count is real; nothing is illustrative. Drawn on ink: a ring is a dot with
 * its middle painted over in the ground's colour, which is the ground both of
 * its plates have.
 */
export function DotField({ field, shape, className = "" }: Props) {
  const arrangement = SHAPES[shape];
  const counts = field.groups.map((group) => Math.round(group.count / field.unit));
  const total = counts.reduce((sum, n) => sum + n, 0);
  const lines = Math.ceil(total / arrangement.span);
  const width = (arrangement.down ? lines : arrangement.span) * CELL;
  const height = (arrangement.down ? arrangement.span : lines) * CELL;

  let n = 0;
  const bands = field.groups.map((group, i) => {
    const count = counts[i] ?? 0;
    const d = strokes(n, n + count, arrangement);
    n += count;
    return { key: group.label, d, tone: group.tone };
  });

  return (
    <svg
      viewBox={`${-PAD} ${-PAD} ${width + PAD * 2} ${height + PAD * 2}`}
      role="img"
      aria-label={field.alt}
      fill="none"
      strokeLinecap="round"
      strokeDasharray={DASH}
      className={className}
    >
      {bands.map((band) =>
        band.tone === "hollow" ? (
          <g key={band.key}>
            <path d={band.d} className={STROKE.hollow} strokeWidth={RING} />
            <path d={band.d} className="stroke-ink" strokeWidth={RING_HOLE} />
          </g>
        ) : (
          <path key={band.key} d={band.d} className={STROKE[band.tone]} strokeWidth={DOT} />
        ),
      )}
    </svg>
  );
}

/** One dot of a group, for a legend. */
export function DotSwatch({ tone }: { readonly tone: DotGroup["tone"] }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 8 8" className="size-2 shrink-0">
      {tone === "hollow" ? (
        <circle cx="4" cy="4" r="3.2" fill="none" className={STROKE.hollow} strokeWidth="1.1" />
      ) : (
        <circle cx="4" cy="4" r="3.6" className={tone === "strong" ? "fill-paper" : "fill-ink-muted"} />
      )}
    </svg>
  );
}
