import { Fragment } from "react";
import { LocalTime } from "@/components/LocalTime";
import { content } from "@/lib/content";
import type { MotionKit } from "@/lib/kit";

interface Props {
  readonly kit: MotionKit;
  /**
   * The landing page's close: the same headline and routes at a size that
   * ends the page without taking a screen of it, because that page is read
   * for the record and was a long scroll.
   */
  readonly compact?: boolean;
}

/**
 * The oversized close on every page but Projects, which is one viewport
 * with nowhere below it to put one. Always dark: on the light pages it lands
 * as a hard change of ground, which is the point of ending on it.
 */
export function SiteFooter({ kit, compact = false }: Props) {
  const { Link: ContactLink } = kit;
  const { ui, contact, profile } = content;
  const year = new Date().getFullYear();

  return (
    <footer
      className={`bg-ink px-5 pb-6 text-paper md:px-8 ${compact ? "pt-14 md:pt-16" : "flex min-h-[92svh] flex-col justify-between pt-24"}`}
    >
      {/* A real space between the block lines keeps the accessible name
          "Let's build something." rather than "Let's buildsomething." */}
      <h2 className={`display ${compact ? "text-[clamp(2.75rem,7vw,7rem)]" : "text-[14.2vw]"}`}>
        {ui.footer.headline.map((line, i) => (
          <Fragment key={line}>
            {i > 0 ? " " : null}
            <span className="block">{line}</span>
          </Fragment>
        ))}
      </h2>

      <div className={`${compact ? "mt-10" : "mt-16"} grid gap-y-6 border-t border-ink-rule pt-5 md:grid-cols-12`}>
        <ul className="flex flex-wrap gap-x-8 gap-y-3 md:col-span-7">
          {contact.map((route) => (
            <li key={route.key}>
              <ContactLink
                href={route.href}
                ariaLabel={`${ui.contactLabels[route.key]}: ${route.detail}`}
                className="inline-block py-1 text-[0.9375rem] font-medium uppercase tracking-[0.01em] underline-offset-4 hover:underline"
              >
                {ui.contactLabels[route.key]}
              </ContactLink>
            </li>
          ))}
        </ul>

        <dl className="meta grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-ink-muted md:col-span-5 md:justify-self-end">
          <dt>{profile.location}</dt>
          <dd className="text-paper">
            <span className="sr-only">{ui.footer.localTime}: </span>
            <LocalTime timeZone={profile.timeZone} />
          </dd>
          <dt className="sr-only">Status</dt>
          <dd className="col-span-2">{profile.availability}</dd>
          <dd className="col-span-2">{ui.footer.copyright.replace("{year}", String(year))}</dd>
        </dl>
      </div>
    </footer>
  );
}
