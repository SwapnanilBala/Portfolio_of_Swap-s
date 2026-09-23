import type { Profile } from "@/lib/types";

interface Props {
  readonly profile: Profile;
  readonly className?: string;
}

/**
 * Name, role and the one-line introduction -- only on the home page. The name
 * is the page's h1 but set at a medium size, per his instruction, so it reads
 * as a signature rather than competing with the project titles below it.
 * Pointer events pass through, so the slider can be dragged from anywhere.
 */
export function HomeMasthead({ profile, className = "" }: Props) {
  return (
    <header
      className={`pointer-events-none grid grid-cols-12 gap-x-5 px-5 pt-5 text-paper md:px-8 md:pt-7 ${className}`}
    >
      <div className="col-span-10 md:col-span-4">
        <h1 className="text-[clamp(1.25rem,1.55vw,1.875rem)] font-semibold uppercase leading-[0.95] tracking-[-0.025em]">
          {profile.name}
        </h1>
        <p className="meta mt-2.5 text-ink-muted">
          {profile.role} / {profile.affiliation}
        </p>
      </div>
      <p className="col-span-12 mt-5 max-w-[38ch] text-[0.8125rem] leading-[1.45] md:col-span-4 md:col-start-5 md:mt-0">
        {profile.intro}
      </p>
    </header>
  );
}
