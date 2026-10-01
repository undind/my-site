export const routes = [
  {
    href: "/about",
    key: "about",
  },
  {
    href: "/projects",
    key: "projects",
  },
  {
    href: "/blog",
    key: "blog",
  },
] as const;

type RouteKey = (typeof routes)[number]["key"];

export function getRouteByKey(key: RouteKey) {
  return routes.find((route) => route.key === key);
}
