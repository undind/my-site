import { handlePrismaError } from "@/lib/db/errors";
import { prisma } from "@/lib/prisma";

export async function getTags() {
  try {
    const tags = await prisma.tag.findMany({
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        name: true,
        slug: true,
        _count: {
          select: { projects: true },
        },
      },
    });

    return tags.map((tag) => ({
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
      projectCount: tag._count.projects,
    }));
  } catch (error) {
    handlePrismaError(error);
  }
}

export async function createTag(name: string, slug: string) {
  try {
    return await prisma.tag.create({
      data: {
        name,
        slug,
      },
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });
  } catch (error) {
    handlePrismaError(error);
  }
}

export async function deleteTag(id: string) {
  try {
    return await prisma.tag.delete({
      where: { id },
    });
  } catch (error) {
    handlePrismaError(error);
  }
}
