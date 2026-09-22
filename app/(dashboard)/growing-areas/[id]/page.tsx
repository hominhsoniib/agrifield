import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { GrowingAreaFormDialog } from "@/components/forms/GrowingAreaFormDialog";
import { FarmMapPointsClient } from "@/components/map/FarmMapPointsClient";
import type { MapPoint } from "@/components/map/FarmMapPoints";
import { getAttachmentsWithUrls } from "@/lib/data/attachments";
import { LogHistoryFilters } from "@/components/logs/LogHistoryFilters";
import { FertilizerApplicationFormDialog } from "@/components/forms/FertilizerApplicationFormDialog";
import { FarmActivityFormDialog } from "@/components/forms/FarmActivityFormDialog";
import { DeleteLogButton } from "@/components/logs/DeleteLogButton";
import { softDeleteFertilizerApplication } from "@/lib/actions/fertilizer-applications";
import { softDeleteFarmActivity } from "@/lib/actions/farm-activities";
import { ACTIVITY_TYPES } from "@/lib/validations/farm-activity.schema";
import { Button } from "@/components/ui/button";

const ACTIVITY_LABEL = Object.fromEntries(
  ACTIVITY_TYPES.map((t) => [t.value, t.label])
);

export default async function GrowingAreaDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ date_from?: string; date_to?: string; type?: string }>;
}) {
  const { id } = await params;
  const { date_from, date_to, type } = await searchParams;
  const supabase = await createClient();

  const { data: growingArea } = await supabase
    .from("growing_areas")
    .select("*, farm:farms(id, name), crop:crops(id, name)")
    .eq("id", id)
    .single();

  if (!growingArea) notFound();

  const { data: farms } = await supabase.from("farms").select("id, name").order("name");
  const { data: crops } = await supabase.from("crops").select("id, name").order("name");
  const { data: fertilizerProducts } = await supabase
    .from("fertilizer_products")
    .select("id, name, unit")
    .eq("is_active", true)
    .order("name");
  const { data: growingAreas } = await supabase
    .from("growing_areas")
    .select("id, code, farm_id")
    .is("deleted_at", null)
    .order("code");

  const showFertilizer = !type || type === "fertilizer";

  let fertilizerQuery = supabase
    .from("fertilizer_applications")
    .select("*, fertilizer_product:fertilizer_products(name, unit)")
    .eq("growing_area_id", id)
    .is("deleted_at", null);
  if (date_from) fertilizerQuery = fertilizerQuery.gte("application_date", date_from);
  if (date_to) fertilizerQuery = fertilizerQuery.lte("application_date", date_to);
  const { data: fertilizerEntries } = showFertilizer
    ? await fertilizerQuery
    : { data: [] };

  let activityQuery = supabase
    .from("farm_activities")
    .select("*")
    .eq("growing_area_id", id)
    .is("deleted_at", null);
  if (date_from) activityQuery = activityQuery.gte("activity_date", date_from);
  if (date_to) activityQuery = activityQuery.lte("activity_date", date_to);
  const activityTypeValues = ACTIVITY_TYPES.map((t) => t.value);
  const isActivityTypeFilter = (
    v: string | undefined
  ): v is (typeof activityTypeValues)[number] =>
    !!v && (activityTypeValues as string[]).includes(v);
  if (isActivityTypeFilter(type)) {
    activityQuery = activityQuery.eq("activity_type", type);
  }
  const { data: activityEntries } = type && type === "fertilizer"
    ? { data: [] }
    : await activityQuery;

  const timeline = [
    ...(fertilizerEntries ?? []).map((e) => ({
      kind: "fertilizer" as const,
      date: e.application_date,
      entry: e,
    })),
    ...(activityEntries ?? []).map((e) => ({
      kind: "activity" as const,
      date: e.activity_date,
      entry: e,
    })),
  ].sort((a, b) => (a.date < b.date ? 1 : -1));

  const timelineWithPhotos = await Promise.all(
    timeline.map(async (item) => ({
      ...item,
      photos: await getAttachmentsWithUrls(
        item.kind === "fertilizer" ? "fertilizer_application" : "farm_activity",
        item.entry.id
      ),
    }))
  );

  const points: MapPoint[] =
    growingArea.gps_lat != null && growingArea.gps_lng != null
      ? [
          {
            id: growingArea.id,
            label: growingArea.code,
            sublabel: growingArea.farm?.name,
            lat: Number(growingArea.gps_lat),
            lng: Number(growingArea.gps_lng),
          },
        ]
      : [];

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <Link href="/growing-areas" className="text-sm text-neutral-500 hover:underline">
          ← Vùng trồng
        </Link>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-lg font-semibold text-neutral-900">
            {growingArea.code}
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Nông trại:{" "}
            {growingArea.farm ? (
              <Link href={`/farms/${growingArea.farm.id}`} className="hover:underline">
                {growingArea.farm.name}
              </Link>
            ) : (
              "—"
            )}
            {" · "}Cây trồng: {growingArea.crop?.name ?? "—"}
          </p>
          <p className="mt-1 text-sm text-neutral-500">
            Diện tích: {growingArea.area_ha ?? "—"} ha · Giống:{" "}
            {growingArea.variety ?? "—"} · Năm trồng:{" "}
            {growingArea.planting_year ?? "—"} · Mật độ:{" "}
            {growingArea.planting_density ?? "—"}
          </p>
          {growingArea.notes && (
            <p className="mt-1 text-sm text-neutral-500">
              Ghi chú: {growingArea.notes}
            </p>
          )}
        </div>
        <GrowingAreaFormDialog
          growingArea={growingArea}
          farms={farms ?? []}
          crops={crops ?? []}
          trigger="Sửa"
        />
      </div>

      <FarmMapPointsClient points={points} />

      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-base font-semibold text-neutral-900">
            Lịch sử nhật ký ({timelineWithPhotos.length})
          </h2>
          <div className="flex gap-2">
            <Button
              render={
                <Link
                  href={`/fertilizer-logs/new?farm_id=${growingArea.farm_id}&growing_area_id=${growingArea.id}`}
                />
              }
              size="sm"
              variant="outline"
            >
              + Nhật ký bón phân
            </Button>
            <Button
              render={
                <Link
                  href={`/care-logs/new?farm_id=${growingArea.farm_id}&growing_area_id=${growingArea.id}`}
                />
              }
              size="sm"
              variant="outline"
            >
              + Nhật ký chăm sóc
            </Button>
          </div>
        </div>

        <LogHistoryFilters />

        {timelineWithPhotos.length === 0 ? (
          <div className="rounded-lg border border-dashed border-neutral-300 p-8 text-center text-sm text-neutral-500">
            Chưa có nhật ký nào khớp bộ lọc.
          </div>
        ) : (
          <div className="space-y-3">
            {timelineWithPhotos.map((item) => (
              <div
                key={`${item.kind}-${item.entry.id}`}
                className="rounded-lg border border-neutral-200 p-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium text-neutral-900">
                      {item.date}
                      {" · "}
                      {item.kind === "fertilizer"
                        ? "Bón phân"
                        : ACTIVITY_LABEL[item.entry.activity_type] ??
                          item.entry.activity_type}
                    </p>
                    {item.kind === "fertilizer" ? (
                      <p className="mt-1 text-sm text-neutral-600">
                        {item.entry.fertilizer_product?.name ?? "Chưa chọn sản phẩm"}
                        {item.entry.dosage != null &&
                          ` · ${item.entry.dosage} ${item.entry.dosage_unit ?? ""}`}
                        {item.entry.application_method &&
                          ` · ${item.entry.application_method}`}
                      </p>
                    ) : (
                      <p className="mt-1 text-sm text-neutral-600">
                        {item.entry.material_used ?? ""}
                        {item.entry.cost != null &&
                          ` · ${item.entry.cost.toLocaleString("vi-VN")} đ`}
                      </p>
                    )}
                    {item.entry.notes && (
                      <p className="mt-1 text-xs text-neutral-500">
                        {item.entry.notes}
                      </p>
                    )}
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    {item.kind === "fertilizer" ? (
                      <FertilizerApplicationFormDialog
                        entry={item.entry}
                        farms={farms ?? []}
                        growingAreas={growingAreas ?? []}
                        fertilizerProducts={fertilizerProducts ?? []}
                        trigger="Sửa"
                      />
                    ) : (
                      <FarmActivityFormDialog
                        entry={item.entry}
                        farms={farms ?? []}
                        growingAreas={growingAreas ?? []}
                        trigger="Sửa"
                      />
                    )}
                    <DeleteLogButton
                      onDelete={
                        item.kind === "fertilizer"
                          ? softDeleteFertilizerApplication.bind(
                              null,
                              item.entry.id,
                              item.entry.farm_id ?? "",
                              item.entry.growing_area_id ?? ""
                            )
                          : softDeleteFarmActivity.bind(
                              null,
                              item.entry.id,
                              item.entry.farm_id ?? "",
                              item.entry.growing_area_id ?? ""
                            )
                      }
                    />
                  </div>
                </div>

                {item.photos.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {item.photos.map((photo) =>
                      photo.url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          key={photo.id}
                          src={photo.url}
                          alt="Ảnh nhật ký"
                          className="h-16 w-16 rounded-md object-cover ring-1 ring-neutral-200"
                        />
                      ) : null
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
