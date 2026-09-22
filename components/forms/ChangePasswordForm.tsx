"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, KeyRound, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import {
  changePasswordSchema,
  type ChangePasswordInput,
} from "@/lib/validations/change-password.schema";

export function ChangePasswordForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
  });

  async function onSubmit(values: ChangePasswordInput) {
    setServerError(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({
      password: values.password,
    });

    setIsSubmitting(false);

    if (error) {
      setServerError(error.message || "Không thể đổi mật khẩu. Vui lòng thử lại.");
      return;
    }

    setSuccessMessage("Đổi mật khẩu thành công!");
    reset();
  }

  return (
    <div className="w-full max-w-md rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3 border-b border-neutral-100 pb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
          <KeyRound className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-neutral-900">Đổi mật khẩu</h2>
          <p className="text-xs text-neutral-500">Cập nhật mật khẩu tài khoản của bạn</p>
        </div>
      </div>

      {successMessage && (
        <div className="mb-4 flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-sm font-medium text-emerald-800 border border-emerald-200">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
          <span>{successMessage}</span>
        </div>
      )}

      {serverError && (
        <div role="alert" className="mb-4 rounded-lg bg-red-50 p-3 text-sm font-medium text-red-700 border border-red-200">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div>
          <label htmlFor="new-password" className="mb-1.5 block text-sm font-medium text-neutral-700">
            Mật khẩu mới
          </label>
          <div className="relative">
            <input
              id="new-password"
              type={showNewPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)"
              className="w-full rounded-md border border-neutral-300 px-3 py-2 pr-10 text-sm outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword((prev) => !prev)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 focus:outline-none"
              aria-label={showNewPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            >
              {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="confirm-password" className="mb-1.5 block text-sm font-medium text-neutral-700">
            Xác nhận mật khẩu mới
          </label>
          <div className="relative">
            <input
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Nhập lại mật khẩu mới"
              className="w-full rounded-md border border-neutral-300 px-3 py-2 pr-10 text-sm outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
              {...register("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 focus:outline-none"
              aria-label={showConfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-600">{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Đang cập nhật…" : "Lưu mật khẩu mới"}
          </button>
        </div>
      </form>
    </div>
  );
}
