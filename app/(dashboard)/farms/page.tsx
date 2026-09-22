import { createClient } from "@/lib/supabase/server";
import { canManageFarms } from "@/lib/permissions";
import { FarmFormDialog } from "@/components/forms/FarmFormDialog";
import { FarmMapPointsClient } from "@/components/map/FarmMapPointsClient";
import type { MapPoint } from "@/components/map/FarmMapPoints";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

export default async function FarmsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = user
    ? await supabase.from("profiles").select("role").eq("id", user.id).single()
    : { data: null };

  const canManage = canManageFarms(profile?.role);

  const { data: farms, error } = await supabase
    .from("farms")
    .select("*, manager:profiles!farms_manager_id_fkey(full_name)")
    .order("name");

  const points: MapPoint[] = (farms ?? [])
    .filter((f) => f.gps_lat != null && f.gps_lng != null)
    .map((f) => ({
      id: f.id,
      label: f.name,
      sublabel: f.address ?? undefined,
      lat: Number(f.gps_lat),
      lng: Number(f.gps_lng),
      href: `/farms/${f.id}`,
    }));

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-neutral-900">Nông trại</h1>
          <p className="mt-1 text-sm text-neutral-500">
            {farms?.length ?? 0} nông trại bạn có quyền xem.
          </p>
        </div>
        {canManage && <FarmFormDialog trigger="+ Thêm nông trại" />}
      </div>

      <FarmMapPointsClient points={points} />

      {error && (
        <p className="text-sm text-destructive">
          Không tải được danh sách nông trại: {error.message}
        </p>
      )}

      {!error && (farms?.length ?? 0) === 0 && (
        <div className="rounded-lg border border-dashed border-neutral-300 p-8 text-center text-sm text-neutral-500">
          Chưa có nông trại nào{canManage ? " — bấm \"Thêm nông trại\" để tạo mới." : "."}
        </div>
      )}

      {(farms?.length ?? 0) > 0 && (
        <div className="rounded-lg border border-neutral-200">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên</TableHead>
                <TableHead>Mã</TableHead>
                <TableHead>Địa chỉ</TableHead>
                <TableHead>Diện tích (ha)</TableHead>
                <TableHead>Quản lý</TableHead>
                {canManage && <TableHead />}
              </TableRow>
            </TableHeader>
            <TableBody>
              {farms!.map((farm) => (
                <TableRow key={farm.id}>
                  <TableCell className="font-medium">
                    <Link href={`/farms/${farm.id}`} className="hover:underline">
                      {farm.name}
                    </Link>
                  </TableCell>
                  <TableCell>{farm.code ?? "—"}</TableCell>
                  <TableCell>{farm.address ?? "—"}</TableCell>
                  <TableCell>{farm.total_area_ha ?? "—"}</TableCell>
                  <TableCell>{farm.manager?.full_name ?? "—"}</TableCell>
                  {canManage && (
                    <TableCell>
                      <FarmFormDialog farm={farm} trigger="Sửa" />
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
