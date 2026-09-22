import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { softDeleteFertilizerApplication } from "@/lib/actions/fertilizer-applications";
import { FertilizerApplicationFormDialog } from "@/components/forms/FertilizerApplicationFormDialog";
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

export default async function FertilizerLogsPage() {
  const supabase = await createClient();

  const [
    { data: entries, error },
    { data: farms },
    { data: growingAreas },
    { data: fertilizerProducts },
  ] = await Promise.all([
    supabase
      .from("fertilizer_applications")
      .select(
        "*, farm:farms(name), growing_area:growing_areas(code), fertilizer_product:fertilizer_products(name, unit)"
      )
      .is("deleted_at", null)
      .order("application_date", { ascending: false }),
    supabase.from("farms").select("id, name").order("name"),
    supabase
      .from("growing_areas")
      .select("id, code, farm_id")
      .is("deleted_at", null)
      .order("code"),
    supabase
      .from("fertilizer_products")
      .select("id, name, unit")
      .eq("is_active", true)
      .order("name"),
  ]);

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-neutral-900">
            Nhật ký bón phân
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            {entries?.length ?? 0} nhật ký bạn có quyền xem.
          </p>
        </div>
        {(farms?.length ?? 0) > 0 && (
          <Button render={<Link href="/fertilizer-logs/new" />}>
            + Thêm nhật ký
          </Button>
        )}
      </div>

      {error && (
        <p className="text-sm text-destructive">
          Không tải được danh sách: {error.message}
        </p>
      )}

      {!error && (entries?.length ?? 0) === 0 && (
        <div className="rounded-lg border border-dashed border-neutral-300 p-8 text-center text-sm text-neutral-500">
          Chưa có nhật ký bón phân nào.
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
                <TableHead>Sản phẩm</TableHead>
                <TableHead>Liều lượng</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries!.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{entry.application_date}</TableCell>
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
                  <TableCell>{entry.fertilizer_product?.name ?? "—"}</TableCell>
                  <TableCell>
                    {entry.dosage ?? "—"} {entry.dosage_unit ?? ""}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <FertilizerApplicationFormDialog
                        entry={entry}
                        farms={farms ?? []}
                        growingAreas={growingAreas ?? []}
                        fertilizerProducts={fertilizerProducts ?? []}
                        trigger="Sửa"
                      />
                      <DeleteLogButton
                        onDelete={softDeleteFertilizerApplication.bind(
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
