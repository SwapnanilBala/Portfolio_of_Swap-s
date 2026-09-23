import { LocalTime } from "@/components/LocalTime";
import { MagneticLink } from "@/components/MagneticLink";
import { content } from "@/lib/content";

/**
 * The oversized close on every page but the home page, which is one viewport
 * with nowhere below it to put one. Always dark: on the light pages it lands
 * as a hard change of ground, which is the point of ending on it.
 */
export function SiteFooter() {
  const { ui, contact, profile } = content;
  const year = new Date().getFullYear();

  return (
    <footer className="flex min-h-[92svh] flex-col justify-between bg-ink px-5 pb-6 pt-24 text-paper md:px-8">
      <h2 className="display text-[14.2vw]">
        {ui.footer.headline.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h2>

      <div className="mt-16 grid gap-y-6 border-t border-ink-rule pt-5 md:grid-cols-12">
        <ul className="flex flex-wrap gap-x-8 gap-y-3 md:col-span-7">
          {contact.map((route) => (
            <li key={route.key}>
              <MagneticLink
                href={route.href}
                ariaLabel={`${ui.contactLabels[route.key]}: ${route.detail}`}
                className="inline-block py-1 text-[0.9375rem] font-medium uppercase tracking-[0.01em] underline-offset-4 hover:underline"
              >
                {ui.contactLabels[route.key]}
              </MagneticLink>
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
