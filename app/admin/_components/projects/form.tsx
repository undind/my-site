"use client";

import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Flex, Text, TextArea, TextField } from "@radix-ui/themes";
import { toast } from "sonner";

import { ProjectTagsSelect } from "@/app/admin/_components/projects/project-tags-select";
import { createProjectAction } from "@/app/admin/(home)/projects/create/action";
import { generateSlug } from "@/lib/utils/slug";
import { type CreateProjectInput, createProjectSchema } from "@/lib/validations/admin/project/create";

type Props = {
  tags: {
    id: string;
    name: string;
  }[];
};

function ProjectForm({ tags }: Props) {
  const [slugEdited, setSlugEdited] = useState(false);
  const [isPending, startTransition] = useTransition();

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
    defaultValues: {
      title: "",
      slug: "",
      shortDescription: "",
      description: "",
      coverImage: "",
      demoUrl: "",
      repositoryUrl: "",
      role: "",
      tags: [],
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
        const result = await createProjectAction({ success: false }, formData);

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
      <div>
        <label htmlFor="title">
          <Text size="2" weight="medium" as="div" mb="1">
            Titile
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
      </div>

      <div>
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
      </div>

      <div>
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
      </div>

      <div>
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
      </div>

      <div>
        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            <ProjectTagsSelect
              tags={tags}
              value={field.value}
              onChange={field.onChange}
              disabled={isPending}
            />
          )}
        />
        {errors?.tags?.message && (
          <Text size="2" color="red" mt="1">
            {errors?.tags?.message}
          </Text>
        )}
      </div>

      <div>
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
      </div>

      <div>
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
      </div>

      <Button type="submit" disabled={isPending} loading={isPending}>
        Create
      </Button>
    </form>
  );
}

export default ProjectForm;
