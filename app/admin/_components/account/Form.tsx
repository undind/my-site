"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Callout, Flex, Text, TextField } from "@radix-ui/themes";

import { authClient } from "@/lib/auth-client";
import {
  type AccountFormValues,
  accountSchema,
} from "@/lib/validations/admin/account";

type Props = {
  initialName: string;
  initialEmail: string;
};

export default function LoginForm({ initialName, initialEmail }: Props) {
  const router = useRouter();

  const [successMessage, setSuccessMessage] = useState("");

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: initialName,
      email: initialEmail,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

const onSubmit = async (values: AccountFormValues) => {
    form.clearErrors("root");
    setSuccessMessage("");

    try {
      if (values.name.trim() !== initialName) {
        const { error } = await authClient.updateUser({
          name: values.name.trim(),
        });

        if (error) {
          form.setError("root", { message: error.message });
          return;
        }
      }

      // if (values.email.trim().toLowerCase() !== initialEmail.toLowerCase()) {
      //   const { error } = await authClient.changeEmail({
      //     newEmail: values.email.trim(),
      //     callbackURL: "/admin/settings",
      //   });

      //   if (error) {
      //     form.setError("root", { message: error.message });
      //     return;
      //   }
      // }

      const wantsPasswordChange =
        values.currentPassword.length > 0 ||
        values.newPassword.length > 0 ||
        values.confirmPassword.length > 0;

      if (wantsPasswordChange) {
        const { error } = await authClient.changePassword({
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
          revokeOtherSessions: true,
        });

        if (error) {
          form.setError("root", { message: error.message });
          return;
        }
      }

      form.setValue("currentPassword", "");
      form.setValue("newPassword", "");
      form.setValue("confirmPassword", "");

      setSuccessMessage("Настройки успешно сохранены");

      router.refresh();
    } catch {
      form.setError("root", {
        message: "Something went wrong",
      });
    }
  };

  const { register, handleSubmit, formState: { errors, isSubmitting } } = form;

  return (
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <Flex direction="column" gap="3" mb="3">
          {successMessage && (
            <Callout.Root color="green">
              <Callout.Text>
                {successMessage}
              </Callout.Text>
            </Callout.Root>
          )}
          {errors.root && (
            <Callout.Root color="red">
              <Callout.Text>{errors.root.message}</Callout.Text>
            </Callout.Root>
          )}

          <Box>
            <label>
              <Text size="1" weight="medium" mb="1" as="div">
                Name
              </Text>
              <TextField.Root
                placeholder="Enter your Name"
                color={errors.name ? "red" : undefined}
                variant={errors.name ? "soft" : undefined}
                {...register("name")}
              />
            </label>
            {errors.name && (
              <Text size="2" color="red" mt="1">
                {errors.name.message}
              </Text>
            )}
          </Box>

          <Box>
            <label>
              <Text size="1" weight="medium" as="div" mb="1">
                Current Password
              </Text>
              <TextField.Root
                type="password"
                placeholder="Enter current password"
                color={errors.currentPassword ? "red" : undefined}
                variant={errors.currentPassword ? "soft" : undefined}
                {...register("currentPassword")}
              />
            </label>
            {errors.currentPassword && (
              <Text size="2" color="red" mt="1">
                {errors.currentPassword.message}
              </Text>
            )}
          </Box>
          <Box>
            <label>
              <Text size="1" weight="medium" as="div" mb="1">
                New Password
              </Text>
              <TextField.Root
                type="password"
                placeholder="Enter new password"
                color={errors.newPassword ? "red" : undefined}
                variant={errors.newPassword ? "soft" : undefined}
                {...register("newPassword")}
              />
            </label>
            {errors.newPassword && (
              <Text size="2" color="red" mt="1">
                {errors.newPassword.message}
              </Text>
            )}
          </Box>
          <Box>
            <label>
              <Text size="1" weight="medium" as="div" mb="1">
                Confirm new Password
              </Text>
              <TextField.Root
                type="password"
                placeholder="Enter new password"
                color={errors.confirmPassword ? "red" : undefined}
                variant={errors.confirmPassword ? "soft" : undefined}
                {...register("confirmPassword")}
              />
            </label>
            {errors.confirmPassword && (
              <Text size="2" color="red" mt="1">
                {errors.confirmPassword.message}
              </Text>
            )}
          </Box>
        </Flex>

        <Flex>
          <Button type="submit" size="2" variant="solid" disabled={isSubmitting} loading={isSubmitting}>
            Save changes
          </Button>
        </Flex>
      </form>
  );
};
