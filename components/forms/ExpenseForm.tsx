"use client";

import { useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  expenseSchema,
  expenseDefaults,
  EXPENSE_CATEGORIES,
  type ExpenseFormValues,
  type ExpenseInput,
} from "@/lib/validations/expense.schema";
import { createExpense, updateExpense } from "@/lib/actions/expenses";
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

type Expense = Tables<"expenses">;
type Farm = Pick<Tables<"farms">, "id" | "name">;
type GrowingArea = Pick<Tables<"growing_areas">, "id" | "code" | "farm_id">;

export function ExpenseForm({
  expense,
  farms,
  growingAreas,
  defaultFarmId,
  onSuccess,
}: {
  expense?: Expense;
  farms: Farm[];
  growingAreas: GrowingArea[];
  defaultFarmId?: string;
  onSuccess: () => void;
}) {
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ExpenseFormValues, unknown, ExpenseInput>({
    resolver: zodResolver(expenseSchema),
    defaultValues: expense
      ? {
          farm_id: expense.farm_id ?? "",
          growing_area_id: expense.growing_area_id ?? "",
          category: expense.category,
          amount: expense.amount,
          expense_date: expense.expense_date,
          notes: expense.notes ?? "",
        }
      : { ...expenseDefaults(), farm_id: defaultFarmId ?? "" },
  });

  const selectedFarmId = watch("farm_id");
  const filteredGrowingAreas = useMemo(
    () => growingAreas.filter((ga) => ga.farm_id === selectedFarmId),
    [growingAreas, selectedFarmId]
  );

  async function onSubmit(values: ExpenseInput) {
    setServerError(null);
    const result = expense
      ? await updateExpense(expense.id, values)
      : await createExpense(values);
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
          <p className="mt-1 text-xs text-destructive">{errors.farm_id.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="growing_area_id">Vùng trồng (tuỳ chọn)</Label>
        <Controller
          control={control}
          name="growing_area_id"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange} disabled={!selectedFarmId}>
              <SelectTrigger id="growing_area_id" className="mt-1 w-full">
                <SelectValue placeholder="Toàn farm (không gắn vùng trồng)" />
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
      </div>

      <div>
        <Label htmlFor="category">Loại chi phí *</Label>
        <Controller
          control={control}
          name="category"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="category" className="mt-1 w-full">
                <SelectValue placeholder="Chọn loại chi phí" />
              </SelectTrigger>
              <SelectContent>
                {EXPENSE_CATEGORIES.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.category && (
          <p className="mt-1 text-xs text-destructive">{errors.category.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="amount">Số tiền (VNĐ) *</Label>
          <Input
            id="amount"
            type="text"
            inputMode="numeric"
            className="mt-1"
            {...register("amount")}
          />
          {errors.amount && (
            <p className="mt-1 text-xs text-destructive">{errors.amount.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="expense_date">Ngày *</Label>
          <Input
            id="expense_date"
            type="date"
            className="mt-1"
            {...register("expense_date")}
          />
          {errors.expense_date && (
            <p className="mt-1 text-xs text-destructive">
              {errors.expense_date.message}
            </p>
          )}
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
        {isSubmitting ? "Đang lưu…" : expense ? "Lưu thay đổi" : "Tạo chi phí"}
      </Button>
    </form>
  );
}
