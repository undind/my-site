import { type Prisma } from "@/generated/prisma/client";
import { handlePrismaError } from "@/lib/db/errors";
import { prisma } from "@/lib/prisma";
import { type GetProjectsParams } from "@/lib/queries/types";
import { type CreateProjectInput } from "@/lib/validations/admin/project/create";

export async function getProjects({ page = 1, limit = 10, search, status, tags }: GetProjectsParams = {}) {
  const where: Prisma.ProjectWhereInput = {
    ...(status &&
      status.length > 0 && {
        status: { in: status },
      }),

    ...(search && {
      title: {
        contains: search,
        mode: "insensitive",
      },
    }),

    ...(tags &&
      tags?.length > 0 && {
        AND: tags?.map((slug) => ({
          tags: {
            some: { slug },
          },
        })),
      }),
  };

  try {
    const [items, total] = await Promise.all([
      prisma.project.findMany({
        where,
        include: {
          tags: true,
        },
        orderBy: [{ createdAt: "desc" }, { id: "desc" }],
        skip: (page - 1) * limit,
        take: limit,
      }),

      prisma.project.count({ where }),
    ]);

    return {
      items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
        hasPreviousPage: page > 1,
      },
    };
  } catch (error) {
    handlePrismaError(error);
  }
}

export async function createProject(data: CreateProjectInput) {
  try {
    const { tags, ...projectData } = data;

    return prisma.project.create({
      data: {
        ...projectData,
        tags: {
          connect: tags.map((id) => ({ id })),
        },
      },
      include: {
        tags: true,
      },
    });
  } catch (error) {
    handlePrismaError(error);
  }
}

export async function updateProject(id: string, input: CreateProjectInput) {
  const { tags, ...fields } = input;

  try {
    return await prisma.project.update({
      where: { id },
      data: {
        ...fields,
        coverImage: fields.coverImage || null,
        demoUrl: fields.demoUrl || null,
        repositoryUrl: fields.repositoryUrl || null,
        status: fields.status || "DRAFT",
        tags: {
          set: tags.map((tagId) => ({ id: tagId })),
        },
      },
      include: {
        tags: true,
      },
    });
  } catch (error) {
    handlePrismaError(error);
  }
}

export async function getProjectCounts() {
  try {
    const counts = await prisma.project.groupBy({
      by: ["status"],
      _count: {
        _all: true,
      },
    });

    const stats = {
      total: counts.reduce((sum, item) => sum + item._count._all, 0),
      draft: 0,
      published: 0,
      archived: 0,
    };

    for (const item of counts) {
      switch (item.status) {
        case "DRAFT":
          stats.draft = item._count._all;
          break;
        case "PUBLISHED":
          stats.published = item._count._all;
          break;
        case "ARCHIVED":
          stats.archived = item._count._all;
          break;
      }
    }

    return stats;
  } catch (error) {
    handlePrismaError(error);
  }
}

export async function getProject(id: string) {
  try {
    return prisma.project.findUnique({
      where: { id },
      include: {
        tags: {
          select: { id: true },
        },
      },
    });
  } catch (error) {
    handlePrismaError(error);
  }
}
