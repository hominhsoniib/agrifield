"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InventoryItemForm } from "@/components/forms/InventoryItemForm";
import type { Tables } from "@/types/database.types";

type InventoryItem = Tables<"inventory_items">;

export function InventoryItemFormDialog({
  item,
  trigger,
}: {
  item?: InventoryItem;
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant={item ? "ghost" : "default"} size={item ? "sm" : "default"} />}>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{item ? "Sửa vật tư" : "Thêm vật tư"}</DialogTitle>
        </DialogHeader>
        <InventoryItemForm
          item={item}
          onSuccess={() => {
            setOpen(false);
            router.refresh();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
