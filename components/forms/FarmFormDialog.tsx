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
import { FarmForm } from "@/components/forms/FarmForm";
import type { Tables } from "@/types/database.types";

type Farm = Tables<"farms">;

export function FarmFormDialog({
  farm,
  trigger,
}: {
  farm?: Farm;
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {farm ? "Sửa nông trại" : "Thêm nông trại"}
          </DialogTitle>
        </DialogHeader>
        <FarmForm
          farm={farm}
          onSuccess={() => {
            setOpen(false);
            router.refresh();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
