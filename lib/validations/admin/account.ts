import { z } from "zod";

export const accountSchema = z
  .object({
    name: z.string().trim().min(2, "Min 2 symbols").max(100),
    email: z.string().trim().email("Enter valid email"),
    currentPassword: z.string(),
    newPassword: z.string(),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    const wantsPasswordChange = data.currentPassword.length > 0 || data.newPassword.length > 0 || data.confirmPassword.length > 0;

    if (!wantsPasswordChange) return;

    if (!data.currentPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["currentPassword"],
        message: "Enter current password",
      });
    }

    if (data.newPassword.length < 8) {
      ctx.addIssue({
        code: "custom",
        path: ["newPassword"],
        message: "Min 8 symbols",
      });
    }

    if (data.newPassword.length > 128) {
      ctx.addIssue({
        code: "custom",
        path: ["newPassword"],
        message: "Max 128 symbols",
      });
    }

    if (data.newPassword !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords not equal",
      });
    }

    if (data.currentPassword && data.newPassword && data.currentPassword === data.newPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["newPassword"],
        message: "New password must be different from the old one",
      });
    }
  });

export type AccountFormValues = z.infer<typeof accountSchema>;
