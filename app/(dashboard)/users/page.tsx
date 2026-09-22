import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { canManageUsers } from "@/lib/permissions";
import { UserFarmAssignments, type UserRow } from "@/components/users/UserFarmAssignments";

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
      <div className="p-4 md:p-6">
        <h1 className="text-lg font-semibold text-neutral-900">Người dùng</h1>
        <p className="mt-2 text-sm text-neutral-500">
          Chỉ quản trị viên (admin/org_admin) mới có quyền truy cập trang này.
        </p>
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
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-lg font-semibold text-neutral-900">Người dùng</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Gán/bỏ gán quyền truy cập nông trại cho từng user (role farm_manager,
          field_technician, farmer). Role admin/org_admin mặc định thấy tất cả.
        </p>
      </div>

      {(farms?.length ?? 0) === 0 ? (
        <p className="text-sm text-neutral-500">
          Chưa có nông trại nào — tạo nông trại trước khi gán quyền.
        </p>
      ) : (
        <UserFarmAssignments users={users} farms={farms ?? []} />
      )}
    </div>
  );
}
