import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { NewFarmActivityClient } from "@/components/forms/NewFarmActivityClient";

export default async function NewCareLogPage() {
  const supabase = await createClient();

  const [{ data: farms }, { data: growingAreas }] = await Promise.all([
    supabase.from("farms").select("id, name").order("name"),
    supabase
      .from("growing_areas")
      .select("id, code, farm_id")
      .is("deleted_at", null)
      .order("code"),
  ]);

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <Link href="/care-logs" className="text-sm text-neutral-500 hover:underline">
          ← Nhật ký chăm sóc
        </Link>
      </div>
      <h1 className="text-lg font-semibold text-neutral-900">
        Thêm nhật ký chăm sóc
      </h1>

      {(farms?.length ?? 0) === 0 ? (
        <p className="text-sm text-neutral-500">
          Bạn chưa được gán quyền trên nông trại nào.
        </p>
      ) : (
        <div className="max-w-md">
          <NewFarmActivityClient farms={farms ?? []} growingAreas={growingAreas ?? []} />
        </div>
      )}
    </div>
  );
}
