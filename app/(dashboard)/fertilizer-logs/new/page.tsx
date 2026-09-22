import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { NewFertilizerLogClient } from "@/components/forms/NewFertilizerLogClient";

export default async function NewFertilizerLogPage() {
  const supabase = await createClient();

  const [{ data: farms }, { data: growingAreas }, { data: fertilizerProducts }] =
    await Promise.all([
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
      <div>
        <Link href="/fertilizer-logs" className="text-sm text-neutral-500 hover:underline">
          ← Nhật ký bón phân
        </Link>
      </div>
      <h1 className="text-lg font-semibold text-neutral-900">
        Thêm nhật ký bón phân
      </h1>

      {(farms?.length ?? 0) === 0 ? (
        <p className="text-sm text-neutral-500">
          Bạn chưa được gán quyền trên nông trại nào.
        </p>
      ) : (
        <div className="max-w-md">
          <NewFertilizerLogClient
            farms={farms ?? []}
            growingAreas={growingAreas ?? []}
            fertilizerProducts={fertilizerProducts ?? []}
          />
        </div>
      )}
    </div>
  );
}
