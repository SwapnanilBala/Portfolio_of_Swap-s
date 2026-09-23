import Image from "next/image";
import { DisplayTitle } from "@/components/DisplayTitle";
import { SharedMedia } from "@/components/PageTransition";
import { RevealLines } from "@/components/RevealLines";
import { blurFor, HERO_BRIGHTNESS } from "@/lib/media";
import { displayLinesOf, type DataHero, type ProjectWithCase, type UiCopy } from "@/lib/types";

interface Props {
  readonly project: ProjectWithCase;
  readonly meta: UiCopy["caseMeta"];
}

/**
 * Bars on a zero-to-one scale, so a 0.033 gap looks like the 0.033 it is. A
 * scale starting at the lowest score would have made the winner look twice
 * the baseline.
 */
function DataHeroChart({ hero }: { readonly hero: DataHero }) {
  return (
    <figure className="absolute inset-x-5 top-[18vh] md:inset-x-8">
      <p className="meta text-ink-muted">{hero.metric}</p>
      <ul className="mt-6 grid gap-5">
        {hero.bars.map((bar) => (
          <li
            key={bar.label}
            className="grid grid-cols-[minmax(0,11rem)_1fr_3.5rem] items-center gap-x-5 md:grid-cols-[16rem_1fr_4rem]"
          >
            <span className="meta">{bar.label}</span>
            <span className="h-2 bg-ink-rule">
              <span className="block h-full bg-paper" style={{ width: `${bar.value * 100}%` }} />
            </span>
            <span className="meta text-right tabular-nums">{bar.value.toFixed(3)}</span>
          </li>
        ))}
      </ul>
      <figcaption className="mt-6 max-w-[48ch] text-[0.8125rem] leading-snug text-ink-muted">
        {hero.caption}
      </figcaption>
    </figure>
  );
}

/**
 * One enormous visual filling the first viewport, the title over it, and the
 * ROLE / YEAR / STACK / TYPE row under the title. The image is the far end of
 * the shared-element morph from the slider plate or the index card.
 */
export function ProjectHero({ project, meta }: Props) {
  const image = project.hero ?? project.cover;
  const dataHero = project.selected ? undefined : project.dataHero;

  return (
    <section className="relative h-svh min-h-[36rem] overflow-hidden bg-ink text-paper">
      <SharedMedia slug={project.slug}>
        <div className="absolute inset-0 overflow-hidden bg-ink">
          {image ? (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="100vw"
              placeholder="blur"
              blurDataURL={blurFor(image.src)}
              className="object-cover"
              style={{ filter: `brightness(${HERO_BRIGHTNESS})` }}
            />
          ) : null}
        </div>
      </SharedMedia>

      {!image && dataHero ? <DataHeroChart hero={dataHero} /> : null}

      <RevealLines className="absolute inset-x-5 bottom-7 md:inset-x-8 md:bottom-9">
        <DisplayTitle as="h1" lines={displayLinesOf(project)} className="text-[min(17vh,12.5vw)]" />
        <dl
          data-reveal-meta
          className="meta mt-8 grid grid-cols-2 gap-x-8 gap-y-4 border-t border-ink-rule pt-4 md:grid-cols-12"
        >
          <div className="md:col-span-2">
            <dt className="text-ink-muted">{meta.role}</dt>
            <dd className="mt-1">{project.role}</dd>
          </div>
          <div className="md:col-span-2">
            <dt className="text-ink-muted">{meta.year}</dt>
            <dd className="mt-1 tabular-nums">{project.year}</dd>
          </div>
          <div className="col-span-2 md:col-span-5">
            <dt className="text-ink-muted">{meta.stack}</dt>
            <dd className="mt-1">{project.stack.join(" / ")}</dd>
          </div>
          <div className="md:col-span-3">
            <dt className="text-ink-muted">{meta.type}</dt>
            <dd className="mt-1">{project.type}</dd>
          </div>
        </dl>
      </RevealLines>
    </section>
  );
}
