"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  harvestLogSchema,
  type HarvestLogInput,
} from "@/lib/validations/harvest-log.schema";
import { createHarvestLog, updateHarvestLog } from "@/lib/actions/harvest-logs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Tables } from "@/types/database.types";

type HarvestLog = Tables<"harvest_logs">;
type Farm = Pick<Tables<"farms">, "id" | "name">;
type GrowingArea = Pick<Tables<"growing_areas">, "id" | "code" | "farm_id">;

const COMMON_CROP_SUGGESTIONS = [
  "Sầu riêng",
  "Cà chua",
  "Dưa hấu",
  "Lúa",
  "Cà phê",
  "Bưởi",
  "Cam",
  "Thanh long",
  "Xoài",
  "Rau ăn lá",
];

const QUALITY_GRADES = [
  "Xuất khẩu",
  "Loại 1",
  "Loại 2",
  "Loại 3",
  "Thô / Chưa phân loại",
];

export function HarvestLogForm({
  harvestLog,
  farms,
  growingAreas,
  onSuccess,
}: {
  harvestLog?: HarvestLog;
  farms: Farm[];
  growingAreas: GrowingArea[];
  onSuccess: () => void;
}) {
  const [error, setError] = useState<string | null>(null);

  const defaultFarmId = harvestLog?.farm_id ?? (farms[0]?.id || "");
  const defaultAreaId = harvestLog?.growing_area_id ?? "";

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<HarvestLogInput>({
    resolver: zodResolver(harvestLogSchema),
    defaultValues: {
      farm_id: defaultFarmId,
      growing_area_id: defaultAreaId,
      harvest_date: harvestLog?.harvest_date ?? new Date().toISOString().slice(0, 10),
      crop_name: harvestLog?.crop_name ?? "",
      quantity: harvestLog?.quantity ? Number(harvestLog.quantity) : 0,
      unit: harvestLog?.unit ?? "kg",
      estimated_value: harvestLog?.estimated_value ? Number(harvestLog.estimated_value) : undefined,
      quality_grade: harvestLog?.quality_grade ?? "Loại 1",
      notes: harvestLog?.notes ?? "",
    },
  });

  const selectedFarmId = watch("farm_id");
  const filteredAreas = growingAreas.filter((a) => a.farm_id === selectedFarmId);

  async function onSubmit(values: HarvestLogInput) {
    setError(null);
    const res = harvestLog
      ? await updateHarvestLog(harvestLog.id, values)
      : await createHarvestLog(values);

    if ("error" in res) {
      setError(res.error);
    } else {
      onSuccess();
    }
  }

  const selectClassName =
    "flex h-9 w-full rounded-md border border-neutral-300 bg-white px-3 py-1 text-sm shadow-sm transition-colors outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive font-medium">
          {error}
        </div>
      )}

      {/* Farm select */}
      <div>
        <Label htmlFor="farm_id">Nông trại *</Label>
        <select
          id="farm_id"
          className={selectClassName}
          value={selectedFarmId}
          onChange={(e) => {
            const fId = e.target.value;
            setValue("farm_id", fId);
            const matchingAreas = growingAreas.filter((a) => a.farm_id === fId);
            setValue("growing_area_id", matchingAreas[0]?.id || "");
          }}
        >
          {farms.map((f) => (
            <option key={f.id} value={f.id}>
              {f.name}
            </option>
          ))}
        </select>
        {errors.farm_id && (
          <p className="mt-1 text-xs text-destructive">{errors.farm_id.message}</p>
        )}
      </div>

      {/* Growing Area select */}
      <div>
        <Label htmlFor="growing_area_id">Vùng trồng *</Label>
        <select
          id="growing_area_id"
          className={selectClassName}
          {...register("growing_area_id")}
        >
          <option value="">-- Chọn vùng trồng --</option>
          {filteredAreas.map((a) => (
            <option key={a.id} value={a.id}>
              {a.code}
            </option>
          ))}
        </select>
        {errors.growing_area_id && (
          <p className="mt-1 text-xs text-destructive">
            {errors.growing_area_id.message}
          </p>
        )}
      </div>

      {/* Ngày thu hoạch */}
      <div>
        <Label htmlFor="harvest_date">Ngày thu hoạch *</Label>
        <Input id="harvest_date" type="date" {...register("harvest_date")} />
        {errors.harvest_date && (
          <p className="mt-1 text-xs text-destructive">{errors.harvest_date.message}</p>
        )}
      </div>

      {/* Tên nông sản / Cây trồng */}
      <div>
        <Label htmlFor="crop_name">Nông sản / Cây trồng thu hoạch *</Label>
        <Input
          id="crop_name"
          list="crop-suggestions"
          placeholder="Ví dụ: Sầu riêng, Cà chua, Lúa..."
          {...register("crop_name")}
        />
        <datalist id="crop-suggestions">
          {COMMON_CROP_SUGGESTIONS.map((crop) => (
            <option key={crop} value={crop} />
          ))}
        </datalist>
        {errors.crop_name && (
          <p className="mt-1 text-xs text-destructive">{errors.crop_name.message}</p>
        )}
      </div>

      {/* Sản lượng & Đơn vị tính */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="quantity">Sản lượng *</Label>
          <Input
            id="quantity"
            type="number"
            step="0.01"
            placeholder="0.00"
            {...register("quantity", { valueAsNumber: true })}
          />
          {errors.quantity && (
            <p className="mt-1 text-xs text-destructive">{errors.quantity.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="unit">Đơn vị tính *</Label>
          <select id="unit" className={selectClassName} {...register("unit")}>
            <option value="kg">kg</option>
            <option value="tấn">tấn</option>
            <option value="tạ">tạ</option>
            <option value="sọt">sọt</option>
            <option value="bao">bao</option>
            <option value="trái">trái / quả</option>
            <option value="thùng">thùng</option>
          </select>
          {errors.unit && (
            <p className="mt-1 text-xs text-destructive">{errors.unit.message}</p>
          )}
        </div>
      </div>

      {/* Chất lượng / Phân loại & Thành tiền */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="quality_grade">Chất lượng / Phân loại</Label>
          <select
            id="quality_grade"
            className={selectClassName}
            {...register("quality_grade")}
          >
            {QUALITY_GRADES.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="estimated_value">Giá trị ước tính (VNĐ)</Label>
          <Input
            id="estimated_value"
            type="number"
            step="1000"
            placeholder="Ví dụ: 15000000"
            {...register("estimated_value", {
              setValueAs: (v) => (v === "" || v === null ? undefined : Number(v)),
            })}
          />
        </div>
      </div>

      {/* Ghi chú */}
      <div>
        <Label htmlFor="notes">Ghi chú</Label>
        <Textarea
          id="notes"
          rows={2}
          placeholder="Thông tin thêm về đợt thu hoạch..."
          {...register("notes")}
        />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="submit" disabled={isSubmitting} className="bg-emerald-700 hover:bg-emerald-800 text-white">
          {isSubmitting ? "Đang lưu…" : harvestLog ? "Cập nhật" : "Lưu nhật ký thu hoạch"}
        </Button>
      </div>
    </form>
  );
}
