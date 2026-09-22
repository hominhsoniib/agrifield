# FarmTrack — Kế hoạch Build cho Claude Code

> **Cách dùng file này:** Đây là bản kế hoạch đầy đủ để giao cho Claude Code (hoặc agent tương tự) tự thực thi từng sprint. Chủ dự án (bạn) chỉ giám sát tại các **Checkpoint** cuối mỗi sprint — không cần review từng dòng code. Claude Code PHẢI dừng lại ở mỗi checkpoint và chờ xác nhận trước khi sang sprint tiếp theo.

---

## 0. Bối cảnh dự án (đã chốt với chủ dự án)

| Quyết định | Giá trị |
|---|---|
| Số tổ chức | **1 tổ chức duy nhất** (không multi-tenant org) |
| Số trang trại | Nhiều (dynamic, không giới hạn cứng) |
| Tọa độ vùng trồng | Điểm GPS đơn giản (lat/lng), KHÔNG polygon |
| Quản lý vật tư | Chỉ lưu danh mục vật tư (DMVT) tham chiếu — KHÔNG quản lý tồn kho nhập/xuất |
| Quan hệ user–tổ chức | 1 user thuộc 1 tổ chức (vì chỉ có 1 org nên mặc định mọi user đều thuộc org này) |
| Phân quyền thực tế | Theo **farm assignment**, không theo org (vì chỉ 1 org) |
| Offline / PWA | KHÔNG nằm trong MVP |
| Auto trừ kho / auto khuyến cáo bón phân | KHÔNG có trong MVP |

---

## 1. Kiến trúc hệ thống

```
Next.js 14 (App Router, TypeScript)
 ├─ UI: TailwindCSS + shadcn/ui
 ├─ Server state: React Query (@tanstack/react-query)
 ├─ Form + validate: react-hook-form + zod
 ├─ Charts: Recharts
 ├─ Map: react-leaflet (hiển thị điểm GPS, không polygon)
 │
Supabase (backend-as-a-service)
 ├─ PostgreSQL
 ├─ Auth (email/password)
 ├─ Storage (bucket "attachments" — ảnh nhật ký)
 └─ RLS theo farm assignment (bảng user_farms)

Deploy: Vercel (frontend) + Supabase Cloud
```

**Nguyên tắc RLS cốt lõi:**
- `admin`, `org_admin` → thấy TẤT CẢ farm.
- `farm_manager`, `field_technician`, `farmer` → chỉ thấy farm mà họ được gán trong bảng `user_farms`.
- Mọi bảng nghiệp vụ (growing_areas, fertilizer_applications, farm_activities, expenses, attachments) kế thừa quyền qua `farm_id`.

---

## 2. Database Schema (Migration SQL đầy đủ)

