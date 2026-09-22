"use server";

import { createClient } from "@/lib/supabase/server";

type ActionResult = { success: true } | { error: string };

export type AttachmentEntityType =
  | "growing_area"
  | "fertilizer_application"
  | "farm_activity";

export async function createAttachmentRecord(
  entityType: AttachmentEntityType,
  entityId: string,
  storagePath: string
): Promise<ActionResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Chưa đăng nhập." };

  const { error } = await supabase.from("attachments").insert({
    entity_type: entityType,
    entity_id: entityId,
    storage_path: storagePath,
    uploaded_by: user.id,
  });

  if (error) return { error: error.message };
  return { success: true };
}
