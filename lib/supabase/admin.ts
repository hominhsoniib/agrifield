import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";

/**
 * Client dùng service role key — bỏ qua RLS hoàn toàn.
 * CHỈ dùng trong Server Component/Server Action của các trang đã tự kiểm tra
 * quyền admin trước (vd: /users, để lấy email từ auth.users phục vụ hiển thị —
 * bảng `profiles` không lưu email). KHÔNG BAO GIỜ import trong Client Component
 * hoặc để service role key lọt ra response gửi cho trình duyệt.
 */
export function createAdminClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
