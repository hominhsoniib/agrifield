"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FertilizerApplicationForm } from "@/components/forms/FertilizerApplicationForm";
import type { Tables } from "@/types/database.types";

type Farm = Pick<Tables<"farms">, "id" | "name">;
type GrowingArea = Pick<Tables<"growing_areas">, "id" | "code" | "farm_id">;
type FertilizerProduct = Pick<Tables<"fertilizer_products">, "id" | "name" | "unit">;

export function NewFertilizerLogClient({
  farms,
  growingAreas,
  fertilizerProducts,
}: {
  farms: Farm[];
  growingAreas: GrowingArea[];
  fertilizerProducts: FertilizerProduct[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultFarmId = searchParams.get("farm_id") ?? undefined;
  const defaultGrowingAreaId = searchParams.get("growing_area_id") ?? undefined;

  return (
    <FertilizerApplicationForm
      farms={farms}
      growingAreas={growingAreas}
      fertilizerProducts={fertilizerProducts}
      defaultFarmId={defaultFarmId}
      defaultGrowingAreaId={defaultGrowingAreaId}
      onSuccess={() => router.push("/fertilizer-logs")}
    />
  );
}
