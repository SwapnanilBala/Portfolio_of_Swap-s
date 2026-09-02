import type { ContactRoute, HeroContent, Profile } from "@/lib/types";
import { LiveEphemeris } from "@/components/LiveEphemeris";

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

      {/* Replacing this one line with a static hero is the whole swap. */}
      <LiveEphemeris caption={hero.ephemerisCaption} note={hero.ephemerisNote} />
    </header>
  );
}
