import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { Container, Heading } from "@radix-ui/themes";

import Form from "@/app/admin/_components/projects/form";
import { getProject } from "@/lib/queries/projects";
import { getTags } from "@/lib/queries/tag";

type Props = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "Admin - Projects edit",
  description: "Admin - Projects edit",
};

export default async function Projects({ params }: Props) {
  const { id } = await params;
  const [project, tags] = await Promise.all([getProject(id), getTags()]);

  if (!project || !id) {
    notFound();
  }

  const initialValues = {
    title: project.title,
    slug: project.slug,
    shortDescription: project.shortDescription,
    description: project.description,
    coverImage: project.coverImage ?? "",
    demoUrl: project.demoUrl ?? "",
    repositoryUrl: project.repositoryUrl ?? "",
    status: project.status ?? "DRAFT",
    tags: project.tags.map((tag) => tag.id),
  };

  return (
    <Container size="4" px="4">
      <Heading size="5" mb="3">
        Edit project «{project.title}»
      </Heading>

      <Form mode="edit" projectId={project.id} initialValues={initialValues} tags={tags} />
    </Container>
  );
}
