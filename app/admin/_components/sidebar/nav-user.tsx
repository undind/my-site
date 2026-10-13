"use client";
import Link from "next/link";

import { DotsVerticalIcon, PersonIcon } from "@radix-ui/react-icons";
import { Avatar, DropdownMenu } from "@radix-ui/themes";

import { LogoutButton } from "@/app/admin/_components/sidebar/logout-btn";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/app/admin/_components/ui/sidebar";
import { getRouteByKey } from "@/app/admin/constants/routes";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
}) {
  const { isMobile, open } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <Avatar src={user.avatar} alt={user.name} size={open ? "3" : "2"} fallback={<div className="rounded-lg">CN</div>} className="rounded-lg grayscale" />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="text-muted-foreground truncate text-xs">{user.email}</span>
              </div>
              <DotsVerticalIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg" side={isMobile ? "bottom" : "right"} variant="soft" align="end" sideOffset={4}>
            <DropdownMenu.Group>
              <DropdownMenu.Item asChild>
                <Link href={getRouteByKey("account")!.href}>
                  <PersonIcon />
                  Account
                </Link>
              </DropdownMenu.Item>
            </DropdownMenu.Group>
            <DropdownMenu.Separator />
            <LogoutButton />
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
