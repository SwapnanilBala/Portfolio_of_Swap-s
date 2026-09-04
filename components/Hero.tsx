import Image from "next/image";
import type { ContactRoute, HeroContent, Profile } from "@/lib/types";

/**
 * The portrait's rendered width in CSS pixels, tracking --portrait in
 * globals.css by hand. next/image needs a number, and neither it nor `sizes`
 * can read a custom property, so this is the same hand-tracked coupling
 * FIGURE_SIZES documents: if --portrait changes, change this.
 *
 * This is the displayed box, not the file. The source is 400px square and
 * recorded as such in content; passing the display width lets next/image emit
 * a two-candidate srcset -- 256 at 1x, the native 400 at 2x -- instead of the
 * fifteen-candidate ladder a `sizes` string produces, eight of whose entries
 * would run past the source and resolve to the same file. Height is derived
 * from the asset's own ratio rather than assumed square, so the reserved space
 * stays correct if the photograph is ever replaced with one that is not.
 */
const PORTRAIT_WIDTH = 200;

interface Props {
  readonly profile: Profile;
  readonly hero: HeroContent;
  readonly routes: readonly ContactRoute[];
}

export function Hero({ profile, hero, routes }: Props) {
  const { portrait } = profile;
  const portraitHeight = Math.round(
    PORTRAIT_WIDTH * (portrait.height / portrait.width),
  );

  return (
    <header className="hero">
      {/*
        First in the header, but not the first heading: <h1> still opens the
        document's outline. The portrait leads here so that it sits above the
        name when the columns collapse, and so the wide layout can place it in
        the rail without reordering anything.

        priority, not lazy: it is the largest thing above the fold and so the
        likely LCP element. Deferring it would trade a measurable delay for
        bytes that get fetched a moment later regardless.
      */}
      <div className="hero-portrait">
        <Image
          src={portrait.src}
          alt={portrait.alt}
          width={PORTRAIT_WIDTH}
          height={portraitHeight}
          placeholder="blur"
          blurDataURL={portrait.blurDataURL}
          priority
        />
      </div>

      <div className="hero-body">
        <h1 className="hero-name">{profile.name}</h1>
        <p className="hero-seeking">{profile.seeking}</p>

        <div className="hero-statement">
          {hero.statement.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <ul className="hero-links">
          {routes.map((route) => (
            <li key={route.key}>
              <a href={route.href}>{route.label}</a>
            </li>
          ))}
        </ul>
      </div>

      {/*
        The live ephemeris is unmounted, not deleted. It was shipping a
        placeholder engine, so the hero led with a table of positions that were
        not real and said so in its own caption. An unfinished demo above the
        fold is a worse first impression than no demo.

        To bring it back once the real engine lands:
          import { LiveEphemeris } from "@/components/LiveEphemeris";
        and render <LiveEphemeris content={hero} /> here. The component, its
        content keys in lib/content.ts, and the .ephemeris styles are all still
        in place. Restore the second hero statement paragraph too — it referred
        to "the table below" and was removed with the table.
      */}
    </header>
  );
}