```sql
-- ============================================
-- EXTENSIONS
-- ============================================
create extension if not exists "uuid-ossp";

-- ============================================
-- ORGANIZATIONS (giữ bảng để tương lai mở rộng, nhưng MVP chỉ có 1 dòng)
-- ============================================
create table organizations (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  code text unique,
  representative_name text,
  phone text,
  address text,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- PROFILES (mở rộng từ auth.users của Supabase)
-- ============================================
create type user_role as enum ('admin', 'org_admin', 'farm_manager', 'field_technician', 'farmer');

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  organization_id uuid references organizations(id),
  full_name text not null,
  phone text,
  role user_role not null default 'farmer',
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- USER_FARMS (bảng gán quyền theo farm — cốt lõi phân quyền)
-- ============================================
create table user_farms (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade,
  farm_id uuid references farms(id) on delete cascade,
  created_at timestamptz default now(),
  unique(user_id, farm_id)
);

-- ============================================
-- FARMS
-- ============================================
create table farms (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid references organizations(id),
  name text not null,
  code text unique,
  address text,
  gps_lat numeric(10,7),
  gps_lng numeric(10,7),
  total_area_ha numeric(10,2),
  manager_id uuid references profiles(id),
  is_active boolean default true,
  created_by uuid references profiles(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
-- (lưu ý: khai báo farms sau user_farms ở trên chỉ để đọc theo nhóm logic;
--  khi chạy migration thực tế, tạo bảng farms TRƯỚC user_farms)

-- ============================================
-- CROPS (danh mục loại cây trồng)
-- ============================================
create table crops (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  code text unique,
  created_at timestamptz default now()
);

-- ============================================
-- GROWING_AREAS (vùng trồng / lô đất)
-- ============================================
create table growing_areas (
  id uuid primary key default uuid_generate_v4(),
  farm_id uuid references farms(id) on delete cascade,
  code text not null,
  area_ha numeric(10,2),
  crop_id uuid references crops(id),
  variety text,
  planting_year int,
  planting_density text,
  gps_lat numeric(10,7),
  gps_lng numeric(10,7),
  status text default 'active', -- active | inactive
  notes text,
  created_by uuid references profiles(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz -- soft delete
);

-- ============================================
-- FERTILIZER_PRODUCTS (danh mục sản phẩm phân bón — DMVT dạng phân bón)
-- ============================================
create table fertilizer_products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  brand text,
  fertilizer_group text, -- vd: hữu cơ, vô cơ, vi sinh
  nutrient_composition text, -- vd: N-P-K 16-16-8
  unit text not null, -- kg, lít, bao...
  supplier text,
  notes text,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- ============================================
-- FERTILIZER_APPLICATIONS (nhật ký bón phân)
-- ============================================
create table fertilizer_applications (
  id uuid primary key default uuid_generate_v4(),
  farm_id uuid references farms(id),
  growing_area_id uuid references growing_areas(id) on delete cascade,
  application_date date not null default current_date,
  fertilizer_product_id uuid references fertilizer_products(id),
  dosage numeric(10,2),
  dosage_unit text,
  total_quantity numeric(10,2),
  application_method text,
  performed_by uuid references profiles(id),
  notes text,
  created_by uuid references profiles(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz
);

-- ============================================
-- FARM_ACTIVITIES (nhật ký chăm sóc — tưới, tỉa, phòng trừ sâu bệnh...)
-- ============================================
create type activity_type as enum (
  'irrigation', 'weeding', 'pruning', 'pest_control',
  'fertilizing', 'pesticide', 'other'
);

create table farm_activities (
  id uuid primary key default uuid_generate_v4(),
  farm_id uuid references farms(id),
  growing_area_id uuid references growing_areas(id) on delete cascade,
  activity_date date not null default current_date,
  activity_type activity_type not null,
  material_used text, -- text tự do, KHÔNG liên kết bắt buộc tới inventory
  performed_by uuid references profiles(id),
  cost numeric(12,0), -- VNĐ, số nguyên
  notes text,
  created_by uuid references profiles(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz
);

-- ============================================
-- INVENTORY_ITEMS (danh mục vật tư — CHỈ THAM CHIẾU, không quản lý tồn kho)
-- ============================================
create table inventory_items (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  code text unique,
  category text,
  unit text not null,
  reference_price numeric(12,0), -- giá tham khảo, KHÔNG phải giá nhập kho thực
  supplier text,
  notes text,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- ============================================
-- EXPENSES (chi phí)
-- ============================================
create type expense_category as enum (
  'fertilizer', 'labor', 'irrigation', 'materials', 'other'
);

create table expenses (
  id uuid primary key default uuid_generate_v4(),
  farm_id uuid references farms(id),
  growing_area_id uuid references growing_areas(id),
  category expense_category not null,
  amount numeric(14,0) not null, -- VNĐ
  expense_date date not null default current_date,
  notes text,
  created_by uuid references profiles(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz
);

-- ============================================
-- ATTACHMENTS (ảnh — polymorphic, dùng entity_type + entity_id)
-- ============================================
create table attachments (
  id uuid primary key default uuid_generate_v4(),
  entity_type text not null, -- 'growing_area' | 'fertilizer_application' | 'farm_activity'
  entity_id uuid not null,
  storage_path text not null, -- path trong Supabase Storage bucket
  uploaded_by uuid references profiles(id),
  created_at timestamptz default now()
);

-- ============================================
-- INDEXES
-- ============================================
create index idx_growing_areas_farm on growing_areas(farm_id) where deleted_at is null;
create index idx_fertilizer_apps_area on fertilizer_applications(growing_area_id) where deleted_at is null;
create index idx_farm_activities_area on farm_activities(growing_area_id) where deleted_at is null;
create index idx_expenses_farm on expenses(farm_id) where deleted_at is null;
create index idx_attachments_entity on attachments(entity_type, entity_id);
create index idx_user_farms_user on user_farms(user_id);

-- ============================================
-- RLS — BẬT CHO TẤT CẢ BẢNG NGHIỆP VỤ
-- ============================================
alter table farms enable row level security;
alter table growing_areas enable row level security;
alter table fertilizer_applications enable row level security;
alter table farm_activities enable row level security;
alter table expenses enable row level security;
alter table attachments enable row level security;
alter table user_farms enable row level security;

-- Helper: kiểm tra role admin/org_admin
create or replace function is_admin_role()
returns boolean as $$
  select exists (
    select 1 from profiles
    where id = auth.uid() and role in ('admin', 'org_admin')
  );
$$ language sql security definer stable;

-- Helper: kiểm tra user có quyền trên farm_id không
create or replace function has_farm_access(target_farm_id uuid)
returns boolean as $$
  select is_admin_role() or exists (
    select 1 from user_farms
    where user_id = auth.uid() and farm_id = target_farm_id
  );
$$ language sql security definer stable;

-- Policy: FARMS
create policy "farms_select" on farms for select
  using (has_farm_access(id));
create policy "farms_admin_write" on farms for insert with check (is_admin_role());
create policy "farms_admin_update" on farms for update using (is_admin_role());

-- Policy: GROWING_AREAS
create policy "growing_areas_select" on growing_areas for select
  using (has_farm_access(farm_id));
create policy "growing_areas_write" on growing_areas for insert
  with check (has_farm_access(farm_id));
create policy "growing_areas_update" on growing_areas for update
  using (has_farm_access(farm_id));

-- Policy: FERTILIZER_APPLICATIONS
create policy "fert_apps_select" on fertilizer_applications for select
  using (has_farm_access(farm_id));
create policy "fert_apps_write" on fertilizer_applications for insert
  with check (has_farm_access(farm_id));
create policy "fert_apps_update" on fertilizer_applications for update
  using (has_farm_access(farm_id));

-- Policy: FARM_ACTIVITIES
create policy "activities_select" on farm_activities for select
  using (has_farm_access(farm_id));
create policy "activities_write" on farm_activities for insert
  with check (has_farm_access(farm_id));
create policy "activities_update" on farm_activities for update
  using (has_farm_access(farm_id));

-- Policy: EXPENSES
create policy "expenses_select" on expenses for select
  using (has_farm_access(farm_id));
create policy "expenses_write" on expenses for insert
  with check (has_farm_access(farm_id));

-- Policy: ATTACHMENTS (kiểm tra qua entity — đơn giản hoá: cho phép nếu user đã auth,
-- kiểm soát thực sự nằm ở entity gốc; nghiêm ngặt hơn cần join động theo entity_type)
create policy "attachments_select" on attachments for select using (auth.uid() is not null);
create policy "attachments_insert" on attachments for insert with check (auth.uid() is not null);

-- Policy: USER_FARMS (chỉ admin quản lý gán quyền)
create policy "user_farms_select_own" on user_farms for select
  using (user_id = auth.uid() or is_admin_role());
create policy "user_farms_admin_write" on user_farms for insert with check (is_admin_role());
```

