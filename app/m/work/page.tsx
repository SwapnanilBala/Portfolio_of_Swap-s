import { IndexPage, indexMetadata } from "@/components/index/IndexPage";
import { phoneKit } from "@/components/kits/phone";
import { PhoneIndexView } from "@/components/phone/PhoneIndexView";

export const metadata = indexMetadata;

export default function Page() {
  return <IndexPage kit={phoneKit} View={PhoneIndexView} />;
}
