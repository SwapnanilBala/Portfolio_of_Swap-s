"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CharShift } from "@/components/CharShift";
import { canonicalPath } from "@/lib/links";
import type { UiCopy } from "@/lib/types";

interface Props {
  readonly copy: UiCopy["homeLink"];
}

/** Each corner reads `--spread`, which the frame opens on hover and focus. */
const CORNERS = [
  "left-0 top-0 border-l border-t -translate-x-(--spread) -translate-y-(--spread)",
  "right-0 top-0 border-r border-t translate-x-(--spread) -translate-y-(--spread)",
  "bottom-0 left-0 border-b border-l -translate-x-(--spread) translate-y-(--spread)",
  "bottom-0 right-0 border-b border-r translate-x-(--spread) translate-y-(--spread)",
] as const;

/**
 * The way home, top left on every page but home itself, where the name holds
 * that corner. The favicon's monogram sits inside crop marks -- the cursor's
 * mark, and the plates' 16:10 -- which open a few pixels on hover, as the
 * cursor's do when they lock onto something a click opens.
 *
 * `mix-blend-difference` against paper, like the nav, so it reads as ink on
 * the light pages and as paper on the dark ones and over imagery.
 */
export function HomeLink({ copy }: Props) {
  // Canonical, so the phone tree's /m prefix does not reach the render: the
  // server and the browser must agree on whether this is the home page.
  const pathname = canonicalPath(usePathname());
  if (pathname === "/") return null;

  return (
    <Link
      href="/"
      transitionTypes={["page"]}
      className="group fixed left-5 top-5 z-50 flex items-center gap-3 py-0.5 text-[0.8125rem] font-medium leading-none text-paper mix-blend-difference md:left-8 md:top-7"
    >
      <span
        aria-hidden="true"
        className="relative grid h-[1.5625rem] w-10 place-items-center [--spread:0px] group-hover:[--spread:3px] group-focus-visible:[--spread:3px] reduced:group-hover:[--spread:0px] reduced:group-focus-visible:[--spread:0px]"
      >
        {CORNERS.map((corner) => (
          <span
            key={corner}
            className={`absolute size-[7px] border-current transition-transform duration-500 ease-out-expo reduced:transition-none ${corner}`}
          />
        ))}
        <span className="text-[0.6875rem] font-[650] tracking-[-0.03em]">{copy.monogram}</span>
      </span>
      <CharShift text={copy.label} />
    </Link>
  );
}
