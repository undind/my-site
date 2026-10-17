import { BackpackIcon, DashboardIcon, Pencil2Icon } from "@radix-ui/react-icons";

export const routes = [
  {
    href: "/admin/dashboard",
    key: "dashboard",
    icon: DashboardIcon,
    sidebar: true
  },
  {
    href: "/admin/projects",
    key: "projects",
    icon: BackpackIcon,
    sidebar: true
  },
  {
    href: "/admin/projects/create",
    key: "projects.create",
    sidebar: false
  },
  {
    href: "/admin/projects/edit/[slug]",
    key: "projects.edit",
    sidebar: false
  },
  {
    href: "/admin/blog",
    key: "blog",
    icon: Pencil2Icon,
    sidebar: true
  },
  {
    href: "/admin/account",
    key: "account",
    icon: null,
    sidebar: false
  },
] as const;

export type Routes = typeof routes;
type RouteKey = (typeof routes)[number]["key"];

export function getRouteByKey(key: RouteKey) {
  return routes.find((route) => route.key === key);
}
