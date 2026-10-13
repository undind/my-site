"use client";

import { useRouter } from "next/navigation";

import { ExitIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "@radix-ui/themes";

import { authClient } from "@/lib/auth-client";


export function LogoutButton() {
  const router = useRouter();

  async function logout() {
    await authClient.signOut();

    router.replace("/admin");
    router.refresh();
  }

  return (
    <DropdownMenu.Item onClick={logout}>
      <ExitIcon />
      Log out
    </DropdownMenu.Item>
  );
}
