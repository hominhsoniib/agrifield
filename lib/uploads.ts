import { createClient } from "@/lib/supabase/client";
import {
  createAttachmentRecord,
  type AttachmentEntityType,
} from "@/lib/actions/attachments";

export async function uploadAttachmentFile(
  entityType: AttachmentEntityType,
  entityId: string,
  file: File
): Promise<{ success: true } | { error: string }> {
  const supabase = createClient();
  const ext = file.name.split(".").pop();
  const safeExt = ext ? `.${ext.replace(/[^a-zA-Z0-9]/g, "")}` : "";
  const path = `${entityType}/${entityId}/${crypto.randomUUID()}${safeExt}`;

  const { error: uploadError } = await supabase.storage
    .from("attachments")
    .upload(path, file, { upsert: false });

  if (uploadError) {
    return { error: "Upload ảnh thất bại: " + uploadError.message };
  }

  return createAttachmentRecord(entityType, entityId, path);
}
