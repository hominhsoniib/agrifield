"use client";

import { useState } from "react";
import {
  Sprout,
  Shovel,
  FlaskConical,
  Calendar,
  Layers,
  Thermometer,
  Droplets,
  Sparkles,
  Sun,
  Ruler,
  CheckCircle2,
  BookOpen,
  Waves,
  Pipette,
  Scissors,
  AlertTriangle,
  Flame,
  ShieldAlert,
  TestTube,
  Clock,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

type TabKey =
  | "tong-quat"
  | "uom-giong"
  | "lam-dat"
  | "u-phan"
  | "len-luong"
  | "tuoi-nho-giot"
  | "thu-hoach";

export function SamBoChinhGuide() {
  const [activeTab, setActiveTab] = useState<TabKey>("tong-quat");

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 md:p-6">
      {/* Top Banner Header */}
      <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-950 p-6 md:p-8 text-white shadow-xl">
        <div className="relative z-10 space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3.5 py-1 text-xs font-semibold text-emerald-300 backdrop-blur-md border border-emerald-400/30">
            <Sparkles className="size-3.5 text-emerald-400" />
            <span>Quy trình Kỹ thuật Chuẩn Nông trại AgriField (Từ A - Z)</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight">
            Quy Trình Canh Tác Sâm Bố Chính Chuẩn Kỹ Thuật
          </h1>
          <p className="text-sm text-emerald-100/90 leading-relaxed">
            Bộ tài liệu quy trình chuẩn hóa từ khâu xử lý hạt giống, xử lý đất phèn/xám Củ Chi, ủ phân 2 giai đoạn, lắp đặt tưới nhỏ giọt A/B đến thu hoạch & sơ chế đạt chuẩn hàm lượng Saponin.
          </p>
        </div>

        <div className="absolute -right-10 -bottom-10 size-60 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />
      </div>

      {/* 7 Multi-Tab Navigation Bar - Multi-Color Theme */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 p-1.5 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
        {/* Tab 1: Tổng quát */}
        <button
          type="button"
          onClick={() => setActiveTab("tong-quat")}
          className={`flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl text-xs font-bold transition-all duration-300 ${
            activeTab === "tong-quat"
              ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30 scale-[1.02]"
              : "text-neutral-600 hover:text-emerald-700 hover:bg-emerald-50/60 dark:text-neutral-400 dark:hover:text-emerald-300 dark:hover:bg-neutral-800"
          }`}
        >
          <BookOpen className="size-3.5 shrink-0" />
          <span>Tổng quan</span>
        </button>

        {/* Tab 2: Ươm giống */}
        <button
          type="button"
          onClick={() => setActiveTab("uom-giong")}
          className={`flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl text-xs font-bold transition-all duration-300 ${
            activeTab === "uom-giong"
              ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md shadow-green-600/30 scale-[1.02]"
              : "text-neutral-600 hover:text-green-700 hover:bg-green-50/60 dark:text-neutral-400 dark:hover:text-green-300 dark:hover:bg-neutral-800"
          }`}
        >
          <Sprout className="size-3.5 shrink-0" />
          <span>Ươm giống</span>
        </button>

        {/* Tab 3: Làm đất */}
        <button
          type="button"
          onClick={() => setActiveTab("lam-dat")}
          className={`flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl text-xs font-bold transition-all duration-300 ${
            activeTab === "lam-dat"
              ? "bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 text-white shadow-md shadow-amber-600/30 scale-[1.02]"
              : "text-neutral-600 hover:text-amber-700 hover:bg-amber-50/60 dark:text-neutral-400 dark:hover:text-amber-300 dark:hover:bg-neutral-800"
          }`}
        >
          <Shovel className="size-3.5 shrink-0" />
          <span>Làm đất</span>
        </button>

        {/* Tab 4: Ủ phân 2 giai đoạn */}
        <button
          type="button"
          onClick={() => setActiveTab("u-phan")}
          className={`flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl text-xs font-bold transition-all duration-300 ${
            activeTab === "u-phan"
              ? "bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 text-white shadow-md shadow-purple-600/30 scale-[1.02]"
              : "text-neutral-600 hover:text-purple-700 hover:bg-purple-50/60 dark:text-neutral-400 dark:hover:text-purple-300 dark:hover:bg-neutral-800"
          }`}
        >
          <FlaskConical className="size-3.5 shrink-0" />
          <span>Ủ phân 2GĐ</span>
        </button>

        {/* Tab 5: Lên luống */}
        <button
          type="button"
          onClick={() => setActiveTab("len-luong")}
          className={`flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl text-xs font-bold transition-all duration-300 ${
            activeTab === "len-luong"
              ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-600/30 scale-[1.02]"
              : "text-neutral-600 hover:text-orange-700 hover:bg-orange-50/60 dark:text-neutral-400 dark:hover:text-orange-300 dark:hover:bg-neutral-800"
          }`}
        >
          <Layers className="size-3.5 shrink-0" />
          <span>Lên luống</span>
        </button>

        {/* Tab 6: Tưới nhỏ giọt */}
        <button
          type="button"
          onClick={() => setActiveTab("tuoi-nho-giot")}
          className={`flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl text-xs font-bold transition-all duration-300 ${
            activeTab === "tuoi-nho-giot"
              ? "bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 text-white shadow-md shadow-blue-600/30 scale-[1.02]"
              : "text-neutral-600 hover:text-blue-700 hover:bg-blue-50/60 dark:text-neutral-400 dark:hover:text-blue-300 dark:hover:bg-neutral-800"
          }`}
        >
          <Droplets className="size-3.5 shrink-0" />
          <span>Tưới nhỏ giọt</span>
        </button>

        {/* Tab 7: Thu hoạch */}
        <button
          type="button"
          onClick={() => setActiveTab("thu-hoach")}
          className={`flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl text-xs font-bold transition-all duration-300 ${
            activeTab === "thu-hoach"
              ? "bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md shadow-rose-600/30 scale-[1.02]"
              : "text-neutral-600 hover:text-rose-700 hover:bg-rose-50/60 dark:text-neutral-400 dark:hover:text-rose-300 dark:hover:bg-neutral-800"
          }`}
        >
          <Scissors className="size-3.5 shrink-0" />
          <span>Thu hoạch</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: TỔNG QUAN (EMERALD THEME) */}
      {/* ========================================================================= */}
      {activeTab === "tong-quat" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 dark:border-emerald-900/50 dark:bg-emerald-950/30 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md">
              <BookOpen className="size-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-emerald-950 dark:text-emerald-100">
                Quy Trình Tổng Quát Canh Tác Sâm Bố Chính (1 Ha)
              </h2>
              <p className="text-xs text-emerald-700 dark:text-emerald-300">
                Lịch trình 12 tháng từ xử lý đất, ươm giống, châm phân luân phiên A/B đến thu hoạch đạt dược tính cao
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-xl border border-emerald-100 bg-white p-4 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
              <p className="text-xs text-neutral-500 font-medium">Năng suất trung bình</p>
              <p className="text-lg font-bold text-emerald-700 dark:text-emerald-400">4 - 6 Tấn/ha</p>
            </div>
            <div className="rounded-xl border border-emerald-100 bg-white p-4 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
              <p className="text-xs text-neutral-500 font-medium">Chu kỳ sinh trưởng</p>
              <p className="text-lg font-bold text-emerald-700 dark:text-emerald-400">9 - 12 Tháng</p>
            </div>
            <div className="rounded-xl border border-emerald-100 bg-white p-4 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
              <p className="text-xs text-neutral-500 font-medium">Lượng hạt giống/ha</p>
              <p className="text-lg font-bold text-emerald-700 dark:text-emerald-400">1.5 - 2.0 kg</p>
            </div>
            <div className="rounded-xl border border-emerald-100 bg-white p-4 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
              <p className="text-xs text-neutral-500 font-medium">Phân hữu cơ bón lót</p>
              <p className="text-lg font-bold text-emerald-700 dark:text-emerald-400">20 - 30 Tấn/ha</p>
            </div>
          </div>

          {/* Master Timeline Summary */}
          <div className="rounded-xl border border-neutral-200/80 bg-white p-6 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-4">
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <Calendar className="size-4 text-emerald-600" />
              <span>Bản Đồ Lộ Trình Canh Tác Sâm Bố Chính Chi Tiết</span>
            </h3>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/40">
                <span className="font-bold text-emerald-800 dark:text-emerald-300">Giai đoạn 0 (Trước trồng 30 ngày):</span>
                <p className="text-neutral-600 dark:text-neutral-400 mt-1">
                  Kiểm tra mẫu đất (pH, hữu cơ OM, NPK, kim loại nặng, tuyến trùng). Cày sâu 40-50cm phá tầng đế cày. Bón vôi Dolomite (1.5 - 2.0 tấn/ha) & phơi ải 15-20 ngày.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/40">
                <span className="font-bold text-emerald-800 dark:text-emerald-300">Giai đoạn 1 (Ươm giống & Bón lót - 25-30 ngày):</span>
                <p className="text-neutral-600 dark:text-neutral-400 mt-1">
                  Ngâm hạt 2 sôi 3 lạnh 6-8h, ủ nứt nanh. Trộn giá thể khay ươm (50% xơ dừa ngâm xả chát + 50% phân hoai + Trichoderma). Bón lót phân ủ hoai + 100% Lân + 30% K2SO4. Lên luống cao 40-50cm hình mui rùa.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/40">
                <span className="font-bold text-emerald-800 dark:text-emerald-300">Giai đoạn 2 (Xuống giống & Phục hồi rễ - Ngày 1 đến 25):</span>
                <p className="text-neutral-600 dark:text-neutral-400 mt-1">
                  Trồng cây con 3-4 lá thật ra ruộng. Châm phân luân phiên A/B bằng tưới nhỏ giọt: Nhóm A (Calcium Nitrate + Vi lượng) / Nhóm B (NPK 13-40-13 kích rễ + Humic).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/40">
                <span className="font-bold text-emerald-800 dark:text-emerald-300">Giai đoạn 3 (Phát triển thân lá & Tỉa hoa nuôi củ - Tháng 2 đến 7):</span>
                <p className="text-neutral-600 dark:text-neutral-400 mt-1">
                  Tưới châm phân NPK 20-20-20 + MgSO4. Ngắt toàn bộ nụ hoa để tập trung dinh dưỡng nuôi củ, xua đuổi sâu bệnh bằng Neem oil & nấm đối kháng.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/40">
                <span className="font-bold text-emerald-800 dark:text-emerald-300">Giai đoạn 4 (Tích lũy Saponin & Thu hoạch - Tháng 8 đến 12):</span>
                <p className="text-neutral-600 dark:text-neutral-400 mt-1">
                  Tăng cường Kali Sulfat (K2SO4) giúp củ chắc nặng. Ngừng tưới nước 10 ngày trước thu hoạch. Đào củ khi lụi lá, rửa sạch & sấy khô 50-60°C.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: ƯƠM GIỐNG (MINT/GREEN THEME) */}
      {/* ========================================================================= */}
      {activeTab === "uom-giong" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="rounded-2xl border border-green-200 bg-green-50/60 p-5 dark:border-green-900/50 dark:bg-green-950/30 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-green-600 text-white shadow-md">
              <Sprout className="size-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-green-950 dark:text-green-100">
                Quy Trình Ươm Giống Sâm Bố Chính Kỹ Thuật Cao
              </h2>
              <p className="text-xs text-green-700 dark:text-green-300">
                Kích thích nảy mầm đồng loạt, vô trùng giá thể & quy trình tưới "ăn dặm" A/B cho cây con
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="rounded-xl border border-green-200 bg-white p-4 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-2">
              <h4 className="font-bold text-green-800 dark:text-green-300 flex items-center gap-1.5">
                <Thermometer className="size-4 text-green-600" />
                1. Ngâm Hạt "2 Sôi 3 Lạnh"
              </h4>
              <p className="text-neutral-600 dark:text-neutral-400">
                Pha 2 phần nước sôi + 3 phần nước lạnh (50-54°C). Pha thêm Nano Bạc hoặc nấm <em>Chaetomium</em> ngâm trong <strong>6 - 8 giờ</strong> diệt nấm thán thư bám vỏ.
              </p>
            </div>

            <div className="rounded-xl border border-green-200 bg-white p-4 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-2">
              <h4 className="font-bold text-green-800 dark:text-green-300 flex items-center gap-1.5">
                <Clock className="size-4 text-green-600" />
                2. Ủ Nứt Nanh (24 - 48h)
              </h4>
              <p className="text-neutral-600 dark:text-neutral-400">
                Rửa sạch nhớt, cuộn trong khăn ẩm 70-80%, để túi zip tối ấm (28-32°C). Khi 90% hạt nhú mầm 1-2mm ("nứt nanh") là đem gieo ngay.
              </p>
            </div>

            <div className="rounded-xl border border-green-200 bg-white p-4 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-2">
              <h4 className="font-bold text-green-800 dark:text-green-300 flex items-center gap-1.5">
                <Layers className="size-4 text-green-600" />
                3. Trộn Giá Thể Khay Ươm
              </h4>
              <p className="text-neutral-600 dark:text-neutral-400">
                50% mụn xơ dừa ngâm xả chát (ngâm vôi xả bỏ Tanin/Lignin) + 50% phân chuồng hoai sàng mịn + 1-2kg <em>Trichoderma</em>/m³ giá thể.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-xs dark:border-amber-900/40 dark:bg-amber-950/30 flex items-start gap-3">
            <AlertTriangle className="size-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-amber-900 dark:text-amber-200">Cảnh Báo Xử Lý Xơ Dừa Ươm Giống:</p>
              <p className="text-amber-800/90 dark:text-amber-300/90 mt-0.5">
                Tuyệt đối không dùng mụn xơ dừa mới chưa xả chát. Hai chất độc Lignin & Tanin trong xơ dừa mới sẽ gây thui rễ mầm, hạt không nảy mầm hoặc cây con chết hàng loạt.
              </p>
            </div>
          </div>

          {/* Fertigation for Nursery */}
          <div className="rounded-xl border border-neutral-200/80 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-3">
            <h3 className="text-sm font-bold text-green-900 dark:text-green-200 flex items-center gap-2">
              <Pipette className="size-4 text-green-600" />
              <span>Kỹ Thuật Tưới "Ăn Dặm" A/B Luân Phiên Cho Cây Con (Khay 50-70 Lỗ)</span>
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Chỉ tưới phân khi cây xuất hiện <strong>2 lá thật</strong>. Pha dung dịch "Nước Mẹ" tỉ lệ 1:100 (100ml nước mẹ pha 10L nước sạch):
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-green-50 border border-green-100 dark:bg-green-950/40 dark:border-green-900/50">
                <p className="font-bold text-green-900 dark:text-green-200">Bình A (Tưới ngày lẻ):</p>
                <p className="text-green-700 dark:text-green-300">100g Calcium Nitrate + 5g Vi lượng Chelate / Lít nước mẹ</p>
              </div>
              <div className="p-3 rounded-lg bg-green-50 border border-green-100 dark:bg-green-950/40 dark:border-green-900/50">
                <p className="font-bold text-green-900 dark:text-green-200">Bình B (Tưới ngày chẵn):</p>
                <p className="text-green-700 dark:text-green-300">100g NPK 13-40-13 (Kích rễ) + 20g Axit Humic / Lít nước mẹ</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: LÀM ĐẤT (AMBER THEME) */}
      {/* ========================================================================= */}
      {activeTab === "lam-dat" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-5 dark:border-amber-900/50 dark:bg-amber-950/30 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md">
              <Shovel className="size-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-amber-950 dark:text-amber-100">
                Kỹ Thuật Làm Đất & Xử Lý Đất Ruộng Canh Tác
              </h2>
              <p className="text-xs text-amber-800 dark:text-amber-300">
                Phân tích thổ nhưỡng, phá tầng đế cày 40-50cm & quy trình bón Vôi Dolomite khử chua
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl border border-amber-200/80 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-3">
              <h3 className="text-sm font-bold text-amber-900 dark:text-amber-200 flex items-center gap-2">
                <ShieldAlert className="size-4 text-amber-600" />
                <span>Quy Tắc Luân Canh & Phân Tích Mẫu Đất</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-lg bg-red-50 border border-red-100 dark:bg-red-950/30 dark:border-red-900/40">
                  <p className="font-bold text-red-900 dark:text-red-200">TUYỆT ĐỐI KHÔNG TRỒNG NỐI VỤ TRÊN ĐẤT:</p>
                  <p className="text-red-700 dark:text-red-300 mt-1">
                    Bông vải, Đậu bắp, Vừng (Mè), Cà chua, Ớt (Họ Bông & Họ Cà). Tích tụ bệnh héo rũ (<em>Fusarium</em>, <em>Verticillium</em>) & tuyến trùng rễ hại củ sâm.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-100 dark:bg-emerald-950/30 dark:border-emerald-900/40">
                  <p className="font-bold text-emerald-900 dark:text-emerald-200">ĐẤT LUÂN CANH LÝ TƯỞNG NHẤT:</p>
                  <p className="text-emerald-700 dark:text-emerald-300 mt-1">
                    Đất trồng lúa nước (sạch bệnh nhất), đất trồng ngô (bắp) hoặc đậu tương. Phù hợp thổ nhưỡng Củ Chi, Tây Ninh, Quảng Ngãi.
                  </p>
                </div>
              </div>
            </div>

            {/* Processing Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="rounded-xl border border-amber-200 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-2">
                <span className="font-bold text-amber-800 dark:text-amber-300">Giai đoạn 1: Cày Sâu Phá Tầng</span>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Cày lật đất sâu <strong>40 - 50cm</strong> phá tầng đế cày cứng để củ sâm đâm sâu không bị cong phân nhánh. Phơi ải nắng gắt 2 - 3 tuần.
                </p>
              </div>

              <div className="rounded-xl border border-amber-200 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-2">
                <span className="font-bold text-amber-800 dark:text-amber-300">Giai đoạn 2: Vôi Dolomite Khử Phèn</span>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Bón <strong>1.500 - 2.000 kg/ha</strong> Vôi Dolomite (CaMg(CO₃)₂). Cung cấp cả Canxi & Magie nâng pH từ dưới 5.0 lên mức 5.5 - 6.5.
                </p>
              </div>

              <div className="rounded-xl border border-amber-200 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-2">
                <span className="font-bold text-amber-800 dark:text-amber-300">Giai đoạn 3: Nghỉ Đất 15 Ngày</span>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Tưới ẩm & <strong>để đất nghỉ ít nhất 15 ngày</strong>. Tuyệt đối không bón phân vi sinh (Trichoderma) chung với vôi vì vôi sẽ triệt hạ vi sinh.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: Ủ PHÂN 2 GIAI ĐOẠN (PURPLE THEME) */}
      {/* ========================================================================= */}
      {activeTab === "u-phan" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="rounded-2xl border border-purple-200 bg-purple-50/60 p-5 dark:border-purple-900/50 dark:bg-purple-950/30 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-purple-600 text-white shadow-md">
              <FlaskConical className="size-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-purple-950 dark:text-purple-100">
                Quy Trình Ủ Phân Hữu Cơ Vi Sinh 2 Giai Đoạn
              </h2>
              <p className="text-xs text-purple-700 dark:text-purple-300">
                Giai đoạn 1 Ủ hoai mục sinh học & Giai đoạn 2 Làm giàu khoáng Trichoderma hoạt tính cao bón lót
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Giai đoạn 1 */}
            <div className="rounded-xl border border-purple-200/80 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-purple-600 text-white font-bold text-xs">
                  GIAI ĐOẠN 1
                </span>
                <h3 className="text-sm font-bold text-purple-900 dark:text-purple-200">
                  Ủ Hoai Mục Sinh Học (45 - 60 Ngày)
                </h3>
              </div>
              <ul className="text-xs text-neutral-600 dark:text-neutral-400 space-y-2 list-disc list-inside leading-relaxed">
                <li><strong>Nguyên liệu cho 1 ha:</strong> 20 - 30 Tấn phân chuồng (bò, gà) + 2 - 3 Tấn vỏ trấu/rơm rạ + 20kg vôi bột.</li>
                <li><strong>Chỉnh độ ẩm 50 - 55%:</strong> Phun nước đều, nắm tay rỉ nước kẽ ngón là đạt.</li>
                <li><strong>Kích hoạt men:</strong> Tưới 15-20kg nấm <em>Trichoderma</em> đóng đống chóp 1.5m phủ bạt.</li>
                <li><strong>Đảo đống ủ:</strong> Đảo đống ở ngày thứ 15 & 30 (nhiệt độ 55-65°C diệt hạt cỏ & nấm bệnh). Phân chín tơi mùn màu nâu đen.</li>
              </ul>
            </div>

            {/* Giai đoạn 2 */}
            <div className="rounded-xl border border-purple-200/80 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-indigo-600 text-white font-bold text-xs">
                  GIAI ĐOẠN 2
                </span>
                <h3 className="text-sm font-bold text-indigo-900 dark:text-indigo-200">
                  Làm Giàu Khoáng & Kích Hoạt Bón Lót
                </h3>
              </div>
              <ul className="text-xs text-neutral-600 dark:text-neutral-400 space-y-2 list-disc list-inside leading-relaxed">
                <li><strong>Phối trộn khoáng nền:</strong> Lấy phân đã hoai ở Giai đoạn 1 trộn với 100% Lân nung chảy (700 - 1.000 kg/ha).</li>
                <li><strong>Bổ sung Kali K₂SO₄:</strong> Trộn 30% tổng lượng Kali (150 - 200 kg Kali Sulfat trắng).</li>
                <li><strong>Tăng cường Vệ sĩ Trichoderma:</strong> Trộn thêm 15-20kg <em>Trichoderma</em> mật độ cao trước khi rải.</li>
                <li><strong>Phay đất tầng 30-40cm:</strong> Dùng máy phay xới trộn đều toàn bộ phân vào tầng đất nuôi củ.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: LÊN LUỐNG (ORANGE THEME) */}
      {/* ========================================================================= */}
      {activeTab === "len-luong" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="rounded-2xl border border-orange-200 bg-orange-50/60 p-5 dark:border-orange-900/50 dark:bg-orange-950/30 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-orange-600 text-white shadow-md">
              <Layers className="size-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-orange-950 dark:text-orange-100">
                Kỹ Thuật Lên Luống Mui Rùa & Phủ Màng Nông Nghiệp
              </h2>
              <p className="text-xs text-orange-700 dark:text-orange-300">
                Thiết kế luống chống ngập úng tuyệt đối & phủ bạt màng 2 mặt bảo vệ rễ củ
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="rounded-xl border border-orange-200 bg-white p-4 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-2">
              <h4 className="font-bold text-orange-800 dark:text-orange-300 flex items-center gap-1.5">
                <Ruler className="size-4 text-orange-600" />
                1. Luống Hình "Mui Rùa"
              </h4>
              <p className="text-neutral-600 dark:text-neutral-400">
                Mặt luống vồng cao ở giữa dốc về 2 bên. Chiều cao luống <strong>40 - 50cm</strong> so với đáy rãnh. Rãnh rộng 40-50cm giúp thoát nước cực nhanh khi mưa lớn.
              </p>
            </div>

            <div className="rounded-xl border border-orange-200 bg-white p-4 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-2">
              <h4 className="font-bold text-orange-800 dark:text-orange-300 flex items-center gap-1.5">
                <Droplets className="size-4 text-orange-600" />
                2. Trải 2 Hàng Ống Nhỏ Giọt
              </h4>
              <p className="text-neutral-600 dark:text-neutral-400">
                Trải 2 dây nhỏ giọt 16mm song song dọc theo luống trước khi phủ bạt màng. Giữ cho lá sâm luôn khô ráo triệt tiêu nấm đốm lá.
              </p>
            </div>

            <div className="rounded-xl border border-orange-200 bg-white p-4 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-2">
              <h4 className="font-bold text-orange-800 dark:text-orange-300 flex items-center gap-1.5">
                <Sparkles className="size-4 text-orange-600" />
                3. Bạt Màng Phủ 2 Mặt
              </h4>
              <p className="text-neutral-600 dark:text-neutral-400">
                Mặt Bạc phản chiếu ánh sáng xua đuổi bọ trĩ/rầy (vật chủ truyền virus). Mặt Đen úp dưới diệt sạch cỏ dại & duy trì độ ẩm ổn định.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: TƯỚI NHỎ GIỌT (BLUE THEME) */}
      {/* ========================================================================= */}
      {activeTab === "tuoi-nho-giot" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-5 dark:border-blue-900/50 dark:bg-blue-950/30 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md">
              <Droplets className="size-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-blue-950 dark:text-blue-100">
                Quy Trình Xử Lý Nước & Hệ Thống Tưới Nhỏ Giọt / Châm Phân A/B
              </h2>
              <p className="text-xs text-blue-700 dark:text-blue-300">
                Lắng đọng phèn sắt 3 giai đoạn, lọc đĩa 120 mesh & Quy tắc VÀNG chống kết tủa đường ống
              </p>
            </div>
          </div>

          {/* Water Treatment Steps */}
          <div className="rounded-xl border border-blue-200/80 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-3">
            <h3 className="text-sm font-bold text-blue-900 dark:text-blue-200 flex items-center gap-2">
              <Waves className="size-4 text-blue-600" />
              <span>3 Giai Đoạn Xử Lý Nước Tưới Giếng Khoan / Kênh</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-lg bg-blue-50 border border-blue-100 dark:bg-blue-950/40 dark:border-blue-900/50 space-y-1">
                <p className="font-bold text-blue-900 dark:text-blue-200">Bể 1: Oxy hóa Phèn Sắt (10m³)</p>
                <p className="text-blue-700 dark:text-blue-300">
                  Bơm giếng qua giàn mưa sục khí oxy hóa Fe²⁺ kết tủa thành Fe³⁺ đỏ. Nâng pH 6.5-7.0 bằng vôi & lắng tĩnh 24-48 giờ.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-blue-50 border border-blue-100 dark:bg-blue-950/40 dark:border-blue-900/50 space-y-1">
                <p className="font-bold text-blue-900 dark:text-blue-200">Bể 2: Hút Nước Lơ Lửng & Lọc Đĩa</p>
                <p className="text-blue-700 dark:text-blue-300">
                  Dùng phao hút lơ lửng cách mặt 50cm. Đẩy qua Lọc Đĩa 120 mesh giữ lại cặn phèn mịn trước khi vào Bồn 3.000L.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-blue-50 border border-blue-100 dark:bg-blue-950/40 dark:border-blue-900/50 space-y-1">
                <p className="font-bold text-blue-900 dark:text-blue-200">Bể 3: Kiểm Tra pH/EC & Bơm Tưới</p>
                <p className="text-blue-700 dark:text-blue-300">
                  Kiểm tra pH nước đạt 5.5 - 6.5 & chỉ số EC an toàn trước khi kích hoạt máy bơm áp lực châm phân.
                </p>
              </div>
            </div>
          </div>

          {/* Fertigation Rules */}
          <div className="rounded-xl border border-red-200 bg-red-50/70 p-5 dark:border-red-900/40 dark:bg-red-950/30 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-red-900 dark:text-red-200 font-bold text-sm">
              <ShieldAlert className="size-4 text-red-600" />
              <span>NGUYÊN TẮC VÀNG CHỐNG TẮC NGHẼN ĐƯỜNG ỐNG NHỎ GIỌT (20.000 MÉT)</span>
            </div>
            <p className="text-red-800/90 dark:text-red-300/90 leading-relaxed">
              CẤM KỲ TUYỆT ĐỐI KHÔNG PHA CHUNG phân có chứa <strong>Canxi (Ca)</strong> (như Calcium Nitrate) với phân chứa gốc <strong>Lân (P)</strong> (MAP, MKP, NPK) hoặc gốc <strong>Sunfat (S)</strong> (Kali Sulfat, Magie Sulfat) trong cùng bồn đậm đặc. Phản ứng sẽ tạo ra <strong>thạch cao kết tủa</strong> gây tắc vĩnh viễn hệ thống ống nhỏ giọt.
            </p>
            <div className="pt-2 grid grid-cols-1 md:grid-cols-2 gap-3 font-semibold">
              <div className="p-3 rounded bg-white border border-red-200 text-neutral-800 dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-200">
                🌱 Nhóm A (Tưới ngày lẻ): Calcium Nitrate + Boron + Vi lượng Chelate (EDTA)
              </div>
              <div className="p-3 rounded bg-white border border-red-200 text-neutral-800 dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-200">
                🌿 Nhóm B (Tưới ngày chẵn): NPK 13-40-13 / 20-20-20 + MAP/MKP + Kali Sulfat + Humic
              </div>
            </div>
            <p className="text-red-700 dark:text-red-400 font-medium pt-1">
              ✓ Bắt buộc cho hệ thống chạy 10-15 phút NƯỚC SẠCH sau mỗi lần châm phân để rửa sạch đường ống.
            </p>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 7: THU HOẠCH (ROSE THEME) */}
      {/* ========================================================================= */}
      {activeTab === "thu-hoach" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-5 dark:border-rose-900/50 dark:bg-rose-950/30 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-rose-600 text-white shadow-md">
              <Scissors className="size-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-rose-950 dark:text-rose-100">
                Kỹ Thuật Ngắt Hoa Tỉa Nụ & Sơ Chế Củ Sâm Sau Thu Hoạch
              </h2>
              <p className="text-xs text-rose-700 dark:text-rose-300">
                Kỹ thuật tập trung dinh dưỡng nuôi củ to, gia tăng hàm lượng Saponin & bảo quản chuẩn dược liệu
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            <div className="rounded-xl border border-rose-200 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-3">
              <h3 className="text-sm font-bold text-rose-900 dark:text-rose-200 flex items-center gap-2">
                <Scissors className="size-4 text-rose-600" />
                <span>Kỹ Thuật Ngắt Hoa Tỉa Nụ (Tháng 4 - 6)</span>
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Khi cây sâm được 4-5 tháng bắt đầu ra nụ hoa rực rỡ. Ngoại trừ diện tích để lấy hạt giống, bắt buộc phải ngắt bỏ 100% nụ hoa ngay khi xuất hiện. Nếu để hoa kết quả, 70% dinh dưỡng từ rễ sẽ nuôi hạt làm củ sâm bị còi cọc và xốp gỗ.
              </p>
            </div>

            <div className="rounded-xl border border-rose-200 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-3">
              <h3 className="text-sm font-bold text-rose-900 dark:text-rose-200 flex items-center gap-2">
                <Flame className="size-4 text-rose-600" />
                <span>Quy Trình Đào Củ & Sơ Chế Dược Liệu</span>
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Đào củ khi sâm 9-12 tháng (khi thân lá lụi vàng). Dùng thuổng xới nhẹ tránh làm gãy củ sâm. Rửa sạch đất cát bằng vòi phun áp lực nhẹ, phân loại củ (Loại 1: &gt;50g/củ; Loại 2: 30-50g/củ). Phơi hoặc sấy khô ở 50-60°C.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
