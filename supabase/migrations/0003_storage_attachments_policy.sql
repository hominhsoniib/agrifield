-- ============================================
-- Migration 0003: RLS cho storage.objects, bucket "attachments"
-- Lý do: bucket "attachments" được tạo ở Sprint 1 với public=false. Supabase
-- Storage kiểm soát truy cập object qua RLS trên bảng storage.objects (tách
-- biệt với RLS trên bảng nghiệp vụ "attachments" ở migration 0001) — RLS trên
-- storage.objects đã được Supabase bật sẵn mặc định, chỉ cần thêm policy.
-- Không có policy nào thì user thường (kể cả đã đăng nhập) không upload/xem
-- được ảnh, chỉ service role mới thấy — cần thiết cho Sprint 3 (upload ảnh
-- nhật ký).
--
-- Mức độ chặt giống hệt policy đã có sẵn cho bảng "attachments" ở migration
-- 0001 (chỉ yêu cầu auth.uid() is not null, KHÔNG kiểm tra farm_id) — xem
-- ghi chú gốc: "kiểm soát thực sự nằm ở entity gốc; nghiêm ngặt hơn cần join
-- động theo entity_type". Giữ nguyên mức độ đơn giản hoá đó ở tầng Storage
-- để nhất quán, không tự ý siết chặt hơn ngoài phạm vi đã chốt.
-- ============================================

create policy "attachments_bucket_select" on storage.objects for select
  using (bucket_id = 'attachments' and auth.uid() is not null);

create policy "attachments_bucket_insert" on storage.objects for insert
  with check (bucket_id = 'attachments' and auth.uid() is not null);
