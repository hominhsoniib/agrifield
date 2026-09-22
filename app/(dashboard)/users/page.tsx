import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { canManageUsers } from "@/lib/permissions";
import { UserFarmAssignments, type UserRow } from "@/components/users/UserFarmAssignments";
import { Users, ShieldAlert, Building2 } from "lucide-react";

export default async function UsersPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: myProfile } = user
    ? await supabase.from("profiles").select("role").eq("id", user.id).single()
    : { data: null };

  if (!canManageUsers(myProfile?.role)) {
    return (
      <div className="p-6 md:p-8">
        <div className="flex flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50/50 p-8 text-center dark:border-red-900/40 dark:bg-red-950/20">
          <ShieldAlert className="size-12 text-red-500 mb-3" />
          <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
            Truy cập bị từ chối
          </h1>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 max-w-md">
            Chỉ quản trị viên (admin/org_admin) mới có quyền quản lý và phân công quyền người dùng.
          </p>
        </div>
      </div>
    );
  }

  const admin = createAdminClient();
  const [{ data: profiles }, { data: farms }, { data: userFarms }, { data: authUsers }] =
    await Promise.all([
      admin.from("profiles").select("id, full_name, role").order("full_name"),
      admin.from("farms").select("id, name").order("name"),
      admin.from("user_farms").select("user_id, farm_id"),
      admin.auth.admin.listUsers({ page: 1, perPage: 200 }),
    ]);

  const emailById = new Map(
    (authUsers?.users ?? []).map((u) => [u.id, u.email ?? "—"])
  );
  const farmIdsByUser = new Map<string, string[]>();
  for (const uf of userFarms ?? []) {
    if (!uf.user_id || !uf.farm_id) continue;
    const list = farmIdsByUser.get(uf.user_id) ?? [];
    list.push(uf.farm_id);
    farmIdsByUser.set(uf.user_id, list);
  }

  const users: UserRow[] = (profiles ?? []).map((p) => ({
    id: p.id,
    email: emailById.get(p.id) ?? "—",
    full_name: p.full_name,
    role: p.role,
    farmIds: farmIdsByUser.get(p.id) ?? [],
  }));

  return (
    <div className="space-y-6 p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-emerald-900/90 via-teal-900 to-slate-900 p-6 text-white shadow-lg">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-300 backdrop-blur-md border border-emerald-400/30">
              <Users className="size-3.5" />
              <span>Phân quyền & Quản lý nhân sự</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Quản lý tài khoản & Quyền truy cập
            </h1>
            <p className="text-sm text-emerald-100/80 leading-relaxed">
              Phân công nông trại cho Quản lý, Kỹ thuật viên & Nông dân.
              Tài khoản Quản trị viên (Admin) mặc định truy cập toàn bộ hệ thống.
            </p>
          </div>
        </div>

        {/* Decorative background circle */}
        <div className="absolute -right-10 -bottom-10 size-48 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />
      </div>

      {(farms?.length ?? 0) === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-amber-200 bg-amber-50/60 p-8 text-center dark:border-amber-900/40 dark:bg-amber-950/20">
          <Building2 className="size-10 text-amber-500 mb-2" />
          <p className="text-base font-semibold text-amber-900 dark:text-amber-200">
            Chưa có nông trại nào trên hệ thống
          </p>
          <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">
            Vui lòng tạo nông trại trước khi tiến hành phân công quyền cho người dùng.
          </p>
        </div>
      ) : (
        <UserFarmAssignments users={users} farms={farms ?? []} />
      )}
    </div>
  );
}
