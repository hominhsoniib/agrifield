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
import { ExpenseForm } from "@/components/forms/ExpenseForm";
import type { Tables } from "@/types/database.types";

type Expense = Tables<"expenses">;
type Farm = Pick<Tables<"farms">, "id" | "name">;
type GrowingArea = Pick<Tables<"growing_areas">, "id" | "code" | "farm_id">;

export function ExpenseFormDialog({
  expense,
  farms,
  growingAreas,
  trigger,
}: {
  expense?: Expense;
  farms: Farm[];
  growingAreas: GrowingArea[];
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant={expense ? "ghost" : "default"} size={expense ? "sm" : "default"} />}>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{expense ? "Sửa chi phí" : "Thêm chi phí"}</DialogTitle>
        </DialogHeader>
        <ExpenseForm
          expense={expense}
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
