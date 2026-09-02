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
export const metadata: Metadata = {
  title: `${content.profile.name} — portfolio`,
  description: content.profile.seeking,
  openGraph: {
    title: `${content.profile.name} — portfolio`,
    description: content.profile.seeking,
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
