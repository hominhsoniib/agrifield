-- ============================================
-- Migration 0007: Trang Admin Quản lý & Chỉnh sửa Nội dung Website (site_contents)
-- ============================================

create table if not exists site_contents (
  id text primary key, -- Ví dụ: 'sam-bo-chinh-guide', 'sam-an-do-guide', 'about-page'
  title text not null,
  summary text,
  content text,
  updated_at timestamptz default now(),
  updated_by uuid references profiles(id) on delete set null
);

alter table site_contents enable row level security;

-- SELECT: Cho phép tất cả người dùng đã đăng nhập xem nội dung trang web
create policy "site_contents_select" on site_contents for select
  using (auth.uid() is not null);

-- INSERT/UPDATE/DELETE: Chỉ dành cho Admin và Org Admin (thông qua is_admin_role())
create policy "site_contents_admin_insert" on site_contents for insert
  with check (is_admin_role());

create policy "site_contents_admin_update" on site_contents for update
  using (is_admin_role());

create policy "site_contents_admin_delete" on site_contents for delete
  using (is_admin_role());
