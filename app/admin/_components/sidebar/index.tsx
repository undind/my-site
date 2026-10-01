import { NavMain } from "@/app/admin/_components/sidebar/nav-main";
import { NavUser } from "@/app/admin/_components/sidebar/nav-user";
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from "@/app/admin/_components/ui/sidebar";
import { getCurrentUser } from "@/lib/queries/user";

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = await getCurrentUser("cmuh2dui70000r5g3bm0b2jav");

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>{user && <NavUser user={{ ...user, name: user.name ?? user.email }} />}</SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
