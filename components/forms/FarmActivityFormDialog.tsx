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
import { FarmActivityForm } from "@/components/forms/FarmActivityForm";
import type { Tables } from "@/types/database.types";

type FarmActivity = Tables<"farm_activities">;
type Farm = Pick<Tables<"farms">, "id" | "name">;
type GrowingArea = Pick<Tables<"growing_areas">, "id" | "code" | "farm_id">;

export function FarmActivityFormDialog({
  entry,
  farms,
  growingAreas,
  trigger,
}: {
  entry?: FarmActivity;
  farms: Farm[];
  growingAreas: GrowingArea[];
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="ghost" size="sm" />}>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {entry ? "Sửa nhật ký chăm sóc" : "Thêm nhật ký chăm sóc"}
          </DialogTitle>
        </DialogHeader>
        <FarmActivityForm
          entry={entry}
          farms={farms}
          growingAreas={growingAreas}
          onSuccess={() => {
            setOpen(false);
            router.refresh();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
