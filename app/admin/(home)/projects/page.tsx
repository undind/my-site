import { type Metadata } from "next";

import { Container } from "@radix-ui/themes";

import ProjectsTable from "@/app/admin/_components/projects/table";
import { getProjects } from "@/lib/queries/projects";
import { parseProjectFilters } from "@/lib/validations/admin/project-filters";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export const metadata: Metadata = {
  title: "Admin - Projects",
  description: "Admin - Projects",
};

export default async function Projects({ searchParams }: Props) {
  const filters = parseProjectFilters(await searchParams);
  const result = await getProjects(filters);

  console.log(result);
  return (
    <Container size="4" px="4">
      <ProjectsTable items={result.items} />
    </Container>
  );
}
