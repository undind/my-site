"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Callout, Flex, Text, TextField } from "@radix-ui/themes";

import { authClient } from "@/lib/auth-client";
import {
  type LoginFormValues,
  loginSchema,
} from "@/lib/validations/admin/auth";

export default function LoginForm() {
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormValues) {
    form.clearErrors("root");

    const { error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
      rememberMe: true,
    });

    if (error) {
      form.setError("root", {
        message: "Enter correct email or password",
      });

      return;
    }

    router.replace("/admin/dashboard");
    router.refresh();
  }

  return (
      <form
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Flex direction="column" gap="3" mb="3">
          {form.formState.errors.root && (
            <Callout.Root color="red">
              <Callout.Text>{form.formState.errors.root.message}</Callout.Text>
            </Callout.Root>
          )}

          <Box>
            <label>
              <Text size="1" weight="medium" mb="1" as="div">
                Login
              </Text>
              <TextField.Root
                placeholder="Enter your login"
                color={form.formState.errors.email ? "red" : undefined}
                variant={form.formState.errors.email ? "soft" : undefined}
                {...form.register("email")}
              />
            </label>
            {form.formState.errors.email && (
              <Text size="2" color="red" mt="1">
                {form.formState.errors.email.message}
              </Text>
            )}
          </Box>

          <Box>
            <label>
              <Text size="1" weight="medium" as="div" mb="1">
                Password
              </Text>
              <TextField.Root
                type="password"
                placeholder="Enter your password"
                color={form.formState.errors.password ? "red" : undefined}
                variant={form.formState.errors.password ? "soft" : undefined}
                {...form.register("password")}
              />
            </label>
            {form.formState.errors.password && (
              <Text size="2" color="red" mt="1">
                {form.formState.errors.password.message}
              </Text>
            )}
          </Box>
        </Flex>

        <Flex justify="end">
          <Button type="submit" size="2" variant="solid" disabled={form.formState.isSubmitting} loading={form.formState.isSubmitting}>
            Sign in
          </Button>
        </Flex>
      </form>
  );
};
