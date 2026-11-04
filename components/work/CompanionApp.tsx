import Image from "next/image";
import { SectionLabel } from "@/components/SectionLabel";
import type { MotionKit } from "@/lib/kit";
import { blurFor, PHONE_QUALITY } from "@/lib/media";
import type { CompanionApp as CompanionAppContent } from "@/lib/types";

interface Props {
  readonly app: CompanionAppContent;
  /** The stack row's label, as in the hero's metadata. */
  readonly stackLabel: string;
  readonly kit: MotionKit;
}

/**
 * A project's phone app, after its case study: a section set like the ones
 * above it -- label, then prose in two columns -- and the app's screens as
 * one row of phones, six to a row from 80rem, three from 48rem, two below.
 *
 * The bezel is an ink border with the phone's own corners, scaled from the
 * phone's width (`cqw`) so it keeps the same shape at every column size. No
 * notch, no buttons, no shadow: enough to read as a device on the paper
 * ground and no more. Each full screen is 1080 pixels wide, several times any
 * column it gets, so it is sharp at any density.
 */
export function CompanionApp({ app, stackLabel, kit }: Props) {
  const { Text, Plate } = kit;
  return (
    <section
      aria-labelledby="section-companion"
      className="grid grid-cols-12 gap-x-5 border-t border-paper-rule px-5 py-16 md:px-8 md:py-24"
    >
      <SectionLabel id="section-companion" className="col-span-12 md:col-span-4">
        {app.name}
      </SectionLabel>
      <div className="col-span-12 mt-6 grid gap-x-10 gap-y-6 md:col-span-8 md:col-start-5 md:mt-0 lg:grid-cols-2">
        {app.body.map((paragraph) => (
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
        <dl className="border-t border-paper-rule pt-6 text-[0.9375rem] leading-[1.55] lg:col-span-2">
          <dt className="meta text-paper-muted">{stackLabel}</dt>
          <dd className="mt-2">{app.stack.join(" / ")}</dd>
        </dl>
      </div>

      <ul className="col-span-12 mt-12 grid grid-cols-2 gap-x-5 gap-y-8 md:mt-16 md:grid-cols-3 xl:grid-cols-6">
        {app.screens.map((screen) => (
          <li key={screen.src}>
            <figure className="@container">
              <Plate className="rounded-[13cqw] bg-ink p-[2.5cqw]">
                <Image
                  src={screen.src}
                  alt={screen.alt}
                  width={screen.width}
                  height={screen.height}
                  sizes="(min-width: 80rem) 16vw, (min-width: 48rem) 31vw, 46vw"
                  quality={PHONE_QUALITY}
                  placeholder="blur"
                  blurDataURL={blurFor(screen.src)}
                  className="h-auto w-full rounded-[10.5cqw]"
                />
              </Plate>
              <figcaption className="mt-3 text-base font-medium tracking-[-0.01em]">{screen.label}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <p className="col-span-12 mt-8 text-[0.8125rem] leading-snug text-paper-muted md:col-span-5 md:col-start-8">
        {app.note}
      </p>
    </section>
  );
}
