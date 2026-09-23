import type { BlurredMedia } from "@/lib/blur";

/**
 * The content contract.
 *
 * Everything is `readonly`. Consumers that need a different order copy first
 * (`[...projects].sort(...)`) rather than mutate shared content in place.
 *
 * The domain is modelled so the compiler catches incomplete content before a
 * visitor does: a selected project cannot exist without a hero and a case
 * study, and an image cannot be referenced until it has a generated
 * placeholder.
 */

/* ------------------------------------------------------------------ links */

/**
 * Links are stored by role, not by label, so vocabulary stays identical across
 * projects. Labels live in `content.ui.linkLabels`, keyed by this union, so
 * adding a role fails to compile until it has a label.
 */
export type LinkRole = "live" | "source";

export interface ProjectLink {
  readonly role: LinkRole;
  /**
   * Unset while the URL is unknown or private. A link without an href is
   * filtered out before render and never emitted as a dead anchor.
   */
  readonly href?: string;
}

export type ResolvedLink = ProjectLink & { readonly href: string };

export function isResolvedLink(link: ProjectLink): link is ResolvedLink {
  return typeof link.href === "string" && link.href.length > 0;
}

/* ------------------------------------------------------------------ media */

/**
 * Every still on the site. `src` is typed as a key of the generated
 * placeholder map, so a new capture cannot be referenced until
 * `node scripts/build-blur.mjs` has been run over it -- the placeholder is
 * looked up from `src` rather than stored beside it, which makes forgetting
 * one impossible.
 */
export interface ImageAsset {
  readonly src: BlurredMedia;
  /** Intrinsic dimensions. Omitting these causes layout shift. */
  readonly width: number;
  readonly height: number;
  readonly alt: string;
}

export interface ImageMedia extends ImageAsset {
  readonly kind: "image";
  readonly caption?: string;
}

/**
 * `poster`, `caption` and `durationSeconds` are required: a poster-less video
 * downloads bytes on page load, so that state is impossible to express.
 */
export interface VideoMedia extends ImageAsset {
  readonly kind: "video";
  readonly poster: BlurredMedia;
  readonly caption: string;
  readonly durationSeconds: number;
}

export type Media = ImageMedia | VideoMedia;

/* ---------------------------------------------------------------- figures */

/**
 * A number a stranger could independently check: a count, a date, a measured
 * delta. Never an adjective. Renders in the spec tables, where the figures
 * share one right edge.
 */
export interface Figure {
  readonly value: string;
  readonly label: string;
}

/* ------------------------------------------------------------ case study */

/** The brief's case-study structure, in order. */
export type CaseSectionId =
  | "overview"
  | "problem"
  | "approach"
  | "engineering"
  | "outcome";

export interface CaseSection {
  readonly id: CaseSectionId;
  /** Paragraphs of prose. */
  readonly body: readonly string[];
  /** Optional decisions, one per line. Not a feature list. */
  readonly points?: readonly string[];
  /** A large plate rendered after this section. */
  readonly plate?: Media;
}

export interface CaseStudy {
  readonly sections: readonly CaseSection[];
}

/* --------------------------------------------------------------- projects */

interface ProjectBase {
  readonly slug: string;
  readonly name: string;
  /** Shown after the index number: "01 / Astrology engine". */
  readonly category: string;
  /** Display form, e.g. "2026—" or "Fall 2025". */
  readonly year: string;
  /**
   * The year work started, from the first commit where one exists. Drives
   * ordering and the Index year range, so the range is computed rather than
   * typed.
   */
  readonly started: number;
  /** Case-study TYPE row, e.g. "Personal project". */
  readonly type: string;
  /** Case-study ROLE row. */
  readonly role: string;
  readonly stack: readonly string[];
  /** One line, for the Index. */
  readonly summary: string;
  readonly figures: readonly Figure[];
  readonly links: readonly ProjectLink[];
  /** Index cover. Falls back to the hero, then to a typographic plate. */
  readonly cover?: ImageAsset;
}

/**
 * A project in the home slider. The hero and the case study are required, not
 * optional: the slider cannot render a slide without a texture, and every
 * slide opens a case study.
 */
export interface SelectedProject extends ProjectBase {
  readonly selected: true;
  readonly hero: ImageAsset;
  readonly caseStudy: CaseStudy;
}

/** A project that lives in the Index only. */
export interface ArchivedProject extends ProjectBase {
  readonly selected: false;
  readonly hero?: ImageAsset;
  /** Present when the archive entry has its own page. */
  readonly caseStudy?: CaseStudy;
  /**
   * Replaces the hero image on its case study when there is no honest
   * screenshot to show -- the numbers the work actually produced.
   */
  readonly dataHero?: DataHero;
}

