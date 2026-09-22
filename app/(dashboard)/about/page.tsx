import Image from "next/image";
import Link from "next/link";
import {
  Info,
  Database,
  Cloud,
  FileSpreadsheet,
  Users,
  Award,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Cpu,
  TrendingUp,
  Layers,
  Sprout,
  BarChart3,
  BookOpen,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="space-y-8 p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 p-6 md:p-8 text-white shadow-xl">
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3.5 py-1 text-xs font-semibold text-emerald-300 backdrop-blur-md border border-emerald-400/30">
            <Sparkles className="size-3.5 text-emerald-400" />
            <span>Nông nghiệp số — Giá trị thật</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight">
            Sơ đồ Minh họa & Giới thiệu Hệ thống AgriField
          </h1>
          <p className="text-sm md:text-base text-emerald-100/90 leading-relaxed">
            Kết nối dữ liệu · Quản lý toàn diện · Nâng cao hiệu quả · Hướng đến nông nghiệp bền vững.
            Giải pháp số hóa nhật ký canh tác, vật tư và chi phí nông nghiệp dành cho nông hộ và doanh nghiệp.
          </p>

          <div className="pt-2">
            <Link
              href="/sam-bo-chinh"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2.5 text-xs font-bold text-white shadow-md hover:from-emerald-400 hover:to-teal-400 transition-all hover:scale-[1.02]"
            >
              <Sprout className="size-4" />
              <span>Xem Kỹ thuật Trồng Sâm Bố Chính</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>

        {/* Decorative blur */}
        <div className="absolute -right-12 -bottom-12 size-64 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />
      </div>

      {/* Main Infographic Image Card */}
      <div className="rounded-2xl border border-neutral-200/80 bg-white p-4 md:p-6 shadow-md dark:border-neutral-800 dark:bg-neutral-900 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-neutral-100 pb-4 dark:border-neutral-800">
          <div>
            <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <BookOpen className="size-5 text-emerald-600 dark:text-emerald-400" />
              <span>Sơ đồ tổng quan kiến trúc hệ thống</span>
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Hình ảnh chi tiết luồng dữ liệu từ đầu vào, nền tảng xử lý đến kết quả đầu ra
            </p>
          </div>

          <a
            href="/gioi-thieu.png"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-50 px-3.5 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-300 dark:hover:bg-emerald-900/50 transition-colors shrink-0"
          >
            <span>Mở ảnh kích thước lớn</span>
            <ExternalLink className="size-3.5" />
          </a>
        </div>

        {/* Infographic Image Container */}
        <div className="relative overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50 shadow-inner dark:border-neutral-800 dark:bg-neutral-950 group">
          <img
            src="/gioi-thieu.png"
            alt="Sơ đồ minh họa hệ thống quản lý nông nghiệp AgriField"
            className="w-full h-auto object-contain max-h-[85vh] mx-auto rounded-lg transition-transform duration-300 group-hover:scale-[1.01]"
          />
        </div>
      </div>

      {/* System Features Breakdown */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
          Các trụ cột chính của Hệ thống AgriField
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Dữ liệu đầu vào */}
          <div className="rounded-xl border border-neutral-200/80 bg-white p-5 shadow-xs hover:shadow-md transition-shadow dark:border-neutral-800 dark:bg-neutral-900 space-y-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-100/80 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
              <Database className="size-5" />
            </div>
            <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
              1. Dữ liệu đầu vào
            </h3>
            <ul className="text-xs text-neutral-600 dark:text-neutral-400 space-y-2 list-disc list-inside leading-relaxed">
              <li>Thông tin nông trại, vị trí & diện tích vùng trồng</li>
              <li>Hoạt động sản xuất: Bón phân, chăm sóc, thu hoạch</li>
              <li>Quản lý vật tư: Giống, phân bón, thuốc bảo vệ thực vật</li>
              <li>Ghi nhận chi phí chi tiết theo từng vùng trồng</li>
              <li>Phân quyền người dùng (Nông hộ, Kỹ thuật viên, Admin)</li>
            </ul>
          </div>

          {/* Card 2: Nền tảng xử lý */}
          <div className="rounded-xl border border-neutral-200/80 bg-white p-5 shadow-xs hover:shadow-md transition-shadow dark:border-neutral-800 dark:bg-neutral-900 space-y-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-blue-100/80 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
              <Cloud className="size-5" />
            </div>
            <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
              2. Nền tảng đám mây
            </h3>
            <ul className="text-xs text-neutral-600 dark:text-neutral-400 space-y-2 list-disc list-inside leading-relaxed">
              <li>Lưu trữ & xử lý dữ liệu an toàn trên Supabase Cloud</li>
              <li>Đồng bộ thời gian thực giữa thiết bị Web & Mobile</li>
              <li>Bảo mật phân quyền dữ liệu theo cấp độ người dùng</li>
              <li>Tự động tổng hợp & phân tích chi phí tự động</li>
            </ul>
          </div>

          {/* Card 3: Kết quả đầu ra */}
          <div className="rounded-xl border border-neutral-200/80 bg-white p-5 shadow-xs hover:shadow-md transition-shadow dark:border-neutral-800 dark:bg-neutral-900 space-y-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-indigo-100/80 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
              <FileSpreadsheet className="size-5" />
            </div>
            <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
              3. Kết quả đầu ra
            </h3>
            <ul className="text-xs text-neutral-600 dark:text-neutral-400 space-y-2 list-disc list-inside leading-relaxed">
              <li>Báo cáo tổng quan số lượng farm, diện tích, vùng trồng</li>
              <li>Báo cáo phân tích chi phí chi tiết theo thời gian</li>
              <li>Nhật ký canh tác điện tử phục vụ truy xuất</li>
              <li>Minh bạch dữ liệu & tối ưu quyết định sản xuất</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Target Users & Value Creation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Đối tượng sử dụng */}
        <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
              <Users className="size-5" />
            </div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
              Đối tượng sử dụng
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-lg bg-neutral-50 p-3 border border-neutral-100 dark:bg-neutral-800/60 dark:border-neutral-800">
              <p className="font-bold text-neutral-900 dark:text-neutral-200">🌱 Nông hộ</p>
              <p className="text-neutral-500 mt-1">Ghi chép nhật ký & quản lý chi phí canh tác dễ dàng.</p>
            </div>
            <div className="rounded-lg bg-neutral-50 p-3 border border-neutral-100 dark:bg-neutral-800/60 dark:border-neutral-800">
              <p className="font-bold text-neutral-900 dark:text-neutral-200">🤝 Hợp tác xã</p>
              <p className="text-neutral-500 mt-1">Theo dõi hoạt động canh tác của tất cả hộ thành viên.</p>
            </div>
            <div className="rounded-lg bg-neutral-50 p-3 border border-neutral-100 dark:bg-neutral-800/60 dark:border-neutral-800">
              <p className="font-bold text-neutral-900 dark:text-neutral-200">🏢 Doanh nghiệp</p>
              <p className="text-neutral-500 mt-1">Quản lý vùng trồng quy mô lớn, hoạch định ngân sách.</p>
            </div>
            <div className="rounded-lg bg-neutral-50 p-3 border border-neutral-100 dark:bg-neutral-800/60 dark:border-neutral-800">
              <p className="font-bold text-neutral-900 dark:text-neutral-200">🏛️ Đơn vị quản lý</p>
              <p className="text-neutral-500 mt-1">Kiểm soát tiêu chuẩn chất lượng & mã số vùng trồng.</p>
            </div>
          </div>
        </div>

        {/* Định hướng tương lai */}
        <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-teal-100 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300">
              <Cpu className="size-5" />
            </div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
              Định hướng phát triển tương lai
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-lg bg-teal-50/60 p-3 border border-teal-100 dark:bg-teal-950/30 dark:border-teal-900/40">
              <p className="font-bold text-teal-900 dark:text-teal-200">🔍 Truy xuất nguồn gốc</p>
              <p className="text-teal-700/80 dark:text-teal-400/80 mt-1">Mã QR Code cho từng lô nông sản thu hoạch.</p>
            </div>
            <div className="rounded-lg bg-teal-50/60 p-3 border border-teal-100 dark:bg-teal-950/30 dark:border-teal-900/40">
              <p className="font-bold text-teal-900 dark:text-teal-200">📡 IoT & Cảm biến</p>
              <p className="text-teal-700/80 dark:text-teal-400/80 mt-1">Tự động đo độ ẩm, nhiệt độ & đất trồng.</p>
            </div>
            <div className="rounded-lg bg-teal-50/60 p-3 border border-teal-100 dark:bg-teal-950/30 dark:border-teal-900/40">
              <p className="font-bold text-teal-900 dark:text-teal-200">🤖 AI Phân tích</p>
              <p className="text-teal-700/80 dark:text-teal-400/80 mt-1">Dự báo năng suất & cảnh báo sâu bệnh.</p>
            </div>
            <div className="rounded-lg bg-teal-50/60 p-3 border border-teal-100 dark:bg-teal-950/30 dark:border-teal-900/40">
              <p className="font-bold text-teal-900 dark:text-teal-200">🌐 Kết nối hệ sinh thái</p>
              <p className="text-teal-700/80 dark:text-teal-400/80 mt-1">Liên kết ngân hàng, bảo hiểm & nhà thu mua.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
