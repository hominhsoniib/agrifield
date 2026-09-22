import { z } from "zod";

export const growingAreaSchema = z.object({
  farm_id: z.string().min(1, "Vui lòng chọn nông trại"),
  code: z.string().min(1, "Vui lòng nhập mã/tên vùng trồng"),
  crop_id: z.string().optional(),
  area_ha: z.union([z.coerce.number().min(0), z.literal("")]).optional(),
  variety: z.string().optional(),
  planting_year: z
    .union([z.coerce.number().int().min(1900).max(2100), z.literal("")])
    .optional(),
  planting_density: z.string().optional(),
  gps_lat: z
    .union([z.coerce.number().min(-90).max(90), z.literal("")])
    .optional(),
  gps_lng: z
    .union([z.coerce.number().min(-180).max(180), z.literal("")])
    .optional(),
  notes: z.string().optional(),
});

// Xem ghi chú tương tự trong farm.schema.ts về z.coerce + input/output type.
export type GrowingAreaFormValues = z.input<typeof growingAreaSchema>;
export type GrowingAreaInput = z.output<typeof growingAreaSchema>;
