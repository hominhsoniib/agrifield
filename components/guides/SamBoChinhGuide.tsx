"use client";

import { useState } from "react";
import {
  Sprout,
  Shovel,
  FlaskConical,
  CheckCircle2,
  Calendar,
  Layers,
  Thermometer,
  Droplets,
  Clock,
  Sparkles,
  ChevronRight,
  ShieldAlert,
  Award,
  BookOpen,
  ArrowRight,
  Sun,
  Ruler,
} from "lucide-react";

export function SamBoChinhGuide() {
  const [activeTab, setActiveTab] = useState<"quy-trinh" | "lam-dat" | "u-phan">("quy-trinh");

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 md:p-6">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 p-6 md:p-8 text-white shadow-xl">
        <div className="relative z-10 space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3.5 py-1 text-xs font-semibold text-emerald-300 backdrop-blur-md border border-emerald-400/30">
            <Sparkles className="size-3.5 text-emerald-400" />
            <span>Sổ tay Kỹ thuật Canh tác Số</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight">
            Kỹ thuật Trồng & Canh tác Sâm Bố Chính
          </h1>
          <p className="text-sm text-emerald-100/90 leading-relaxed">
            Quy trình canh tác chuẩn VietGAP giúp tối ưu năng suất củ, nâng cao hàm lượng Saponin và tiết kiệm chi phí phân bón.
          </p>
        </div>

        <div className="absolute -right-10 -bottom-10 size-60 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />
      </div>

      {/* Multi-Tab Navigation Bar with Vibrant Colors */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-1.5 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
        {/* Tab 1: Quy trình trồng (Emerald Green Theme) */}
        <button
          type="button"
          onClick={() => setActiveTab("quy-trinh")}
          className={`flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 ${
            activeTab === "quy-trinh"
              ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30 scale-[1.02]"
              : "text-neutral-600 hover:text-emerald-700 hover:bg-emerald-50/60 dark:text-neutral-400 dark:hover:text-emerald-300 dark:hover:bg-neutral-800"
          }`}
        >
          <Sprout className="size-4 shrink-0" />
          <span>Tab 1: Quy trình trồng</span>
        </button>

        {/* Tab 2: Kỹ thuật làm đất (Amber/Earth Orange Theme) */}
        <button
          type="button"
          onClick={() => setActiveTab("lam-dat")}
          className={`flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 ${
            activeTab === "lam-dat"
              ? "bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 text-white shadow-lg shadow-amber-600/30 scale-[1.02]"
              : "text-neutral-600 hover:text-amber-700 hover:bg-amber-50/60 dark:text-neutral-400 dark:hover:text-amber-300 dark:hover:bg-neutral-800"
          }`}
        >
          <Shovel className="size-4 shrink-0" />
          <span>Tab 2: Kỹ thuật làm đất</span>
        </button>

        {/* Tab 3: Kỹ thuật ủ phân (Purple/Indigo Theme) */}
        <button
          type="button"
          onClick={() => setActiveTab("u-phan")}
          className={`flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 ${
            activeTab === "u-phan"
              ? "bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 text-white shadow-lg shadow-purple-600/30 scale-[1.02]"
              : "text-neutral-600 hover:text-purple-700 hover:bg-purple-50/60 dark:text-neutral-400 dark:hover:text-purple-300 dark:hover:bg-neutral-800"
          }`}
        >
          <FlaskConical className="size-4 shrink-0" />
          <span>Tab 3: Kỹ thuật ủ phân</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: QUY TRÌNH TRỒNG (EMERALD THEME) */}
      {/* ========================================================================= */}
      {activeTab === "quy-trinh" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Section Header */}
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 dark:border-emerald-900/50 dark:bg-emerald-950/30 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md">
              <Sprout className="size-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-emerald-950 dark:text-emerald-100">
                Quy trình trồng & Canh tác Sâm Bố Chính
              </h2>
              <p className="text-xs text-emerald-700 dark:text-emerald-300">
                Thời vụ trồng từ Tháng 1 - Tháng 4 hàng năm · Thời gian thu hoạch 9 - 12 tháng
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-xl border border-emerald-100 bg-white p-4 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
              <p className="text-xs text-neutral-500 font-medium">Năng suất TB</p>
              <p className="text-lg font-bold text-emerald-700 dark:text-emerald-400">4 - 6 Tấn/ha</p>
            </div>
            <div className="rounded-xl border border-emerald-100 bg-white p-4 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
              <p className="text-xs text-neutral-500 font-medium">Thời gian trồng</p>
              <p className="text-lg font-bold text-emerald-700 dark:text-emerald-400">9 - 12 Tháng</p>
            </div>
            <div className="rounded-xl border border-emerald-100 bg-white p-4 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
              <p className="text-xs text-neutral-500 font-medium">Mật độ gieo</p>
              <p className="text-lg font-bold text-emerald-700 dark:text-emerald-400">40 x 50 cm</p>
            </div>
            <div className="rounded-xl border border-emerald-100 bg-white p-4 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
              <p className="text-xs text-neutral-500 font-medium">Độ pH thích hợp</p>
              <p className="text-lg font-bold text-emerald-700 dark:text-emerald-400">6.0 - 7.0</p>
            </div>
          </div>

          {/* Steps Timeline */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <Calendar className="size-4 text-emerald-600" />
              <span>5 Bước Canh Tác Chuẩn Kỹ Thuật</span>
            </h3>

            <div className="grid grid-cols-1 gap-4">
              {/* Step 1 */}
              <div className="rounded-xl border border-emerald-200/80 bg-white p-5 shadow-xs transition-all hover:border-emerald-400 dark:border-neutral-800 dark:bg-neutral-900">
                <div className="flex items-start gap-4">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white shadow-sm">
                    1
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                      Bước 1: Chọn & Xử lý hạt giống Sâm Bố Chính
                    </h4>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      Chọn hạt giống chắc khỏe, vỏ đen bóng từ cây bố mẹ 2 năm tuổi. Ngâm hạt trong nước ấm (2 sôi 3 lạnh - khoảng 45°C) trong 6 - 8 tiếng. Sau đó vớt ra ủ vào vải ẩm 2 - 3 ngày đến khi hạt nứt nanh thì tiến hành gieo.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="rounded-xl border border-emerald-200/80 bg-white p-5 shadow-xs transition-all hover:border-emerald-400 dark:border-neutral-800 dark:bg-neutral-900">
                <div className="flex items-start gap-4">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white shadow-sm">
                    2
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                      Bước 2: Gieo ươm cây con
                    </h4>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      Gieo hạt vào khay ươm đã chuẩn bị sẵn giá thể (mùn xơ dừa + phân trùn hạ). Tưới giữ ẩm nhẹ bằng bình phun sương hàng ngày. Cây con ươm được 20 - 25 ngày (đạt 3 - 4 lá thật) thì mang ra đồng ruộng trồng.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="rounded-xl border border-emerald-200/80 bg-white p-5 shadow-xs transition-all hover:border-emerald-400 dark:border-neutral-800 dark:bg-neutral-900">
                <div className="flex items-start gap-4">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white shadow-sm">
                    3
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                      Bước 3: Trồng cây ra ruộng & Mật độ
                    </h4>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      Trồng cây vào buổi chiều mát. Khoảng cách trồng: hàng cách hàng 50cm, cây cách cây 40cm (mật độ khoảng 45.000 - 50.000 cây/ha). Ấn nhẹ đất quanh gốc và tưới đẫm nước ngay sau khi trồng.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="rounded-xl border border-emerald-200/80 bg-white p-5 shadow-xs transition-all hover:border-emerald-400 dark:border-neutral-800 dark:bg-neutral-900">
                <div className="flex items-start gap-4">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white shadow-sm">
                    4
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                      Bước 4: Chăm sóc & Tỉa hoa nuôi củ
                    </h4>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      Định kỳ làm cỏ dại và vun gốc. <strong className="text-emerald-700 dark:text-emerald-400">Lưu ý quan trọng:</strong> Ngắt nụ hoa khi cây bắt đầu ra hoa (khoảng tháng thứ 4 - 6) để tập trung chất dinh dưỡng về nuôi củ, giúp củ to và tích lũy hàm lượng Saponin cao nhất.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 5 */}
              <div className="rounded-xl border border-emerald-200/80 bg-white p-5 shadow-xs transition-all hover:border-emerald-400 dark:border-neutral-800 dark:bg-neutral-900">
                <div className="flex items-start gap-4">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white shadow-sm">
                    5
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                      Bước 5: Thu hoạch & Sơ chế
                    </h4>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      Thu hoạch khi cây sâm được 9 - 12 tháng tuổi (khi phần thân bắt đầu lụi vàng). Đào củ nhẹ nhàng tránh gãy nhánh củ sâm. Rửa sạch đất cát bằng nước sạch, phơi hoặc sấy khô ở nhiệt độ 50 - 60°C.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: KỸ THUẬT LÀM ĐẤT (AMBER/EARTH ORANGE THEME) */}
      {/* ========================================================================= */}
      {activeTab === "lam-dat" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Section Header */}
          <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-5 dark:border-amber-900/50 dark:bg-amber-950/30 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md">
              <Shovel className="size-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-amber-950 dark:text-amber-100">
                Kỹ thuật Làm Đất & Lên Luống Trồng Sâm
              </h2>
              <p className="text-xs text-amber-800 dark:text-amber-300">
                Chuẩn bị thổ nhưỡng tơi xốp, thoát nước tốt để củ sâm phát triển dài, thẳng & không bị thối rễ
              </p>
            </div>
          </div>

          {/* Land Specs Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-amber-200/80 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-2">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm">
                <Ruler className="size-4" />
                <span>Kích thước Luống</span>
              </div>
              <ul className="text-xs text-neutral-600 dark:text-neutral-400 space-y-1">
                <li>• Rộng mặt luống: <strong>1.0m - 1.2m</strong></li>
                <li>• Chiều cao luống: <strong>30cm - 35cm</strong></li>
                <li>• Chiều rộng rãnh: <strong>35cm - 40cm</strong></li>
              </ul>
            </div>

            <div className="rounded-xl border border-amber-200/80 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-2">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm">
                <Sun className="size-4" />
                <span>Yêu cầu Đất</span>
              </div>
              <ul className="text-xs text-neutral-600 dark:text-neutral-400 space-y-1">
                <li>• Đất thịt nhẹ, đất cát pha</li>
                <li>• Độ pH: <strong>6.0 - 7.0</strong></li>
                <li>• Thoát nước nhanh, tuyệt đối không ngập</li>
              </ul>
            </div>

            <div className="rounded-xl border border-amber-200/80 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-2">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm">
                <Droplets className="size-4" />
                <span>Bón Lót & Vôi</span>
              </div>
              <ul className="text-xs text-neutral-600 dark:text-neutral-400 space-y-1">
                <li>• Vôi bột: <strong>500 kg/ha</strong></li>
                <li>• Phân chuồng hoai: <strong>20 - 30 Tấn/ha</strong></li>
                <li>• Lân vi sinh: <strong>300 - 500 kg/ha</strong></li>
              </ul>
            </div>
          </div>

          {/* Soil Preparation Process */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <Layers className="size-4 text-amber-600" />
              <span>4 Công Đoạn Xử Lý Đất Chuẩn Kỹ Thuật</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-amber-200/70 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-2">
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-800 text-xs font-bold dark:bg-amber-950/60 dark:text-amber-300">
                  Công đoạn 1
                </span>
                <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  Cày lật đất & Phơi ải diệt mầm bệnh
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Cày sâu đất từ 25 - 30cm, băm tơi đất. Rắc vôi bột đều trên bề mặt (500kg/ha) rồi phơi ải nắng từ 10 - 15 ngày để diệt các loại nấm gây bệnh ủ trong đất và nâng độ pH.
                </p>
              </div>

              <div className="rounded-xl border border-amber-200/70 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-2">
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-800 text-xs font-bold dark:bg-amber-950/60 dark:text-amber-300">
                  Công đoạn 2
                </span>
                <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  Bón lót phân hữu cơ vi sinh
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Rải đều phân chuồng ủ hoai mục (20 - 30 tấn/ha) kết hợp phân lân vi sinh. Trộn đều phân vào tầng đất mặt 15 - 20cm trước khi tiến hành vun luống.
                </p>
              </div>

              <div className="rounded-xl border border-amber-200/70 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-2">
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-800 text-xs font-bold dark:bg-amber-950/60 dark:text-amber-300">
                  Công đoạn 3
                </span>
                <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  Vun luống & Tạo rãnh thoát nước
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Vun luống cao 30 - 35cm, làm bằng phẳng mặt luống. Rãnh giữa các luống rộng 35 - 40cm giúp thoát nước cực nhanh trong mùa mưa, tránh tình trạng úng thối củ sâm.
                </p>
              </div>

              <div className="rounded-xl border border-amber-200/70 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-2">
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-800 text-xs font-bold dark:bg-amber-950/60 dark:text-amber-300">
                  Công đoạn 4
                </span>
                <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  Phủ bạt màng phủ nông nghiệp
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Dùng màng phủ nông nghiệp (bạt 2 mặt đen/bạc) phủ kín mặt luống, đục lỗ với đường kính 8 - 10cm theo khoảng cách 40 x 50cm để trồng cây. Màng phủ giúp diệt cỏ dại và giữ ẩm đất.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: KỸ THUẬT Ủ PHÂN (PURPLE/INDIGO THEME) */}
      {/* ========================================================================= */}
      {activeTab === "u-phan" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Section Header */}
          <div className="rounded-2xl border border-purple-200 bg-purple-50/60 p-5 dark:border-purple-900/50 dark:bg-purple-950/30 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md">
              <FlaskConical className="size-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-purple-950 dark:text-purple-100">
                Kỹ thuật Ủ Phân Hữu Cơ Sinh Học Trichoderma
              </h2>
              <p className="text-xs text-purple-800 dark:text-purple-300">
                Quy trình phân hủy phế phẩm nông nghiệp & phân chuồng tạo nguồn dinh dưỡng hoai mục tuyệt đối an toàn cho sâm
              </p>
            </div>
          </div>

          {/* Recipe Table */}
          <div className="rounded-xl border border-purple-200/80 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-3">
            <h3 className="text-sm font-bold text-purple-900 dark:text-purple-200 flex items-center gap-2">
              <FlaskConical className="size-4 text-purple-600" />
              <span>Công thức Chuẩn cho 1 Tấn (1.000 kg) Phân Ủ Hoai Mục</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-purple-50 text-purple-900 font-bold border-b border-purple-100 dark:bg-purple-950/50 dark:text-purple-200 dark:border-purple-900/50">
                  <tr>
                    <th className="p-3">Nguyên liệu</th>
                    <th className="p-3">Tỷ lệ / Tỷ trọng</th>
                    <th className="p-3">Khối lượng (1 Tấn)</th>
                    <th className="p-3">Tác dụng chính</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800 text-neutral-700 dark:text-neutral-300">
                  <tr>
                    <td className="p-3 font-semibold">Phân chuồng (Bò, Gà, Heo)</td>
                    <td className="p-3">75%</td>
                    <td className="p-3 font-bold text-purple-700 dark:text-purple-400">750 kg</td>
                    <td className="p-3">Cung cấp Đạm (N), Lân (P), Kali (K) tự nhiên</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Rơm rạ / Trấu / Mùn xơ dừa</td>
                    <td className="p-3">25%</td>
                    <td className="p-3 font-bold text-purple-700 dark:text-purple-400">250 kg</td>
                    <td className="p-3">Tạo độ tơi xốp & bổ sung Carbon (C)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Vôi bột nông nghiệp</td>
                    <td className="p-3">1 - 1.5%</td>
                    <td className="p-3 font-bold text-purple-700 dark:text-purple-400">10 - 15 kg</td>
                    <td className="p-3">Khử chua, diệt khuẩn & mầm bệnh ban đầu</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Men Nấm *Trichoderma* + *EM*</td>
                    <td className="p-3">0.2%</td>
                    <td className="p-3 font-bold text-purple-700 dark:text-purple-400">2 kg</td>
                    <td className="p-3">Phân giải Xenluloza & tiêu diệt nấm hại thối rễ</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 4 Steps Fermentation Process */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <Thermometer className="size-4 text-purple-600" />
              <span>4 Bước Quy Trình Ủ Phân Vi Sinh</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-purple-200/70 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-2">
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800 text-xs font-bold dark:bg-purple-950/60 dark:text-purple-300">
                  Bước 1
                </span>
                <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  Phối trộn & Rắc vôi bột
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Rải phân chuồng và phế phẩm nông nghiệp theo từng lớp dày 20 - 30cm. Rắc đều vôi bột lên từng lớp để hỗ trợ phân hủy và tiêu diệt vi khuẩn có hại.
                </p>
              </div>

              <div className="rounded-xl border border-purple-200/70 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-2">
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800 text-xs font-bold dark:bg-purple-950/60 dark:text-purple-300">
                  Bước 2
                </span>
                <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  Chỉnh độ ẩm đống ủ (50 - 55%)
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Phun tưới nước đều vào đống ủ. <strong className="text-purple-700 dark:text-purple-400">Cách kiểm tra độ ẩm chuẩn:</strong> Nắm chặt một nắm phân trong tay, thấy rỉ nước ở kẽ ngón tay nhưng không nhỏ giọt thành dòng là đạt độ ẩm 50 - 55%.
                </p>
              </div>

              <div className="rounded-xl border border-purple-200/70 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-2">
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800 text-xs font-bold dark:bg-purple-950/60 dark:text-purple-300">
                  Bước 3
                </span>
                <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  Tưới men Trichoderma & Che phủ bạt
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Hòa nấm men <em>Trichoderma</em> vào nước rồi tưới đều đống ủ. Vun đống ủ thành hình chóp cao 1.2m - 1.5m. Phủ kín bạt nilon hoặc bạt dứa để giữ nhiệt độ sinh học.
                </p>
              </div>

              <div className="rounded-xl border border-purple-200/70 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-2">
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800 text-xs font-bold dark:bg-purple-950/60 dark:text-purple-300">
                  Bước 4
                </span>
                <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  Đảo đống ủ & Kiểm tra chín hoai
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Sau 10 - 15 ngày, tiến hành đảo đống ủ lần 1 (Nhiệt độ lúc này tăng lên 55 - 65°C giúp diệt hết hạt cỏ & nấm hại). Sau 35 - 45 ngày, phân chín tơi xốp màu nâu đen, hết mùi hôi là phân đã hoai mục hoàn toàn.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
