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
 * above it -- label, then prose in two columns, in a light glass panel --
 * and the app's screens as one row of phones, each in a small glass frame
 * of its own, six to a row from 80rem, three from 48rem, two below.
 *
 * The bezel is an ink border with the phone's own corners, scaled from the
 * phone's width (`cqw`) so it keeps the same shape at every column size. No
 * notch, no buttons, no shadow: enough to read as a device and no more. The
 * glass frame is around the phone, never over its screen. Each full screen
 * is 1080 pixels wide, several times any column it gets, so it is sharp at
 * any density.
 */
export function CompanionApp({ app, stackLabel, kit }: Props) {
  const { Text, Plate } = kit;
  return (
    <section aria-labelledby="section-companion" className="flex flex-col gap-3 md:gap-5">
      <div className="glass-light grid grid-cols-12 gap-x-5 px-5 py-8 md:px-8 md:py-12">
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
            <dt className="meta text-glass-ink-2">{stackLabel}</dt>
            <dd className="mt-2">{app.stack.join(" / ")}</dd>
          </dl>
        </div>
      </div>

      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 xl:grid-cols-6">
        {app.screens.map((screen) => (
          <li key={screen.src} className="glass-light rounded-glass-sm p-3 md:p-4">
            <figure className="@container">
              <Plate className="rounded-[13cqw] bg-ink p-[2.5cqw]">
                <Image
                  src={screen.src}
                  alt={screen.alt}
                  width={screen.width}
                  height={screen.height}
                  sizes="(min-width: 80rem) 14vw, (min-width: 48rem) 29vw, 42vw"
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
      <p className="glass-light rounded-glass-sm px-5 py-4 text-[0.8125rem] leading-snug text-glass-ink-2 md:ml-auto md:w-5/12">
        {app.note}
      </p>
    </section>
  );
}
