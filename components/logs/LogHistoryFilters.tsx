"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ACTIVITY_TYPES } from "@/lib/validations/farm-activity.schema";

export function LogHistoryFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function setParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap items-end gap-3 rounded-lg border border-neutral-200 p-3">
      <div>
        <Label htmlFor="date_from">Từ ngày</Label>
        <Input
          id="date_from"
          type="date"
          className="mt-1"
          defaultValue={searchParams.get("date_from") ?? ""}
          onChange={(e) => setParam("date_from", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="date_to">Đến ngày</Label>
        <Input
          id="date_to"
          type="date"
          className="mt-1"
          defaultValue={searchParams.get("date_to") ?? ""}
          onChange={(e) => setParam("date_to", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="type">Loại</Label>
        <Select
          value={searchParams.get("type") ?? "all"}
          onValueChange={(v) => setParam("type", v === "all" ? "" : (v ?? ""))}
        >
          <SelectTrigger id="type" className="mt-1 w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="fertilizer">Bón phân (nhật ký riêng)</SelectItem>
            {ACTIVITY_TYPES.map((t) => (
              <SelectItem key={t.value} value={t.value}>
                {t.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
