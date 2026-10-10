import { About } from "@/components/about/About";
import { desktopKit } from "@/components/kits/desktop";

/** The landing page: the About page, opening on the resume. */
export default function Page() {
  return <About kit={desktopKit} />;
}
