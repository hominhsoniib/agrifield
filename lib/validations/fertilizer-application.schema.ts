import { z } from "zod";

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export const fertilizerApplicationSchema = z.object({
  farm_id: z.string().min(1, "Vui lòng chọn nông trại"),
  growing_area_id: z.string().min(1, "Vui lòng chọn vùng trồng"),
  application_date: z.string().min(1, "Vui lòng chọn ngày bón phân"),
  fertilizer_product_id: z.string().optional(),
  dosage: z.union([z.coerce.number().min(0), z.literal("")]).optional(),
  dosage_unit: z.string().optional(),
  total_quantity: z.union([z.coerce.number().min(0), z.literal("")]).optional(),
  application_method: z.string().optional(),
  notes: z.string().optional(),
});

export const fertilizerApplicationDefaults = () => ({
  farm_id: "",
  growing_area_id: "",
  application_date: todayISO(),
  fertilizer_product_id: "",
  dosage: "" as const,
  dosage_unit: "",
  total_quantity: "" as const,
  application_method: "",
  notes: "",
});

// Xem ghi chú input/output type trong farm.schema.ts.
export type FertilizerApplicationFormValues = z.input<
  typeof fertilizerApplicationSchema
>;
export type FertilizerApplicationInput = z.output<
  typeof fertilizerApplicationSchema
>;
