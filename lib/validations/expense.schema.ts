import { z } from "zod";

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export const EXPENSE_CATEGORIES = [
  { value: "fertilizer", label: "Phân bón" },
  { value: "labor", label: "Nhân công" },
  { value: "irrigation", label: "Tưới tiêu" },
  { value: "materials", label: "Vật tư" },
  { value: "other", label: "Khác" },
] as const;

export const expenseSchema = z.object({
  farm_id: z.string().min(1, "Vui lòng chọn nông trại"),
  growing_area_id: z.string().optional(),
  category: z.enum(["fertilizer", "labor", "irrigation", "materials", "other"]),
  amount: z.coerce.number().min(1, "Số tiền phải lớn hơn 0"),
  expense_date: z.string().min(1, "Vui lòng chọn ngày"),
  notes: z.string().optional(),
});

export const expenseDefaults = () => ({
  farm_id: "",
  growing_area_id: "",
  category: "" as never,
  amount: "" as unknown as number,
  expense_date: todayISO(),
  notes: "",
});

export type ExpenseFormValues = z.input<typeof expenseSchema>;
export type ExpenseInput = z.output<typeof expenseSchema>;
