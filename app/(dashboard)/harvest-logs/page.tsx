import { createClient } from "@/lib/supabase/server";
import { HarvestLogFormDialog } from "@/components/forms/HarvestLogFormDialog";
import { DeleteLogButton } from "@/components/logs/DeleteLogButton";
import { softDeleteHarvestLog } from "@/lib/actions/harvest-logs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Sprout, Scale, Coins } from "lucide-react";

export default async function HarvestLogsPage() {
  const supabase = await createClient();

  const [{ data: farms }, { data: growingAreas }] = await Promise.all([
    supabase.from("farms").select("id, name").order("name"),
    supabase
      .from("growing_areas")
      .select("id, code, farm_id")
      .is("deleted_at", null)
      .order("code"),
  ]);

  const { data: harvestLogs, error } = await supabase
    .from("harvest_logs")
    .select("*, farm:farms(name), growing_area:growing_areas(code)")
    .is("deleted_at", null)
    .order("harvest_date", { ascending: false });

  const totalEntries = harvestLogs?.length ?? 0;
  const totalValue = (harvestLogs ?? []).reduce(
    (sum, item) => sum + (item.estimated_value ? Number(item.estimated_value) : 0),
    0
  );

  // Group total quantity by unit
  const quantityByUnit = (harvestLogs ?? []).reduce((acc, item) => {
    const unit = item.unit || "kg";
    const qty = Number(item.quantity) || 0;
    acc[unit] = (acc[unit] || 0) + qty;
    return acc;
  }, {} as Record<string, number>);

  const quantitySummaryText = Object.entries(quantityByUnit)
    .map(([unit, qty]) => `${qty.toLocaleString("vi-VN")} ${unit}`)
    .join(", ");

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-neutral-900">
            Nhật ký thu hoạch nông sản
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Theo dõi sản lượng, chất lượng nông sản và giá trị ước tính sau mỗi đợt thu hoạch.
          </p>
        </div>
        <HarvestLogFormDialog
          farms={farms ?? []}
          growingAreas={growingAreas ?? []}
          trigger={
            <span className="flex items-center gap-1.5 font-medium">
              <span>+</span>
              <span>Ghi nhận thu hoạch</span>
            </span>
          }
        />
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
              <Sprout className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-neutral-500">Số đợt thu hoạch</p>
              <p className="text-lg font-bold text-neutral-900">{totalEntries}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
              <Scale className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-neutral-500">Tổng sản lượng</p>
              <p className="text-base font-bold text-neutral-900">
                {quantitySummaryText || "0 kg"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-700">
              <Coins className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-neutral-500">Tổng giá trị ước tính</p>
              <p className="text-lg font-bold text-neutral-900">
                {totalValue.toLocaleString("vi-VN")} đ
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {error && (
        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive font-medium">
          Không tải được nhật ký thu hoạch: {error.message}
        </div>
      )}

      {/* Data Table */}
      {totalEntries === 0 ? (
        <div className="rounded-xl border border-dashed border-neutral-300 p-8 text-center text-sm text-neutral-500 bg-neutral-50/50">
          Chưa có nhật ký thu hoạch nào. Nhấn &quot;Ghi nhận thu hoạch&quot; để tạo mới.
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ngày thu hoạch</TableHead>
                <TableHead>Nông trại</TableHead>
                <TableHead>Vùng trồng</TableHead>
                <TableHead>Nông sản</TableHead>
                <TableHead>Sản lượng</TableHead>
                <TableHead>Chất lượng</TableHead>
                <TableHead>Giá trị ước tính</TableHead>
                <TableHead className="w-24 text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {harvestLogs!.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium text-neutral-900">
                    {log.harvest_date}
                  </TableCell>
                  <TableCell>{log.farm?.name ?? "—"}</TableCell>
                  <TableCell>{log.growing_area?.code ?? "—"}</TableCell>
                  <TableCell className="font-semibold text-emerald-800">
                    {log.crop_name}
                  </TableCell>
                  <TableCell className="font-semibold text-neutral-900">
                    {Number(log.quantity).toLocaleString("vi-VN")} {log.unit}
                  </TableCell>
                  <TableCell>
                    {log.quality_grade ? (
                      <span className="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-700">
                        {log.quality_grade}
                      </span>
                    ) : (
                      "—"
                    )}
                  </TableCell>
                  <TableCell>
                    {log.estimated_value != null
                      ? Number(log.estimated_value).toLocaleString("vi-VN") + " đ"
                      : "—"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <HarvestLogFormDialog
                        harvestLog={log}
                        farms={farms ?? []}
                        growingAreas={growingAreas ?? []}
                        trigger="Sửa"
                      />
                      <DeleteLogButton
                        onDelete={() => softDeleteHarvestLog(log.id)}
                        confirmText="Bạn có chắc chắn muốn xóa đợt thu hoạch này?"
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
