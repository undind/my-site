"use client";

import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Flex, Select, Text, TextArea, TextField } from "@radix-ui/themes";
import { toast } from "sonner";

import { type ProjectTagOption, ProjectTagsSelect } from "@/app/admin/_components/projects/project-tags-select";
import { createProjectAction, updateProjectAction } from "@/app/admin/(home)/projects/_actions/action";
import { ProjectStatus } from "@/generated/prisma/enums";
import { generateSlug } from "@/lib/utils/slug";
import { type CreateProjectInput, createProjectSchema } from "@/lib/validations/admin/project/create";

type Props = {
  mode: "create" | "edit";
  projectId?: string;
  initialValues?: CreateProjectInput;
  tags: ProjectTagOption[];
};

function ProjectForm({ mode, projectId, initialValues, tags }: Props) {
  const [slugEdited, setSlugEdited] = useState(false);
  const [isPending, startTransition] = useTransition();

  const isEdit = mode === "edit";
  const statuses = Object.values(ProjectStatus || {});

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    watch,
    control,
    formState: { errors },
  } = useForm<CreateProjectInput>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: initialValues ?? {
      title: "",
      slug: "",
      shortDescription: "",
      description: "",
      coverImage: "",
      demoUrl: "",
      repositoryUrl: "",
      tags: [],
      status: "DRAFT",
    },
  });

  const title = watch("title");

  function handleTitleChange(value: string) {
    if (!slugEdited) {
      setValue("slug", generateSlug(value), {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }

  function handleSlugChange() {
    setSlugEdited(true);
  }

  function regenerateSlug() {
    setSlugEdited(false);
    setValue("slug", generateSlug(title), {
      shouldValidate: true,
      shouldDirty: true,
    });
  }

  async function onSubmit(values: CreateProjectInput) {
    clearErrors();

    const formData = new FormData();

    for (const [key, value] of Object.entries(values)) {
      if (key === "tags" && Array.isArray(value)) {
        value.forEach((id) => formData.append("tags", id));
      } else if (typeof value === "string") {
        formData.set(key, value);
      }
    }

    startTransition(async () => {
      try {
        const result = isEdit && projectId ? await updateProjectAction(projectId, formData) : await createProjectAction({ success: false }, formData);

        if (result.success) return;

        if (result.errors) {
          for (const [field, messages] of Object.entries(result.errors)) {
            if (messages?.[0]) {
              setError(field as keyof CreateProjectInput, {
                type: "server",
                message: messages[0],
              });
            }
          }
        }

        toast.error(result.message ?? "");
      } catch (error) {
        throw error;
      }
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Box>
        <label htmlFor="status">
          <Text size="2" weight="medium" as="div" mb="1">
            Status
          </Text>
        </label>
        <Select.Root size="2" defaultValue="DRAFT" {...register("status")}>
          <Select.Trigger variant="surface" id="status" />
          <Select.Content>
            {statuses?.map((item) => (
              <Select.Item key={item} value={item}>
                {item}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
        {errors?.status?.message && (
          <Text size="2" color="red" mt="1">
            {errors?.status?.message}
          </Text>
        )}
      </Box>

      <Box>
        <label htmlFor="title">
          <Text size="2" weight="medium" as="div" mb="1">
            Title
          </Text>
        </label>
        <TextField.Root
          id="title"
          {...register("title", {
            onChange: (event) => handleTitleChange(event.target.value),
          })}
        />
        {errors?.title?.message && (
          <Text size="2" color="red" mt="1">
            {errors?.title?.message}
          </Text>
        )}
      </Box>

      <Box>
        <Flex align="end" gap="2">
          <Box className="flex-1">
            <label htmlFor="slug">
              <Text size="2" weight="medium" as="div" mb="1">
                Slug
              </Text>
            </label>
            <TextField.Root
              id="slug"
              {...register("slug", {
                onChange: handleSlugChange,
              })}
            />
          </Box>
          <Button type="button" mt="1" variant="surface" onClick={regenerateSlug}>
            Generate
          </Button>
        </Flex>
        {errors?.slug?.message && (
          <Text size="2" color="red" mt="1">
            {errors?.slug?.message}
          </Text>
        )}
      </Box>

      <Box>
        <label htmlFor="shortDescription">
          <Text size="2" weight="medium" as="div" mb="1">
            Short description
          </Text>
        </label>
        <TextArea id="shortDescription" rows={5} maxLength={300} {...register("shortDescription")} />
        {errors?.shortDescription?.message && (
          <Text size="2" color="red" mt="1">
            {errors?.shortDescription?.message}
          </Text>
        )}
      </Box>

      <Box>
        <label htmlFor="description">
          <Text size="2" weight="medium" as="div" mb="1">
            Full description
          </Text>
        </label>
        <TextArea id="description" {...register("description")} rows={8} />
        {errors?.description?.message && (
          <Text size="2" color="red" mt="1">
            {errors?.description?.message}
          </Text>
        )}
      </Box>

      <Box>
        <Controller name="tags" control={control} render={({ field }) => <ProjectTagsSelect tags={tags} value={field.value} onChange={field.onChange} disabled={isPending} />} />
        {errors?.tags?.message && (
          <Text size="2" color="red" mt="1">
            {errors?.tags?.message}
          </Text>
        )}
      </Box>

      <Box>
        <label htmlFor="demoUrl">
          <Text size="2" weight="medium" as="div" mb="1">
            Demo
          </Text>
        </label>
        <TextField.Root id="demoUrl" {...register("demoUrl")} type="url" />
        {errors?.demoUrl?.message && (
          <Text size="2" color="red" mt="1">
            {errors?.demoUrl?.message}
          </Text>
        )}
      </Box>

      <Box>
        <label htmlFor="repositoryUrl">
          <Text size="2" weight="medium" as="div" mb="1">
            Repository
          </Text>
        </label>
        <TextField.Root id="repositoryUrl" {...register("repositoryUrl")} type="url" />
        {errors?.repositoryUrl?.message && (
          <Text size="2" color="red" mt="1">
            {errors?.repositoryUrl?.message}
          </Text>
        )}
      </Box>

      <Button type="submit" disabled={isPending} loading={isPending}>
        {isEdit ? "Save" : "Create"}
      </Button>
    </form>
  );
}

export default ProjectForm;
