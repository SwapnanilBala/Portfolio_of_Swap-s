import { About } from "@/components/about/About";
import { phoneKit } from "@/components/kits/phone";

/** The landing page on a phone: the About page, opening on the resume. */
export default function Page() {
  return <About kit={phoneKit} />;
}
