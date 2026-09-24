import { About, aboutMetadata } from "@/components/about/About";
import { desktopKit } from "@/components/kits/desktop";

export const metadata = aboutMetadata;

export default function Page() {
  return <About kit={desktopKit} />;
}
