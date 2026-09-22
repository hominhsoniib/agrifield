-- ============================================
-- FarmTrack — Migration 0001: Init schema
-- Nguồn: FARMTRACK_BUILD_PLAN.md mục 2.
-- Thứ tự bảng đã sắp lại đúng theo phụ thuộc khoá ngoại
-- (organizations → profiles → farms → user_farms → crops →
--  growing_areas → fertilizer_products → fertilizer_applications →
--  farm_activities → inventory_items → expenses → attachments).
-- ============================================

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

-- ============================================
-- RLS — PROFILES & ORGANIZATIONS
-- (bổ sung theo yêu cầu chủ dự án tại Checkpoint 1 — bản SQL gốc trong
--  FARMTRACK_BUILD_PLAN.md mục 2 không bật RLS cho 2 bảng này.)
-- ============================================
alter table profiles enable row level security;
alter table organizations enable row level security;

-- PROFILES: ai cũng xem được profile người khác trong tổ chức (cần cho UI hiển thị tên),
-- nhưng CHỈ được sửa các cột của CHÍNH MÌNH, và KHÔNG được tự đổi role/organization_id.
create policy "profiles_select_all" on profiles for select
  using (auth.uid() is not null);

create policy "profiles_update_own_safe_fields" on profiles for update
  using (id = auth.uid())
  with check (
    id = auth.uid()
    and role = (select role from profiles where id = auth.uid())
    and organization_id is not distinct from (select organization_id from profiles where id = auth.uid())
  );

create policy "profiles_admin_update_all" on profiles for update
  using (is_admin_role());

-- ORGANIZATIONS: chỉ user đã đăng nhập mới xem được; chỉ admin mới sửa.
create policy "organizations_select" on organizations for select
  using (auth.uid() is not null);
create policy "organizations_admin_write" on organizations for insert
  with check (is_admin_role());
create policy "organizations_admin_update" on organizations for update
  using (is_admin_role());
