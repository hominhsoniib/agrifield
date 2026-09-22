export type UserRole =
  | "admin"
  | "org_admin"
  | "farm_manager"
  | "field_technician"
  | "farmer";

/** admin và org_admin thấy toàn bộ farm; các role còn lại chỉ thấy farm được gán qua user_farms (RLS xử lý ở DB). */
export function isFullAccessRole(role: UserRole | null | undefined): boolean {
  return role === "admin" || role === "org_admin";
}

export function canManageFarms(role: UserRole | null | undefined): boolean {
  return isFullAccessRole(role);
}

export function canManageUsers(role: UserRole | null | undefined): boolean {
  return isFullAccessRole(role);
}

/**
 * inventory_items/fertilizer_products/crops là danh mục tham chiếu KHÔNG có
 * RLS (đúng theo SQL gốc của plan — không có "alter table inventory_items
 * enable row level security"). Check này chỉ là lớp UX; về mặt kỹ thuật bất
 * kỳ user đã đăng nhập nào cũng có thể ghi bảng này qua Data API trực tiếp,
 * giống hệt đặc điểm đã chấp nhận cho crops/fertilizer_products ở Sprint 3.
 */
export function canManageInventory(role: UserRole | null | undefined): boolean {
  return isFullAccessRole(role);
}

/**
 * Ghi chú: đây chỉ là lớp UX (ẩn/hiện nút, điều hướng).
 * Nguồn phân quyền thật sự luôn là RLS trên Supabase (xem supabase/migrations/0001_init_schema.sql).
 * Không được tin tưởng tuyệt đối vào check phía client này cho bất kỳ hành vi ghi dữ liệu nào.
 */
