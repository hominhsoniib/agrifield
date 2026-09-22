-- ============================================
-- Migration 0004: bổ sung policy UPDATE cho expenses
-- Lý do: migration 0001 (đúng theo FARMTRACK_BUILD_PLAN.md mục 2) chỉ có
-- policy SELECT + INSERT cho expenses, không có UPDATE. Bảng expenses có cột
-- deleted_at (soft delete) nhưng soft delete thực hiện bằng UPDATE — không có
-- policy UPDATE thì không sửa được, cũng không soft-delete được chi phí nào,
-- kể cả admin/farm_manager có quyền trên farm đó. Phát hiện khi code CRUD
-- expenses ở Sprint 4, không phải mở rộng phạm vi nghiệp vụ.
-- ============================================

create policy "expenses_update" on expenses for update
  using (has_farm_access(farm_id));
