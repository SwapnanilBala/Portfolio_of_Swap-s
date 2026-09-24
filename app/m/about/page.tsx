import { About, aboutMetadata } from "@/components/about/About";
import { phoneKit } from "@/components/kits/phone";

export const metadata = aboutMetadata;

export default function Page() {
  return <About kit={phoneKit} />;
}
