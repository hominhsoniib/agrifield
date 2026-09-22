"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { expenseSchema, type ExpenseInput } from "@/lib/validations/expense.schema";

type ActionResult = { success: true; id: string } | { error: string };

function friendlyError(message: string): string {
  return message.includes("row-level security")
    ? "Bạn không có quyền thực hiện thao tác này trên nông trại này."
    : message;
}

function revalidateAll(id?: string) {
  revalidatePath("/expenses");
  revalidatePath("/dashboard");
  revalidatePath("/reports");
  if (id) revalidatePath(`/expenses/${id}`);
}

export async function createExpense(input: ExpenseInput): Promise<ActionResult> {
  const parsed = expenseSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ" };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Chưa đăng nhập." };

  const { data, error } = await supabase
    .from("expenses")
    .insert({
      farm_id: parsed.data.farm_id,
      growing_area_id: parsed.data.growing_area_id || null,
      category: parsed.data.category,
      amount: parsed.data.amount,
      expense_date: parsed.data.expense_date,
      notes: parsed.data.notes || null,
      created_by: user.id,
    })
    .select("id")
    .single();

  if (error) return { error: friendlyError(error.message) };

  revalidateAll(data.id);
  return { success: true, id: data.id };
}

export async function updateExpense(
  id: string,
  input: ExpenseInput
): Promise<ActionResult> {
  const parsed = expenseSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ" };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("expenses")
    .update({
      farm_id: parsed.data.farm_id,
      growing_area_id: parsed.data.growing_area_id || null,
      category: parsed.data.category,
      amount: parsed.data.amount,
      expense_date: parsed.data.expense_date,
      notes: parsed.data.notes || null,
    })
    .eq("id", id);

  if (error) return { error: friendlyError(error.message) };

  revalidateAll(id);
  return { success: true, id };
}

export async function softDeleteExpense(id: string): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("expenses")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id);

  if (error) return { error: friendlyError(error.message) };

  revalidateAll(id);
  return { success: true, id };
}
