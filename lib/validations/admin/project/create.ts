import { z } from "zod";

export const createProjectSchema = z.object({
  title: z.string().trim().min(1, "Введите название").max(150),
  slug: z
    .string()
    .trim()
    .min(1, "Введите slug")
    .max(150)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Некорректный slug"),
  shortDescription: z
    .string()
    .trim()
    .min(1, "Введите краткое описание")
    .max(300),
  description: z.string().trim().min(1, "Введите описание"),
  coverImage: z.string().trim().max(500).nullable(),
  demoUrl: z.string().trim().url().nullable(),
  repositoryUrl: z.string().trim().url().nullable(),
  role: z.string().trim().max(100).nullable(),
  tags: z.array(z.string().cuid()).max(20),
});

export type CreateProjectInput = z.infer<
  typeof createProjectSchema
>;
