"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import {
  inventoryItemSchema,
  type InventoryItemInput,
} from "@/lib/validations/inventory-item.schema";

type ActionResult = { success: true } | { error: string };

function toNullableNumber(v: number | "" | undefined): number | null {
  return v === "" || v === undefined ? null : v;
}

function friendlyError(message: string): string {
  return message.includes("row-level security")
    ? "Bạn không có quyền thực hiện thao tác này."
    : message;
}

export async function createInventoryItem(
  input: InventoryItemInput
): Promise<ActionResult> {
  const parsed = inventoryItemSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ" };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("inventory_items").insert({
    name: parsed.data.name,
    code: parsed.data.code || null,
    category: parsed.data.category || null,
    unit: parsed.data.unit,
    reference_price: toNullableNumber(parsed.data.reference_price),
    supplier: parsed.data.supplier || null,
    notes: parsed.data.notes || null,
  });

  if (error) return { error: friendlyError(error.message) };

  revalidatePath("/inventory");
  return { success: true };
}

export async function updateInventoryItem(
  id: string,
  input: InventoryItemInput
): Promise<ActionResult> {
  const parsed = inventoryItemSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ" };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("inventory_items")
    .update({
      name: parsed.data.name,
      code: parsed.data.code || null,
      category: parsed.data.category || null,
      unit: parsed.data.unit,
      reference_price: toNullableNumber(parsed.data.reference_price),
      supplier: parsed.data.supplier || null,
      notes: parsed.data.notes || null,
    })
    .eq("id", id);

  if (error) return { error: friendlyError(error.message) };

  revalidatePath("/inventory");
  return { success: true };
}

export async function setInventoryItemActive(
  id: string,
  isActive: boolean
): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("inventory_items")
    .update({ is_active: isActive })
    .eq("id", id);

  if (error) return { error: friendlyError(error.message) };

  revalidatePath("/inventory");
  return { success: true };
}
