"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CharShift } from "@/components/CharShift";
import type { NavKey } from "@/lib/types";

const ITEMS: readonly { readonly key: NavKey; readonly href: string }[] = [
  { key: "selected", href: "/" },
  { key: "index", href: "/index" },
  { key: "about", href: "/about" },
];

interface Props {
  readonly labels: Readonly<Record<NavKey, string>>;
}

/**
 * Selected / Index / About, set into the composition rather than into a bar.
 * `mix-blend-difference` against paper-coloured text reads as ink on the light
 * pages and as paper on the dark ones and over imagery, so one nav works on
 * every ground without knowing which it is on.
 */
export function SiteNav({ labels }: Props) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="pointer-events-none fixed right-5 top-5 z-50 text-paper mix-blend-difference md:right-8 md:top-7"
    >
      <ul className="pointer-events-auto flex items-baseline gap-1.5 text-[0.8125rem] font-medium leading-none">
        {ITEMS.map((item, i) => {
          const current = pathname === item.href;
          return (
            <li key={item.key} className="flex items-baseline gap-1.5">
              {i > 0 ? (
                <span aria-hidden="true" className="opacity-50">
                  /
                </span>
              ) : null}
              <Link
                href={item.href}
                transitionTypes={["page"]}
                aria-current={current ? "page" : undefined}
                className={`group py-2 ${current ? "underline decoration-1 underline-offset-4" : ""}`}
              >
                <CharShift text={labels[item.key]} />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
