-- =====================================================================
-- AgriField (FarmTrack) — FULL DATABASE SCHEMA & MIGRATIONS (0001 - 0007)
-- Chạy toàn bộ file này 1 lần duy nhất trong Supabase SQL Editor.
-- =====================================================================

-- 1. EXTENSIONS
create extension if not exists "uuid-ossp";

-- 2. ORGANIZATIONS
create table if not exists organizations (
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

-- 3. PROFILES
do $$ begin
  create type user_role as enum ('admin', 'org_admin', 'farm_manager', 'field_technician', 'farmer');
exception
  when duplicate_object then null;
end $$;

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  organization_id uuid references organizations(id),
  full_name text not null,
  phone text,
  role user_role not null default 'farmer',
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 4. FARMS
create table if not exists farms (
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

-- 5. USER_FARMS
create table if not exists user_farms (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade,
  farm_id uuid references farms(id) on delete cascade,
  created_at timestamptz default now(),
  unique(user_id, farm_id)
);

-- 6. CROPS
create table if not exists crops (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  code text unique,
  created_at timestamptz default now()
);

-- 7. GROWING_AREAS
create table if not exists growing_areas (
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
  status text default 'active',
  notes text,
  created_by uuid references profiles(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz
);

-- 8. FERTILIZER_PRODUCTS
create table if not exists fertilizer_products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  brand text,
  fertilizer_group text,
  nutrient_composition text,
  unit text not null,
  supplier text,
  notes text,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- 9. FERTILIZER_APPLICATIONS
create table if not exists fertilizer_applications (
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

-- 10. FARM_ACTIVITIES
do $$ begin
  create type activity_type as enum (
    'irrigation', 'weeding', 'pruning', 'pest_control',
    'fertilizing', 'pesticide', 'other'
  );
exception
  when duplicate_object then null;
end $$;

create table if not exists farm_activities (
  id uuid primary key default uuid_generate_v4(),
  farm_id uuid references farms(id),
  growing_area_id uuid references growing_areas(id) on delete cascade,
  activity_date date not null default current_date,
  activity_type activity_type not null,
  material_used text,
  performed_by uuid references profiles(id),
  cost numeric(12,0),
  notes text,
  created_by uuid references profiles(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz
);

-- 11. INVENTORY_ITEMS
create table if not exists inventory_items (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  code text unique,
  category text,
  unit text not null,
  reference_price numeric(12,0),
  supplier text,
  notes text,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- 12. EXPENSES
do $$ begin
  create type expense_category as enum (
    'fertilizer', 'labor', 'irrigation', 'materials', 'other'
  );
exception
  when duplicate_object then null;
end $$;

create table if not exists expenses (
  id uuid primary key default uuid_generate_v4(),
  farm_id uuid references farms(id),
  growing_area_id uuid references growing_areas(id),
  category expense_category not null,
  amount numeric(14,0) not null,
  expense_date date not null default current_date,
  notes text,
  created_by uuid references profiles(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz
);

-- 13. ATTACHMENTS
create table if not exists attachments (
  id uuid primary key default uuid_generate_v4(),
  entity_type text not null,
  entity_id uuid not null,
  storage_path text not null,
  uploaded_by uuid references profiles(id),
  created_at timestamptz default now()
);

-- 14. HARVEST_LOGS
create table if not exists harvest_logs (
  id uuid primary key default uuid_generate_v4(),
  farm_id uuid references farms(id),
  growing_area_id uuid references growing_areas(id) on delete cascade,
  harvest_date date not null default current_date,
  crop_name text not null,
  quantity numeric(10,2) not null,
  unit text not null default 'kg',
  estimated_value numeric(14,0),
  quality_grade text,
  performed_by uuid references profiles(id),
  notes text,
  created_by uuid references profiles(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz
);

-- 15. SITE_CONTENTS (CMS quản trị nội dung)
create table if not exists site_contents (
  id text primary key,
  title text not null,
  summary text,
  content text,
  updated_at timestamptz default now(),
  updated_by uuid references profiles(id) on delete set null
);

-- INDEXES
create index if not exists idx_growing_areas_farm on growing_areas(farm_id) where deleted_at is null;
create index if not exists idx_fertilizer_apps_area on fertilizer_applications(growing_area_id) where deleted_at is null;
create index if not exists idx_farm_activities_area on farm_activities(growing_area_id) where deleted_at is null;
create index if not exists idx_expenses_farm on expenses(farm_id) where deleted_at is null;
create index if not exists idx_attachments_entity on attachments(entity_type, entity_id);
create index if not exists idx_user_farms_user on user_farms(user_id);
create index if not exists idx_harvest_logs_area on harvest_logs(growing_area_id) where deleted_at is null;
create index if not exists idx_harvest_logs_farm on harvest_logs(farm_id) where deleted_at is null;

-- =====================================================================
-- HELPER FUNCTIONS & ROW LEVEL SECURITY (RLS)
-- =====================================================================

create or replace function is_admin_role()
returns boolean as $$
  select exists (
    select 1 from profiles
    where id = auth.uid() and role in ('admin', 'org_admin')
  );
$$ language sql security definer stable;

create or replace function has_farm_access(target_farm_id uuid)
returns boolean as $$
  select is_admin_role() or exists (
    select 1 from user_farms
    where user_id = auth.uid() and farm_id = target_farm_id
  );
$$ language sql security definer stable;

-- BẬT RLS CHO TẤT CẢ CÁC BẢNG
alter table organizations enable row level security;
alter table profiles enable row level security;
alter table farms enable row level security;
alter table user_farms enable row level security;
alter table crops enable row level security;
alter table growing_areas enable row level security;
alter table fertilizer_products enable row level security;
alter table fertilizer_applications enable row level security;
alter table farm_activities enable row level security;
alter table inventory_items enable row level security;
alter table expenses enable row level security;
alter table attachments enable row level security;
alter table harvest_logs enable row level security;
alter table site_contents enable row level security;

-- POLICIES: ORGANIZATIONS
drop policy if exists "organizations_select" on organizations;
create policy "organizations_select" on organizations for select using (auth.uid() is not null);
drop policy if exists "organizations_admin_write" on organizations;
create policy "organizations_admin_write" on organizations for insert with check (is_admin_role());
drop policy if exists "organizations_admin_update" on organizations;
create policy "organizations_admin_update" on organizations for update using (is_admin_role());

-- POLICIES: PROFILES
drop policy if exists "profiles_select_all" on profiles;
create policy "profiles_select_all" on profiles for select using (auth.uid() is not null);
drop policy if exists "profiles_update_own_safe_fields" on profiles;
create policy "profiles_update_own_safe_fields" on profiles for update
  using (id = auth.uid())
  with check (
    id = auth.uid()
    and role = (select role from profiles where id = auth.uid())
    and organization_id is not distinct from (select organization_id from profiles where id = auth.uid())
  );
drop policy if exists "profiles_admin_update_all" on profiles;
create policy "profiles_admin_update_all" on profiles for update using (is_admin_role());

-- POLICIES: FARMS
drop policy if exists "farms_select" on farms;
create policy "farms_select" on farms for select using (has_farm_access(id));
drop policy if exists "farms_admin_write" on farms;
create policy "farms_admin_write" on farms for insert with check (is_admin_role());
drop policy if exists "farms_admin_update" on farms;
create policy "farms_admin_update" on farms for update using (is_admin_role());

-- POLICIES: USER_FARMS
drop policy if exists "user_farms_select_own" on user_farms;
create policy "user_farms_select_own" on user_farms for select using (user_id = auth.uid() or is_admin_role());
drop policy if exists "user_farms_admin_write" on user_farms;
create policy "user_farms_admin_write" on user_farms for insert with check (is_admin_role());
drop policy if exists "user_farms_admin_delete" on user_farms;
create policy "user_farms_admin_delete" on user_farms for delete using (is_admin_role());

-- POLICIES: GROWING_AREAS
drop policy if exists "growing_areas_select" on growing_areas;
create policy "growing_areas_select" on growing_areas for select using (has_farm_access(farm_id));
drop policy if exists "growing_areas_write" on growing_areas;
create policy "growing_areas_write" on growing_areas for insert with check (has_farm_access(farm_id));
drop policy if exists "growing_areas_update" on growing_areas;
create policy "growing_areas_update" on growing_areas for update using (has_farm_access(farm_id));

-- POLICIES: FERTILIZER_APPLICATIONS
drop policy if exists "fert_apps_select" on fertilizer_applications;
create policy "fert_apps_select" on fertilizer_applications for select using (has_farm_access(farm_id));
drop policy if exists "fert_apps_write" on fertilizer_applications;
create policy "fert_apps_write" on fertilizer_applications for insert with check (has_farm_access(farm_id));
drop policy if exists "fert_apps_update" on fertilizer_applications;
create policy "fert_apps_update" on fertilizer_applications for update using (has_farm_access(farm_id));

-- POLICIES: FARM_ACTIVITIES
drop policy if exists "activities_select" on farm_activities;
create policy "activities_select" on farm_activities for select using (has_farm_access(farm_id));
drop policy if exists "activities_write" on farm_activities;
create policy "activities_write" on farm_activities for insert with check (has_farm_access(farm_id));
drop policy if exists "activities_update" on farm_activities;
create policy "activities_update" on farm_activities for update using (has_farm_access(farm_id));

-- POLICIES: EXPENSES
drop policy if exists "expenses_select" on expenses;
create policy "expenses_select" on expenses for select using (has_farm_access(farm_id));
drop policy if exists "expenses_write" on expenses;
create policy "expenses_write" on expenses for insert with check (has_farm_access(farm_id));
drop policy if exists "expenses_update" on expenses;
create policy "expenses_update" on expenses for update using (has_farm_access(farm_id));

-- POLICIES: ATTACHMENTS
drop policy if exists "attachments_select" on attachments;
create policy "attachments_select" on attachments for select using (auth.uid() is not null);
drop policy if exists "attachments_insert" on attachments;
create policy "attachments_insert" on attachments for insert with check (auth.uid() is not null);

-- POLICIES: REFERENCE TABLES (CROPS, FERTILIZER_PRODUCTS, INVENTORY_ITEMS)
drop policy if exists "crops_select" on crops;
create policy "crops_select" on crops for select using (auth.uid() is not null);
drop policy if exists "crops_admin_write" on crops;
create policy "crops_admin_write" on crops for insert with check (is_admin_role());
drop policy if exists "crops_admin_update" on crops;
create policy "crops_admin_update" on crops for update using (is_admin_role());

drop policy if exists "fertilizer_products_select" on fertilizer_products;
create policy "fertilizer_products_select" on fertilizer_products for select using (auth.uid() is not null);
drop policy if exists "fertilizer_products_admin_write" on fertilizer_products;
create policy "fertilizer_products_admin_write" on fertilizer_products for insert with check (is_admin_role());
drop policy if exists "fertilizer_products_admin_update" on fertilizer_products;
create policy "fertilizer_products_admin_update" on fertilizer_products for update using (is_admin_role());

drop policy if exists "inventory_items_select" on inventory_items;
create policy "inventory_items_select" on inventory_items for select using (auth.uid() is not null);
drop policy if exists "inventory_items_admin_write" on inventory_items;
create policy "inventory_items_admin_write" on inventory_items for insert with check (is_admin_role());
drop policy if exists "inventory_items_admin_update" on inventory_items;
create policy "inventory_items_admin_update" on inventory_items for update using (is_admin_role());

-- POLICIES: HARVEST_LOGS
drop policy if exists "harvest_logs_select" on harvest_logs;
create policy "harvest_logs_select" on harvest_logs for select using (has_farm_access(farm_id));
drop policy if exists "harvest_logs_write" on harvest_logs;
create policy "harvest_logs_write" on harvest_logs for insert with check (has_farm_access(farm_id));
drop policy if exists "harvest_logs_update" on harvest_logs;
create policy "harvest_logs_update" on harvest_logs for update using (has_farm_access(farm_id));

-- POLICIES: SITE_CONTENTS
drop policy if exists "site_contents_select" on site_contents;
create policy "site_contents_select" on site_contents for select using (auth.uid() is not null);
drop policy if exists "site_contents_admin_insert" on site_contents;
create policy "site_contents_admin_insert" on site_contents for insert with check (is_admin_role());
drop policy if exists "site_contents_admin_update" on site_contents;
create policy "site_contents_admin_update" on site_contents for update using (is_admin_role());
drop policy if exists "site_contents_admin_delete" on site_contents;
create policy "site_contents_admin_delete" on site_contents for delete using (is_admin_role());

-- =====================================================================
-- STORAGE BUCKET: ATTACHMENTS
-- =====================================================================
insert into storage.buckets (id, name, public)
values ('attachments', 'attachments', false)
on conflict (id) do nothing;

drop policy if exists "attachments_bucket_select" on storage.objects;
create policy "attachments_bucket_select" on storage.objects for select
  using (bucket_id = 'attachments' and auth.uid() is not null);

drop policy if exists "attachments_bucket_insert" on storage.objects;
create policy "attachments_bucket_insert" on storage.objects for insert
  with check (bucket_id = 'attachments' and auth.uid() is not null);

-- =====================================================================
-- SEED DATA CƠ BẢN (5 SẢN PHẨM PHÂN BÓN THAM CHIẾU)
-- =====================================================================
insert into fertilizer_products (name, brand, fertilizer_group, nutrient_composition, unit, is_active)
values
  ('Phân đạm Urê', 'Đạm Phú Mỹ', 'Vô cơ', '46% N', 'kg', true),
  ('Phân NPK 16-16-8', 'Bình Điền', 'Vô cơ', '16-16-8+TE', 'kg', true),
  ('Phân DAP 18-46-0', 'DAP Đình Vũ', 'Vô cơ', '18% N, 46% P2O5', 'kg', true),
  ('Phân Kali Clorua (KCl)', 'Cà Mau', 'Vô cơ', '60% K2O', 'kg', true),
  ('Phân hữu cơ vi sinh', 'Sông Gianh', 'Hữu cơ vi sinh', 'OM 15%, VSV cố định đạm', 'kg', true)
on conflict do nothing;
