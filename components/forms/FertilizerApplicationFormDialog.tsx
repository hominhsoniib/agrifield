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
import { FertilizerApplicationForm } from "@/components/forms/FertilizerApplicationForm";
import type { Tables } from "@/types/database.types";

type FertilizerApplication = Tables<"fertilizer_applications">;
type Farm = Pick<Tables<"farms">, "id" | "name">;
type GrowingArea = Pick<Tables<"growing_areas">, "id" | "code" | "farm_id">;
type FertilizerProduct = Pick<Tables<"fertilizer_products">, "id" | "name" | "unit">;

export function FertilizerApplicationFormDialog({
  entry,
  farms,
  growingAreas,
  fertilizerProducts,
  trigger,
}: {
  entry?: FertilizerApplication;
  farms: Farm[];
  growingAreas: GrowingArea[];
  fertilizerProducts: FertilizerProduct[];
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
            {entry ? "Sửa nhật ký bón phân" : "Thêm nhật ký bón phân"}
          </DialogTitle>
        </DialogHeader>
        <FertilizerApplicationForm
          entry={entry}
          farms={farms}
          growingAreas={growingAreas}
          fertilizerProducts={fertilizerProducts}
          onSuccess={() => {
            setOpen(false);
            router.refresh();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
