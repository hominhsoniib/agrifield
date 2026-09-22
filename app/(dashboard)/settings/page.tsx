import { ChangePasswordForm } from "@/components/forms/ChangePasswordForm";

export default function SettingsPage() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-lg font-semibold text-neutral-900">Cài đặt tài khoản</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Quản lý thông tin tài khoản và mật khẩu bảo mật của bạn.
        </p>
      </div>

      <ChangePasswordForm />
    </div>
  );
}
