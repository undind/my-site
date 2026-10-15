import { Table } from "@radix-ui/themes";

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
          </Table.Row>
        ))}
        {!items?.length && (
          <Table.Row>
            <Table.Cell colSpan={6} align="center">
              Empty result
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table.Root>
  );
}
