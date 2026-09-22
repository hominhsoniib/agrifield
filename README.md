# FarmTrack — Hệ thống Quản lý Nông nghiệp & Canh tác

Ứng dụng web quản lý nông trại, vùng trồng, nhật ký canh tác (bón phân, chăm sóc) và chi phí sản xuất xây dựng trên **Next.js 16 (App Router)** và **Supabase Backend**.

---

## 🛠️ Công nghệ sử dụng (Tech Stack)

- **Frontend**: Next.js 16.3.5 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS v4.
- **UI Components**: Shadcn UI (`@base-ui/react`), Lucide React Icons.
- **Bản đồ GIS**: Leaflet & `react-leaflet` (hiển thị vị trí tọa độ GPS).
- **Backend & Database**: Supabase PostgreSQL, Supabase Auth, Row Level Security (RLS), Supabase Storage.
- **Form & Validation**: `react-hook-form`, `zod`, `@hookform/resolvers`.
- **State & Data Fetching**: `@tanstack/react-query`.

---

## 🔐 Ma trận Phân quyền & Bảo mật CSDL (RLS Security Matrix)

Hệ thống hỗ trợ 5 vai trò người dùng (`user_role`), phân quyền truy cập dữ liệu dựa trên bảng gán **`user_farms`**:

| Chức năng / Bảng | Admin (`admin`, `org_admin`) | Trưởng trang trại (`farm_manager`) | Kỹ thuật viên (`field_technician`) | Nông dân (`farmer`) |
|---|---|---|---|---|
| **Quản lý Nông trại (`farms`)** | Xem tất cả, Tạo mới, Sửa | Chỉ xem farm được gán | Chỉ xem farm được gán | Chỉ xem farm được gán |
| **Vùng trồng (`growing_areas`)** | Toàn quyền | Xem/Sửa vùng trồng trong farm được gán | Xem/Sửa vùng trồng trong farm được gán | Chỉ xem vùng trồng được gán |
| **Nhật ký bón phân (`fertilizer_applications`)** | Toàn quyền | Thêm/Sửa/Xem trong farm được gán | Thêm/Sửa/Xem trong farm được gán | Thêm/Xem nhật ký trong farm được gán |
| **Nhật ký chăm sóc (`farm_activities`)** | Toàn quyền | Thêm/Sửa/Xem trong farm được gán | Thêm/Sửa/Xem trong farm được gán | Thêm/Xem nhật ký trong farm được gán |
| **Chi phí (`expenses`)** | Toàn quyền | Thêm/Sửa/Xem chi phí farm được gán | Thêm/Xem chi phí farm được gán | Chỉ xem chi phí farm được gán |
| **Danh mục Vật tư (`inventory_items`)** | Thêm/Sửa/Xóa | Xem danh mục | Xem danh mục | Xem danh mục |
| **Gán quyền User - Farm (`user_farms`)** | Thêm/Xóa gán quyền | Không | Không | Không |

---

## 🚀 Hướng dẫn Cài đặt & Chạy cục bộ (Local Development)

### 1. Yêu cầu hệ thống
- Node.js 18+ hoặc 20+
- npm hoặc pnpm

### 2. Cấu hình biến môi trường
Tạo file `.env.local` ở thư mục gốc với các biến sau:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_your_anon_key
SUPABASE_SERVICE_ROLE_KEY=sb_secret_your_service_role_key

SEED_ADMIN_EMAIL=admin@example.com
SEED_ADMIN_PASSWORD=your_secure_password
SEED_ORG_NAME=AgriField Demo Org
```

### 3. Cài đặt thư viện & Khởi chạy Dev Server
```bash
# Cài đặt thư viện
npm install

# Khởi tạo dữ liệu Admin & Organization mẫu
npm run seed

# Chạy server phát triển
npm run dev
```

Mở trình duyệt tại [http://localhost:3000](http://localhost:3000).

---

## 📦 Triển khai lên Vercel (Production Deployment)

1. Đẩy mã nguồn lên kho chứa GitHub.
2. Tạo dự án mới trên Vercel từ GitHub Repository.
3. Cấu hình **Application Preset**: `Next.js`.
4. Điền các **Environment Variables** (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`).
5. Bấm **Deploy**.
