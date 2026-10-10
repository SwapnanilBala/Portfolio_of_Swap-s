interface Props {
  /** The page's h1, visually hidden: the slider itself is what it names. */
  readonly heading: string;
  readonly intro: string;
  /** Placement and padding belong to the call site: absolute on desktop, in flow on phones. */
  readonly className?: string;
}

/**
 * The one-line introduction above the slider. The name and role are the
 * landing page's now, where they head the resume, so the top-left corner
 * here belongs to the way home. Pointer events pass through, so the slider
 * can be dragged from anywhere.
 */
export function SliderMasthead({ heading, intro, className = "" }: Props) {
  return (
    <header className={`pointer-events-none grid grid-cols-12 gap-x-5 text-paper ${className}`}>
      <h1 className="sr-only">{heading}</h1>
      <p className="col-span-12 max-w-[50ch] text-[0.8125rem] leading-[1.45] md:col-span-5 md:col-start-5">
        {intro}
      </p>
    </header>
  );
}
