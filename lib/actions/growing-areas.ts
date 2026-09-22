"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import {
  growingAreaSchema,
  type GrowingAreaInput,
} from "@/lib/validations/growing-area.schema";

type ActionResult = { success: true } | { error: string };

function toNullableNumber(v: number | "" | undefined): number | null {
  return v === "" || v === undefined ? null : v;
}

function friendlyError(message: string): string {
  return message.includes("row-level security")
    ? "Bạn không có quyền thực hiện thao tác này trên nông trại này."
    : message;
}

export async function createGrowingArea(
  input: GrowingAreaInput
): Promise<ActionResult> {
  const parsed = growingAreaSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ" };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Chưa đăng nhập." };

  const { error } = await supabase.from("growing_areas").insert({
    farm_id: parsed.data.farm_id,
    code: parsed.data.code,
    crop_id: parsed.data.crop_id || null,
    area_ha: toNullableNumber(parsed.data.area_ha),
    variety: parsed.data.variety || null,
    planting_year: toNullableNumber(parsed.data.planting_year),
    planting_density: parsed.data.planting_density || null,
    gps_lat: toNullableNumber(parsed.data.gps_lat),
    gps_lng: toNullableNumber(parsed.data.gps_lng),
    notes: parsed.data.notes || null,
    created_by: user.id,
  });

  if (error) return { error: friendlyError(error.message) };

  revalidatePath("/growing-areas");
  revalidatePath(`/farms/${parsed.data.farm_id}`);
  revalidatePath("/dashboard");
  return { success: true };
}

export async function updateGrowingArea(
  id: string,
  input: GrowingAreaInput
): Promise<ActionResult> {
  const parsed = growingAreaSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ" };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("growing_areas")
    .update({
      farm_id: parsed.data.farm_id,
      code: parsed.data.code,
      crop_id: parsed.data.crop_id || null,
      area_ha: toNullableNumber(parsed.data.area_ha),
      variety: parsed.data.variety || null,
      planting_year: toNullableNumber(parsed.data.planting_year),
      planting_density: parsed.data.planting_density || null,
      gps_lat: toNullableNumber(parsed.data.gps_lat),
      gps_lng: toNullableNumber(parsed.data.gps_lng),
      notes: parsed.data.notes || null,
    })
    .eq("id", id);

  if (error) return { error: friendlyError(error.message) };

  revalidatePath("/growing-areas");
  revalidatePath(`/growing-areas/${id}`);
  revalidatePath(`/farms/${parsed.data.farm_id}`);
  revalidatePath("/dashboard");
  return { success: true };
}
