"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type DeleteResult = { success: true; id: string } | { error: string };

export function DeleteLogButton({
  onDelete,
  confirmText = "Xoá nhật ký này? Dữ liệu vẫn được giữ lại (soft delete), có thể khôi phục trong DB nếu cần.",
}: {
  onDelete: () => Promise<DeleteResult>;
  confirmText?: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleClick() {
    if (typeof window !== "undefined" && !window.confirm(confirmText)) return;
    setError(null);
    startTransition(async () => {
      const result = await onDelete();
      if ("error" in result) {
        setError(result.error);
        return;
      }
      router.refresh();
    });
  }

  return (
    <span className="inline-flex items-center gap-2">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        disabled={isPending}
        onClick={handleClick}
      >
        Xoá
      </Button>
      {error && <span className="text-xs text-destructive">{error}</span>}
    </span>
  );
}
