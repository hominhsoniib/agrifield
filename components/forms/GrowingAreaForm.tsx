"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  growingAreaSchema,
  type GrowingAreaFormValues,
  type GrowingAreaInput,
} from "@/lib/validations/growing-area.schema";
import {
  createGrowingArea,
  updateGrowingArea,
} from "@/lib/actions/growing-areas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Tables } from "@/types/database.types";

type GrowingArea = Tables<"growing_areas">;
type Farm = Pick<Tables<"farms">, "id" | "name">;
type Crop = Pick<Tables<"crops">, "id" | "name">;

export function GrowingAreaForm({
  growingArea,
  farms,
  crops,
  defaultFarmId,
  onSuccess,
}: {
  growingArea?: GrowingArea;
  farms: Farm[];
  crops: Crop[];
  defaultFarmId?: string;
  onSuccess: () => void;
}) {
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<GrowingAreaFormValues, unknown, GrowingAreaInput>({
    resolver: zodResolver(growingAreaSchema),
    defaultValues: growingArea
      ? {
          farm_id: growingArea.farm_id ?? "",
          code: growingArea.code,
          crop_id: growingArea.crop_id ?? "",
          area_ha: growingArea.area_ha ?? "",
          variety: growingArea.variety ?? "",
          planting_year: growingArea.planting_year ?? "",
          planting_density: growingArea.planting_density ?? "",
          gps_lat: growingArea.gps_lat ?? "",
          gps_lng: growingArea.gps_lng ?? "",
          notes: growingArea.notes ?? "",
        }
      : {
          farm_id: defaultFarmId ?? "",
          code: "",
          crop_id: "",
          area_ha: "",
          variety: "",
          planting_year: "",
          planting_density: "",
          gps_lat: "",
          gps_lng: "",
          notes: "",
        },
  });

  async function onSubmit(values: GrowingAreaInput) {
    setServerError(null);
    const result = growingArea
      ? await updateGrowingArea(growingArea.id, values)
      : await createGrowingArea(values);
    if ("error" in result) {
      setServerError(result.error);
      return;
    }
    onSuccess();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>
      <div>
        <Label htmlFor="farm_id">Nông trại *</Label>
        <Controller
          control={control}
          name="farm_id"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="farm_id" className="mt-1 w-full">
                <SelectValue placeholder="Chọn nông trại" />
              </SelectTrigger>
              <SelectContent>
                {farms.map((f) => (
                  <SelectItem key={f.id} value={f.id}>
                    {f.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.farm_id && (
          <p className="mt-1 text-xs text-destructive">
            {errors.farm_id.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="code">Mã / tên vùng trồng *</Label>
        <Input id="code" className="mt-1" {...register("code")} />
        {errors.code && (
          <p className="mt-1 text-xs text-destructive">{errors.code.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="crop_id">Loại cây trồng</Label>
        <Controller
          control={control}
          name="crop_id"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="crop_id" className="mt-1 w-full">
                <SelectValue placeholder="Chọn cây trồng (tuỳ chọn)" />
              </SelectTrigger>
              <SelectContent>
                {crops.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="area_ha">Diện tích (ha)</Label>
          <Input
            id="area_ha"
            type="text"
            inputMode="decimal"
            className="mt-1"
            {...register("area_ha")}
          />
        </div>
        <div>
          <Label htmlFor="planting_year">Năm trồng</Label>
          <Input
            id="planting_year"
            type="text"
            inputMode="numeric"
            className="mt-1"
            {...register("planting_year")}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="variety">Giống</Label>
        <Input id="variety" className="mt-1" {...register("variety")} />
      </div>

      <div>
        <Label htmlFor="planting_density">Mật độ trồng</Label>
        <Input
          id="planting_density"
          className="mt-1"
          {...register("planting_density")}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="gps_lat">Vĩ độ (lat)</Label>
          <Input
            id="gps_lat"
            type="text"
            inputMode="decimal"
            className="mt-1"
            {...register("gps_lat")}
          />
        </div>
        <div>
          <Label htmlFor="gps_lng">Kinh độ (lng)</Label>
          <Input
            id="gps_lng"
            type="text"
            inputMode="decimal"
            className="mt-1"
            {...register("gps_lng")}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="notes">Ghi chú</Label>
        <Input id="notes" className="mt-1" {...register("notes")} />
      </div>

      {serverError && (
        <p role="alert" className="text-sm text-destructive">
          {serverError}
        </p>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting
          ? "Đang lưu…"
          : growingArea
            ? "Lưu thay đổi"
            : "Tạo vùng trồng"}
      </Button>
    </form>
  );
}
