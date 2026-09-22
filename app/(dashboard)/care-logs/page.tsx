import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { softDeleteFarmActivity } from "@/lib/actions/farm-activities";
import { ACTIVITY_TYPES } from "@/lib/validations/farm-activity.schema";
import { FarmActivityFormDialog } from "@/components/forms/FarmActivityFormDialog";
import { DeleteLogButton } from "@/components/logs/DeleteLogButton";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ACTIVITY_LABEL = Object.fromEntries(
  ACTIVITY_TYPES.map((t) => [t.value, t.label])
);

export default async function CareLogsPage() {
  const supabase = await createClient();

  const [{ data: entries, error }, { data: farms }, { data: growingAreas }] =
    await Promise.all([
      supabase
        .from("farm_activities")
        .select("*, farm:farms(name), growing_area:growing_areas(code)")
        .is("deleted_at", null)
        .order("activity_date", { ascending: false }),
      supabase.from("farms").select("id, name").order("name"),
      supabase
        .from("growing_areas")
        .select("id, code, farm_id")
        .is("deleted_at", null)
        .order("code"),
    ]);

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-neutral-900">
            Nhật ký chăm sóc
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            {entries?.length ?? 0} nhật ký bạn có quyền xem.
          </p>
        </div>
        {(farms?.length ?? 0) > 0 && (
          <Button render={<Link href="/care-logs/new" />}>+ Thêm nhật ký</Button>
        )}
      </div>

      {error && (
        <p className="text-sm text-destructive">
          Không tải được danh sách: {error.message}
        </p>
      )}

      {!error && (entries?.length ?? 0) === 0 && (
        <div className="rounded-lg border border-dashed border-neutral-300 p-8 text-center text-sm text-neutral-500">
          Chưa có nhật ký chăm sóc nào.
        </div>
      )}

      {(entries?.length ?? 0) > 0 && (
        <div className="rounded-lg border border-neutral-200">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ngày</TableHead>
                <TableHead>Vùng trồng</TableHead>
                <TableHead>Nông trại</TableHead>
                <TableHead>Loại hoạt động</TableHead>
                <TableHead>Chi phí</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries!.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{entry.activity_date}</TableCell>
                  <TableCell className="font-medium">
                    {entry.growing_area_id ? (
                      <Link
                        href={`/growing-areas/${entry.growing_area_id}`}
                        className="hover:underline"
                      >
                        {entry.growing_area?.code ?? "—"}
                      </Link>
                    ) : (
                      "—"
                    )}
                  </TableCell>
                  <TableCell>{entry.farm?.name ?? "—"}</TableCell>
                  <TableCell>
                    {ACTIVITY_LABEL[entry.activity_type] ?? entry.activity_type}
                  </TableCell>
                  <TableCell>
                    {entry.cost != null
                      ? entry.cost.toLocaleString("vi-VN") + " đ"
                      : "—"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <FarmActivityFormDialog
                        entry={entry}
                        farms={farms ?? []}
                        growingAreas={growingAreas ?? []}
                        trigger="Sửa"
                      />
                      <DeleteLogButton
                        onDelete={softDeleteFarmActivity.bind(
                          null,
                          entry.id,
                          entry.farm_id ?? "",
                          entry.growing_area_id ?? ""
                        )}
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
