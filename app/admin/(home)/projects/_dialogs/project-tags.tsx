"use client";

import { useMemo, useState, useTransition } from "react";

import { Cross1Icon, LockClosedIcon, PlusCircledIcon, TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Box, Button, Dialog, Flex, IconButton, Text, TextField } from "@radix-ui/themes";
import { toast } from "sonner";

import { createTagAction, deleteTagAction } from "@/app/admin/(home)/projects/_actions/tags";

type Tag = {
  id: string;
  name: string;
  slug: string;
  projectCount: number;
};

type Props = {
  initialTags: Tag[];
};

export function ProjectTagsDialog({ initialTags }: Props) {
  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState(initialTags);
  const [search, setSearch] = useState("");
  const [newName, setNewName] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Tag | null>(null);
  const [isPending, startTransition] = useTransition();

  const filteredTags = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();

    return tags.filter((tag) => tag.name.toLocaleLowerCase().includes(query));
  }, [tags, search]);

  function createTag() {
    startTransition(async () => {
      try {
        const result = await createTagAction(newName);

        if (!result.success) {
          toast.error(result.message);
          return;
        }

        setTags((current) => {
          if (current.some((tag) => tag.id === result.tag.id)) {
            return current;
          }

          return [...current, { ...result.tag, projectCount: 0 }].sort((a, b) => a.name.localeCompare(b.name, "en"));
        });

        setNewName("");
        toast.success("Tag was created");
      } catch {
        toast.error("Failed to delete the tag.");
      }
    });
  }

  function removeTag() {
    if (!deleteTarget) return;

    const id = deleteTarget.id;

    startTransition(async () => {
      try {
        const result = await deleteTagAction(id);

        if (!result.success) {
          toast.error(result.message ?? "Failed to delete the tag.");
          setDeleteTarget(null);
          return;
        }

        setTags((current) => current.filter((tag) => tag.id !== id));
        setDeleteTarget(null);
        toast.success("Tag was deleted");
      } catch {
        toast.error("Failed to delete the tag.");
        setDeleteTarget(null);
      }
    });
  }

  return (
    <>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger>
          <Button>
            <PlusCircledIcon /> Tag management
          </Button>
        </Dialog.Trigger>

        <Dialog.Content>
          <Flex justify="between" align="center" gap="4">
            <Dialog.Title mb="0">Tag management</Dialog.Title>

            <Dialog.Close>
              <IconButton variant="outline">
                <Cross1Icon />
              </IconButton>
            </Dialog.Close>
          </Flex>

          <form
            className="mt-5 mb-5 flex gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              if (!isPending && newName.trim()) createTag();
            }}
          >
            <TextField.Root value={newName} onChange={(event) => setNewName(event.target.value)} className="flex-1" maxLength={50} placeholder="Name of the new tag" />

            <Button type="submit" disabled={isPending || !newName.trim()} loading={isPending}>
              Add
            </Button>
          </form>

          <TextField.Root value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search..." />

          <Box className="mt-3 p-2 rounded-md border border-gray-300 divide-y divide-gray-200">
            {filteredTags.map((tag) => (
              <Flex key={tag.id} align="center" justify="between" gap="3" py="2">
                <Box className="min-w-0">
                  <Text truncate weight="medium" as="div">
                    {tag.name}
                  </Text>
                  <Text as="div" size="1" color="gray">
                    {tag.projectCount === 0 ? "Not used" : `Projects: ${tag.projectCount}`}
                  </Text>
                </Box>

                {tag.projectCount > 0 ? (
                  <LockClosedIcon />
                ) : (
                  <IconButton type="button" color="red" size="1" disabled={isPending} onClick={() => setDeleteTarget(tag)}>
                    <TrashIcon />
                  </IconButton>
                )}
              </Flex>
            ))}

            {filteredTags.length === 0 && (
              <Text my="3" mx="2" color="gray" size="2" as="div">
                No tags found.
              </Text>
            )}
          </Box>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Close
              </Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>

      <AlertDialog.Root
        open={Boolean(deleteTarget)}
        onOpenChange={(nextOpen) => {
          if (!nextOpen && !isPending) setDeleteTarget(null);
        }}
      >
        <AlertDialog.Content>
          <AlertDialog.Title>Delete the tag “{deleteTarget?.name}”?</AlertDialog.Title>

          <AlertDialog.Description>This action cannot be undone.</AlertDialog.Description>

          <Flex mt="6" justify="end" gap="2">
            <AlertDialog.Cancel>
              <Button type="button" disabled={isPending}>
                Cancel
              </Button>
            </AlertDialog.Cancel>

            <Button color="red" disabled={isPending} loading={isPending} onClick={removeTag}>
              Удалить
            </Button>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
}
