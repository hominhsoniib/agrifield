"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { farmSchema, type FarmInput } from "@/lib/validations/farm.schema";

type ActionResult = { success: true } | { error: string };

function toNullableNumber(v: number | "" | undefined): number | null {
  return v === "" || v === undefined ? null : v;
}

function friendlyError(message: string): string {
  return message.includes("row-level security")
    ? "Bạn không có quyền thực hiện thao tác này."
    : message;
}

export async function createFarm(input: FarmInput): Promise<ActionResult> {
  const parsed = farmSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ" };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Chưa đăng nhập." };

  const { data: profile } = await supabase
    .from("profiles")
    .select("organization_id")
    .eq("id", user.id)
    .single();

  const { error } = await supabase.from("farms").insert({
    name: parsed.data.name,
    code: parsed.data.code || null,
    address: parsed.data.address || null,
    gps_lat: toNullableNumber(parsed.data.gps_lat),
    gps_lng: toNullableNumber(parsed.data.gps_lng),
    total_area_ha: toNullableNumber(parsed.data.total_area_ha),
    organization_id: profile?.organization_id ?? null,
    created_by: user.id,
  });

  if (error) return { error: friendlyError(error.message) };

  revalidatePath("/farms");
  revalidatePath("/dashboard");
  return { success: true };
}

export async function updateFarm(
  id: string,
  input: FarmInput
): Promise<ActionResult> {
  const parsed = farmSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ" };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("farms")
    .update({
      name: parsed.data.name,
      code: parsed.data.code || null,
      address: parsed.data.address || null,
      gps_lat: toNullableNumber(parsed.data.gps_lat),
      gps_lng: toNullableNumber(parsed.data.gps_lng),
      total_area_ha: toNullableNumber(parsed.data.total_area_ha),
    })
    .eq("id", id);

  if (error) return { error: friendlyError(error.message) };

  revalidatePath("/farms");
  revalidatePath(`/farms/${id}`);
  revalidatePath("/dashboard");
  return { success: true };
}
