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
  Clock,
} from "lucide-react";

type TabKey =
  | "tong-quat"
  | "uom-giong"
  | "lam-dat"
  | "u-phan"
  | "len-luong"
  | "tuoi-nho-giot"
  | "thu-hoach";

export function SamAnDoGuide() {
  const [activeTab, setActiveTab] = useState<TabKey>("tong-quat");

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 md:p-6">
      {/* Top Banner Header */}
      <div className="relative overflow-hidden rounded-2xl border border-teal-500/20 bg-gradient-to-r from-slate-950 via-teal-950 to-emerald-950 p-6 md:p-8 text-white shadow-xl">
        <div className="relative z-10 space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-teal-500/20 px-3.5 py-1 text-xs font-semibold text-teal-300 backdrop-blur-md border border-teal-400/30">
            <Sparkles className="size-3.5 text-teal-400" />
            <span>Quy trình Kỹ thuật Chuẩn Nông trại AgriField (Từ A - Z)</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight">
            Quy Trình Canh Tác Sâm Ấn Độ (Ashwagandha)
          </h1>
          <p className="text-sm text-teal-100/90 leading-relaxed">
            Quy trình canh tác dược liệu số hóa từ ngâm ủ giống, xử lý đất kiềm nhẹ pH 7.5-8.0, ủ phân vi sinh EM2, hệ thống nhỏ giọt A/B đến kỹ thuật tỉa cành không mất nhựa & thu hoạch củ.
          </p>
        </div>

        <div className="absolute -right-10 -bottom-10 size-60 rounded-full bg-teal-500/15 blur-3xl pointer-events-none" />
      </div>

      {/* 7 Multi-Tab Navigation Bar - Multi-Color Theme */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 p-1.5 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
        {/* Tab 1: Tổng quát */}
        <button
          type="button"
          onClick={() => setActiveTab("tong-quat")}
          className={`flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl text-xs font-bold transition-all duration-300 ${
            activeTab === "tong-quat"
              ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-md shadow-teal-600/30 scale-[1.02]"
              : "text-neutral-600 hover:text-teal-700 hover:bg-teal-50/60 dark:text-neutral-400 dark:hover:text-teal-300 dark:hover:bg-neutral-800"
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
              ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30 scale-[1.02]"
              : "text-neutral-600 hover:text-emerald-700 hover:bg-emerald-50/60 dark:text-neutral-400 dark:hover:text-emerald-300 dark:hover:bg-neutral-800"
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

        {/* Tab 4: Ủ phân 2GĐ */}
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
      {/* TAB 1: TỔNG QUAN (CYAN/TEAL THEME) */}
      {/* ========================================================================= */}
      {activeTab === "tong-quat" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="rounded-2xl border border-teal-200 bg-teal-50/60 p-5 dark:border-teal-900/50 dark:bg-teal-950/30 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-teal-600 text-white shadow-md">
              <BookOpen className="size-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-teal-950 dark:text-teal-100">
                Quy Trình Tổng Quát Canh Tác Sâm Ấn Độ (Ashwagandha - 1 Ha)
              </h2>
              <p className="text-xs text-teal-700 dark:text-teal-300">
                Nhân sâm của y học Ayurveda · Thời gian sinh trưởng ngắn 5 - 6 tháng · Hàm lượng Withanolides cao
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-xl border border-teal-100 bg-white p-4 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
              <p className="text-xs text-neutral-500 font-medium">Năng suất củ khô</p>
              <p className="text-lg font-bold text-teal-700 dark:text-teal-400">500 - 800 kg/ha</p>
            </div>
            <div className="rounded-xl border border-teal-100 bg-white p-4 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
              <p className="text-xs text-neutral-500 font-medium">Thời gian thu hoạch</p>
              <p className="text-lg font-bold text-teal-700 dark:text-teal-400">5 - 6 Tháng</p>
            </div>
            <div className="rounded-xl border border-teal-100 bg-white p-4 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
              <p className="text-xs text-neutral-500 font-medium">Lượng hạt giống/ha</p>
              <p className="text-lg font-bold text-teal-700 dark:text-teal-400">10 - 12 kg</p>
            </div>
            <div className="rounded-xl border border-teal-100 bg-white p-4 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
              <p className="text-xs text-neutral-500 font-medium">Độ pH đất lý tưởng</p>
              <p className="text-lg font-bold text-teal-700 dark:text-teal-400">7.5 - 8.0</p>
            </div>
          </div>

          {/* Master Timeline Summary */}
          <div className="rounded-xl border border-neutral-200/80 bg-white p-6 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-4">
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <Calendar className="size-4 text-teal-600" />
              <span>Bản Đồ Lộ Trình Canh Tác Sâm Ấn Độ Chi Tiết</span>
            </h3>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-teal-50/50 border border-teal-100 dark:bg-teal-950/20 dark:border-teal-900/40">
                <span className="font-bold text-teal-800 dark:text-teal-300">Giai đoạn 0 (Trước gieo 20 ngày):</span>
                <p className="text-neutral-600 dark:text-neutral-400 mt-1">
                  Kiểm tra đất cát pha tơi xốp, nâng độ pH kiềm nhẹ 7.5 - 8.0 bằng vôi (300-500kg/ha). Cày lật đất 20-25cm & phơi ải 7-10 ngày diệt bào tử nấm thối rễ.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-teal-50/50 border border-teal-100 dark:bg-teal-950/20 dark:border-teal-900/40">
                <span className="font-bold text-teal-800 dark:text-teal-300">Giai đoạn 1 (Ươm mầm & Trồng cây con - 15-20 ngày):</span>
                <p className="text-neutral-600 dark:text-neutral-400 mt-1">
                  Ngâm hạt nước ấm 35-40°C trong 4-6h. Ủ vải ẩm 24-48h nứt nanh. Gieo khay ươm hoặc gieo trực tiếp mật độ 30x30cm (60.000 - 70.000 cây/ha).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-teal-50/50 border border-teal-100 dark:bg-teal-950/20 dark:border-teal-900/40">
                <span className="font-bold text-teal-800 dark:text-teal-300">Giai đoạn 2 (Chăm sóc & Tưới nhỏ giọt A/B - Tháng 1 đến 3):</span>
                <p className="text-neutral-600 dark:text-neutral-400 mt-1">
                  Tới châm phân luân phiên A/B bằng tưới nhỏ giọt (Nhóm A: Calcium Nitrate + Vi lượng; Nhóm B: NPK 13-40-13 / 20-20-20 + Axit Humic). Giữ ẩm vừa phải 45-50%.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-teal-50/50 border border-teal-100 dark:bg-teal-950/20 dark:border-teal-900/40">
                <span className="font-bold text-teal-800 dark:text-teal-300">Giai đoạn 3 (Tỉa cành tạo tán & Bón vi sinh EM2 - Tháng 4 đến 5):</span>
                <p className="text-neutral-600 dark:text-neutral-400 mt-1">
                  Tỉa cành khô & cắt ngọn vống để bật cành ngang (tỉa tối đa 1/3 tán). Bón gốc phân gà hoai (500g-1kg/gốc) + tưới men vi sinh EM2 & phun Amino Acid + Bo/Zn.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-teal-50/50 border border-teal-100 dark:bg-teal-950/20 dark:border-teal-900/40">
                <span className="font-bold text-teal-800 dark:text-teal-300">Giai đoạn 4 (Thu hoạch & Sơ chế củ khô - Tháng thứ 6):</span>
                <p className="text-neutral-600 dark:text-neutral-400 mt-1">
                  Nhổ củ khi lá ngả vàng & hạt chín đỏ thẫm. Rửa sạch đất cát, cắt củ dài 7-10cm, phơi khô nắng nhẹ hoặc sấy ở 50°C.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: ƯƠM GIỐNG (EMERALD THEME) */}
      {/* ========================================================================= */}
      {activeTab === "uom-giong" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 dark:border-emerald-900/50 dark:bg-emerald-950/30 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md">
              <Sprout className="size-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-emerald-950 dark:text-emerald-100">
                Quy Trình Ươm Giống Sâm Ấn Độ
              </h2>
              <p className="text-xs text-emerald-700 dark:text-emerald-300">
                Kỹ thuật ngâm ủ nứt nanh, vô trùng giá thể & quy trình tưới "ăn dặm" A/B cho cây con
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="rounded-xl border border-emerald-200 bg-white p-4 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-2">
              <h4 className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                <Thermometer className="size-4 text-emerald-600" />
                1. Ngâm Hạt Ấm (35 - 40°C)
              </h4>
              <p className="text-neutral-600 dark:text-neutral-400">
                Ngâm hạt sâm trong nước ấm 35 - 40°C trong <strong>4 - 6 giờ</strong> để kích mầm. Pha thêm dung dịch Nano Bạc khử nấm vỏ hạt trước khi gieo.
              </p>
            </div>

            <div className="rounded-xl border border-emerald-200 bg-white p-4 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-2">
              <h4 className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                <Clock className="size-4 text-emerald-600" />
                2. Ủ Nứt Nanh (24 - 48h)
              </h4>
              <p className="text-neutral-600 dark:text-neutral-400">
                Vớt hạt rửa sạch nhớt, cuộn trong khăn vải ẩm 70%. Để trong hộp tối ấm (28-32°C). Khi hạt nhú mầm trắng 1-2mm là gieo khay ngay.
              </p>
            </div>

            <div className="rounded-xl border border-emerald-200 bg-white p-4 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-2">
              <h4 className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                <Layers className="size-4 text-emerald-600" />
                3. Trộn Giá Thể Khay Ươm
              </h4>
              <p className="text-neutral-600 dark:text-neutral-400">
                50% mụn xơ dừa ngâm xả chát + 50% phân trùn quế/chuồng hoai mục + 1-2kg <em>Trichoderma</em>/m³ giá thể.
              </p>
            </div>
          </div>

          {/* Fertigation for Nursery */}
          <div className="rounded-xl border border-neutral-200/80 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-3">
            <h3 className="text-sm font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
              <Pipette className="size-4 text-emerald-600" />
              <span>Kỹ Thuật Tưới "Ăn Dặm" A/B Luân Phiên Cho Cây Con Sâm Ấn Độ</span>
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Chỉ tưới phân khi cây con xuất hiện <strong>2 lá thật</strong>. Pha dung dịch "Nước Mẹ" tỉ lệ 1:100 (100ml nước mẹ pha 10L nước sạch):
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100 dark:bg-emerald-950/40 dark:border-emerald-900/50">
                <p className="font-bold text-emerald-900 dark:text-emerald-200">Bình A (Tưới ngày lẻ):</p>
                <p className="text-emerald-700 dark:text-emerald-300">100g Calcium Nitrate + 5g Vi lượng Chelate / Lít nước mẹ</p>
              </div>
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100 dark:bg-emerald-950/40 dark:border-emerald-900/50">
                <p className="font-bold text-emerald-900 dark:text-emerald-200">Bình B (Tưới ngày chẵn):</p>
                <p className="text-emerald-700 dark:text-emerald-300">100g NPK 13-40-13 (Kích rễ) + 20g Axit Humic / Lít nước mẹ</p>
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
                Kỹ Thuật Làm Đất & Xử Lý Đất Sâm Ấn Độ
              </h2>
              <p className="text-xs text-amber-800 dark:text-amber-300">
                Đất cát pha tơi xốp, độ pH kiềm nhẹ 7.5 - 8.0 & kỹ thuật bón lót vi sinh tầng sâu
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="rounded-xl border border-amber-200 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-2">
              <span className="font-bold text-amber-800 dark:text-amber-300">Công đoạn 1: Cày Sâu & Phơi Ải</span>
              <p className="text-neutral-600 dark:text-neutral-400">
                Cày lật đất sâu <strong>20 - 25cm</strong>, nhặt sạch rễ cỏ dại. Phơi ải nắng gắt 7 - 10 ngày để tiêu diệt các loại bào tử nấm mốc ủ trong đất.
              </p>
            </div>

            <div className="rounded-xl border border-amber-200 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-2">
              <span className="font-bold text-amber-800 dark:text-amber-300">Công đoạn 2: Nâng pH Kiềm Nhẹ</span>
              <p className="text-neutral-600 dark:text-neutral-400">
                Bón <strong>300 - 500 kg/ha</strong> vôi bột nâng pH đạt mức lý tưởng <strong>7.5 - 8.0</strong>. Xới trộn đều vôi vào tầng đất mặt 15cm.
              </p>
            </div>

            <div className="rounded-xl border border-amber-200 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-2">
              <span className="font-bold text-amber-800 dark:text-amber-300">Công đoạn 3: Nghỉ Đất 10-15 Ngày</span>
              <p className="text-neutral-600 dark:text-neutral-400">
                Tưới ẩm & để đất nghỉ 10 - 15 ngày trước khi bón phân vi sinh. Tuyệt đối không bón vôi chung với phân vi sinh <em>Trichoderma</em>.
              </p>
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
                Quy Trình Ủ Phân Hữu Cơ Vi Sinh 2 Giai Đoạn Cho Sâm Ấn Độ
              </h2>
              <p className="text-xs text-purple-700 dark:text-purple-300">
                Giai đoạn 1 Ủ hoai mục sinh học & Giai đoạn 2 Bón lót vi sinh EM2 kích củ phình to
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="rounded-xl border border-purple-200/80 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-purple-600 text-white font-bold text-xs">
                  GIAI ĐOẠN 1
                </span>
                <h3 className="text-sm font-bold text-purple-900 dark:text-purple-200">
                  Ủ Hoai Mục Sinh Học (30 - 40 Ngày)
                </h3>
              </div>
              <ul className="text-xs text-neutral-600 dark:text-neutral-400 space-y-2 list-disc list-inside leading-relaxed">
                <li><strong>Nguyên liệu cho 1 ha:</strong> 15 - 20 Tấn phân chuồng (bò, gà, dê hoai) + 3 Tấn phế phẩm vỏ trấu + 10kg vôi.</li>
                <li><strong>Chỉnh độ ẩm 45 - 50%:</strong> Sâm Ấn Độ thích độ ẩm vừa phải (nắm tay vón cục rỉ nhẹ nước).</li>
                <li><strong>Vi sinh Trichoderma:</strong> Phun 15kg nấm <em>Trichoderma</em> đóng đống chóp 1.2m phủ bạt kín.</li>
                <li><strong>Đảo đống ủ:</strong> Đảo đống ở ngày 15 (nhiệt độ 50-60°C diệt nấm bệnh). Phân chín tơi mùn nâu đen sau 30-40 ngày.</li>
              </ul>
            </div>

            <div className="rounded-xl border border-purple-200/80 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-indigo-600 text-white font-bold text-xs">
                  GIAI ĐOẠN 2
                </span>
                <h3 className="text-sm font-bold text-indigo-900 dark:text-indigo-200">
                  Làm Giàu Phân Gà & Men Vi Sinh EM2
                </h3>
              </div>
              <ul className="text-xs text-neutral-600 dark:text-neutral-400 space-y-2 list-disc list-inside leading-relaxed">
                <li><strong>Công thức 2 Hữu Cơ - 1 Vi Sinh:</strong> Dùng phân gà ủ hoai (hàm lượng Kali & Lân tự nhiên cao) bón lót gốc 500g - 1kg/gốc.</li>
                <li><strong>Tưới Men Vi Sinh EM2:</strong> Hòa men <em>EM2</em> (đã nhân sinh khối) tưới trực tiếp vào gốc sâm.</li>
                <li><strong>Tác dụng:</strong> Vi sinh vật giải phóng các chất dinh dưỡng khó tiêu trong đất thành dạng cây hấp thụ ngay, giúp rễ củ lớn nhanh.</li>
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
                Kỹ Thuật Lên Luống & Phủ Màng Nông Nghiệp Sâm Ấn Độ
              </h2>
              <p className="text-xs text-orange-700 dark:text-orange-300">
                Thông số luống cao 25 - 30cm, thoát nước nhanh & phủ bạt đục lỗ mật độ 30x30cm
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="rounded-xl border border-orange-200 bg-white p-4 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-2">
              <h4 className="font-bold text-orange-800 dark:text-orange-300 flex items-center gap-1.5">
                <Ruler className="size-4 text-orange-600" />
                1. Kích Thước Luống
              </h4>
              <p className="text-neutral-600 dark:text-neutral-400">
                Rộng mặt luống <strong>1.0m - 1.2m</strong>, Chiều cao luống <strong>25 - 30cm</strong>, Rãnh rộng <strong>30 - 35cm</strong> giúp nước thoát nhanh khi mưa.
              </p>
            </div>

            <div className="rounded-xl border border-orange-200 bg-white p-4 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-2">
              <h4 className="font-bold text-orange-800 dark:text-orange-300 flex items-center gap-1.5">
                <Droplets className="size-4 text-orange-600" />
                2. Trải Dây Nhỏ Giọt
              </h4>
              <p className="text-neutral-600 dark:text-neutral-400">
                Trải 2 đường dây nhỏ giọt 16mm song song trên luống trước khi trùm bạt màng để châm phân trực tiếp vào rễ.
              </p>
            </div>

            <div className="rounded-xl border border-orange-200 bg-white p-4 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-2">
              <h4 className="font-bold text-orange-800 dark:text-orange-300 flex items-center gap-1.5">
                <Sparkles className="size-4 text-orange-600" />
                3. Bạt Màng Phủ Đục Lỗ
              </h4>
              <p className="text-neutral-600 dark:text-neutral-400">
                Phủ bạt màng nông nghiệp 2 mặt, đục lỗ mật độ <strong>30 x 30cm</strong> (60.000 - 70.000 cây/ha) giúp sạch cỏ dại & duy trì độ ẩm.
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
                Hệ Thống Tưới Nhỏ Giọt & Châm Phân A/B Sâm Ấn Độ
              </h2>
              <p className="text-xs text-blue-700 dark:text-blue-300">
                Quản lý độ ẩm 45-50% & Nguyên tắc VÀNG châm phân luân phiên luân kỳ chống tắc đường ống
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-red-200 bg-red-50/70 p-5 dark:border-red-900/40 dark:bg-red-950/30 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-red-900 dark:text-red-200 font-bold text-sm">
              <ShieldAlert className="size-4 text-red-600" />
              <span>NGUYÊN TẮC VÀNG CHỐNG KẾT TỦA TẮC ỐNG NHỎ GIỌT</span>
            </div>
            <p className="text-red-800/90 dark:text-red-300/90 leading-relaxed">
              CẤM KỲ TUYỆT ĐỐI KHÔNG PHA CHUNG phân có chứa <strong>Canxi (Ca)</strong> (như Calcium Nitrate) với phân chứa gốc <strong>Lân (P)</strong> (MAP, MKP, NPK) hoặc gốc <strong>Sunfat (S)</strong> (Kali Sulfat, Magie Sulfat) trong cùng 1 bồn.
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
      {/* TAB 7: THU HOẠCH & TỈA CÀNH (ROSE THEME) */}
      {/* ========================================================================= */}
      {activeTab === "thu-hoach" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-5 dark:border-rose-900/50 dark:bg-rose-950/30 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-rose-600 text-white shadow-md">
              <Scissors className="size-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-rose-950 dark:text-rose-100">
                Kỹ Thuật Tỉa Cành Không Mất Nhựa & Thu Hoạch Sâm Ấn Độ
              </h2>
              <p className="text-xs text-rose-700 dark:text-rose-300">
                Kích thích cành ngang tích lũy tinh bột về củ & quy trình đào sơ chế củ khô
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            {/* Tỉa cành */}
            <div className="rounded-xl border border-rose-200 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-3">
              <h3 className="text-sm font-bold text-rose-900 dark:text-rose-200 flex items-center gap-2">
                <Scissors className="size-4 text-rose-600" />
                <span>Kỹ Thuật Tỉa Cành Kích Tán (Không Mất Nhựa)</span>
              </h3>
              <ul className="text-neutral-600 dark:text-neutral-400 space-y-2 list-disc list-inside leading-relaxed">
                <li><strong>Tỉa cành khô:</strong> Cắt sát phần thân xanh, không cắt phạm vào mô sống của thân chính.</li>
                <li><strong>Bấm ngọn kích cành ngang:</strong> Cắt ngọn cành mọc vống để cây bật cành ngang. Nhiều cành ngang giúp tán lá dày, tăng quang hợp tích lũy tinh bột về củ.</li>
                <li><strong>Quy tắc 1/3:</strong> Chỉ tỉa tối đa <strong>1/3 tổng lượng tán lá</strong> (tránh cây bị sốc dừng phát triển rễ củ).</li>
                <li><strong>Phun Amino Acid & Vi lượng:</strong> Phun phân bón lá Amino Acid + Bo/Zn sau khi tỉa 2-3 ngày giúp mầm ngủ bật nhanh.</li>
                <li><strong>Vệ sinh dịch bệnh (IPM):</strong> Gom tiêu hủy toàn bộ cành lá cắt bỏ xa vườn, không để dưới gốc tránh bào tử nấm <em>Alternaria</em> gây đốm lá.</li>
              </ul>
            </div>

            {/* Thu hoạch */}
            <div className="rounded-xl border border-rose-200 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-3">
              <h3 className="text-sm font-bold text-rose-900 dark:text-rose-200 flex items-center gap-2">
                <Flame className="size-4 text-rose-600" />
                <span>Quy Trình Đào Thu Hoạch Củ & Sơ Chế</span>
              </h3>
              <ul className="text-neutral-600 dark:text-neutral-400 space-y-2 list-disc list-inside leading-relaxed">
                <li><strong>Thời điểm đào:</strong> Đào sau 150 - 180 ngày (5-6 tháng) khi lá cây chuyển màu vàng nhạt và hạt quả chín đỏ thẫm.</li>
                <li><strong>Kỹ thuật đào:</strong> Nhổ toàn bộ gốc củ nhẹ nhàng, loại bỏ đất cát bám quanh củ sâm.</li>
                <li><strong>Sơ chế & Phơi sấy:</strong> Rửa sạch củ sâm bằng nước sạch, cắt củ thành các đoạn 7 - 10cm. Phơi khô nắng nhẹ hoặc sấy ở nhiệt độ 50°C.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
