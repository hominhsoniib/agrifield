import { createClient } from "@/lib/supabase/server";
import { canManageContent } from "@/lib/permissions";
import { getAllSiteContents } from "@/lib/actions/content";
import { ContentEditorForm } from "@/components/admin/ContentEditorForm";
import { FileEdit, ShieldAlert } from "lucide-react";

export const metadata = {
  title: "Quản lý & Chỉnh sửa Nội dung Website — FarmTrack Admin",
  description: "Trang dành cho Admin quản lý nội dung bài viết và hướng dẫn kỹ thuật trên hệ thống",
};

export default async function AdminContentPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: myProfile } = user
    ? await supabase.from("profiles").select("role").eq("id", user.id).single()
    : { data: null };

  if (!canManageContent(myProfile?.role)) {
    return (
      <div className="p-6 md:p-8 max-w-4xl mx-auto">
        <div className="flex flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50/50 p-8 text-center dark:border-red-900/40 dark:bg-red-950/20">
          <ShieldAlert className="size-12 text-red-500 mb-3" />
          <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
            Truy cập bị từ chối
          </h1>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 max-w-md">
            Chỉ quản trị viên (Admin/Org Admin) mới có quyền chỉnh sửa nội dung website.
          </p>
        </div>
      </div>
    );
  }

  const siteContents = await getAllSiteContents();

  return (
    <div className="space-y-6 p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 p-6 text-white shadow-lg">
        <div className="relative z-10 space-y-1.5 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-300 backdrop-blur-md border border-emerald-400/30">
            <FileEdit className="size-3.5" />
            <span>Hệ thống Quản trị CMS</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Quản lý & Chỉnh sửa Nội dung Trang web
          </h1>
          <p className="text-sm text-emerald-100/80 leading-relaxed">
            Cập nhật tiêu đề, mô tả và nội dung các bài viết kỹ thuật trồng sâm và thông tin giới thiệu hệ thống trực tiếp trên trình duyệt.
          </p>
        </div>

        {/* Decorative blur */}
        <div className="absolute -right-10 -bottom-10 size-48 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />
      </div>

      {/* Main Editor Component */}
      <ContentEditorForm initialContents={siteContents} />
    </div>
  );
}
