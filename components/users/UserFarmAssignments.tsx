"use client";

import { useState, useTransition, useMemo } from "react";
import { useRouter } from "next/navigation";
import { assignUserFarm, removeUserFarm } from "@/lib/actions/user-farms";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  UserCheck,
  ShieldCheck,
  Building2,
  Search,
  Plus,
  X,
  Sprout,
  Wrench,
  Briefcase,
  ShieldAlert,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Mail,
  UserX,
  Filter,
} from "lucide-react";

export type UserRow = {
  id: string;
  email: string;
  full_name: string;
  role: string;
  farmIds: string[];
};

const ROLE_MAP: Record<
  string,
  { label: string; icon: React.ComponentType<{ className?: string }>; color: string }
> = {
  admin: {
    label: "Quản trị viên",
    icon: ShieldAlert,
    color:
      "bg-purple-100/80 text-purple-700 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800",
  },
  org_admin: {
    label: "Quản trị tổ chức",
    icon: ShieldCheck,
    color:
      "bg-indigo-100/80 text-indigo-700 border-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-800",
  },
  farm_manager: {
    label: "Quản lý nông trại",
    icon: Briefcase,
    color:
      "bg-blue-100/80 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800",
  },
  field_technician: {
    label: "Kỹ thuật viên",
    icon: Wrench,
    color:
      "bg-amber-100/80 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800",
  },
  farmer: {
    label: "Nông dân",
    icon: Sprout,
    color:
      "bg-emerald-100/80 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800",
  },
};

function getInitials(name: string, email: string): string {
  if (name && name.trim()) {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }
  return email.slice(0, 2).toUpperCase();
}

