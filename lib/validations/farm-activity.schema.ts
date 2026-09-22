import { z } from "zod";

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export const ACTIVITY_TYPES = [
  { value: "irrigation", label: "Tưới nước" },
  { value: "weeding", label: "Làm cỏ" },
  { value: "pruning", label: "Tỉa cành" },
  { value: "pest_control", label: "Phòng trừ sâu bệnh" },
  { value: "fertilizing", label: "Bón phân" },
  { value: "pesticide", label: "Phun thuốc" },
  { value: "other", label: "Khác" },
] as const;

export const farmActivitySchema = z.object({
  farm_id: z.string().min(1, "Vui lòng chọn nông trại"),
  growing_area_id: z.string().min(1, "Vui lòng chọn vùng trồng"),
  activity_date: z.string().min(1, "Vui lòng chọn ngày"),
  activity_type: z.enum([
    "irrigation",
    "weeding",
    "pruning",
    "pest_control",
    "fertilizing",
    "pesticide",
    "other",
  ]),
  material_used: z.string().optional(),
  cost: z.union([z.coerce.number().min(0), z.literal("")]).optional(),
  notes: z.string().optional(),
});

export const farmActivityDefaults = () => ({
  farm_id: "",
  growing_area_id: "",
  activity_date: todayISO(),
  activity_type: "" as never,
  material_used: "",
  cost: "" as const,
  notes: "",
});

export type FarmActivityFormValues = z.input<typeof farmActivitySchema>;
export type FarmActivityInput = z.output<typeof farmActivitySchema>;
