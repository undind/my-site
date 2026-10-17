import { z } from "zod";

import { ProjectStatus } from "@/generated/prisma/client";

const statusSchema = z.enum(Object.values(ProjectStatus || {}));

const positiveIntSchema = z.coerce.number().int().min(1);

const toArray = (value: unknown): unknown[] => {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
};

export const projectFiltersSchema = z.object({
  page: positiveIntSchema.default(1),
  limit: positiveIntSchema.max(100).default(10),
  search: z.string().trim().max(100).default(""),
  status: z.array(statusSchema).default([]),
  tags: z.array(z.string().trim().min(1).max(100)).default([]),
});

type RawSearchParams = Record<string, string | string[] | undefined>;

export function parseProjectFilters(params: RawSearchParams) {
  const parseParam = <T>(schema: z.ZodType<T>, value: unknown, fallback: T): T => {
    const result = schema.safeParse(value);
    return result.success ? result.data : fallback;
  };

  const rawStatuses = toArray(params.status);
  const rawTags = toArray(params.tags);

  return projectFiltersSchema.parse({
    page: parseParam(positiveIntSchema, params.page, 1),
    limit: parseParam(positiveIntSchema.max(100), params.limit, 10),
    search: parseParam(z.string().trim().max(100), params.search, ""),
    status: rawStatuses.filter((value) => statusSchema.safeParse(value).success),
    tags: rawTags.filter((value) => typeof value === "string" && z.string().trim().min(1).max(100).safeParse(value).success).map((value) => (value as string).trim()),
  });
}

export type ProjectFilters = z.infer<typeof projectFiltersSchema>;
