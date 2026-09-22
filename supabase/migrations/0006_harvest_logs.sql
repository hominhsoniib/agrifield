-- ============================================
-- Migration 0006: Bảng harvest_logs (Nhật ký thu hoạch nông sản)
-- ============================================
create table if not exists harvest_logs (
  id uuid primary key default uuid_generate_v4(),
  farm_id uuid references farms(id),
  growing_area_id uuid references growing_areas(id) on delete cascade,
  harvest_date date not null default current_date,
  crop_name text not null, -- Tên nông sản / Cây trồng thu hoạch (vd: Sầu riêng, Cà chua, Dưa hấu...)
  quantity numeric(10,2) not null, -- Sản lượng thu hoạch
  unit text not null default 'kg', -- Đơn vị tính: kg, tấn, tạ, sọt, bao, trái...
  estimated_value numeric(14,0), -- Thành tiền / Giá trị ước tính (VNĐ)
  quality_grade text, -- Phân loại / Chất lượng: Loại 1, Loại 2, Xuất khẩu...
  performed_by uuid references profiles(id),
  notes text,
  created_by uuid references profiles(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz
);

create index if not exists idx_harvest_logs_area on harvest_logs(growing_area_id) where deleted_at is null;
create index if not exists idx_harvest_logs_farm on harvest_logs(farm_id) where deleted_at is null;

alter table harvest_logs enable row level security;

create policy "harvest_logs_select" on harvest_logs for select
  using (has_farm_access(farm_id));

create policy "harvest_logs_write" on harvest_logs for insert
  with check (has_farm_access(farm_id));

create policy "harvest_logs_update" on harvest_logs for update
  using (has_farm_access(farm_id));
