"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FarmActivityForm } from "@/components/forms/FarmActivityForm";
import type { Tables } from "@/types/database.types";

type Farm = Pick<Tables<"farms">, "id" | "name">;
type GrowingArea = Pick<Tables<"growing_areas">, "id" | "code" | "farm_id">;

export function NewFarmActivityClient({
  farms,
  growingAreas,
}: {
  farms: Farm[];
  growingAreas: GrowingArea[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultFarmId = searchParams.get("farm_id") ?? undefined;
  const defaultGrowingAreaId = searchParams.get("growing_area_id") ?? undefined;

  return (
    <FarmActivityForm
      farms={farms}
      growingAreas={growingAreas}
      defaultFarmId={defaultFarmId}
      defaultGrowingAreaId={defaultGrowingAreaId}
      onSuccess={() => router.push("/care-logs")}
    />
  );
}
