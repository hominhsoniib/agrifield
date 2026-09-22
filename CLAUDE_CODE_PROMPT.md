# Prompt giao việc cho Claude Code — Dự án FarmTrack

> Copy toàn bộ nội dung bên dưới, dán vào Claude Code khi mở project tại `D:\AgriField`.

---

Bạn là Claude Code, được giao thực thi dự án **FarmTrack** — web app quản lý nông trại (Next.js 14 + Supabase). Toàn bộ đặc tả kỹ thuật (kiến trúc, database schema đầy đủ, cấu trúc thư mục, kế hoạch 5 sprint, tiêu chí nghiệm thu, quy tắc làm việc) nằm trong file `FARMTRACK_BUILD_PLAN.md` ở gốc repo này. **Đọc kỹ toàn bộ file đó trước khi viết dòng code đầu tiên.**

## Cách làm việc

1. Thực thi **đúng thứ tự Sprint 1 → 5** như trong file kế hoạch. Không gộp sprint, không nhảy cóc.
2. **Dừng lại ở mỗi Checkpoint** cuối sprint, báo cáo bằng tiếng Việt: đã làm gì, kết quả từng tiêu chí nghiệm thu (pass/fail), và chờ tôi xác nhận trước khi sang sprint tiếp theo.
3. Nếu gặp quyết định kỹ thuật chưa có trong `FARMTRACK_BUILD_PLAN.md` → nêu rõ giả định bạn định dùng và hỏi tôi trước, không tự suy diễn rồi code luôn.
4. **Không tạo dữ liệu/chức năng giả** (mock data, số liệu dashboard bịa) rồi báo "đã hoàn thành". Mọi con số phải query thật từ Supabase.
5. Phạm vi đã chốt — **không tự ý mở rộng**:
   - 1 tổ chức duy nhất (không multi-tenant).
   - Tọa độ vùng trồng chỉ là điểm GPS (lat/lng), không polygon.
   - `inventory_items` chỉ là danh mục tham chiếu — **tuyệt đối không** thêm logic nhập/xuất tồn kho nếu tôi chưa yêu cầu.
   - Không làm offline/PWA trong MVP.
6. Mọi thay đổi schema phải đi qua file migration trong `supabase/migrations/`, không sửa tay trên Supabase Dashboard rồi quên đồng bộ.
7. Không hardcode secret/API key — dùng `.env.local` (đã có `.env.local.example` mẫu trong plan).
8. Khi sửa lỗi: giải thích nguyên nhân + cách đã kiểm tra, không chỉ báo "đã fix".

## Trước khi bắt đầu Sprint 1, xác nhận với tôi

- [ ] Bạn đã đọc toàn bộ `FARMTRACK_BUILD_PLAN.md`, đặc biệt mục 2 (schema SQL) và mục 5 (quy tắc bắt buộc).
- [ ] Tôi sẽ cung cấp: Supabase project URL + anon key + service role key (điền vào `.env.local`). Nếu chưa có project Supabase, nói tôi tạo trước khi bạn chạy migration.
- [ ] Nếu trong repo đã có sẵn thư mục `farmtrack/` (scaffold Sprint 1 dựng sẵn: Next.js + TypeScript + Tailwind, Supabase client/server/middleware, trang login, layout dashboard có sidebar/bottom-nav, các trang stub theo route trong kế hoạch) — kiểm tra lại đúng theo plan, hoàn thiện phần còn thiếu của Sprint 1 (chạy migration thật, seed admin/org, verify RLS) thay vì viết lại từ đầu.

Bắt đầu bằng việc đọc `FARMTRACK_BUILD_PLAN.md`, tóm tắt lại cho tôi bằng 5-7 dòng để xác nhận bạn hiểu đúng phạm vi, sau đó thực thi Sprint 1.
