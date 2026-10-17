"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/app/admin/_components/ui/sidebar";
import { routes } from "@/app/admin/constants/routes";

export function NavMain() {
  const currentPath = usePathname();

  const capitalize = ([firstLetter, ...restOfWord]: string) => firstLetter.toUpperCase() + restOfWord.join("");

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {routes
            ?.filter((item) => item.sidebar)
            .map((item) => (
              <SidebarMenuItem key={item.key}>
                <Link href={item.href}>
                  <SidebarMenuButton tooltip={capitalize(item.key)} isActive={currentPath.includes(item.href)}>
                    {item.icon && <item.icon />}
                    <span>{capitalize(item.key)}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
