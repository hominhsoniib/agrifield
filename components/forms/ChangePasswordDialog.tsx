"use client";

import { useState } from "react";
import { KeyRound } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChangePasswordForm } from "./ChangePasswordForm";

export function ChangePasswordDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="mt-1 flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-left text-sm text-neutral-700 hover:bg-neutral-100 transition-colors">
        <KeyRound className="h-4 w-4 text-neutral-500" />
        <span>Đổi mật khẩu</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="sr-only">Form đổi mật khẩu</DialogTitle>
        </DialogHeader>
        <ChangePasswordForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
