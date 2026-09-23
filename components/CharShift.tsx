interface Props {
  readonly text: string;
}

/**
 * Letters that lift a few pixels in sequence when their parent link is
 * hovered or focused. The visible letters are hidden from assistive
 * technology and the word is announced once, whole, from a visually hidden
 * copy -- otherwise a screen reader would spell it out.
 *
 * The parent must carry Tailwind's `group` class.
 */
export function CharShift({ text }: Props) {
  return (
    <span className="relative inline-flex">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline-flex">
        {Array.from(text).map((char, i) => (
          <span
            key={i}
            className="inline-block transition-transform duration-300 ease-out-expo group-hover:-translate-y-[3px] group-focus-visible:-translate-y-[3px] reduced:transition-none reduced:group-hover:translate-y-0"
            style={{ transitionDelay: `${i * 18}ms` }}
          >
            {char === " " ? " " : char}
          </span>
        ))}
      </span>
    </span>
  );
}
