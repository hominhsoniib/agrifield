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
import { HarvestLogForm } from "@/components/forms/HarvestLogForm";
import type { Tables } from "@/types/database.types";

type HarvestLog = Tables<"harvest_logs">;
type Farm = Pick<Tables<"farms">, "id" | "name">;
type GrowingArea = Pick<Tables<"growing_areas">, "id" | "code" | "farm_id">;

export function HarvestLogFormDialog({
  harvestLog,
  farms,
  growingAreas,
  trigger,
}: {
  harvestLog?: HarvestLog;
  farms: Farm[];
  growingAreas: GrowingArea[];
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant={harvestLog ? "ghost" : "default"} size={harvestLog ? "sm" : "default"} />}>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{harvestLog ? "Sửa nhật ký thu hoạch" : "Thêm nhật ký thu hoạch"}</DialogTitle>
        </DialogHeader>
        <HarvestLogForm
          harvestLog={harvestLog}
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
