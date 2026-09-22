"use client";

import { useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  farmActivitySchema,
  farmActivityDefaults,
  ACTIVITY_TYPES,
  type FarmActivityFormValues,
  type FarmActivityInput,
} from "@/lib/validations/farm-activity.schema";
import {
  createFarmActivity,
  updateFarmActivity,
} from "@/lib/actions/farm-activities";
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

type FarmActivity = Tables<"farm_activities">;
type Farm = Pick<Tables<"farms">, "id" | "name">;
type GrowingArea = Pick<Tables<"growing_areas">, "id" | "code" | "farm_id">;

export function FarmActivityForm({
  entry,
  farms,
  growingAreas,
  defaultFarmId,
  defaultGrowingAreaId,
  onSuccess,
}: {
  entry?: FarmActivity;
  farms: Farm[];
  growingAreas: GrowingArea[];
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
  } = useForm<FarmActivityFormValues, unknown, FarmActivityInput>({
    resolver: zodResolver(farmActivitySchema),
    defaultValues: entry
      ? {
          farm_id: entry.farm_id ?? "",
          growing_area_id: entry.growing_area_id ?? "",
          activity_date: entry.activity_date,
          activity_type: entry.activity_type,
          material_used: entry.material_used ?? "",
          cost: entry.cost ?? "",
          notes: entry.notes ?? "",
        }
      : {
          ...farmActivityDefaults(),
          farm_id: defaultFarmId ?? "",
          growing_area_id: defaultGrowingAreaId ?? "",
        },
  });

  const selectedFarmId = watch("farm_id");
  const filteredGrowingAreas = useMemo(
    () => growingAreas.filter((ga) => ga.farm_id === selectedFarmId),
    [growingAreas, selectedFarmId]
  );

  async function onSubmit(values: FarmActivityInput) {
    setServerError(null);
    setPhotoWarning(null);

    const result = entry
      ? await updateFarmActivity(entry.id, values)
      : await createFarmActivity(values);

    if ("error" in result) {
      setServerError(result.error);
      return;
    }

    if (photo) {
      const uploadResult = await uploadAttachmentFile(
        "farm_activity",
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
        <Label htmlFor="activity_type">Loại hoạt động *</Label>
        <Controller
          control={control}
          name="activity_type"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="activity_type" className="mt-1 w-full">
                <SelectValue placeholder="Chọn loại hoạt động" />
              </SelectTrigger>
              <SelectContent>
                {ACTIVITY_TYPES.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.activity_type && (
          <p className="mt-1 text-xs text-destructive">
            {errors.activity_type.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="activity_date">Ngày thực hiện *</Label>
        <Input
          id="activity_date"
          type="date"
          className="mt-1"
          {...register("activity_date")}
        />
        {errors.activity_date && (
          <p className="mt-1 text-xs text-destructive">
            {errors.activity_date.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="material_used">Vật tư sử dụng</Label>
        <Input
          id="material_used"
          placeholder="Ghi tự do, không liên kết kho"
          className="mt-1"
          {...register("material_used")}
        />
      </div>

      <div>
        <Label htmlFor="cost">Chi phí (VNĐ)</Label>
        <Input
          id="cost"
          type="text"
          inputMode="numeric"
          className="mt-1"
          {...register("cost")}
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