**⚠️ Ghi chú migration:** thứ tự tạo bảng thực tế phải là `organizations → profiles(role) → farms → user_farms → crops → growing_areas → fertilizer_products → fertilizer_applications → farm_activities → inventory_items → expenses → attachments`. Bản trên trình bày theo nhóm logic để dễ đọc, Claude Code cần sắp lại đúng thứ tự phụ thuộc khoá ngoại khi viết file migration thật.

---

## 3. Cấu trúc thư mục

```
farmtrack/
├── app/
│   ├── (auth)/
│   │   └── login/page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx              # sidebar + bottom nav mobile
│   │   ├── dashboard/page.tsx
│   │   ├── farms/
│   │   │   ├── page.tsx            # danh sách
│   │   │   └── [id]/page.tsx       # chi tiết farm
│   │   ├── growing-areas/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── fertilizer-logs/
│   │   │   ├── page.tsx
│   │   │   └── new/page.tsx
│   │   ├── care-logs/
│   │   │   ├── page.tsx
│   │   │   └── new/page.tsx
│   │   ├── inventory/page.tsx
│   │   ├── expenses/page.tsx
│   │   ├── reports/page.tsx
│   │   ├── users/page.tsx
│   │   └── settings/page.tsx
│   └── layout.tsx
├── components/
│   ├── ui/                         # shadcn primitives
│   ├── forms/
│   │   ├── FarmForm.tsx
│   │   ├── GrowingAreaForm.tsx
│   │   ├── FertilizerLogForm.tsx
│   │   └── CareLogForm.tsx
│   ├── charts/
│   │   └── DashboardCharts.tsx
│   └── map/
│       └── FarmMapPoint.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── middleware.ts
│   ├── validations/
│   │   ├── farm.schema.ts
│   │   ├── growing-area.schema.ts
│   │   ├── fertilizer.schema.ts
│   │   └── activity.schema.ts
│   └── permissions.ts               # helper check role/farm access phía client
├── types/
│   └── database.types.ts           # generate từ Supabase CLI
├── supabase/
│   └── migrations/
│       └── 0001_init_schema.sql
├── .env.local.example
└── README.md
```

