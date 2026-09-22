"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function ToggleActiveButton({
  isActive,
  onToggle,
}: {
  isActive: boolean;
  onToggle: () => Promise<{ success: true } | { error: string }>;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await onToggle();
          router.refresh();
        })
      }
    >
      {isActive ? "Ngừng dùng" : "Kích hoạt lại"}
    </Button>
  );
}
