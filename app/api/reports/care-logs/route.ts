import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { ACTIVITY_TYPES } from "@/lib/validations/farm-activity.schema";

const ACTIVITY_LABEL = Object.fromEntries(
  ACTIVITY_TYPES.map((t) => [t.value, t.label])
);

function csvEscape(value: string): string {
  if (/[",\n]/.test(value)) return '"' + value.replace(/"/g, '""') + '"';
  return value;
}

// Route Handler chạy với session của chính người gọi (cookie thật) qua
// lib/supabase/server -> RLS áp dụng bình thường, không dùng service role.
// Nghĩa là CSV xuất ra chỉ chứa đúng những farm/vùng trồng user có quyền xem.
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const farmId = searchParams.get("farm_id") || undefined;
  const growingAreaId = searchParams.get("growing_area_id") || undefined;
  const dateFrom = searchParams.get("date_from") || undefined;
  const dateTo = searchParams.get("date_to") || undefined;
  const type = searchParams.get("type") || undefined;

  const supabase = await createClient();
  let query = supabase
    .from("farm_activities")
    .select("*, farm:farms(name), growing_area:growing_areas(code)")
    .is("deleted_at", null)
    .order("activity_date", { ascending: false });

  if (farmId) query = query.eq("farm_id", farmId);
  if (growingAreaId) query = query.eq("growing_area_id", growingAreaId);
  if (dateFrom) query = query.gte("activity_date", dateFrom);
  if (dateTo) query = query.lte("activity_date", dateTo);
  if (type) {
    query = query.eq(
      "activity_type",
      type as (typeof ACTIVITY_TYPES)[number]["value"]
    );
  }

  const { data, error } = await query;
  if (error) {
    return new Response("Lỗi: " + error.message, { status: 500 });
  }

  const header = [
    "Ngày",
    "Nông trại",
    "Vùng trồng",
    "Loại hoạt động",
    "Vật tư sử dụng",
    "Chi phí (VNĐ)",
    "Ghi chú",
  ];
  const rows = (data ?? []).map((e) => [
    e.activity_date,
    e.farm?.name ?? "",
    e.growing_area?.code ?? "",
    ACTIVITY_LABEL[e.activity_type] ?? e.activity_type,
    e.material_used ?? "",
    e.cost != null ? String(e.cost) : "",
    e.notes ?? "",
  ]);

  const csv = [header, ...rows]
    .map((r) => r.map(csvEscape).join(","))
    .join("\r\n");
  const bom = "﻿"; // Excel tiếng Việt cần BOM để hiển thị đúng UTF-8

  return new Response(bom + csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="bao-cao-nhat-ky-${new Date()
        .toISOString()
        .slice(0, 10)}.csv"`,
    },
  });
}
