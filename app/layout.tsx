import type { Metadata } from "next";
import type { ReactNode } from "react";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { content } from "@/lib/content";
import "./globals.css";

// Self-hosted at build time by next/font: no runtime request to Google, and
// no layout shift, because the metrics are known before the page is served.
//
// Plex replaced Newsreader and JetBrains Mono when the page became a dossier.
// Newsreader is a reading face built for continuous prose; its warmth works
// against a page whose argument is that the figures are checkable. Plex Sans
// and Plex Mono are siblings on the same skeleton, so the spec tables and the
// prose stay on one system rather than two, and their digits line up.
//
// Both need explicit weights: neither ships as a variable font here, so an
// omitted weight silently gets 400 only and every 500/600 rule falls back to
// synthetic bold.
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-sans",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-mono",
});

// Derived from lib/content.ts rather than written here, so the copy rule holds.
// The description joins two content strings rather than authoring a third: a
// search or link preview is often the only thing a recruiter reads before
// deciding whether to open the page, so it has to carry the availability too.
const description = `${content.profile.seeking} ${content.profile.availability}`;

export const metadata: Metadata = {
  title: `${content.profile.name} — portfolio`,
  description,
  openGraph: {
    title: `${content.profile.name} — portfolio`,
    description,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  readonly children: ReactNode;
}) {
  return (
    <html lang="en" className={`${plexSans.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
