import type { MotionKit } from "@/lib/kit";
import type { CaseSection as CaseSectionContent } from "@/lib/types";

interface Props {
  readonly section: CaseSectionContent;
  readonly label: string;
  readonly kit: MotionKit;
}

/**
 * A label in its own column, the prose in two beside it -- the brief's upper
 * limit of three text columns, reached only on wide screens. Lines rise into
 * place as the section scrolls in.
 */
export function CaseSection({ section, label, kit }: Props) {
  const { Text } = kit;
  return (
    <section
      aria-labelledby={`section-${section.id}`}
      className="grid grid-cols-12 gap-x-5 border-t border-paper-rule px-5 py-16 md:px-8 md:py-24"
    >
      <h2 id={`section-${section.id}`} className="meta col-span-12 text-paper-muted md:col-span-3">
        {label}
      </h2>
      <div className="col-span-12 mt-6 grid gap-x-10 gap-y-6 md:col-span-8 md:col-start-5 md:mt-0 lg:grid-cols-2">
        {section.body.map((paragraph) => (
          <Text
            key={paragraph}
            as="p"
            when="view"
            stagger={0.05}
            className="max-w-[62ch] text-[1.0625rem] leading-[1.55] md:text-lg"
          >
            {paragraph}
          </Text>
        ))}
        {section.points ? (
          <ul className="grid gap-4 border-t border-paper-rule pt-6 lg:col-span-2">
            {section.points.map((point) => (
              <li key={point} className="grid grid-cols-[1.25rem_1fr] text-[0.9375rem] leading-[1.55]">
                <span aria-hidden="true" className="mt-[0.7em] h-px w-2.5 bg-ink" />
                <span className="max-w-[70ch]">{point}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
