import { type Metadata } from "next";

import { Container } from "@radix-ui/themes";

export const metadata: Metadata = {
  title: "Admin - Blog",
  description: "Admin - Blog",
};

export default function Blog() {
  return <Container size="4" px="4"></Container>;
}
