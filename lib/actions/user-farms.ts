"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

type ActionResult = { success: true } | { error: string };

function friendlyError(message: string): string {
  return message.includes("row-level security")
    ? "Chỉ quản trị viên mới được gán quyền farm cho user."
    : message;
}

export async function assignUserFarm(
  userId: string,
  farmId: string
): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("user_farms")
    .insert({ user_id: userId, farm_id: farmId });

  if (error) {
    if (error.code === "23505") {
      return { error: "User đã được gán vào farm này rồi." };
    }
    return { error: friendlyError(error.message) };
  }

  revalidatePath("/users");
  return { success: true };
}

export async function removeUserFarm(
  userId: string,
  farmId: string
): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("user_farms")
    .delete()
    .eq("user_id", userId)
    .eq("farm_id", farmId);

  if (error) return { error: friendlyError(error.message) };

  revalidatePath("/users");
  return { success: true };
}
