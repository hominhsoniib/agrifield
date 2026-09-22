import { z } from "zod";

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Vui lòng nhập mật khẩu hiện tại"),
    password: z.string().min(6, "Mật khẩu mới phải có ít nhất 6 ký tự"),
    confirmPassword: z.string().min(6, "Vui lòng xác nhận mật khẩu mới"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp với mật khẩu mới",
    path: ["confirmPassword"],
  })
  .refine((data) => data.currentPassword !== data.password, {
    message: "Mật khẩu mới không được trùng với mật khẩu hiện tại",
    path: ["password"],
  });

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
