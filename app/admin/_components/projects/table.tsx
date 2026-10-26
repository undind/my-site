import Link from "next/link";

import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { Flex, IconButton, Table } from "@radix-ui/themes";

import { getRouteByKey } from "@/app/admin/constants/routes";
import { type Project } from "@/generated/prisma/client";

type Props = {
  items: Project[];
};

export default function ProjectsTable({ items }: Props) {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Id</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Published</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Updated</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell width="1%" />
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {items?.map((item) => (
          <Table.Row key={item.id}>
            <Table.RowHeaderCell>{item.id}</Table.RowHeaderCell>
            <Table.Cell>{item.title}</Table.Cell>
            <Table.Cell>{item.status}</Table.Cell>
            <Table.Cell>{item?.publishedAt?.toISOString()}</Table.Cell>
            <Table.Cell>{item?.updatedAt?.toISOString()}</Table.Cell>
            <Table.Cell>{item?.createdAt?.toISOString()}</Table.Cell>
            <Table.Cell width="1%">
              <Flex align="center" gap="2">
                <IconButton variant="soft" size="1">
                  <Link href={getRouteByKey("projects.edit")!.href?.replace(/\[.*?\]/g, item.id)}>
                    <Pencil1Icon />
                  </Link>
                </IconButton>
                <IconButton color="red" size="1">
                  <TrashIcon />
                </IconButton>
              </Flex>
            </Table.Cell>
          </Table.Row>
        ))}
        {!items?.length && (
          <Table.Row>
            <Table.Cell colSpan={7} align="center">
              Empty result
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table.Root>
  );
}
