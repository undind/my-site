import { Button } from "@radix-ui/themes";
import { cn } from "cn";

import { useSidebar } from "@/app/admin/_components/ui/sidebar/provider";
import PanelLeftIcon from "@/public/admin/panel-left.svg";

export function SidebarTrigger({ className, onClick, ...props }: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      color="gray"
      size="1"
      className={cn(className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeftIcon className="cn-rtl-flip" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}
