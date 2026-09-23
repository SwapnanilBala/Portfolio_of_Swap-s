import type { Metadata } from "next";
import Link from "next/link";
import { PageTransition } from "@/components/PageTransition";
import { content } from "@/lib/content";

export const metadata: Metadata = { title: content.ui.notFound.heading };

export default function NotFound() {
  const { notFound } = content.ui;
  return (
    <PageTransition>
      <main
        id="main"
        data-tone="light"
        className="flex min-h-svh flex-col justify-end bg-paper px-5 pb-10 text-ink md:px-8"
      >
        <h1 className="display text-[22vw]">{notFound.heading}</h1>
        <div className="mt-8 flex flex-wrap items-baseline justify-between gap-4 border-t border-paper-rule pt-4">
          <p className="max-w-[36ch] text-paper-muted">{notFound.body}</p>
          <Link
            href="/work"
            transitionTypes={["page"]}
            className="meta underline underline-offset-4"
          >
            {notFound.home}
          </Link>
        </div>
      </main>
    </PageTransition>
  );
}
