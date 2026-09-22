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

interface ChangePasswordFormProps {
  onSuccess?: () => void;
}

export function ChangePasswordForm({ onSuccess }: ChangePasswordFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
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
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user?.email) {
      setServerError("Phiên làm việc hết hạn. Vui lòng đăng nhập lại.");
      setIsSubmitting(false);
      return;
    }

    // 1. Kiểm tra mật khẩu hiện tại
    const { error: verifyError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: values.currentPassword,
    });

    if (verifyError) {
      setServerError("Mật khẩu hiện tại không chính xác.");
      setIsSubmitting(false);
      return;
    }

    // 2. Cập nhật mật khẩu mới
    const { error: updateError } = await supabase.auth.updateUser({
      password: values.password,
    });

    setIsSubmitting(false);

    if (updateError) {
      setServerError(updateError.message || "Không thể đổi mật khẩu. Vui lòng thử lại.");
      return;
    }

    setSuccessMessage("Đổi mật khẩu thành công!");
    reset();

    if (onSuccess) {
      setTimeout(() => {
        onSuccess();
      }, 1500);
    }
  }

  return (
    <div className="w-full">
      <div className="mb-5 flex items-center gap-3 border-b border-neutral-100 pb-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
          <KeyRound className="h-4 w-4" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-neutral-900">Đổi mật khẩu</h2>
          <p className="text-xs text-neutral-500">Nhập mật khẩu hiện tại và mật khẩu mới của bạn</p>
        </div>
      </div>

      {successMessage && (
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm font-medium text-emerald-800">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
          <span>{successMessage}</span>
        </div>
      )}

      {serverError && (
        <div role="alert" className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* Mật khẩu hiện tại */}
        <div>
          <label htmlFor="current-password" className="mb-1 block text-xs font-medium text-neutral-700">
            Mật khẩu hiện tại <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              id="current-password"
              type={showCurrentPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Nhập mật khẩu hiện tại"
              className="w-full rounded-md border border-neutral-300 px-3 py-2 pr-10 text-sm outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
              {...register("currentPassword")}
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword((prev) => !prev)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 focus:outline-none"
              aria-label={showCurrentPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            >
              {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.currentPassword && (
            <p className="mt-1 text-xs text-red-600">{errors.currentPassword.message}</p>
          )}
        </div>

        {/* Mật khẩu mới */}
        <div>
          <label htmlFor="new-password" className="mb-1 block text-xs font-medium text-neutral-700">
            Mật khẩu mới <span className="text-red-500">*</span>
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

        {/* Xác nhận mật khẩu mới */}
        <div>
          <label htmlFor="confirm-password" className="mb-1 block text-xs font-medium text-neutral-700">
            Xác nhận mật khẩu mới <span className="text-red-500">*</span>
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
