import { type Metadata } from "next";
import Link from "next/link";

import { Button, Container, Flex, Heading } from "@radix-ui/themes";

import ProjectsTable from "@/app/admin/_components/projects/table";
import { ProjectTagsDialog } from "@/app/admin/(home)/projects/_dialogs/project-tags";
import { getRouteByKey } from "@/app/admin/constants/routes";
import { getProjects } from "@/lib/queries/projects";
import { getTags } from "@/lib/queries/tag";
import { parseProjectFilters } from "@/lib/validations/admin/project/filters";

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
  const tags = await getTags();

  return (
    <Container size="4" px="4">
      <Flex align="center" gap="3" mb="3">
        <Heading size="5">Projects</Heading>
        <Button asChild>
          <Link href={getRouteByKey("projects.create")!.href}>Create</Link>
        </Button>
        <ProjectTagsDialog initialTags={tags} />
      </Flex>

      <ProjectsTable items={result.items} />
    </Container>
  );
}
