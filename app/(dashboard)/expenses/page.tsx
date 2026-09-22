import { createClient } from "@/lib/supabase/server";
import { softDeleteExpense } from "@/lib/actions/expenses";
import { EXPENSE_CATEGORIES } from "@/lib/validations/expense.schema";
import { ExpenseFormDialog } from "@/components/forms/ExpenseFormDialog";
import { DeleteLogButton } from "@/components/logs/DeleteLogButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const CATEGORY_LABEL = Object.fromEntries(
  EXPENSE_CATEGORIES.map((c) => [c.value, c.label])
);

export default async function ExpensesPage() {
  const supabase = await createClient();

  const [{ data: entries, error }, { data: farms }, { data: growingAreas }] =
    await Promise.all([
      supabase
        .from("expenses")
        .select("*, farm:farms(name), growing_area:growing_areas(code)")
        .is("deleted_at", null)
        .order("expense_date", { ascending: false }),
      supabase.from("farms").select("id, name").order("name"),
      supabase
        .from("growing_areas")
        .select("id, code, farm_id")
        .is("deleted_at", null)
        .order("code"),
    ]);

  const total = (entries ?? []).reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-neutral-900">Chi phí</h1>
          <p className="mt-1 text-sm text-neutral-500">
            {entries?.length ?? 0} khoản chi bạn có quyền xem · Tổng:{" "}
            {total.toLocaleString("vi-VN")} đ
          </p>
        </div>
        {(farms?.length ?? 0) > 0 && (
          <ExpenseFormDialog
            farms={farms ?? []}
            growingAreas={growingAreas ?? []}
            trigger="+ Thêm chi phí"
          />
        )}
      </div>

      {error && (
        <p className="text-sm text-destructive">
          Không tải được danh sách: {error.message}
        </p>
      )}

      {!error && (entries?.length ?? 0) === 0 && (
        <div className="rounded-lg border border-dashed border-neutral-300 p-8 text-center text-sm text-neutral-500">
          Chưa có khoản chi nào.
        </div>
      )}

      {(entries?.length ?? 0) > 0 && (
        <div className="rounded-lg border border-neutral-200">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ngày</TableHead>
                <TableHead>Nông trại</TableHead>
                <TableHead>Vùng trồng</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Số tiền</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries!.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{entry.expense_date}</TableCell>
                  <TableCell>{entry.farm?.name ?? "—"}</TableCell>
                  <TableCell>{entry.growing_area?.code ?? "—"}</TableCell>
                  <TableCell>{CATEGORY_LABEL[entry.category] ?? entry.category}</TableCell>
                  <TableCell className="font-medium">
                    {entry.amount.toLocaleString("vi-VN")} đ
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <ExpenseFormDialog
                        expense={entry}
                        farms={farms ?? []}
                        growingAreas={growingAreas ?? []}
                        trigger="Sửa"
                      />
                      <DeleteLogButton
                        onDelete={softDeleteExpense.bind(null, entry.id)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
