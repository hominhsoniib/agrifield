import { z } from "zod";

export const farmSchema = z.object({
  name: z.string().min(1, "Vui lòng nhập tên nông trại"),
  code: z.string().optional(),
  address: z.string().optional(),
  gps_lat: z
    .union([z.coerce.number().min(-90).max(90), z.literal("")])
    .optional(),
  gps_lng: z
    .union([z.coerce.number().min(-180).max(180), z.literal("")])
    .optional(),
  total_area_ha: z
    .union([z.coerce.number().min(0), z.literal("")])
    .optional(),
});

// z.coerce.number() làm input type là `unknown` khác với output type (number) —
// tách 2 type: FarmFormValues cho react-hook-form (trước khi zod parse),
// FarmInput cho server action (sau khi zod đã parse/coerce).
export type FarmFormValues = z.input<typeof farmSchema>;
export type FarmInput = z.output<typeof farmSchema>;
