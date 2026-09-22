import { z } from "zod";

export const harvestLogSchema = z.object({
  farm_id: z.string().min(1, "Vui lòng chọn nông trại"),
  growing_area_id: z.string().min(1, "Vui lòng chọn vùng trồng"),
  harvest_date: z.string().min(1, "Vui lòng chọn ngày thu hoạch"),
  crop_name: z.string().min(1, "Vui lòng nhập tên nông sản / cây trồng"),
  quantity: z
    .number()
    .positive("Sản lượng phải lớn hơn 0"),
  unit: z.string().min(1, "Vui lòng chọn hoặc nhập đơn vị tính"),
  estimated_value: z
    .number()
    .nonnegative("Giá trị ước tính không được âm")
    .optional()
    .nullable(),
  quality_grade: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
});

export type HarvestLogInput = z.infer<typeof harvestLogSchema>;
