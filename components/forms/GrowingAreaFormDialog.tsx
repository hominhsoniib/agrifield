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
import { GrowingAreaForm } from "@/components/forms/GrowingAreaForm";
import type { Tables } from "@/types/database.types";

type GrowingArea = Tables<"growing_areas">;
type Farm = Pick<Tables<"farms">, "id" | "name">;
type Crop = Pick<Tables<"crops">, "id" | "name">;

export function GrowingAreaFormDialog({
  growingArea,
  farms,
  crops,
  defaultFarmId,
  trigger,
}: {
  growingArea?: GrowingArea;
  farms: Farm[];
  crops: Crop[];
  defaultFarmId?: string;
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {growingArea ? "Sửa vùng trồng" : "Thêm vùng trồng"}
          </DialogTitle>
        </DialogHeader>
        <GrowingAreaForm
          growingArea={growingArea}
          farms={farms}
          crops={crops}
          defaultFarmId={defaultFarmId}
          onSuccess={() => {
            setOpen(false);
            router.refresh();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
