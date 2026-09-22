import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { GrowingAreaFormDialog } from "@/components/forms/GrowingAreaFormDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function GrowingAreasPage() {
  const supabase = await createClient();

  const { data: growingAreas, error } = await supabase
    .from("growing_areas")
    .select("*, farm:farms(id, name), crop:crops(name)")
    .is("deleted_at", null)
    .order("code");

  const { data: farms } = await supabase
    .from("farms")
    .select("id, name")
    .order("name");
  const { data: crops } = await supabase.from("crops").select("id, name").order("name");

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-neutral-900">Vùng trồng</h1>
          <p className="mt-1 text-sm text-neutral-500">
            {growingAreas?.length ?? 0} vùng trồng bạn có quyền xem.
          </p>
        </div>
        {(farms?.length ?? 0) > 0 && (
          <GrowingAreaFormDialog
            farms={farms ?? []}
            crops={crops ?? []}
            trigger="+ Thêm vùng trồng"
          />
        )}
      </div>

      {error && (
        <p className="text-sm text-destructive">
          Không tải được danh sách vùng trồng: {error.message}
        </p>
      )}

      {!error && (growingAreas?.length ?? 0) === 0 && (
        <div className="rounded-lg border border-dashed border-neutral-300 p-8 text-center text-sm text-neutral-500">
          {(farms?.length ?? 0) === 0
            ? "Bạn chưa được gán quyền trên nông trại nào, nên chưa thể tạo vùng trồng."
            : "Chưa có vùng trồng nào."}
        </div>
      )}

      {(growingAreas?.length ?? 0) > 0 && (
        <div className="rounded-lg border border-neutral-200">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã / tên</TableHead>
                <TableHead>Nông trại</TableHead>
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
                  <TableCell>
                    {ga.farm ? (
                      <Link href={`/farms/${ga.farm.id}`} className="hover:underline">
                        {ga.farm.name}
                      </Link>
                    ) : (
                      "—"
                    )}
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