---

## 4. Kế hoạch Sprint (giao cho Claude Code — mỗi sprint kết thúc bằng Checkpoint)

### 🟢 Sprint 1 — Nền tảng
**Mục tiêu:** Project chạy được, đăng nhập hoạt động, schema cơ bản có RLS.

Việc cần làm:
1. `npx create-next-app@latest` (TypeScript, Tailwind, App Router).
2. Cài shadcn/ui, react-hook-form, zod, @tanstack/react-query, @supabase/ssr.
3. Setup Supabase project, chạy migration `0001_init_schema.sql` (toàn bộ SQL ở mục 2).
4. Tạo `lib/supabase/client.ts`, `server.ts`, `middleware.ts` theo pattern chính thức của Supabase SSR.
5. Trang login (`/login`) — email/password qua Supabase Auth.
6. Middleware bảo vệ route `(dashboard)` — redirect về login nếu chưa auth.
7. Seed 1 tài khoản admin + 1 tổ chức mẫu qua SQL seed script riêng (không hardcode trong code app).

**Tiêu chí nghiệm thu (Checkpoint 1):**
- [ ] `npm run dev` chạy không lỗi.
- [ ] Đăng nhập/đăng xuất hoạt động thật (không mock).
- [ ] Vào `/dashboard` khi chưa login → bị redirect về `/login`.
- [ ] RLS đã bật trên toàn bộ bảng nghiệp vụ (verify bằng cách thử query bằng 1 user không có `user_farms` — phải trả về rỗng).

> 🔴 **Dừng tại đây — báo cáo cho chủ dự án trước khi sang Sprint 2.**

---

### 🟢 Sprint 2 — Farm, Vùng trồng, Dashboard cơ bản
**Mục tiêu:** CRUD farm/growing-area hoạt động đầy đủ, có phân quyền theo farm.

Việc cần làm:
1. CRUD `farms` (list, create, edit) — chỉ admin/org_admin tạo được farm mới.
2. CRUD `growing_areas` gắn theo `farm_id`.
3. Trang gán quyền user–farm (`user_farms`) cho admin.
4. Dashboard: tổng số farm, tổng diện tích, tổng số vùng trồng — **query thật từ DB**, không số liệu giả.
5. Hiển thị điểm GPS farm/vùng trồng trên bản đồ Leaflet (marker đơn giản).

**Tiêu chí nghiệm thu (Checkpoint 2):**
- [ ] Tạo 2 farm, gán user test vào 1 farm → user đó chỉ thấy đúng 1 farm được gán.
- [ ] Admin thấy tất cả farm.
- [ ] Dashboard hiển thị số liệu đúng khớp dữ liệu thật trong DB.
- [ ] Form có validation (zod) — không cho submit dữ liệu rỗng/sai định dạng.

> 🔴 **Dừng tại đây — báo cáo cho chủ dự án trước khi sang Sprint 3.**

---

### 🟢 Sprint 3 — Nhật ký bón phân & chăm sóc
**Mục tiêu:** Ghi nhật ký hoạt động canh tác đầy đủ, kèm ảnh.

Việc cần làm:
1. Form nhật ký bón phân (`fertilizer_applications`) — chọn farm → chọn vùng trồng (cascading select), chọn sản phẩm phân bón từ `fertilizer_products`.
2. Form nhật ký chăm sóc (`farm_activities`) — 7 loại hoạt động theo enum.
3. Upload ảnh qua Supabase Storage, lưu record vào `attachments` với `entity_type`/`entity_id` tương ứng.
4. Trang lịch sử theo từng vùng trồng (filter theo ngày, loại hoạt động).
5. Ngày mặc định = hôm nay, cho sửa.

