"use client";

import dynamic from "next/dynamic";
import type { MapPoint } from "@/components/map/FarmMapPoints";

// Leaflet đụng vào `window` khi load module -> phải import kiểu dynamic + ssr:false.
const FarmMapPoints = dynamic(
  () => import("@/components/map/FarmMapPoints").then((m) => m.FarmMapPoints),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-neutral-300 text-sm text-neutral-500">
        Đang tải bản đồ…
      </div>
    ),
  }
);

export function FarmMapPointsClient({ points }: { points: MapPoint[] }) {
  return <FarmMapPoints points={points} />;
}
