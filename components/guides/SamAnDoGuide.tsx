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
} from "lucide-react";

export function SamAnDoGuide() {
  const [activeTab, setActiveTab] = useState<"quy-trinh" | "lam-dat" | "u-phan">("quy-trinh");

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 md:p-6">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-teal-500/20 bg-gradient-to-r from-slate-950 via-teal-950 to-emerald-950 p-6 md:p-8 text-white shadow-xl">
        <div className="relative z-10 space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-teal-500/20 px-3.5 py-1 text-xs font-semibold text-teal-300 backdrop-blur-md border border-teal-400/30">
            <Sparkles className="size-3.5 text-teal-400" />
            <span>Sổ tay Kỹ thuật Dược liệu Số</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight">
            Kỹ thuật Trồng & Canh tác Sâm Ấn Độ (Ashwagandha)
          </h1>
          <p className="text-sm text-teal-100/90 leading-relaxed">
            Giải pháp canh tác hữu cơ nâng cao hoạt chất Withanolides, tối ưu năng suất củ & phù hợp khí hậu nhiệt đới khô hanh.
          </p>
        </div>

        <div className="absolute -right-10 -bottom-10 size-60 rounded-full bg-teal-500/15 blur-3xl pointer-events-none" />
      </div>

      {/* Multi-Tab Navigation Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-1.5 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
        {/* Tab 1: Quy trình trồng (Cyan/Teal Theme) */}
        <button
          type="button"
          onClick={() => setActiveTab("quy-trinh")}
          className={`flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 ${
            activeTab === "quy-trinh"
              ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg shadow-teal-600/30 scale-[1.02]"
              : "text-neutral-600 hover:text-teal-700 hover:bg-teal-50/60 dark:text-neutral-400 dark:hover:text-teal-300 dark:hover:bg-neutral-800"
          }`}
        >
          <Sprout className="size-4 shrink-0" />
          <span>Quy trình trồng</span>
        </button>

        {/* Tab 2: Kỹ thuật làm đất (Amber/Golden Soil Theme) */}
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
          <span>Kỹ thuật làm đất</span>
        </button>

        {/* Tab 3: Kỹ thuật ủ phân (Deep Purple Theme) */}
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
          <span>Kỹ thuật ủ phân</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: QUY TRÌNH TRỒNG (TEAL/CYAN THEME) */}
      {/* ========================================================================= */}
      {activeTab === "quy-trinh" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="rounded-2xl border border-teal-200 bg-teal-50/60 p-5 dark:border-teal-900/50 dark:bg-teal-950/30 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-teal-600 text-white shadow-md">
              <Sprout className="size-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-teal-950 dark:text-teal-100">
                Quy trình trồng Sâm Ấn Độ (Ashwagandha)
              </h2>
              <p className="text-xs text-teal-700 dark:text-teal-300">
                Thời vụ gieo trồng: Tháng 8 - 10 hoặc Tháng 2 - 4 · Thời gian thu hoạch 150 - 180 ngày (5-6 tháng)
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
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
              <p className="text-xs text-neutral-500 font-medium">Mật độ trồng</p>
              <p className="text-lg font-bold text-teal-700 dark:text-teal-400">30 x 30 cm</p>
            </div>
            <div className="rounded-xl border border-teal-100 bg-white p-4 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
              <p className="text-xs text-neutral-500 font-medium">Độ pH thích hợp</p>
              <p className="text-lg font-bold text-teal-700 dark:text-teal-400">7.5 - 8.0</p>
            </div>
          </div>

          {/* 5 Steps */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <Calendar className="size-4 text-teal-600" />
              <span>5 Bước Canh Tác Sâm Ấn Độ Chuẩn Kỹ Thuật</span>
            </h3>

            <div className="grid grid-cols-1 gap-4">
              <div className="rounded-xl border border-teal-200/80 bg-white p-5 shadow-xs transition-all hover:border-teal-400 dark:border-neutral-800 dark:bg-neutral-900">
                <div className="flex items-start gap-4">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white shadow-sm">
                    1
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                      Bước 1: Chọn & Ngâm ủ hạt giống Sâm Ấn Độ
                    </h4>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      Chọn hạt giống chín mẩy, tỷ lệ nảy mầm trên 85%. Ngâm hạt giống trong nước ấm 35 - 40°C trong 4 - 6 tiếng để kích hoạt mầm. Ủ hạt trong khăn ẩm 24 - 48 giờ đến khi hạt bắt đầu nứt nanh.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-teal-200/80 bg-white p-5 shadow-xs transition-all hover:border-teal-400 dark:border-neutral-800 dark:bg-neutral-900">
                <div className="flex items-start gap-4">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white shadow-sm">
                    2
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                      Bước 2: Gieo hạt & Trồng cây con
                    </h4>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      Có thể gieo trực tiếp (10 - 12 kg hạt/ha) hoặc gieo khay ươm. Trồng cây con khi cây đạt 15 - 20 ngày tuổi (cao 10 - 12cm). Mật độ trồng: cây cách cây 30cm, hàng cách hàng 30cm.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-teal-200/80 bg-white p-5 shadow-xs transition-all hover:border-teal-400 dark:border-neutral-800 dark:bg-neutral-900">
                <div className="flex items-start gap-4">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white shadow-sm">
                    3
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                      Bước 3: Quản lý độ ẩm & Nhổ cỏ
                    </h4>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      Sâm Ấn Độ có khả năng chịu hạn rất giỏi. Chỉ tưới nước nhẹ giữ ẩm trong 30 ngày đầu xuống giống. Tránh tưới quá nhiều gây thối rễ củ. Nhổ sạch cỏ dại định kỳ 20 ngày/lần.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-teal-200/80 bg-white p-5 shadow-xs transition-all hover:border-teal-400 dark:border-neutral-800 dark:bg-neutral-900">
                <div className="flex items-start gap-4">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white shadow-sm">
                    4
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                      Bước 4: Bón thúc & Phòng trừ sâu bệnh sinh học
                    </h4>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      Bón thúc 1 - 2 lần bằng phân hữu cơ vi sinh bón lá hoặc phân Kali trùn hạ. Sử dụng chế phẩm dầu neem (Neem oil) hoặc nấm đối kháng phòng ngừa rệp sáp & sâu ăn lá.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-teal-200/80 bg-white p-5 shadow-xs transition-all hover:border-teal-400 dark:border-neutral-800 dark:bg-neutral-900">
                <div className="flex items-start gap-4">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white shadow-sm">
                    5
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                      Bước 5: Thu hoạch & Phơi sấy củ sâm
                    </h4>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      Thu hoạch sau 150 - 180 ngày khi lá cây chuyển màu vàng nhạt và hạt chín đỏ thẫm. Nhổ toàn bộ gốc củ, nhặt bỏ lá. Rửa sạch củ sâm, cắt củ thành các đoạn 7 - 10cm, phơi khô dưới nắng nhẹ hoặc sấy ở 50°C.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: KỸ THUẬT LÀM ĐẤT (AMBER THEME) */}
      {/* ========================================================================= */}
      {activeTab === "lam-dat" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-5 dark:border-amber-900/50 dark:bg-amber-950/30 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md">
              <Shovel className="size-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-amber-950 dark:text-amber-100">
                Kỹ thuật Làm Đất Sâm Ấn Độ
              </h2>
              <p className="text-xs text-amber-800 dark:text-amber-300">
                Đất cát pha thoát nước nhanh, kiềm nhẹ (pH 7.5 - 8.0) giúp củ sâm phát triển dài & đâm sâu
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-amber-200/80 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-2">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm">
                <Ruler className="size-4" />
                <span>Kích thước Luống</span>
              </div>
              <ul className="text-xs text-neutral-600 dark:text-neutral-400 space-y-1">
                <li>• Rộng mặt luống: <strong>1.0m - 1.2m</strong></li>
                <li>• Chiều cao luống: <strong>25cm - 30cm</strong></li>
                <li>• Chiều rộng rãnh: <strong>30cm - 35cm</strong></li>
              </ul>
            </div>

            <div className="rounded-xl border border-amber-200/80 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-2">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm">
                <Sun className="size-4" />
                <span>Thổ nhưỡng lý tưởng</span>
              </div>
              <ul className="text-xs text-neutral-600 dark:text-neutral-400 space-y-1">
                <li>• Đất pha cát, tơi xốp sâu</li>
                <li>• Độ pH: <strong>7.5 - 8.0</strong> (Trung tính/Kiềm nhẹ)</li>
                <li>• Chịu hạn tốt, không đọng nước</li>
              </ul>
            </div>

            <div className="rounded-xl border border-amber-200/80 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-2">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm">
                <Droplets className="size-4" />
                <span>Bón lót đất</span>
              </div>
              <ul className="text-xs text-neutral-600 dark:text-neutral-400 space-y-1">
                <li>• Phân chuồng hoai: <strong>15 - 20 Tấn/ha</strong></li>
                <li>• Lân vi sinh: <strong>300 kg/ha</strong></li>
                <li>• Vôi khử trùng: <strong>300 kg/ha</strong></li>
              </ul>
            </div>
          </div>

          {/* 4 Process Steps */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <Layers className="size-4 text-amber-600" />
              <span>4 Công Đoạn Chuẩn Bị Đất Canh Tác Sâm Ấn Độ</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-amber-200/70 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-2">
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-800 text-xs font-bold dark:bg-amber-950/60 dark:text-amber-300">
                  Công đoạn 1
                </span>
                <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  Cày sâu & Phơi ải diệt mầm bệnh
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Cày lật đất sâu 20 - 25cm, nhặt sạch tàn dư thực vật và rễ cây cỏ dại. Phơi ải đất từ 7 - 10 ngày để ánh nắng mặt trời diệt trừ các loại nấm mốc gây thối rễ.
                </p>
              </div>

              <div className="rounded-xl border border-amber-200/70 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-2">
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-800 text-xs font-bold dark:bg-amber-950/60 dark:text-amber-300">
                  Công đoạn 2
                </span>
                <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  Rắc vôi & Bón lót vi sinh
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Rắc vôi bột (300kg/ha) nâng độ pH đất đạt mức 7.5 - 8.0. Rải đều phân chuồng hoai mục (15 - 20 tấn/ha) kết hợp lân vi sinh rồi xới trộn vào lòng đất.
                </p>
              </div>

              <div className="rounded-xl border border-amber-200/70 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-2">
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-800 text-xs font-bold dark:bg-amber-950/60 dark:text-amber-300">
                  Công đoạn 3
                </span>
                <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  Lên luống & Vun luống cao
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Tạo luống rộng mặt 1.0 - 1.2m, cao 25 - 30cm. Làm phẳng bệ luống. Chiều rộng rãnh 30 - 35cm giúp thoát nước cực tốt trong trường hợp có mưa lớn bất ngờ.
                </p>
              </div>

              <div className="rounded-xl border border-amber-200/70 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-2">
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-800 text-xs font-bold dark:bg-amber-950/60 dark:text-amber-300">
                  Công đoạn 4
                </span>
                <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  Đục lỗ màng phủ & Chuẩn bị gieo
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Sử dụng bạt màng phủ nông nghiệp đục lỗ theo khoảng cách 30 x 30cm để chuẩn bị xuống giống. Màng phủ hỗ trợ giữ ẩm đất vào mùa khô và ngăn cỏ dại.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: KỸ THUẬT Ủ PHÂN (PURPLE THEME) */}
      {/* ========================================================================= */}
      {activeTab === "u-phan" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="rounded-2xl border border-purple-200 bg-purple-50/60 p-5 dark:border-purple-900/50 dark:bg-purple-950/30 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md">
              <FlaskConical className="size-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-purple-950 dark:text-purple-100">
                Kỹ thuật Ủ Phân Hữu Cơ Sinh Học Sâm Ấn Độ
              </h2>
              <p className="text-xs text-purple-800 dark:text-purple-300">
                Quy trình phân hủy vi sinh Trichoderma + Bacillus tạo mùn dinh dưỡng hoai mục kích thích củ sâm phát triển chắc khỏe
              </p>
            </div>
          </div>

          {/* Recipe Table */}
          <div className="rounded-xl border border-purple-200/80 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-3">
            <h3 className="text-sm font-bold text-purple-900 dark:text-purple-200 flex items-center gap-2">
              <FlaskConical className="size-4 text-purple-600" />
              <span>Công thức Chuẩn cho 1 Tấn (1.000 kg) Phân Ủ Sâm Ấn Độ</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-purple-50 text-purple-900 font-bold border-b border-purple-100 dark:bg-purple-950/50 dark:text-purple-200 dark:border-purple-900/50">
                  <tr>
                    <th className="p-3">Nguyên liệu</th>
                    <th className="p-3">Tỷ lệ</th>
                    <th className="p-3">Khối lượng (1 Tấn)</th>
                    <th className="p-3">Tác dụng chính</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800 text-neutral-700 dark:text-neutral-300">
                  <tr>
                    <td className="p-3 font-semibold">Phân chuồng (Dê, Bò, Cừu hoai)</td>
                    <td className="p-3">70%</td>
                    <td className="p-3 font-bold text-purple-700 dark:text-purple-400">700 kg</td>
                    <td className="p-3">Dinh dưỡng hữu cơ & vi lượng phong phú</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Phế phẩm vỏ trấu / Mùn cưa</td>
                    <td className="p-3">30%</td>
                    <td className="p-3 font-bold text-purple-700 dark:text-purple-400">300 kg</td>
                    <td className="p-3">Tăng độ tơi xốp cho đất cát pha</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Vôi bột nông nghiệp</td>
                    <td className="p-3">1%</td>
                    <td className="p-3 font-bold text-purple-700 dark:text-purple-400">10 kg</td>
                    <td className="p-3">Nâng độ pH kiềm nhẹ & khử trùng mầm bệnh</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Men vi sinh *Trichoderma* + *Bacillus*</td>
                    <td className="p-3">0.2%</td>
                    <td className="p-3 font-bold text-purple-700 dark:text-purple-400">2 kg</td>
                    <td className="p-3">Tiêu diệt vi khuẩn thối rễ & phân giải đạm hữu cơ</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 4 Steps */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <Thermometer className="size-4 text-purple-600" />
              <span>4 Bước Quy Trình Ủ Phân Vi Sinh Sâm Ấn Độ</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-purple-200/70 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-2">
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800 text-xs font-bold dark:bg-purple-950/60 dark:text-purple-300">
                  Bước 1
                </span>
                <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  Phối trộn & Rắc vôi bột khử trùng
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Trộn đều phân chuồng và vỏ trấu. Rắc vôi bột theo từng lớp để tăng độ pH và tiêu diệt các bào tử nấm mốc có hại ban đầu.
                </p>
              </div>

              <div className="rounded-xl border border-purple-200/70 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-2">
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800 text-xs font-bold dark:bg-purple-950/60 dark:text-purple-300">
                  Bước 2
                </span>
                <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  Cân bằng độ ẩm đống ủ (45 - 50%)
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Tưới phun sương vừa phải. Sâm Ấn Độ thích phân ủ độ ẩm vừa phải (45 - 50%). Nắm chặt tay thấy phân vón cục nhưng không rỉ nước thành dòng là chuẩn.
                </p>
              </div>

              <div className="rounded-xl border border-purple-200/70 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-2">
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800 text-xs font-bold dark:bg-purple-950/60 dark:text-purple-300">
                  Bước 3
                </span>
                <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  Tưới men vi sinh & Phủ bạt nilon
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Hòa nấm men vi sinh <em>Trichoderma</em> + <em>Bacillus</em> tưới đều. Đóng đống hình chóp cao 1.2m, phủ bạt nilon hoặc bạt dứa giữ nhiệt.
                </p>
              </div>

              <div className="rounded-xl border border-purple-200/70 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-2">
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800 text-xs font-bold dark:bg-purple-950/60 dark:text-purple-300">
                  Bước 4
                </span>
                <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  Đảo đống ủ & Thu phân hoai mục
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Đảo đống ủ lần 1 sau 15 ngày. Sau 30 - 40 ngày phân hoai mục hoàn toàn, chuyển màu nâu đen tơi mùn, ready sử dụng bón lót cho ruộng trồng sâm.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
