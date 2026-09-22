"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  inventoryItemSchema,
  type InventoryItemFormValues,
  type InventoryItemInput,
} from "@/lib/validations/inventory-item.schema";
import {
  createInventoryItem,
  updateInventoryItem,
} from "@/lib/actions/inventory-items";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Tables } from "@/types/database.types";

type InventoryItem = Tables<"inventory_items">;

export function InventoryItemForm({
  item,
  onSuccess,
}: {
  item?: InventoryItem;
  onSuccess: () => void;
}) {
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InventoryItemFormValues, unknown, InventoryItemInput>({
    resolver: zodResolver(inventoryItemSchema),
    defaultValues: item
      ? {
          name: item.name,
          code: item.code ?? "",
          category: item.category ?? "",
          unit: item.unit,
          reference_price: item.reference_price ?? "",
          supplier: item.supplier ?? "",
          notes: item.notes ?? "",
        }
      : {
          name: "",
          code: "",
          category: "",
          unit: "",
          reference_price: "",
          supplier: "",
          notes: "",
        },
  });

  async function onSubmit(values: InventoryItemInput) {
    setServerError(null);
    const result = item
      ? await updateInventoryItem(item.id, values)
      : await createInventoryItem(values);
    if ("error" in result) {
      setServerError(result.error);
      return;
    }
    onSuccess();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>
      <div>
        <Label htmlFor="name">Tên vật tư *</Label>
        <Input id="name" className="mt-1" {...register("name")} />
        {errors.name && (
          <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="code">Mã</Label>
        <Input id="code" className="mt-1" {...register("code")} />
      </div>

      <div>
        <Label htmlFor="category">Danh mục</Label>
        <Input
          id="category"
          placeholder="phân bón, thuốc BVTV, dụng cụ..."
          className="mt-1"
          {...register("category")}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="unit">Đơn vị tính *</Label>
          <Input id="unit" placeholder="kg, lít, bao..." className="mt-1" {...register("unit")} />
          {errors.unit && (
            <p className="mt-1 text-xs text-destructive">{errors.unit.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="reference_price">Giá tham khảo (VNĐ)</Label>
          <Input
            id="reference_price"
            type="text"
            inputMode="numeric"
            className="mt-1"
            {...register("reference_price")}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="supplier">Nhà cung cấp</Label>
        <Input id="supplier" className="mt-1" {...register("supplier")} />
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
        {isSubmitting ? "Đang lưu…" : item ? "Lưu thay đổi" : "Tạo vật tư"}
      </Button>
    </form>
  );
}
