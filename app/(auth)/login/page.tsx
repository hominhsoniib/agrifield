"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@/lib/supabase/client";
import { loginSchema, type LoginInput } from "@/lib/validations/auth.schema";

// useSearchParams() bắt buộc phải nằm trong <Suspense> khi build production
// (next build prerender), nếu không sẽ lỗi "should be wrapped in a suspense
// boundary" — next dev không báo lỗi này nên chỉ lộ ra khi build thật.
export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(values: LoginInput) {
    setServerError(null);
    setIsSubmitting(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    setIsSubmitting(false);

    if (error) {
      setServerError(
        error.message === "Invalid login credentials"
          ? "Email hoặc mật khẩu không đúng."
          : error.message
      );
      return;
    }

    const redirectTo = searchParams.get("redirectTo") || "/dashboard";
    router.push(redirectTo);
    router.refresh();
  }

  return (
    <div className="w-full max-w-sm">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-700 text-white">
          <span aria-hidden className="text-lg font-semibold">
            F
          </span>
        </div>
        <h1 className="text-xl font-semibold text-neutral-900">FarmTrack</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Đăng nhập để quản lý nông trại
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm"
        noValidate
      >
        <div className="mb-4">
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-medium text-neutral-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="password"
            className="mb-1.5 block text-sm font-medium text-neutral-700"
          >
            Mật khẩu
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
            {...register("password")}
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        {serverError && (
          <div
            role="alert"
            className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700"
          >
            {serverError}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md bg-emerald-700 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Đang đăng nhập…" : "Đăng nhập"}
        </button>
      </form>
    </div>
  );
}
