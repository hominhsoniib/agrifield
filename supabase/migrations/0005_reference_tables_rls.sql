-- ============================================
-- Migration 0005: RLS cho 3 bảng danh mục tham chiếu
-- (crops, fertilizer_products, inventory_items)
--
-- LÝ DO — quan trọng, khác dạng lỗi 0002/0004:
-- SQL gốc trong FARMTRACK_BUILD_PLAN.md mục 2 KHÔNG bật RLS cho 3 bảng này
-- (ý định của plan: đây là danh mục tham chiếu, mở cho mọi user đã đăng nhập
-- đọc/ghi tự do, không cần kiểm soát theo farm). Nhưng project Supabase thực
-- tế đang dùng có hành vi TỰ ĐỘNG BẬT RLS trên mọi bảng mới tạo trong schema
-- public — kể cả khi migration SQL không hề có dòng "alter table ... enable
-- row level security" nào cho bảng đó. Vì 3 bảng này không có sẵn policy nào,
-- RLS mặc định deny-all: SELECT luôn trả về rỗng, INSERT/UPDATE bị chặn hoàn
-- toàn — kể cả với tài khoản admin.
--
-- PHÁT HIỆN NHƯ THẾ NÀO: khi verify Checkpoint 4, test INSERT vào
-- inventory_items qua session admin thật bị lỗi "new row violates row-level
-- security policy". Nghi ngờ không chỉ riêng inventory_items nên tôi test
-- thêm crops và fertilizer_products — CẢ 3 đều bị. Đối chiếu cụ thể:
-- fertilizer_products đang có 5 dòng thật (đọc được bằng service role, seed
-- ở Sprint 3), nhưng session admin thật (không phải service role) chỉ thấy
-- 0 dòng khi SELECT — xác nhận RLS đang chặn âm thầm, không phải bảng rỗng.
--
-- HỆ QUẢ NẾU KHÔNG SỬA: dropdown "chọn cây trồng" (growing_areas form) và
-- "chọn sản phẩm phân bón" (fertilizer_applications form) LUÔN RỖNG với user
-- thật (không dùng service role) — 2 tính năng này thực chất chưa từng hoạt
-- động đúng với user thật kể từ Sprint 2/3, dù các test trước đó pass (vì
-- test Sprint 2/3 không set crop_id/fertilizer_product_id nên không lộ ra).
-- Trang /inventory (Sprint 4, đang verify) cũng vậy.
--
-- CÁCH SỬA: vì bảng đã bị Supabase tự bật RLS ngoài ý muốn (không thể đơn
-- giản "tắt RLS" để khớp đúng ý định gốc — dashboard Supabase có thể tự bật
-- lại), giải pháp là thêm policy tường minh, mức độ mở gần nhất với ý định
-- gốc của plan nhưng vẫn yêu cầu đăng nhập (nhất quán với mức đã chọn cho
-- "attachments"/"storage.objects" ở migration 0003):
--   - SELECT: bất kỳ user đã đăng nhập nào cũng xem được (bắt buộc để các
--     dropdown trong form hoạt động cho MỌI role, không riêng admin).
--   - INSERT/UPDATE: chỉ admin/org_admin — khớp với UI đã gate qua
--     canManageInventory() trong lib/permissions.ts (Sprint 4, /inventory).
--     crops/fertilizer_products không có UI quản lý trong phạm vi plan (chỉ
--     admin seed qua script/SQL) nên áp dụng cùng mức admin-only cho nhất
--     quán, thay vì mở ghi cho mọi user như "ý định gốc" (không có UI mở nên
--     "ai cũng ghi được" không có ý nghĩa thực tế, chỉ là lỗ hổng nếu không
--     giới hạn — quyết định này khác hẳn với "chấp nhận có chủ đích" đã bàn
--     ở storage.objects, đây là SIẾT LẠI đúng vì không ai chủ động chọn để mở).
-- ============================================

alter table crops enable row level security;
alter table fertilizer_products enable row level security;
alter table inventory_items enable row level security;

create policy "crops_select" on crops for select
  using (auth.uid() is not null);
create policy "crops_admin_write" on crops for insert
  with check (is_admin_role());
create policy "crops_admin_update" on crops for update
  using (is_admin_role());

create policy "fertilizer_products_select" on fertilizer_products for select
  using (auth.uid() is not null);
create policy "fertilizer_products_admin_write" on fertilizer_products for insert
  with check (is_admin_role());
create policy "fertilizer_products_admin_update" on fertilizer_products for update
  using (is_admin_role());

create policy "inventory_items_select" on inventory_items for select
  using (auth.uid() is not null);
create policy "inventory_items_admin_write" on inventory_items for insert
  with check (is_admin_role());
create policy "inventory_items_admin_update" on inventory_items for update
  using (is_admin_role());
