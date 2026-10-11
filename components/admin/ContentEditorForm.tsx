"use client";

import { useState } from "react";
import { upsertSiteContent, type SiteContentItem } from "@/lib/actions/content";
import { FileText, Save, CheckCircle2, AlertCircle, Eye, Edit3, Sparkles } from "lucide-react";

type ContentEditorFormProps = {
  initialContents: SiteContentItem[];
};

const DEFAULT_PAGES = [
  {
    id: "sam-bo-chinh-guide",
    title: "Kỹ thuật trồng Sâm Bố Chính",
    defaultSummary: "Quy trình làm đất, chọn giống, bón phân hữu cơ vi sinh và chăm sóc Sâm Bố Chính.",
  },
  {
    id: "sam-an-do-guide",
    title: "Kỹ thuật trồng Sâm Ấn Độ (Ashwagandha)",
    defaultSummary: "Hướng dẫn kỹ thuật trồng, quản lý dịch hại và thu hoạch Sâm Ấn Độ đạt năng suất cao.",
  },
  {
    id: "about-page",
    title: "Giới thiệu Hệ thống & Thông báo AgriField",
    defaultSummary: "Thông tin sơ đồ kiến trúc hệ thống, trụ cột dữ liệu và thông báo cho người dùng.",
  },
];

export function ContentEditorForm({ initialContents }: ContentEditorFormProps) {
  const [selectedId, setSelectedId] = useState<string>(DEFAULT_PAGES[0].id);
  const [contentsList, setContentsList] = useState<SiteContentItem[]>(initialContents);

  const currentItem = contentsList.find((item) => item.id === selectedId);
  const currentPageConfig = DEFAULT_PAGES.find((p) => p.id === selectedId);

  const [title, setTitle] = useState(currentItem?.title ?? currentPageConfig?.title ?? "");
  const [summary, setSummary] = useState(currentItem?.summary ?? currentPageConfig?.defaultSummary ?? "");
  const [content, setContent] = useState(currentItem?.content ?? "");

  const [mode, setMode] = useState<"edit" | "preview">("edit");
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // When changing page selection
  function handleSelectPage(pageId: string) {
    setSelectedId(pageId);
    setStatusMessage(null);
    const item = contentsList.find((i) => i.id === pageId);
    const config = DEFAULT_PAGES.find((p) => p.id === pageId);
    setTitle(item?.title ?? config?.title ?? "");
    setSummary(item?.summary ?? config?.defaultSummary ?? "");
    setContent(item?.content ?? "");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    const res = await upsertSiteContent(selectedId, title, summary, content);
    setLoading(false);

    if ("error" in res) {
      setStatusMessage({ type: "error", text: res.error });
    } else {
      setStatusMessage({ type: "success", text: "Đã lưu và cập nhật nội dung thành công!" });
      const updatedItem: SiteContentItem = {
        id: selectedId,
        title,
        summary,
        content,
        updated_at: new Date().toISOString(),
      };
      setContentsList((prev) => [
        ...prev.filter((i) => i.id !== selectedId),
        updatedItem,
      ]);
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Selector Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-neutral-200 pb-3 dark:border-neutral-800">
        {DEFAULT_PAGES.map((page) => {
          const isActive = selectedId === page.id;
          const hasSaved = contentsList.some((i) => i.id === page.id);
          return (
            <button
              key={page.id}
              type="button"
              onClick={() => handleSelectPage(page.id)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all ${
                isActive
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                  : "bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-800 dark:hover:bg-neutral-800"
              }`}
            >
              <FileText className="size-3.5" />
              <span>{page.title}</span>
              {hasSaved && (
                <span className="size-2 rounded-full bg-emerald-400 ring-2 ring-white dark:ring-neutral-900" />
              )}
            </button>
          );
        })}
      </div>

      {/* Editor Main Card */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-5 md:p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-4 dark:border-neutral-800">
          <div>
            <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <Sparkles className="size-4 text-emerald-600 dark:text-emerald-400" />
              <span>Chỉnh sửa: {currentPageConfig?.title}</span>
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Mã trang: <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 font-mono">{selectedId}</code>
            </p>
          </div>

          <div className="inline-flex rounded-lg border border-neutral-200 p-0.5 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
            <button
              type="button"
              onClick={() => setMode("edit")}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                mode === "edit"
                  ? "bg-white text-emerald-700 font-bold shadow-xs dark:bg-neutral-800 dark:text-emerald-400"
                  : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200"
              }`}
            >
              <Edit3 className="size-3.5" />
              <span>Soạn thảo</span>
            </button>
            <button
              type="button"
              onClick={() => setMode("preview")}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                mode === "preview"
                  ? "bg-white text-emerald-700 font-bold shadow-xs dark:bg-neutral-800 dark:text-emerald-400"
                  : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200"
              }`}
            >
              <Eye className="size-3.5" />
              <span>Xem trước</span>
            </button>
          </div>
        </div>

        {statusMessage && (
          <div
            className={`flex items-center gap-2 rounded-xl p-3.5 text-xs font-medium ${
              statusMessage.type === "success"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900/50"
                : "bg-red-50 text-red-800 border border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-900/50"
            }`}
          >
            {statusMessage.type === "success" ? (
              <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
            ) : (
              <AlertCircle className="size-4 shrink-0 text-red-600" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {mode === "edit" ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                Tiêu đề bài viết / Trang
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Nhập tiêu đề trang..."
                className="w-full rounded-xl border border-neutral-300 px-3.5 py-2 text-sm text-neutral-900 focus:border-emerald-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                Mô tả ngắn / Tóm tắt
              </label>
              <textarea
                rows={2}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Nhập mô tả ngắn hiển thị dưới tiêu đề..."
                className="w-full rounded-xl border border-neutral-300 px-3.5 py-2 text-sm text-neutral-900 focus:border-emerald-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                  Nội dung chi tiết (Văn bản / Markdown / Bổ sung)
                </label>
                <span className="text-[11px] text-neutral-400">
                  Nội dung tùy chỉnh này sẽ hiển thị ưu tiên trên trang hướng dẫn
                </span>
              </div>
              <textarea
                rows={12}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Nhập nội dung kỹ thuật chi tiết hoặc lưu ý bổ sung..."
                className="w-full rounded-xl border border-neutral-300 px-3.5 py-2.5 text-sm font-mono text-neutral-900 focus:border-emerald-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-emerald-700 transition-colors disabled:opacity-50"
              >
                <Save className="size-4" />
                <span>{loading ? "Đang lưu..." : "Lưu thay đổi"}</span>
              </button>
            </div>
          </form>
        ) : (
          /* Preview Mode */
          <div className="space-y-4 rounded-xl border border-neutral-200 bg-neutral-50/50 p-4 md:p-6 dark:border-neutral-800 dark:bg-neutral-950/50">
            <div className="space-y-2 border-b border-neutral-200 pb-4 dark:border-neutral-800">
              <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                {title || "(Chưa có tiêu đề)"}
              </h1>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {summary || "(Chưa có tóm tắt)"}
              </p>
            </div>

            <div className="pt-2">
              <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">
                Nội dung tùy chỉnh:
              </h4>
              {content ? (
                <div className="whitespace-pre-wrap text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed font-sans bg-white dark:bg-neutral-900 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800">
                  {content}
                </div>
              ) : (
                <p className="text-xs italic text-neutral-400">
                  Chưa có nội dung tùy chỉnh bổ sung. Hệ thống sẽ sử dụng nội dung quy trình chuẩn mặc định.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
