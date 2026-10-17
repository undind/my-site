import { type Metadata } from "next";

import { Container, Heading } from "@radix-ui/themes";

import Form from "@/app/admin/_components/projects/form";

export const metadata: Metadata = {
  title: "Admin - Projects create",
  description: "Admin - Projects create",
};

export default function Projects() {
  return (
    <Container size="4" px="4">
      <Heading size="5" mb="3">Create project</Heading>

      <Form />
    </Container>
  );
}
