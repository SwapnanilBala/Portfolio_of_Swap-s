import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import type { ReactNode } from "react";
import { CustomCursor } from "@/components/CustomCursor";
import { HomeLink } from "@/components/HomeLink";
import { SiteNav } from "@/components/SiteNav";
import { SmoothScroll } from "@/components/SmoothScroll";
import { content } from "@/lib/content";
import "./globals.css";

// Variable, so every weight the stylesheet asks for is a real face rather
// than synthetic bold. Self-hosted at build time by next/font.
const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-tight",
});

// Runs before first paint. `js` lets the stylesheet hide text that is about to
// be revealed without hiding it for anyone who has no JavaScript at all; the
// `motion` flag mirrors reduced motion for browsers that cannot emulate it.
const HEAD_SCRIPT =
  'document.documentElement.classList.add("js");' +
  'if(/[?&]motion=reduce\\b/.test(location.search))document.documentElement.dataset.motion="reduce";';

const { profile, ui } = content;

export const metadata: Metadata = {
  metadataBase: new URL("https://swapportfolio.vercel.app"),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  description: profile.intro,
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.intro,
    type: "website",
  },
};

export default function RootLayout({ children }: { readonly children: ReactNode }) {
  return (
    // The head script changes this element's class before React hydrates it,
    // which is the one mismatch the warning suppression is scoped to.
    <html lang="en" className={interTight.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: HEAD_SCRIPT }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          {ui.skipLink}
        </a>
        <SmoothScroll />
        <CustomCursor labels={ui.cursor} />
        {/* Before the nav: it sits top left, so it comes first in tab order. */}
        <HomeLink copy={ui.homeLink} />
        <SiteNav labels={ui.nav} />
        {children}
      </body>
    </html>
  );
}
