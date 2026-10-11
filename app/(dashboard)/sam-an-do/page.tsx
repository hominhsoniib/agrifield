import { SamAnDoGuide } from "@/components/guides/SamAnDoGuide";
import { getSiteContent } from "@/lib/actions/content";

export const metadata = {
  title: "Kỹ thuật trồng Sâm Ấn Độ (Ashwagandha) — FarmTrack",
  description: "Quy trình trồng, kỹ thuật làm đất & kỹ thuật ủ phân hữu cơ vi sinh cho Sâm Ấn Độ",
};

export default async function SamAnDoPage() {
  const dynamicContent = await getSiteContent("sam-an-do-guide");
  return <SamAnDoGuide dynamicContent={dynamicContent} />;
}

