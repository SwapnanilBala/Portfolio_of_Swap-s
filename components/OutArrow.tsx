/**
 * A hairline arrow pointing out of the page, travelling a little that way when
 * its `group` link is hovered or focused: the mark of a link that leaves the
 * site or opens a document. The stroke stays a hairline at any size.
 */
export function OutArrow({ className = "size-[0.95em]" }: { readonly className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 12"
      className={`shrink-0 overflow-visible transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-focus-visible:-translate-y-0.5 group-focus-visible:translate-x-0.5 reduced:transition-none ${className}`}
    >
      <path
        d="M1 11L11 1M3 1h8v8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
