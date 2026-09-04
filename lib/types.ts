/**
 * The content contract.
 *
 * Every type here is `readonly` throughout. Consumers that need a different
 * order must copy first (`[...projects].sort(...)`) rather than mutate shared
 * content in place.
 */

/* ------------------------------------------------------------------ links */

/**
 * Links are stored by role, not by label. The display string is resolved
 * through LINK_LABELS so that vocabulary stays identical across every project,
 * and so that adding a role is a compile error until it is given a label.
 */
export type LinkRole = "live" | "source" | "writeup" | "paper";

export const LINK_LABELS: Readonly<Record<LinkRole, string>> = {
  live: "open the live site",
  source: "read the source",
  writeup: "read the write-up",
  paper: "read the paper",
};

export interface ProjectLink {
  readonly role: LinkRole;
  /**
   * Unset while the URL is still unknown. A link without an href must be
   * filtered out before render — never emitted as a dead anchor.
   */
  readonly href?: string;
}

/** Narrows away the links that have no destination yet. */
export type ResolvedLink = ProjectLink & { readonly href: string };

export function isResolvedLink(link: ProjectLink): link is ResolvedLink {
  return typeof link.href === "string" && link.href.length > 0;
}

/* ----------------------------------------------------------------- status */

export type ProjectStatus = "shipped" | "in-progress" | "archived";

/**
 * `shipped` is the default and deliberately absent from this record: rendering
 * a "shipped" badge on a shipped project is noise. The Exclude<> makes that a
 * property of the type rather than a rule someone has to remember.
 */
export type BadgedStatus = Exclude<ProjectStatus, "shipped">;

export const STATUS_LABELS: Readonly<Record<BadgedStatus, string>> = {
  "in-progress": "in progress",
  archived: "archived",
};

export function isBadgedStatus(status: ProjectStatus): status is BadgedStatus {
  return status !== "shipped";
}

/* ------------------------------------------------------------------ media */

interface MediaBase {
  readonly src: string;
  /** Explicit intrinsic dimensions. Omitting these causes layout shift. */
  readonly width: number;
  readonly height: number;
  readonly alt: string;
  /**
   * Placeholder shown while the still decodes, as a data URL. Required, like
   * `poster` below and for the same reason: every capture here is a dark
   * screenshot on a beige page, so one without a placeholder snaps in from
   * nothing. Values come from `BLUR_PLACEHOLDERS` in `lib/blur.ts`.
   */
  readonly blurDataURL: string;
}

export interface ImageMedia extends MediaBase {
  readonly kind: "image";
  readonly caption?: string;
}

/**
 * `poster`, `caption` and `durationSeconds` are non-optional on purpose.
 * A poster-less video downloads bytes during page load, which breaks the
 * performance budget. That state is made impossible to express rather than
 * merely discouraged.
 */
export interface VideoMedia extends MediaBase {
  readonly kind: "video";
  readonly poster: string;
  readonly caption: string;
  readonly durationSeconds: number;
}

export type Media = ImageMedia | VideoMedia;

/* ----------------------------------------------------------------- gutter */

/**
 * A figure a stranger could independently verify: a count, a date, a measured
 * delta. Never an adjective — the gutter's whole authority comes from the fact
 * that nothing in it is a claim about quality.
 */
export interface GutterFact {
  readonly value: string;
  readonly label: string;
}

/* --------------------------------------------------------------- projects */

export interface Project {
  readonly slug: string;
  readonly name: string;
  readonly period: string;
  readonly status: ProjectStatus;
  /** Ordering key. The site reads flagship-first, not newest-first. */
  readonly flagship?: boolean;
  readonly summary: string;
  readonly gutter: readonly GutterFact[];
  /** One decision per line. Not a feature list. */
  readonly details: readonly string[];
  readonly stack: readonly string[];
  readonly links: readonly ProjectLink[];
  readonly media?: readonly Media[];
}

/* ------------------------------------------------------------- experience */

export interface Experience {
  readonly slug: string;
  readonly org: string;
  readonly role: string;
  readonly team: string;
  readonly period: string;
  readonly location: string;
  readonly gutter: readonly GutterFact[];
  readonly details: readonly string[];
}

/* ------------------------------------------------------- live ephemeris */

export interface EphemerisBody {
  readonly name: string;
  /** Sidereal ecliptic longitude, degrees in [0, 360). */
  readonly longitude: number;
  readonly sign: string;
  readonly retrograde: boolean;
}

/**
 * The contract the real engine must satisfy when it replaces the placeholder.
 * `elapsedMs` is measured around the calculation only — not the render, not
 * the state update — because the component's entire value is that the number
 * is an observation rather than a claim.
 */
export interface ChartSnapshot {
  readonly computedAt: Date;
  readonly ayanamsha: string;
  readonly ayanamshaValue: number;
  readonly bodies: readonly EphemerisBody[];
  readonly elapsedMs: number;
}

/* ------------------------------------------------------------------- site */

export interface Profile {
  readonly name: string;
  readonly seeking: string;
  readonly location: string;
  readonly email: string;
  readonly github: string;
  readonly linkedin: string;
  readonly resumeHref: string;
}

export interface EphemerisColumns {
  readonly body: string;
  readonly position: string;
  readonly sign: string;
  readonly motion: string;
}

export interface HeroContent {
  readonly statement: readonly string[];
  readonly ephemerisCaption: string;
  readonly ephemerisNote: string;
  readonly ephemerisLoading: string;
  readonly ephemerisColumns: EphemerisColumns;
  /** Template. Tokens: {ayanamsha} {value} {time} */
  readonly ephemerisTableCaption: string;
  /** Template. Tokens: {bodies} {elapsed} */
  readonly ephemerisFoot: string;
  /**
   * Substituted for {elapsed} when the measurement rounds to zero. The
   * placeholder engine is faster than the browser clock can resolve, and
   * printing "0.000 ms" would read as broken rather than as fast.
   */
  readonly ephemerisBelowResolution: string;
  readonly ephemerisRetrograde: string;
}

export type SectionId = "projects" | "experience" | "contact";

export interface SectionHeading {
  readonly id: SectionId;
  readonly title: string;
  /** A verifiable count of entries, not a sequence marker. */
  readonly count: string;
}

export interface MediaLabels {
  readonly play: string;
  /** Template. Token: {caption} */
  readonly playAria: string;
}

export interface ContactRoute {
  /** Short key shown in the gutter column of the contact list. */
  readonly key: string;
  /** The link text. Says what happens, and is never "Learn more". */
  readonly label: string;
  readonly href: string;
}

export interface SiteContent {
  readonly profile: Profile;
  readonly hero: HeroContent;
  readonly sections: Readonly<Record<SectionId, SectionHeading>>;
  readonly projects: readonly Project[];
  readonly experience: readonly Experience[];
  readonly contact: readonly string[];
  readonly contactRoutes: readonly ContactRoute[];
  readonly mediaLabels: MediaLabels;
  readonly colophon: string;
}
