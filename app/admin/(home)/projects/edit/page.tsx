import { type Metadata } from "next";

import { Container } from "@radix-ui/themes";

export const metadata: Metadata = {
  title: "Admin - Projects edit",
  description: "Admin - Projects edit",
};

export default function Projects() {
  return <Container size="4" px="4"></Container>;
}
