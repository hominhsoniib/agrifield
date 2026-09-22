import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ data: farms }, { count: growingAreaCount }, { data: expenses }] =
    await Promise.all([
      supabase.from("farms").select("total_area_ha"),
      supabase
        .from("growing_areas")
        .select("*", { count: "exact", head: true })
        .is("deleted_at", null),
      supabase
        .from("expenses")
        .select("amount, growing_area:growing_areas(id, code)")
        .is("deleted_at", null),
    ]);

  const farmCount = farms?.length ?? 0;
  const totalAreaHa = (farms ?? []).reduce(
    (sum, f) => sum + (f.total_area_ha ?? 0),
    0
  );

  const expenseByArea = new Map<string, { label: string; total: number }>();
  let expenseNoArea = 0;
  for (const e of expenses ?? []) {
    if (e.growing_area) {
      const key = e.growing_area.id;
      const prev = expenseByArea.get(key)?.total ?? 0;
      expenseByArea.set(key, { label: e.growing_area.code, total: prev + e.amount });
    } else {
      expenseNoArea += e.amount;
    }
  }
  const expenseRows = Array.from(expenseByArea.values()).sort(
    (a, b) => b.total - a.total
  );
  const totalExpense = (expenses ?? []).reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-lg font-semibold text-neutral-900">Tổng quan</h1>
        <p className="mt-1 text-sm text-neutral-500">Xin chào {user?.email}.</p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-neutral-500">
              Tổng số nông trại
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-neutral-900">
              {farmCount}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-neutral-500">
              Tổng diện tích (ha)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-neutral-900">
              {totalAreaHa.toLocaleString("vi-VN")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-neutral-500">
              Tổng số vùng trồng
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-neutral-900">
              {growingAreaCount ?? 0}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-3">
        <h2 className="text-base font-semibold text-neutral-900">
          Chi phí theo vùng trồng · Tổng: {totalExpense.toLocaleString("vi-VN")} đ
        </h2>
        {expenseRows.length === 0 && expenseNoArea === 0 ? (
          <p className="text-sm text-neutral-500">Chưa có chi phí nào.</p>
        ) : (
          <div className="rounded-lg border border-neutral-200">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vùng trồng</TableHead>
                  <TableHead>Tổng chi phí</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenseRows.map((row) => (
                  <TableRow key={row.label}>
                    <TableCell>{row.label}</TableCell>
                    <TableCell>{row.total.toLocaleString("vi-VN")} đ</TableCell>
                  </TableRow>
                ))}
                {expenseNoArea > 0 && (
                  <TableRow>
                    <TableCell className="text-neutral-500">
                      (Không gắn vùng trồng cụ thể)
                    </TableCell>
                    <TableCell>{expenseNoArea.toLocaleString("vi-VN")} đ</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <p className="text-xs text-neutral-400">
        Số liệu trên chỉ tính farm/vùng trồng bạn có quyền xem (theo RLS), query
        trực tiếp từ Supabase — không phải số liệu mẫu.
      </p>
    </div>
  );
}
