import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { canManageFarms } from "@/lib/permissions";
import { FarmFormDialog } from "@/components/forms/FarmFormDialog";
import { GrowingAreaFormDialog } from "@/components/forms/GrowingAreaFormDialog";
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

export default async function FarmDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = user
    ? await supabase.from("profiles").select("role").eq("id", user.id).single()
    : { data: null };
  const canManage = canManageFarms(profile?.role);

  const { data: farm } = await supabase
    .from("farms")
    .select("*, manager:profiles!farms_manager_id_fkey(full_name)")
    .eq("id", id)
    .single();

  if (!farm) notFound();

  const { data: growingAreas } = await supabase
    .from("growing_areas")
    .select("*, crop:crops(name)")
    .eq("farm_id", id)
    .is("deleted_at", null)
    .order("code");

  const { data: crops } = await supabase.from("crops").select("id, name").order("name");

  const points: MapPoint[] = [];
  if (farm.gps_lat != null && farm.gps_lng != null) {
    points.push({
      id: farm.id,
      label: farm.name,
      sublabel: "Nông trại",
      lat: Number(farm.gps_lat),
      lng: Number(farm.gps_lng),
    });
  }
  for (const ga of growingAreas ?? []) {
    if (ga.gps_lat != null && ga.gps_lng != null) {
      points.push({
        id: ga.id,
        label: ga.code,
        sublabel: farm.name,
        lat: Number(ga.gps_lat),
        lng: Number(ga.gps_lng),
        href: `/growing-areas/${ga.id}`,
      });
    }
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <Link href="/farms" className="text-sm text-neutral-500 hover:underline">
          ← Nông trại
        </Link>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-lg font-semibold text-neutral-900">{farm.name}</h1>
          <p className="mt-1 text-sm text-neutral-500">
            {farm.code ? `Mã: ${farm.code} · ` : ""}
            {farm.address ?? "Chưa có địa chỉ"}
          </p>
          <p className="mt-1 text-sm text-neutral-500">
            Diện tích: {farm.total_area_ha ?? "—"} ha · Quản lý:{" "}
            {farm.manager?.full_name ?? "—"}
          </p>
        </div>
        {canManage && <FarmFormDialog farm={farm} trigger="Sửa nông trại" />}
      </div>

      <FarmMapPointsClient points={points} />

      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-neutral-900">
          Vùng trồng ({growingAreas?.length ?? 0})
        </h2>
        <GrowingAreaFormDialog
          farms={[{ id: farm.id, name: farm.name }]}
          crops={crops ?? []}
          defaultFarmId={farm.id}
          trigger="+ Thêm vùng trồng"
        />
      </div>

      {(growingAreas?.length ?? 0) === 0 ? (
        <div className="rounded-lg border border-dashed border-neutral-300 p-8 text-center text-sm text-neutral-500">
          Chưa có vùng trồng nào trong nông trại này.
        </div>
      ) : (
        <div className="rounded-lg border border-neutral-200">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã / tên</TableHead>
                <TableHead>Cây trồng</TableHead>
                <TableHead>Diện tích (ha)</TableHead>
                <TableHead>Năm trồng</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {growingAreas!.map((ga) => (
                <TableRow key={ga.id}>
                  <TableCell className="font-medium">
                    <Link href={`/growing-areas/${ga.id}`} className="hover:underline">
                      {ga.code}
                    </Link>
                  </TableCell>
                  <TableCell>{ga.crop?.name ?? "—"}</TableCell>
                  <TableCell>{ga.area_ha ?? "—"}</TableCell>
                  <TableCell>{ga.planting_year ?? "—"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
