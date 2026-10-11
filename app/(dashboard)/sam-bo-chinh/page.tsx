import { SamBoChinhGuide } from "@/components/guides/SamBoChinhGuide";
import { getSiteContent } from "@/lib/actions/content";

export const metadata = {
  title: "Kỹ thuật trồng Sâm Bố Chính — FarmTrack",
  description: "Quy trình trồng, kỹ thuật làm đất & kỹ thuật ủ phân hữu cơ vi sinh cho Sâm Bố Chính",
};

export default async function SamBoChinhPage() {
  const dynamicContent = await getSiteContent("sam-bo-chinh-guide");
  return <SamBoChinhGuide dynamicContent={dynamicContent} />;
}

