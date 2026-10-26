"use client";

import { useMemo, useState } from "react";

import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { Box, Button, Checkbox, Popover, Text,TextField } from "@radix-ui/themes";

export type ProjectTagOption = {
  id: string;
  name: string;
};

type Props = {
  tags: ProjectTagOption[];
  value: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
};

export function ProjectTagsSelect({ tags, value, onChange, disabled = false }: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredTags = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return tags.filter((tag) => tag.name.toLocaleLowerCase().includes(query));
  }, [tags, search]);

  function toggleTag(id: string) {
    console.log(id)
    onChange(value.includes(id) ? value.filter((selectedId) => selectedId !== id) : [...value, id]);
  }

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger>
        <Button type="button" variant="surface" disabled={disabled}>
          <span className="truncate">{value.length === 0 ? "Select tags" : `Selected: ${value.length}`}</span>
          <span aria-hidden="true">{open ? <ChevronUpIcon /> : <ChevronDownIcon />}</span>
        </Button>
      </Popover.Trigger>

      <Popover.Content size="1" sideOffset={4} align="start" width="280px">
        <TextField.Root type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search..." />

        <Box className="max-h-56 overflow-y-auto" mt="2">
          {filteredTags.map((tag) => (
            <label key={tag.id} className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-gray-100">
              <Checkbox checked={value.includes(tag.id)} onCheckedChange={() => toggleTag(tag.id)} />
              <span>{tag.name}</span>
            </label>
          ))}

          {filteredTags.length === 0 && <Text size="2" mt="3" color="gray" as="div">Not found</Text>}
        </Box>
      </Popover.Content>
    </Popover.Root>
  );
}
