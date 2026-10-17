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
    coverImage: formData.get("coverImage") || null,
    demoUrl: formData.get("demoUrl") || null,
    repositoryUrl: formData.get("repositoryUrl") || null,
    role: formData.get("role") || null,
    tags: formData.getAll("tags"),
  };

  const parsed = createProjectSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      message: "Проверьте заполнение формы.",
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
          slug: ["Проект с таким slug уже существует."],
        },
      };
    }

    if (error instanceof Error && "code" in error && error.code === "P2025") {
      return {
        success: false,
        message: "Один из выбранных тегов не найден.",
      };
    }

    console.error("createProjectAction error:", error);

    return {
      success: false,
      message: "Не удалось создать проект. Попробуйте позже.",
    };
  }

  revalidatePath("/admin/projects");
  revalidatePath("/projects");

  redirect("/admin/projects");
}
