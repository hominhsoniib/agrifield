import { createClient } from "@/lib/supabase/server";
import type { AttachmentEntityType } from "@/lib/actions/attachments";

export type AttachmentWithUrl = {
  id: string;
  url: string | null;
  createdAt: string | null;
};

// Bucket "attachments" là private nên phải tạo signed URL (hết hạn sau 1h) —
// không dùng public URL trực tiếp.
export async function getAttachmentsWithUrls(
  entityType: AttachmentEntityType,
  entityId: string
): Promise<AttachmentWithUrl[]> {
  const supabase = await createClient();
  const { data: rows } = await supabase
    .from("attachments")
    .select("id, storage_path, created_at")
    .eq("entity_type", entityType)
    .eq("entity_id", entityId)
    .order("created_at", { ascending: false });

  if (!rows || rows.length === 0) return [];

  return Promise.all(
    rows.map(async (row) => {
      const { data: signed } = await supabase.storage
        .from("attachments")
        .createSignedUrl(row.storage_path, 3600);
      return {
        id: row.id,
        url: signed?.signedUrl ?? null,
        createdAt: row.created_at,
      };
    })
  );
}
