import type { ContactRoute, HeroContent, Profile } from "@/lib/types";

interface Props {
  readonly profile: Profile;
  readonly hero: HeroContent;
  readonly routes: readonly ContactRoute[];
}

export function Hero({ profile, hero, routes }: Props) {
  return (
    <header className="hero">
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
