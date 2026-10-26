"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { AppError } from "@/lib/db/errors";
import { prisma } from "@/lib/prisma";
import { createProject, updateProject } from "@/lib/queries/projects";
import { createProjectSchema } from "@/lib/validations/admin/project/create";

export type ProjectActionResult = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
};

export async function createProjectAction(_prevState: ProjectActionResult, formData: FormData): Promise<ProjectActionResult> {
  const raw = {
    title: formData.get("title"),
    slug: formData.get("slug"),
    shortDescription: formData.get("shortDescription"),
    description: formData.get("description"),
    coverImage: formData.get("coverImage") ?? "",
    demoUrl: formData.get("demoUrl") ?? "",
    repositoryUrl: formData.get("repositoryUrl") ?? "",
    tags: formData.getAll("tags"),
    status: formData.get("status"),
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

  redirect("/admin/projects");
}

export async function updateProjectAction(id: string, formData: FormData): Promise<ProjectActionResult> {
  if (!id || id.length > 100) {
    return {
      success: false,
      message: "Invalid project identifier.",
    };
  }

  const raw = {
    title: formData.get("title"),
    slug: formData.get("slug"),
    shortDescription: formData.get("shortDescription"),
    description: formData.get("description"),
    coverImage: formData.get("coverImage") ?? "",
    demoUrl: formData.get("demoUrl") ?? "",
    repositoryUrl: formData.get("repositoryUrl") ?? "",
    tags: formData.getAll("tags"),
    status: formData.get("status"),
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
    const previous = await prisma.project.findUnique({
      where: { id },
      select: { slug: true },
    });

    if (!previous) {
      return {
        success: false,
        message: "Project not found.",
      };
    }

    await updateProject(id, parsed.data);

    revalidatePath("/admin/projects");
    revalidatePath(`/admin/projects/edit/${id}`);
  } catch (error) {
    if (error instanceof AppError) {
      if (error.code === "CONFLICT") {
        return {
          success: false,
          errors: error.field === "slug" ? { slug: ["A project with this slug already exists."] } : undefined,
          message: error.field === "slug" ? undefined : error.message,
        };
      }

      if (error.code === "INVALID_REFERENCE") {
        return {
          success: false,
          errors: {
            tags: ["One or more of the selected tags could not be found."],
          },
        };
      }

      if (error.code === "NOT_FOUND") {
        return {
          success: false,
          message: "Project not found.",
        };
      }
    }

    console.error("updateProjectAction failed:", error);

    return {
      success: false,
      message: "Failed to save the project. Please try again later.",
    };
  }

  redirect("/admin/projects");
}

export async function deleteProjectAction(id: string): Promise<ProjectActionResult> {
  if (!id || typeof id !== "string" || id.length > 100) {
    return {
      success: false,
      message: "Invalid project ID.",
    };
  }

  try {
    const project = await prisma.project.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!project) {
      return {
        success: false,
        message: "Project not found.",
      };
    }

    await prisma.project.delete({
      where: { id },
    });

    revalidatePath("/admin/projects");
    revalidatePath(`/admin/projects/edit/${project.id}`);
  } catch (error) {
    if (error instanceof AppError) {
      if (error.code === "NOT_FOUND") {
        return {
          success: false,
          message: "Project not found.",
        };
      }

      return {
        success: false,
        message: error.message,
      };
    }

    console.error("deleteProjectAction failed:", error);

    return {
      success: false,
      message: "Failed to delete the project. Please try again later.",
    };
  }

  redirect("/admin/projects");
}
