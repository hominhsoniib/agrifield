"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import {
  harvestLogSchema,
  type HarvestLogInput,
} from "@/lib/validations/harvest-log.schema";

type ActionResult = { success: true; id: string } | { error: string };

function friendlyError(message: string): string {
  return message.includes("row-level security")
    ? "Bạn không có quyền thực hiện thao tác này trên nông trại này."
    : message;
}

function revalidateAll(id?: string) {
  revalidatePath("/harvest-logs");
  revalidatePath("/dashboard");
  revalidatePath("/reports");
  if (id) revalidatePath(`/harvest-logs/${id}`);
}

export async function createHarvestLog(
  input: HarvestLogInput
): Promise<ActionResult> {
  const parsed = harvestLogSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ" };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Chưa đăng nhập." };

  const { data, error } = await supabase
    .from("harvest_logs")
    .insert({
      farm_id: parsed.data.farm_id,
      growing_area_id: parsed.data.growing_area_id,
      harvest_date: parsed.data.harvest_date,
      crop_name: parsed.data.crop_name,
      quantity: parsed.data.quantity,
      unit: parsed.data.unit,
      estimated_value: parsed.data.estimated_value ?? null,
      quality_grade: parsed.data.quality_grade ?? null,
      performed_by: user.id,
      notes: parsed.data.notes ?? null,
      created_by: user.id,
    })
    .select("id")
    .single();

  if (error) return { error: friendlyError(error.message) };

  revalidateAll(data.id);
  return { success: true, id: data.id };
}

export async function updateHarvestLog(
  id: string,
  input: HarvestLogInput
): Promise<ActionResult> {
  const parsed = harvestLogSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ" };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("harvest_logs")
    .update({
      farm_id: parsed.data.farm_id,
      growing_area_id: parsed.data.growing_area_id,
      harvest_date: parsed.data.harvest_date,
      crop_name: parsed.data.crop_name,
      quantity: parsed.data.quantity,
      unit: parsed.data.unit,
      estimated_value: parsed.data.estimated_value ?? null,
      quality_grade: parsed.data.quality_grade ?? null,
      notes: parsed.data.notes ?? null,
    })
    .eq("id", id);

  if (error) return { error: friendlyError(error.message) };

  revalidateAll(id);
  return { success: true, id };
}

export async function softDeleteHarvestLog(id: string): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("harvest_logs")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id);

  if (error) return { error: friendlyError(error.message) };

  revalidateAll(id);
  return { success: true, id };
}
