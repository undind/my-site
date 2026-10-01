import { type Metadata } from "next";

import { Container } from "@radix-ui/themes";

export const metadata: Metadata = {
  title: "Admin - Dashboard",
  description: "Admin - Dashboard",
};

export default function Dashboard() {
  return <Container size="4" px="4"></Container>;
}
