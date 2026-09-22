import { z } from "zod";

// CHỈ danh mục tham chiếu — tuyệt đối không thêm trường số lượng tồn kho,
// không thêm logic nhập/xuất kho (ranh giới đã chốt trong FARMTRACK_BUILD_PLAN.md).
export const inventoryItemSchema = z.object({
  name: z.string().min(1, "Vui lòng nhập tên vật tư"),
  code: z.string().optional(),
  category: z.string().optional(),
  unit: z.string().min(1, "Vui lòng nhập đơn vị tính"),
  reference_price: z.union([z.coerce.number().min(0), z.literal("")]).optional(),
  supplier: z.string().optional(),
  notes: z.string().optional(),
});

export type InventoryItemFormValues = z.input<typeof inventoryItemSchema>;
export type InventoryItemInput = z.output<typeof inventoryItemSchema>;
