import type { Metadata } from "next";
import { desktopKit } from "@/components/kits/desktop";
import { CaseStudy, caseStudyMetadata, caseStudyParams } from "@/components/work/CaseStudy";

// Every case study is known at build time; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudyParams();
}

interface Params {
  readonly params: Promise<{ readonly slug: string }>;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  return caseStudyMetadata(slug);
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  return <CaseStudy slug={slug} kit={desktopKit} />;
}
