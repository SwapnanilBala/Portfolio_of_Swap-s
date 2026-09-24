import { IndexPage, indexMetadata } from "@/components/index/IndexPage";
import { IndexView } from "@/components/index/IndexView";
import { desktopKit } from "@/components/kits/desktop";

export const metadata = indexMetadata;

export default function Page() {
  return <IndexPage kit={desktopKit} View={IndexView} />;
}
