"use server";

import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { generateSlug } from "@/lib/utils/slug";
import { createTagSchema } from "@/lib/validations/admin/tag";

export type TagActionResult =
  | {
      success: true;
      tag: { id: string; name: string; slug: string };
    }
  | {
      success: false;
      message: string;
    };

export async function createTagAction(
  name: string,
): Promise<TagActionResult> {
  const parsed = createTagSchema.safeParse({ name });

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Incorrect value.",
    };
  }

  const normalizedName = parsed.data.name;
  const slug = generateSlug(normalizedName);

  if (!slug) {
    return {
      success: false,
      message: "Could not generate a slug for this name.",
    };
  }

  try {
    const tag = await prisma.tag.create({
      data: {
        name: normalizedName,
        slug,
      },
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });

    return { success: true, tag };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        message: "A tag with this name or slug already exists.",
      };
    }

    console.error("createTagAction failed:", error);

    return {
      success: false,
      message: "Failed to create tag.",
    };
  }
}

export async function deleteTagAction(
  tagId: string,
): Promise<{ success: boolean; message?: string }> {
  if (!tagId || tagId.length > 100) {
    return { success: false, message: "Incorrect value." };
  }

  try {
    const tag = await prisma.tag.findUnique({
      where: { id: tagId },
      select: {
        id: true,
        _count: {
          select: { projects: true },
        },
      },
    });

    if (!tag) {
      return { success: false, message: "The tag has already been deleted." };
    }

    if (tag._count.projects > 0) {
      return {
        success: false,
        message: `The tag is used in ${tag._count.projects} projects. Please remove it from the projects first.`,
      };
    }

    await prisma.tag.delete({
      where: { id: tagId },
    });

    return { success: true };
  } catch (error) {
    console.error("deleteTagAction failed:", error);

    return {
      success: false,
      message: "Failed to delete the tag.",
    };
  }
}
