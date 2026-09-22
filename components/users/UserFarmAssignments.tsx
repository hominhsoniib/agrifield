"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { assignUserFarm, removeUserFarm } from "@/lib/actions/user-farms";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type UserRow = {
  id: string;
  email: string;
  full_name: string;
  role: string;
  farmIds: string[];
};

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
  const [selecting, setSelecting] = useState<Record<string, string>>({});

  function handleAssign(userId: string) {
    const farmId = selecting[userId];
    if (!farmId) return;
    setError(null);
    startTransition(async () => {
      const result = await assignUserFarm(userId, farmId);
      if ("error" in result) {
        setError(result.error);
        return;
      }
      setSelecting((s) => ({ ...s, [userId]: "" }));
      router.refresh();
    });
  }

  function handleRemove(userId: string, farmId: string) {
    setError(null);
    startTransition(async () => {
      const result = await removeUserFarm(userId, farmId);
      if ("error" in result) {
        setError(result.error);
      }
      router.refresh();
    });
  }

  const farmName = (id: string) => farms.find((f) => f.id === id)?.name ?? id;

  return (
    <div className="space-y-4">
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
      <div className="space-y-3">
        {users.map((u) => {
          const availableFarms = farms.filter((f) => !u.farmIds.includes(f.id));
          const isFullAccess = u.role === "admin" || u.role === "org_admin";
          return (
            <div
              key={u.id}
              className="rounded-lg border border-neutral-200 p-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-medium text-neutral-900">
                    {u.full_name}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {u.email} · {u.role}
                  </p>
                </div>
              </div>

              {isFullAccess ? (
                <p className="mt-2 text-xs text-neutral-500">
                  Role này thấy tất cả nông trại, không cần gán riêng.
                </p>
              ) : (
                <>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {u.farmIds.length === 0 && (
                      <span className="text-xs text-neutral-400">
                        Chưa gán farm nào.
                      </span>
                    )}
                    {u.farmIds.map((farmId) => (
                      <Badge key={farmId} variant="secondary" className="gap-1">
                        {farmName(farmId)}
                        <button
                          type="button"
                          disabled={isPending}
                          onClick={() => handleRemove(u.id, farmId)}
                          className="ml-0.5 text-neutral-500 hover:text-destructive"
                          aria-label={`Bỏ gán ${farmName(farmId)}`}
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>

                  {availableFarms.length > 0 && (
                    <div className="mt-2 flex items-center gap-2">
                      <Select
                        value={selecting[u.id] ?? ""}
                        onValueChange={(v) =>
                          setSelecting((s) => ({ ...s, [u.id]: v ?? "" }))
                        }
                      >
                        <SelectTrigger className="h-7 w-48">
                          <SelectValue placeholder="Chọn farm để gán" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableFarms.map((f) => (
                            <SelectItem key={f.id} value={f.id}>
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
                      >
                        Gán
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