export type Project = SelectedProject | ArchivedProject;

export function isSelected(project: Project): project is SelectedProject {
  return project.selected;
}

/** A project with a page of its own at /work/[slug]. */
export type ProjectWithCase = Project & { readonly caseStudy: CaseStudy };

export function hasCaseStudy(project: Project): project is ProjectWithCase {
  return project.caseStudy !== undefined;
}

/**
 * A bar comparison drawn from real results, for a case study whose evidence is
 * a table of numbers rather than a screen.
 */
export interface DataHero {
  readonly caption: string;
  /** The metric being compared, e.g. "Macro F1". */
  readonly metric: string;
  readonly bars: readonly { readonly label: string; readonly value: number }[];
}

/* ------------------------------------------------------------------ about */

export interface Experience {
  readonly org: string;
  readonly role: string;
  readonly period: string;
  readonly location: string;
  readonly details: readonly string[];
}

export interface Education {
  readonly school: string;
  readonly degree: string;
  readonly period: string;
  readonly location: string;
}

export interface Certificate {
  readonly name: string;
  readonly issuer: string;
  readonly date?: string;
  readonly note: string;
}

export interface TechGroup {
  readonly label: string;
  readonly items: readonly string[];
}

/** Something current, with the dated evidence that makes it current. */
export interface Exploration {
  readonly title: string;
  readonly evidence: string;
}

export type AboutSectionId =
  | "about"
  | "experience"
  | "education"
  | "technologies"
  | "exploring";

export interface AboutContent {
  /** The oversized opening, one string per line. */
  readonly statement: readonly string[];
  readonly intro: readonly string[];
  readonly experience: readonly Experience[];
  readonly education: readonly Education[];
  readonly certificates: readonly Certificate[];
  readonly technologies: readonly TechGroup[];
  readonly exploring: readonly Exploration[];
}

/* ---------------------------------------------------------------- profile */

export interface Profile {
  readonly name: string;
  readonly role: string;
  readonly affiliation: string;
  /** The understated line at the top centre of the home page. */
  readonly intro: string;
  readonly location: string;
  /** IANA zone for the footer clock. */
  readonly timeZone: string;
  readonly availability: string;
  /**
   * Dimensions come from here, not from the component, so a higher-resolution
   * replacement is a one-line change to this object.
   */
  readonly portrait: ImageAsset;
}

export type ContactKey = "email" | "github" | "linkedin" | "resume";

export interface ContactRoute {
  readonly key: ContactKey;
  readonly href: string;
  /** Full destination, for the accessible name and the About page. */
  readonly detail: string;
}

/* --------------------------------------------------------------------- ui */

export type NavKey = "selected" | "index" | "about";

export interface UiCopy {
  readonly nav: Readonly<Record<NavKey, string>>;
  readonly skipLink: string;
  readonly linkLabels: Readonly<Record<LinkRole, string>>;
  readonly contactLabels: Readonly<Record<ContactKey, string>>;
  readonly caseSectionLabels: Readonly<Record<CaseSectionId, string>>;
  readonly aboutSectionLabels: Readonly<Record<AboutSectionId, string>>;
  readonly caseMeta: {
    readonly role: string;
    readonly year: string;
    readonly stack: string;
    readonly type: string;
  };
  readonly slider: {
    /** Template. Tokens: {index} {total} {name} */
    readonly announce: string;
    readonly region: string;
    readonly rail: string;
    /** Template. Token: {name} */
    readonly thumbnail: string;
    readonly open: string;
    readonly hint: string;
  };
  readonly cursor: {
    readonly drag: string;
    readonly view: string;
  };
  readonly index: {
    readonly heading: string;
    readonly description: string;
    readonly grid: string;
    readonly list: string;
    readonly toggle: string;
    readonly columns: {
      readonly name: string;
      readonly category: string;
      readonly year: string;
    };
  };
  readonly nextProject: string;
  readonly footer: {
    readonly headline: readonly string[];
    readonly localTime: string;
    /** Template. Token: {year} */
    readonly copyright: string;
  };
  readonly notFound: {
    readonly heading: string;
    readonly body: string;
    readonly home: string;
  };
}

export interface SiteContent {
  readonly profile: Profile;
  readonly projects: readonly Project[];
  readonly about: AboutContent;
  readonly contact: readonly ContactRoute[];
  readonly ui: UiCopy;
}
