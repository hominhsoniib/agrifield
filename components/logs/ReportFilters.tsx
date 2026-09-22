"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ACTIVITY_TYPES } from "@/lib/validations/farm-activity.schema";

type Farm = { id: string; name: string };
type GrowingArea = { id: string; code: string; farm_id: string | null };

export function ReportFilters({
  farms,
  growingAreas,
}: {
  farms: Farm[];
  growingAreas: GrowingArea[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const farmId = searchParams.get("farm_id") ?? "";
  const filteredGrowingAreas = useMemo(
    () => (farmId ? growingAreas.filter((ga) => ga.farm_id === farmId) : growingAreas),
    [growingAreas, farmId]
  );

  function setParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    if (key === "farm_id") params.delete("growing_area_id");
    router.push(`${pathname}?${params.toString()}`);
  }

  const exportHref = `/api/reports/care-logs?${searchParams.toString()}`;

  return (
    <div className="flex flex-wrap items-end gap-3 rounded-lg border border-neutral-200 p-3">
      <div>
        <Label htmlFor="r_farm">Nông trại</Label>
        <Select value={farmId} onValueChange={(v) => setParam("farm_id", v ?? "")}>
          <SelectTrigger id="r_farm" className="mt-1 w-44">
            <SelectValue placeholder="Tất cả" />
          </SelectTrigger>
          <SelectContent>
            {farms.map((f) => (
              <SelectItem key={f.id} value={f.id}>
                {f.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="r_ga">Vùng trồng</Label>
        <Select
          value={searchParams.get("growing_area_id") ?? ""}
          onValueChange={(v) => setParam("growing_area_id", v ?? "")}
        >
          <SelectTrigger id="r_ga" className="mt-1 w-44">
            <SelectValue placeholder="Tất cả" />
          </SelectTrigger>
          <SelectContent>
            {filteredGrowingAreas.map((ga) => (
              <SelectItem key={ga.id} value={ga.id}>
                {ga.code}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="r_from">Từ ngày</Label>
        <Input
          id="r_from"
          type="date"
          className="mt-1"
          defaultValue={searchParams.get("date_from") ?? ""}
          onChange={(e) => setParam("date_from", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="r_to">Đến ngày</Label>
        <Input
          id="r_to"
          type="date"
          className="mt-1"
          defaultValue={searchParams.get("date_to") ?? ""}
          onChange={(e) => setParam("date_to", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="r_type">Loại hoạt động</Label>
        <Select
          value={searchParams.get("type") ?? "all"}
          onValueChange={(v) => setParam("type", v === "all" ? "" : (v ?? ""))}
        >
          <SelectTrigger id="r_type" className="mt-1 w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            {ACTIVITY_TYPES.map((t) => (
              <SelectItem key={t.value} value={t.value}>
                {t.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button render={<a href={exportHref} />}>Xuất CSV</Button>
    </div>
  );
}
