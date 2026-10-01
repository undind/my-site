import { SidebarTrigger } from "@/app/admin/_components/ui/sidebar";

export function AppHeader() {
  return (
    <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b border-(--gray-6) transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
      </div>
    </header>
  );
}
