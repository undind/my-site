"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createProject } from "@/lib/queries/projects";
import { createProjectSchema } from "@/lib/validations/admin/project/create";

export type CreateProjectState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
};

export async function createProjectAction(_prevState: CreateProjectState, formData: FormData): Promise<CreateProjectState> {
  const raw = {
    title: formData.get("title"),
    slug: formData.get("slug"),
    shortDescription: formData.get("shortDescription"),
    description: formData.get("description"),
    coverImage: formData.get("coverImage") ?? "",
    demoUrl: formData.get("demoUrl") ?? "",
    repositoryUrl: formData.get("repositoryUrl") ?? "",
    role: formData.get("role") ?? "",
    tags: formData.getAll("tags"),
  };

  const parsed = createProjectSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      message: "Check that the form has been filled out.",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    await createProject(parsed.data);
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "P2002") {
      return {
        success: false,
        errors: {
          slug: ["A project with this slug already exists."],
        },
      };
    }

    if (error instanceof Error && "code" in error && error.code === "P2025") {
      return {
        success: false,
        message: "One of the selected tags was not found.",
      };
    }

    console.error("createProjectAction error:", error);

    return {
      success: false,
      message: "Failed to create project. Please try again later.",
    };
  }

  revalidatePath("/admin/projects");
  revalidatePath("/projects");

  redirect("/admin/projects");
}
