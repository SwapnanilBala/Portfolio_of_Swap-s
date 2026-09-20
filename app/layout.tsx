import type { Metadata } from "next";
import type { ReactNode } from "react";
import { JetBrains_Mono, Newsreader } from "next/font/google";
import { content } from "@/lib/content";
import "./globals.css";

// Self-hosted at build time by next/font: no runtime request to Google, and
// no layout shift, because the metrics are known before the page is served.
const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-newsreader",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
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
    <html lang="en" className={`${newsreader.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
