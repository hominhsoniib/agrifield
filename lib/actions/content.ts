"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

type ActionResult = { success: true } | { error: string };

export type SiteContentItem = {
  id: string;
  title: string;
  summary: string | null;
  content: string | null;
  updated_at: string | null;
};

export async function getSiteContent(id: string): Promise<SiteContentItem | null> {
  try {
    const supabase = await createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any)
      .from("site_contents")
      .select("id, title, summary, content, updated_at")
      .eq("id", id)
      .maybeSingle();

    if (error || !data) return null;
    return data as SiteContentItem;
  } catch {
    return null;
  }
}

export async function getAllSiteContents(): Promise<SiteContentItem[]> {
  try {
    const supabase = await createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any)
      .from("site_contents")
      .select("id, title, summary, content, updated_at")
      .order("id");

    if (error || !data) return [];
    return data as SiteContentItem[];
  } catch {
    return [];
  }
}

export async function upsertSiteContent(
  id: string,
  title: string,
  summary: string,
  content: string
): Promise<ActionResult> {
  if (!id || !title) {
    return { error: "Mã trang và Tiêu đề không được để trống" };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Bạn chưa đăng nhập" };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase as any).from("site_contents").upsert(
    {
      id,
      title,
      summary: summary || null,
      content: content || null,
      updated_at: new Date().toISOString(),
      updated_by: user.id,
    },
    { onConflict: "id" }
  );

  if (error) {
    if (error.message.includes("row-level security")) {
      return { error: "Bạn không có quyền quản trị để chỉnh sửa nội dung này." };
    }
    return { error: error.message };
  }

  revalidatePath("/admin/content");
  revalidatePath("/sam-bo-chinh");
  revalidatePath("/sam-an-do");
  revalidatePath("/about");
  revalidatePath("/dashboard");

  return { success: true };
}
