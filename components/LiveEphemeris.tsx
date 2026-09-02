"use client";

import { useEffect, useState } from "react";
import type { ChartSnapshot, EphemerisBody } from "@/lib/types";

interface Props {
  readonly caption: string;
  readonly note: string;
}

/* ==========================================================================
   PLACEHOLDER ENGINE
   ==========================================================================

   Everything between this banner and the one marked END PLACEHOLDER is fake.
   The arithmetic is real arithmetic, so the measured timing below the table is
   a true measurement of it — but the positions are NOT calibrated against any
   ephemeris and must not be read as correct.

   To swap in the real engine:

     1. Extract the ephemeris core from Lagna Atelier into `lib/ephemeris.ts`.
        It needs exactly one entry point with this shape:

          export function computeSnapshot(at: Date): Omit<ChartSnapshot, "elapsedMs">

     2. Delete everything down to END PLACEHOLDER and import that instead:

          import { computeSnapshot } from "@/lib/ephemeris";

     3. Delete the `PLACEHOLDER` string from the table caption below, and
        update `hero.ephemerisNote` in `lib/content.ts` — it currently tells
        the reader the positions are not real yet, which stops being true.

   Do not move the `performance.now()` brackets in the effect. They wrap the
   calculation and nothing else. If they ever come to include the render or
   the state update, the displayed number stops being a measurement of the
   engine and the component loses the only reason it exists.
   ========================================================================== */

const SIGNS: readonly string[] = [
  "Ari",
  "Tau",
  "Gem",
  "Cnc",
  "Leo",
  "Vir",
  "Lib",
  "Sco",
  "Sgr",
  "Cap",
  "Aqr",
  "Psc",
];

/** Fictitious mean motions, in degrees per day. Not real orbital elements. */
const PLACEHOLDER_BODIES: readonly {
  readonly name: string;
  readonly meanMotion: number;
  readonly epochLongitude: number;
  readonly retrograde: boolean;
}[] = [
  { name: "Sun", meanMotion: 0.9856, epochLongitude: 280.46, retrograde: false },
  { name: "Moon", meanMotion: 13.1764, epochLongitude: 218.32, retrograde: false },
  { name: "Mercury", meanMotion: 4.0923, epochLongitude: 252.25, retrograde: true },
  { name: "Venus", meanMotion: 1.6021, epochLongitude: 181.98, retrograde: false },
  { name: "Mars", meanMotion: 0.5240, epochLongitude: 355.43, retrograde: false },
  { name: "Jupiter", meanMotion: 0.0831, epochLongitude: 34.35, retrograde: false },
  { name: "Saturn", meanMotion: 0.0334, epochLongitude: 50.08, retrograde: true },
];

const J2000_MS = Date.UTC(2000, 0, 1, 12, 0, 0);
const MS_PER_DAY = 86_400_000;

function normaliseDegrees(value: number): number {
  const wrapped = value % 360;
  return wrapped < 0 ? wrapped + 360 : wrapped;
}

function computePlaceholderSnapshot(
  at: Date,
): Omit<ChartSnapshot, "elapsedMs"> {
  const daysSinceEpoch = (at.getTime() - J2000_MS) / MS_PER_DAY;

  // Linear precession approximation. Real Lahiri is not linear.
  const ayanamshaValue = 23.85 + (daysSinceEpoch / 365.25) * 0.013972;

  const bodies: EphemerisBody[] = PLACEHOLDER_BODIES.map((body) => {
    const tropical = normaliseDegrees(
      body.epochLongitude + body.meanMotion * daysSinceEpoch,
    );
    const longitude = normaliseDegrees(tropical - ayanamshaValue);
    const signIndex = Math.floor(longitude / 30);

    return {
      name: body.name,
      longitude,
      sign: SIGNS[signIndex] ?? "---",
      retrograde: body.retrograde,
    };
  });

  return {
    computedAt: at,
    ayanamsha: "Lahiri",
    ayanamshaValue,
    bodies,
  };
}

/* ============================== END PLACEHOLDER ========================== */

/** Degrees within the sign, as `12 34'`. */
function formatPosition(longitude: number): string {
  const withinSign = longitude % 30;
  const degrees = Math.floor(withinSign);
  const minutes = Math.floor((withinSign - degrees) * 60);
  return `${degrees.toString().padStart(2, "0")}° ${minutes
    .toString()
    .padStart(2, "0")}′`;
}

function formatClock(at: Date): string {
  const hh = at.getUTCHours().toString().padStart(2, "0");
  const mm = at.getUTCMinutes().toString().padStart(2, "0");
  const ss = at.getUTCSeconds().toString().padStart(2, "0");
  return `${hh}:${mm}:${ss} UTC`;
}

export function LiveEphemeris({ caption, note }: Props) {
  // Null until the browser has actually computed something. Calling new Date()
  // during render would make the server and client disagree and produce an
  // intermittent hydration mismatch. Deferring is also the honest architecture:
  // the claim is that no server is involved, so no server result exists.
  const [snapshot, setSnapshot] = useState<ChartSnapshot | null>(null);

  useEffect(() => {
    const at = new Date();

    // The brackets wrap the calculation and nothing else.
    const started = performance.now();
    const computed = computePlaceholderSnapshot(at);
    const elapsedMs = performance.now() - started;

    setSnapshot({ ...computed, elapsedMs });
  }, []);

  return (
    <section className="ephemeris" aria-label={caption}>
      <p className="ephemeris-caption">{caption}</p>

      {snapshot === null ? (
        <p className="ephemeris-loading">Computing in your browser...</p>
      ) : (
        <>
          <table className="ephemeris-table">
            <caption>
              PLACEHOLDER — {snapshot.ayanamsha} ayanamsha{" "}
              {snapshot.ayanamshaValue.toFixed(4)}° at{" "}
              {formatClock(snapshot.computedAt)}
            </caption>
            <thead>
              <tr>
                <th scope="col">Body</th>
                <th scope="col">Sidereal</th>
                <th scope="col">Sign</th>
                <th scope="col">Motion</th>
              </tr>
            </thead>
            <tbody>
              {snapshot.bodies.map((body) => (
                <tr key={body.name}>
                  <th scope="row">{body.name}</th>
                  <td className="col-lon">{formatPosition(body.longitude)}</td>
                  <td>{body.sign}</td>
                  <td>
                    {body.retrograde ? (
                      <span className="ephemeris-retro">R</span>
                    ) : (
                      <span aria-hidden="true">{"–"}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="ephemeris-foot">
            {snapshot.bodies.length} bodies in{" "}
            <span className="ephemeris-elapsed">
              {snapshot.elapsedMs.toFixed(3)} ms
            </span>{" "}
            on your machine, with no network request.
          </p>
        </>
      )}

      <p className="ephemeris-note">{note}</p>
    </section>
  );
}