export function UserFarmAssignments({
  users,
  farms,
}: {
  users: UserRow[];
  farms: { id: string; name: string }[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [activeUserAction, setActiveUserAction] = useState<string | null>(null);
  const [selecting, setSelecting] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");

  const farmNameMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const f of farms) {
      map.set(f.id, f.name);
    }
    return map;
  }, [farms]);

  const stats = useMemo(() => {
    const totalUsers = users.length;
    const adminCount = users.filter(
      (u) => u.role === "admin" || u.role === "org_admin"
    ).length;
    const assignedCount = users.filter((u) => u.farmIds.length > 0).length;
    const totalFarms = farms.length;

    return { totalUsers, adminCount, assignedCount, totalFarms };
  }, [users, farms]);

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        u.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole =
        roleFilter === "all" ||
        (roleFilter === "admin_all"
          ? u.role === "admin" || u.role === "org_admin"
          : u.role === roleFilter);

      return matchesSearch && matchesRole;
    });
  }, [users, searchQuery, roleFilter]);

  function handleAssign(userId: string) {
    const farmId = selecting[userId];
    if (!farmId) return;
    setError(null);
    setActiveUserAction(userId);
    startTransition(async () => {
      const result = await assignUserFarm(userId, farmId);
      if ("error" in result) {
        setError(result.error);
        setActiveUserAction(null);
        return;
      }
      setSelecting((s) => ({ ...s, [userId]: "" }));
      setActiveUserAction(null);
      router.refresh();
    });
  }

  function handleRemove(userId: string, farmId: string) {
    setError(null);
    setActiveUserAction(`${userId}-${farmId}`);
    startTransition(async () => {
      const result = await removeUserFarm(userId, farmId);
      if ("error" in result) {
        setError(result.error);
      }
      setActiveUserAction(null);
      router.refresh();
    });
  }

  return (
    <div className="space-y-6">
      {/* Overview Stats Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        <div className="rounded-xl border border-neutral-200/80 bg-white p-4 shadow-xs transition-shadow hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-100/80 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
              <Users className="size-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                Tổng người dùng
              </p>
              <p className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                {stats.totalUsers}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-neutral-200/80 bg-white p-4 shadow-xs transition-shadow hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-indigo-100/80 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
              <ShieldCheck className="size-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                Quản trị viên
              </p>
              <p className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                {stats.adminCount}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-neutral-200/80 bg-white p-4 shadow-xs transition-shadow hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-blue-100/80 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
              <UserCheck className="size-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                Đã gán nông trại
              </p>
              <p className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                {stats.assignedCount}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-neutral-200/80 bg-white p-4 shadow-xs transition-shadow hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-amber-100/80 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
              <Building2 className="size-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                Tổng nông trại
              </p>
              <p className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                {stats.totalFarms}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
          <Input
            type="text"
            placeholder="Tìm theo tên hoặc email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-white dark:bg-neutral-900"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="size-4 text-neutral-400" />
          <Select value={roleFilter} onValueChange={(v) => setRoleFilter(v ?? "all")}>
            <SelectTrigger className="w-44 bg-white dark:bg-neutral-900" size="sm">
              <SelectValue placeholder="Lọc theo vai trò" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" label="Tất cả vai trò">Tất cả vai trò</SelectItem>
              <SelectItem value="admin_all" label="Quản trị (Admin)">Quản trị (Admin)</SelectItem>
              <SelectItem value="farm_manager" label="Quản lý nông trại">Quản lý nông trại</SelectItem>
              <SelectItem value="field_technician" label="Kỹ thuật viên">Kỹ thuật viên</SelectItem>
              <SelectItem value="farmer" label="Nông dân">Nông dân</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300"
        >
          <AlertCircle className="size-4 shrink-0 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Users Card List */}
      {filteredUsers.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-neutral-300 p-8 text-center dark:border-neutral-800">
          <UserX className="size-10 text-neutral-400 mb-2" />
          <p className="text-base font-medium text-neutral-700 dark:text-neutral-300">
            Không tìm thấy người dùng nào
          </p>
          <p className="text-xs text-neutral-500 mt-1">
            Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc vai trò.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredUsers.map((u) => {
            const availableFarms = farms.filter((f) => !u.farmIds.includes(f.id));
            const isFullAccess = u.role === "admin" || u.role === "org_admin";
            const roleInfo = ROLE_MAP[u.role] ?? {
              label: u.role,
              icon: Users,
              color: "bg-neutral-100 text-neutral-700 border-neutral-200",
            };
            const RoleIcon = roleInfo.icon;
            const initials = getInitials(u.full_name, u.email);

            return (
              <div
                key={u.id}
                className="group relative overflow-hidden rounded-xl border border-neutral-200/80 bg-white p-5 shadow-xs transition-all duration-200 hover:border-emerald-500/30 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  {/* User Profile Info */}
                  <div className="flex items-start gap-3.5">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-teal-700 text-sm font-semibold text-white shadow-sm ring-2 ring-emerald-500/20">
                      {initials}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                          {u.full_name || "—"}
                        </h3>

                        <Badge
                          variant="outline"
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium border ${roleInfo.color}`}
                        >
                          <RoleIcon className="size-3" />
                          <span>{roleInfo.label}</span>
                        </Badge>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                        <Mail className="size-3.5 text-neutral-400" />
                        <span>{u.email}</span>
                      </div>
                    </div>
                  </div>

                  {/* Access Status & Farm Badges */}
                  <div className="w-full md:w-auto md:max-w-md md:text-right">
                    {isFullAccess ? (
                      <div className="inline-flex items-center gap-2 rounded-lg border border-purple-200/80 bg-purple-50/60 px-3 py-2 text-xs font-medium text-purple-800 dark:border-purple-900/50 dark:bg-purple-950/30 dark:text-purple-300">
                        <CheckCircle2 className="size-4 text-purple-600 dark:text-purple-400 shrink-0" />
                        <span>Toàn quyền (Thấy tất cả nông trại hệ thống)</span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                          Nông trại được phân công ({u.farmIds.length}):
                        </p>

                        <div className="flex flex-wrap gap-1.5 md:justify-end">
                          {u.farmIds.length === 0 ? (
                            <span className="inline-block rounded-md bg-neutral-100 px-2.5 py-1 text-xs text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
                              Chưa gán nông trại nào
                            </span>
                          ) : (
                            u.farmIds.map((farmId) => {
                              const fName = farmNameMap.get(farmId) ?? farmId;
                              const isActionRunning =
                                isPending && activeUserAction === `${u.id}-${farmId}`;

                              return (
                                <Badge
                                  key={farmId}
                                  variant="secondary"
                                  className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200/80 hover:bg-emerald-100 py-1 px-2.5 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800"
                                >
                                  <Building2 className="size-3 text-emerald-600 dark:text-emerald-400" />
                                  <span className="font-medium">{fName}</span>
                                  <button
                                    type="button"
                                    disabled={isPending}
                                    onClick={() => handleRemove(u.id, farmId)}
                                    className="ml-0.5 flex size-4 items-center justify-center rounded-full text-emerald-700 hover:bg-emerald-200/80 hover:text-red-700 transition-colors disabled:opacity-50 dark:text-emerald-300 dark:hover:bg-emerald-900/80"
                                    title={`Bỏ gán ${fName}`}
                                    aria-label={`Bỏ gán ${fName}`}
                                  >
                                    {isActionRunning ? (
                                      <Loader2 className="size-3 animate-spin" />
                                    ) : (
                                      <X className="size-3" />
                                    )}
                                  </button>
                                </Badge>
                              );
                            })
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Assignment Controls for Non-Admins */}
                {!isFullAccess && (
                  <div className="mt-4 pt-3.5 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3 dark:border-neutral-800/80">
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                      Quản lý quyền nông trại
                    </span>

                    {availableFarms.length > 0 ? (
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Select
                          value={selecting[u.id] ?? ""}
                          onValueChange={(v) =>
                            setSelecting((s) => ({ ...s, [u.id]: v ?? "" }))
                          }
                        >
                          <SelectTrigger className="h-8 w-full sm:w-56 text-xs bg-neutral-50 dark:bg-neutral-800/50">
                            <SelectValue placeholder="Chọn nông trại..." />
                          </SelectTrigger>
                          <SelectContent>
                            {availableFarms.map((f) => (
                              <SelectItem key={f.id} value={f.id} label={f.name}>
                                {f.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <Button
                          type="button"
                          size="sm"
                          disabled={isPending || !selecting[u.id]}
                          onClick={() => handleAssign(u.id)}
                          className="h-8 px-3 text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs gap-1.5 transition-all"
                        >
                          {isPending && activeUserAction === u.id ? (
                            <Loader2 className="size-3 animate-spin" />
                          ) : (
                            <Plus className="size-3" />
                          )}
                          <span>Gán nông trại</span>
                        </Button>
                      </div>
                    ) : (
                      <p className="text-xs text-emerald-600 font-medium dark:text-emerald-400">
                        ✓ Đã gán tất cả nông trại có sẵn
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
