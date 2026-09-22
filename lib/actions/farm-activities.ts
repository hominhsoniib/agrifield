"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import {
  farmActivitySchema,
  type FarmActivityInput,
} from "@/lib/validations/farm-activity.schema";

type ActionResult = { success: true; id: string } | { error: string };

function toNullableNumber(v: number | "" | undefined): number | null {
  return v === "" || v === undefined ? null : v;
}

function friendlyError(message: string): string {
  return message.includes("row-level security")
    ? "Bạn không có quyền thực hiện thao tác này trên vùng trồng này."
    : message;
}

function revalidateAll(farmId: string, growingAreaId: string, id?: string) {
  revalidatePath("/care-logs");
  revalidatePath(`/farms/${farmId}`);
  revalidatePath(`/growing-areas/${growingAreaId}`);
  revalidatePath("/dashboard");
  if (id) revalidatePath(`/care-logs/${id}`);
}

export async function createFarmActivity(
  input: FarmActivityInput
): Promise<ActionResult> {
  const parsed = farmActivitySchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ" };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Chưa đăng nhập." };

  const { data, error } = await supabase
    .from("farm_activities")
    .insert({
      farm_id: parsed.data.farm_id,
      growing_area_id: parsed.data.growing_area_id,
      activity_date: parsed.data.activity_date,
      activity_type: parsed.data.activity_type,
      material_used: parsed.data.material_used || null,
      cost: toNullableNumber(parsed.data.cost),
      notes: parsed.data.notes || null,
      performed_by: user.id,
      created_by: user.id,
    })
    .select("id")
    .single();

  if (error) return { error: friendlyError(error.message) };

  revalidateAll(parsed.data.farm_id, parsed.data.growing_area_id, data.id);
  return { success: true, id: data.id };
}

export async function updateFarmActivity(
  id: string,
  input: FarmActivityInput
): Promise<ActionResult> {
  const parsed = farmActivitySchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ" };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("farm_activities")
    .update({
      farm_id: parsed.data.farm_id,
      growing_area_id: parsed.data.growing_area_id,
      activity_date: parsed.data.activity_date,
      activity_type: parsed.data.activity_type,
      material_used: parsed.data.material_used || null,
      cost: toNullableNumber(parsed.data.cost),
      notes: parsed.data.notes || null,
    })
    .eq("id", id);

  if (error) return { error: friendlyError(error.message) };

  revalidateAll(parsed.data.farm_id, parsed.data.growing_area_id, id);
  return { success: true, id };
}

export async function softDeleteFarmActivity(
  id: string,
  farmId: string,
  growingAreaId: string
): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("farm_activities")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id);

  if (error) return { error: friendlyError(error.message) };

  revalidateAll(farmId, growingAreaId, id);
  return { success: true, id };
}
