"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  farmSchema,
  type FarmFormValues,
  type FarmInput,
} from "@/lib/validations/farm.schema";
import { createFarm, updateFarm } from "@/lib/actions/farms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Tables } from "@/types/database.types";

type Farm = Tables<"farms">;

export function FarmForm({
  farm,
  onSuccess,
}: {
  farm?: Farm;
  onSuccess: () => void;
}) {
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FarmFormValues, unknown, FarmInput>({
    resolver: zodResolver(farmSchema),
    defaultValues: farm
      ? {
          name: farm.name,
          code: farm.code ?? "",
          address: farm.address ?? "",
          gps_lat: farm.gps_lat ?? "",
          gps_lng: farm.gps_lng ?? "",
          total_area_ha: farm.total_area_ha ?? "",
        }
      : { name: "", code: "", address: "", gps_lat: "", gps_lng: "", total_area_ha: "" },
  });

  async function onSubmit(values: FarmInput) {
    setServerError(null);
    const result = farm
      ? await updateFarm(farm.id, values)
      : await createFarm(values);
    if ("error" in result) {
      setServerError(result.error);
      return;
    }
    onSuccess();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>
      <div>
        <Label htmlFor="name">Tên nông trại *</Label>
        <Input id="name" className="mt-1" {...register("name")} />
        {errors.name && (
          <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="code">Mã farm</Label>
        <Input id="code" className="mt-1" {...register("code")} />
      </div>

      <div>
        <Label htmlFor="address">Địa chỉ</Label>
        <Input id="address" className="mt-1" {...register("address")} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="gps_lat">Vĩ độ (lat)</Label>
          <Input
            id="gps_lat"
            type="text"
            inputMode="decimal"
            placeholder="10.762622"
            className="mt-1"
            {...register("gps_lat")}
          />
          {errors.gps_lat && (
            <p className="mt-1 text-xs text-destructive">
              {errors.gps_lat.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="gps_lng">Kinh độ (lng)</Label>
          <Input
            id="gps_lng"
            type="text"
            inputMode="decimal"
            placeholder="106.660172"
            className="mt-1"
            {...register("gps_lng")}
          />
          {errors.gps_lng && (
            <p className="mt-1 text-xs text-destructive">
              {errors.gps_lng.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="total_area_ha">Tổng diện tích (ha)</Label>
        <Input
          id="total_area_ha"
          type="text"
          inputMode="decimal"
          className="mt-1"
          {...register("total_area_ha")}
        />
      </div>

      {serverError && (
        <p role="alert" className="text-sm text-destructive">
          {serverError}
        </p>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Đang lưu…" : farm ? "Lưu thay đổi" : "Tạo nông trại"}
      </Button>
    </form>
  );
}
