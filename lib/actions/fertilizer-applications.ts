"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import {
  fertilizerApplicationSchema,
  type FertilizerApplicationInput,
} from "@/lib/validations/fertilizer-application.schema";

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
  revalidatePath("/fertilizer-logs");
  revalidatePath(`/farms/${farmId}`);
  revalidatePath(`/growing-areas/${growingAreaId}`);
  revalidatePath("/dashboard");
  if (id) revalidatePath(`/fertilizer-logs/${id}`);
}

export async function createFertilizerApplication(
  input: FertilizerApplicationInput
): Promise<ActionResult> {
  const parsed = fertilizerApplicationSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ" };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Chưa đăng nhập." };

  const { data, error } = await supabase
    .from("fertilizer_applications")
    .insert({
      farm_id: parsed.data.farm_id,
      growing_area_id: parsed.data.growing_area_id,
      application_date: parsed.data.application_date,
      fertilizer_product_id: parsed.data.fertilizer_product_id || null,
      dosage: toNullableNumber(parsed.data.dosage),
      dosage_unit: parsed.data.dosage_unit || null,
      total_quantity: toNullableNumber(parsed.data.total_quantity),
      application_method: parsed.data.application_method || null,
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

export async function updateFertilizerApplication(
  id: string,
  input: FertilizerApplicationInput
): Promise<ActionResult> {
  const parsed = fertilizerApplicationSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ" };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("fertilizer_applications")
    .update({
      farm_id: parsed.data.farm_id,
      growing_area_id: parsed.data.growing_area_id,
      application_date: parsed.data.application_date,
      fertilizer_product_id: parsed.data.fertilizer_product_id || null,
      dosage: toNullableNumber(parsed.data.dosage),
      dosage_unit: parsed.data.dosage_unit || null,
      total_quantity: toNullableNumber(parsed.data.total_quantity),
      application_method: parsed.data.application_method || null,
      notes: parsed.data.notes || null,
    })
    .eq("id", id);

  if (error) return { error: friendlyError(error.message) };

  revalidateAll(parsed.data.farm_id, parsed.data.growing_area_id, id);
  return { success: true, id };
}

export async function softDeleteFertilizerApplication(
  id: string,
  farmId: string,
  growingAreaId: string
): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("fertilizer_applications")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id);

  if (error) return { error: friendlyError(error.message) };

  revalidateAll(farmId, growingAreaId, id);
  return { success: true, id };
}
