import { createClient } from "@/lib/supabase/server";
import { ACTIVITY_TYPES } from "@/lib/validations/farm-activity.schema";
import { ReportFilters } from "@/components/logs/ReportFilters";
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

export default async function ReportsPage({
  searchParams,
}: {
  searchParams: Promise<{
    farm_id?: string;
    growing_area_id?: string;
    date_from?: string;
    date_to?: string;
    type?: string;
  }>;
}) {
  const { farm_id, growing_area_id, date_from, date_to, type } =
    await searchParams;
  const supabase = await createClient();

  const [{ data: farms }, { data: growingAreas }] = await Promise.all([
    supabase.from("farms").select("id, name").order("name"),
    supabase
      .from("growing_areas")
      .select("id, code, farm_id")
      .is("deleted_at", null)
      .order("code"),
  ]);

  let query = supabase
    .from("farm_activities")
    .select("*, farm:farms(name), growing_area:growing_areas(code)")
    .is("deleted_at", null)
    .order("activity_date", { ascending: false });

  if (farm_id) query = query.eq("farm_id", farm_id);
  if (growing_area_id) query = query.eq("growing_area_id", growing_area_id);
  if (date_from) query = query.gte("activity_date", date_from);
  if (date_to) query = query.lte("activity_date", date_to);
  if (type) {
    query = query.eq(
      "activity_type",
      type as (typeof ACTIVITY_TYPES)[number]["value"]
    );
  }

  const { data: entries, error } = await query;

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-lg font-semibold text-neutral-900">
          Báo cáo nhật ký chăm sóc
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Lọc theo nông trại, vùng trồng, khoảng ngày và loại hoạt động, sau đó
          xuất CSV. Chỉ chứa dữ liệu bạn có quyền xem (theo RLS).
        </p>
      </div>

      <ReportFilters farms={farms ?? []} growingAreas={growingAreas ?? []} />

      {error && (
        <p className="text-sm text-destructive">
          Không tải được báo cáo: {error.message}
        </p>
      )}

      <p className="text-sm text-neutral-500">
        {entries?.length ?? 0} dòng khớp bộ lọc.
      </p>

      {(entries?.length ?? 0) === 0 ? (
        <div className="rounded-lg border border-dashed border-neutral-300 p-8 text-center text-sm text-neutral-500">
          Không có dữ liệu khớp bộ lọc.
        </div>
      ) : (
        <div className="rounded-lg border border-neutral-200">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ngày</TableHead>
                <TableHead>Nông trại</TableHead>
                <TableHead>Vùng trồng</TableHead>
                <TableHead>Loại hoạt động</TableHead>
                <TableHead>Chi phí</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries!.map((e) => (
                <TableRow key={e.id}>
                  <TableCell>{e.activity_date}</TableCell>
                  <TableCell>{e.farm?.name ?? "—"}</TableCell>
                  <TableCell>{e.growing_area?.code ?? "—"}</TableCell>
                  <TableCell>
                    {ACTIVITY_LABEL[e.activity_type] ?? e.activity_type}
                  </TableCell>
                  <TableCell>
                    {e.cost != null ? e.cost.toLocaleString("vi-VN") + " đ" : "—"}
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
