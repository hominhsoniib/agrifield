-- ============================================
-- Migration 0002: bổ sung policy DELETE cho user_farms
-- Lý do: migration 0001 (đúng theo FARMTRACK_BUILD_PLAN.md mục 2) chỉ có
-- policy SELECT + INSERT cho user_farms, không có UPDATE/DELETE. RLS mặc
-- định chặn toàn bộ thao tác không có policy khớp — nghĩa là ngay cả admin
-- cũng không xoá được 1 gán quyền user–farm (tính năng bắt buộc của Sprint 2
-- mục 4.2, việc 3: "Trang gán quyền user–farm (user_farms) cho admin").
-- Phát hiện khi code trang gán quyền, không phải thay đổi phạm vi nghiệp vụ.
-- ============================================

create policy "user_farms_admin_delete" on user_farms for delete
  using (is_admin_role());
