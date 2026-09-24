import type { ReactNode } from "react";
import { PhoneReveals } from "@/components/phone/PhoneReveals";

/**
 * The phone tree, served at the site's own paths to phones by a rewrite in
 * next.config.mjs; nobody sees /m. The same views as the desktop tree with
 * the phone kit: no GSAP, no Lenis, no cursor, no three.js. PhoneReveals is
 * its only motion script.
 */
export default function PhoneLayout({ children }: { readonly children: ReactNode }) {
  return (
    <>
      <PhoneReveals />
      {children}
    </>
  );
}
