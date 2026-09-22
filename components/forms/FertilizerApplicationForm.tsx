"use client";

import { useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  fertilizerApplicationSchema,
  fertilizerApplicationDefaults,
  type FertilizerApplicationFormValues,
  type FertilizerApplicationInput,
} from "@/lib/validations/fertilizer-application.schema";
import {
  createFertilizerApplication,
  updateFertilizerApplication,
} from "@/lib/actions/fertilizer-applications";
import { uploadAttachmentFile } from "@/lib/uploads";
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

type FertilizerApplication = Tables<"fertilizer_applications">;
type Farm = Pick<Tables<"farms">, "id" | "name">;
type GrowingArea = Pick<Tables<"growing_areas">, "id" | "code" | "farm_id">;
type FertilizerProduct = Pick<Tables<"fertilizer_products">, "id" | "name" | "unit">;

export function FertilizerApplicationForm({
  entry,
  farms,
  growingAreas,
  fertilizerProducts,
  defaultFarmId,
  defaultGrowingAreaId,
  onSuccess,
}: {
  entry?: FertilizerApplication;
  farms: Farm[];
  growingAreas: GrowingArea[];
  fertilizerProducts: FertilizerProduct[];
  defaultFarmId?: string;
  defaultGrowingAreaId?: string;
  onSuccess: () => void;
}) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoWarning, setPhotoWarning] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<
    FertilizerApplicationFormValues,
    unknown,
    FertilizerApplicationInput
  >({
    resolver: zodResolver(fertilizerApplicationSchema),
    defaultValues: entry
      ? {
          farm_id: entry.farm_id ?? "",
          growing_area_id: entry.growing_area_id ?? "",
          application_date: entry.application_date,
          fertilizer_product_id: entry.fertilizer_product_id ?? "",
          dosage: entry.dosage ?? "",
          dosage_unit: entry.dosage_unit ?? "",
          total_quantity: entry.total_quantity ?? "",
          application_method: entry.application_method ?? "",
          notes: entry.notes ?? "",
        }
      : {
          ...fertilizerApplicationDefaults(),
          farm_id: defaultFarmId ?? "",
          growing_area_id: defaultGrowingAreaId ?? "",
        },
  });

  const selectedFarmId = watch("farm_id");
  const filteredGrowingAreas = useMemo(
    () => growingAreas.filter((ga) => ga.farm_id === selectedFarmId),
    [growingAreas, selectedFarmId]
  );

  async function onSubmit(values: FertilizerApplicationInput) {
    setServerError(null);
    setPhotoWarning(null);

    const result = entry
      ? await updateFertilizerApplication(entry.id, values)
      : await createFertilizerApplication(values);

    if ("error" in result) {
      setServerError(result.error);
      return;
    }

    if (photo) {
      const uploadResult = await uploadAttachmentFile(
        "fertilizer_application",
        result.id,
        photo
      );
      if ("error" in uploadResult) {
        setPhotoWarning(
          `Đã lưu nhật ký nhưng upload ảnh thất bại: ${uploadResult.error}`
        );
        onSuccess();
        return;
      }
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
        <Label htmlFor="growing_area_id">Vùng trồng *</Label>
        <Controller
          control={control}
          name="growing_area_id"
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={field.onChange}
              disabled={!selectedFarmId}
            >
              <SelectTrigger id="growing_area_id" className="mt-1 w-full">
                <SelectValue
                  placeholder={
                    selectedFarmId
                      ? "Chọn vùng trồng"
                      : "Chọn nông trại trước"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {filteredGrowingAreas.map((ga) => (
                  <SelectItem key={ga.id} value={ga.id}>
                    {ga.code}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.growing_area_id && (
          <p className="mt-1 text-xs text-destructive">
            {errors.growing_area_id.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="application_date">Ngày bón phân *</Label>
        <Input
          id="application_date"
          type="date"
          className="mt-1"
          {...register("application_date")}
        />
        {errors.application_date && (
          <p className="mt-1 text-xs text-destructive">
            {errors.application_date.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="fertilizer_product_id">Sản phẩm phân bón</Label>
        <Controller
          control={control}
          name="fertilizer_product_id"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="fertilizer_product_id" className="mt-1 w-full">
                <SelectValue placeholder="Chọn sản phẩm (tuỳ chọn)" />
              </SelectTrigger>
              <SelectContent>
                {fertilizerProducts.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name} ({p.unit})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="dosage">Liều lượng</Label>
          <Input
            id="dosage"
            type="text"
            inputMode="decimal"
            className="mt-1"
            {...register("dosage")}
          />
        </div>
        <div>
          <Label htmlFor="dosage_unit">Đơn vị</Label>
          <Input
            id="dosage_unit"
            placeholder="kg/gốc, lít/ha..."
            className="mt-1"
            {...register("dosage_unit")}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="total_quantity">Tổng số lượng dùng</Label>
        <Input
          id="total_quantity"
          type="text"
          inputMode="decimal"
          className="mt-1"
          {...register("total_quantity")}
        />
      </div>

      <div>
        <Label htmlFor="application_method">Phương pháp bón</Label>
        <Input
          id="application_method"
          className="mt-1"
          {...register("application_method")}
        />
      </div>

      <div>
        <Label htmlFor="notes">Ghi chú</Label>
        <Input id="notes" className="mt-1" {...register("notes")} />
      </div>

      <div>
        <Label htmlFor="photo">Ảnh minh hoạ</Label>
        <input
          id="photo"
          type="file"
          accept="image/*"
          className="mt-1 block w-full text-sm text-neutral-600 file:mr-2 file:rounded-md file:border-0 file:bg-neutral-100 file:px-2.5 file:py-1.5 file:text-sm"
          onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
        />
      </div>

      {serverError && (
        <p role="alert" className="text-sm text-destructive">
          {serverError}
        </p>
      )}
      {photoWarning && (
        <p role="alert" className="text-sm text-amber-600">
          {photoWarning}
        </p>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Đang lưu…" : entry ? "Lưu thay đổi" : "Lưu nhật ký"}
      </Button>
    </form>
  );
}
