import { type Metadata } from "next";

import { Container } from "@radix-ui/themes";

export const metadata: Metadata = {
  title: "Admin - Projects",
  description: "Admin - Projects",
};

export default function Projects() {
  return <Container size="4" px="4"></Container>;
}
