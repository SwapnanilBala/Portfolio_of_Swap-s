"use client";

import { useSyncExternalStore } from "react";

interface Props {
  readonly timeZone: string;
}

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 15_000);
  return () => window.clearInterval(id);
}

/**
 * The current time where he is, e.g. "14:32 EDT". Renders an empty string on
 * the server and fills in on the client, so the markup cannot disagree across
 * hydration -- a clock is the textbook source of that mismatch.
 */
export function LocalTime({ timeZone }: Props) {
  const time = useSyncExternalStore(
    subscribe,
    () =>
      new Intl.DateTimeFormat("en-US", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZoneName: "short",
      }).format(new Date()),
    () => "",
  );

  return <time className="tabular-nums">{time}</time>;
}