**Tiêu chí nghiệm thu (Checkpoint 3):**
- [ ] Tạo được nhật ký bón phân + upload ảnh thành công, ảnh hiển thị lại đúng.
- [ ] Lịch sử theo vùng trồng lọc đúng theo farm mà user có quyền.
- [ ] Xóa nhật ký dùng soft delete (`deleted_at`), không mất dữ liệu vĩnh viễn.

> 🔴 **Dừng tại đây — báo cáo cho chủ dự án trước khi sang Sprint 4.**

---

### 🟢 Sprint 4 — Danh mục vật tư, Chi phí, Báo cáo
**Mục tiêu:** Quản lý DMVT tham chiếu, chi phí, xuất báo cáo.

Việc cần làm:
1. CRUD `inventory_items` — **chỉ là danh mục tham chiếu**, KHÔNG có trường số lượng tồn kho động, không có nghiệp vụ nhập/xuất kho.
2. CRUD `expenses` gắn farm/vùng trồng, đơn vị VNĐ.
3. Trang báo cáo: filter theo farm/vùng trồng/khoảng ngày/loại hoạt động → xuất CSV.
4. Tổng hợp chi phí theo vùng trồng trên dashboard.

**Tiêu chí nghiệm thu (Checkpoint 4):**
- [ ] DMVT không có bất kỳ trường/API nào ngụ ý quản lý tồn kho (đúng phạm vi đã chốt).
- [ ] Export CSV chỉ chứa dữ liệu mà user có quyền xem (test bằng user bị giới hạn farm).
- [ ] Chi phí hiển thị đúng định dạng VNĐ, tổng hợp đúng số liệu.

> 🔴 **Dừng tại đây — báo cáo cho chủ dự án trước khi sang Sprint 5.**

---

### 🟢 Sprint 5 — Hoàn thiện phân quyền, kiểm thử, tối ưu mobile
**Mục tiêu:** Sẵn sàng triển khai.

Việc cần làm:
1. Rà soát toàn bộ 5 role (`admin`, `org_admin`, `farm_manager`, `field_technician`, `farmer`) — xác định rõ quyền edit/view/delete từng role trên từng module, cập nhật RLS/policy nếu thiếu.
2. Test chéo: tạo ≥2 user với quyền khác nhau, xác nhận không rò rỉ dữ liệu.
3. Tối ưu mobile: bottom navigation, nút "Thêm nhật ký" nổi bật, ít trường bắt buộc.
4. Loading/empty/error state cho toàn bộ danh sách và form.
5. README hướng dẫn cài đặt, biến môi trường, chạy migration, seed data.
6. Chuẩn bị deploy Vercel + Supabase Cloud (production).

**Tiêu chí nghiệm thu (Checkpoint 5 — cuối cùng):**
- [ ] Ma trận phân quyền có bảng rõ ràng trong README.
- [ ] Không có endpoint/API nào bỏ sót RLS (audit bằng cách gọi trực tiếp Supabase REST với JWT của user quyền thấp).
- [ ] App dùng mượt trên màn hình điện thoại (test thực tế, không chỉ responsive giả lập).
- [ ] README đủ để người khác setup từ đầu mà không cần hỏi thêm.

> ✅ **MVP hoàn tất — bàn giao cho chủ dự án.**

---

## 5. Quy tắc làm việc bắt buộc cho Claude Code

1. Trả lời/báo cáo bằng tiếng Việt, ngắn gọn, tập trung thực thi.
2. **Dừng đúng tại mỗi Checkpoint** — không tự ý gộp sprint hoặc chạy tiếp khi chưa có xác nhận.
3. Không tạo chức năng giả (mock data, fake dashboard numbers) rồi báo là "đã hoàn thành".
4. Nếu gặp quyết định kỹ thuật chưa có trong tài liệu này → nêu rõ giả định + hỏi trước khi code, không tự suy diễn âm thầm.
5. Không hardcode secret/API key trong code — dùng `.env.local`, có `.env.local.example` mẫu.
6. Khi sửa lỗi: giải thích nguyên nhân + cách đã kiểm tra, không chỉ báo "đã fix".
7. Mọi thay đổi schema DB phải đi qua file migration trong `supabase/migrations/`, không sửa tay trên dashboard Supabase rồi quên đồng bộ code.
8. DMVT (`inventory_items`) **tuyệt đối không** phát triển thêm logic tồn kho nếu chủ dự án chưa yêu cầu bổ sung — đây là ranh giới đã chốt rõ trong tài liệu này.

---

## 6. .env.local.example

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```
