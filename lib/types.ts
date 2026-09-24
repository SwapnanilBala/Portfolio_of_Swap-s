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

/**
 * A still between case-study sections. There is no video variant: nothing on
 * the site has a clip yet, and the poster-gated player went with the dossier
 * design (it is at 17e793e, components/ProjectMedia.tsx). When the palm-reading
 * clip arrives, bring the player back and reintroduce a `kind: "video"` member
 * with a required poster -- a poster-less video downloads bytes on page load.
 */
export interface ImageMedia extends ImageAsset {
  readonly kind: "image";
  readonly caption?: string;
}

/**
 * Two captures read together, side by side from 48rem with the explanation
 * beside them, stacked below it. Exactly two: a tuple, so a third cannot be
 * added without a layout for it.
 */
export interface MediaPair {
  readonly kind: "pair";
  /** A few words, set as metadata: what the two show together. */
  readonly title: string;
  /** A sentence or two, set beside the pair. */
  readonly body: string;
  readonly images: readonly [PairedImage, PairedImage];
}

/** One half of a pair, with a label of a few words under it. */
export interface PairedImage extends ImageAsset {
  readonly label: string;
}

/** What may follow a case-study section: one plate, or a pair. */
export type SectionMedia = ImageMedia | MediaPair;

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
  /** Rendered after this section: one large plate, or a pair. */
  readonly media?: SectionMedia;
}

export interface CaseStudy {
  readonly sections: readonly CaseSection[];
}

/* --------------------------------------------------------------- projects */

interface ProjectBase {
  readonly slug: string;
  readonly name: string;
  /**
   * Where the display title breaks when it is set enormous. Designed rather
   * than left to wrapping, which splits a three-word name three ways at some
   * widths and pushes the title past its share of the viewport. Defaults to
   * the name on one line.
   */
  readonly displayLines?: readonly string[];
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
 *
 * `hero` is a 16:10 desktop capture and `heroMobile` a phone capture of the
 * same screen. A portrait plate cut from a landscape capture keeps only a
 * sliver of the middle, so the phone gets the product's own phone layout.
 */
export interface SelectedProject extends ProjectBase {
  readonly selected: true;
  readonly hero: ImageAsset;
  readonly heroMobile: ImageAsset;
  readonly caseStudy: CaseStudy;
}

/** A project that lives in the Index only. */
export interface ArchivedProject extends ProjectBase {
  readonly selected: false;
  readonly hero?: ImageAsset;
  readonly heroMobile?: ImageAsset;
  /** Present when the archive entry has its own page. */
  readonly caseStudy?: CaseStudy;
  /**
   * The picture for a project with no screen to capture, drawn from its own
   * data: the Index cover and the case-study hero.
   */
  readonly dotField?: DotField;
}

export type Project = SelectedProject | ArchivedProject;

export function isSelected(project: Project): project is SelectedProject {
  return project.selected;
}

export function displayLinesOf(project: Project): readonly string[] {
  return project.displayLines ?? [project.name];
}

/** A project with a page of its own at /work/[slug]. */
export type ProjectWithCase = Project & { readonly caseStudy: CaseStudy };

export function hasCaseStudy(project: Project): project is ProjectWithCase {
  return project.caseStudy !== undefined;
}

/**
 * A dataset drawn as a field of dots, one dot for every `unit` rows, the
 * groups laid down in order so each becomes a band. Every count is a real one;
 * the picture is the data at a glance, not an illustration of it.
 */
export interface DotField {
  /** Rows per dot. */
  readonly unit: number;
  /** Describes the whole picture for anyone who cannot see it. */
  readonly alt: string;
  readonly groups: readonly DotGroup[];
}

export interface DotGroup {
  /** Legend text, e.g. "Fake". */
  readonly label: string;
  readonly count: number;
  /** Solid bright, solid muted, or an outline for rows set aside. */
  readonly tone: "strong" | "muted" | "hollow";
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
    /** Over the plate on stage, which a click opens. */
    readonly open: string;
    /** While dragging, by direction. */
    readonly dragLeft: string;
    readonly dragRight: string;
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
  /** Previous and next at the foot of each case study. */
  readonly caseNav: {
    readonly label: string;
    readonly previous: string;
    readonly next: string;
  };
  /** The top-left way home, on every page but home. */
  readonly homeLink: {
    readonly label: string;
    /** The initials inside the crop marks, as in the favicon. */
    readonly monogram: string;
  };
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
