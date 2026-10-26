import { z } from "zod";

import { ProjectStatus } from "@/generated/prisma/enums";

const optionalUrl = z.union([z.string().trim().url("Please enter correct URL"), z.literal("")]);

const statusSchema = z.enum(Object.values(ProjectStatus || {}));

export const createProjectSchema = z.object({
  title: z.string().trim().min(1, "Enter title").max(150),
  slug: z
    .string()
    .trim()
    .min(1, "Enter slug")
    .max(150)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Incorrect slug"),
  shortDescription: z.string().trim().min(1, "Enter short description").max(300),
  description: z.string().trim().min(1, "Enter description"),
  coverImage: z.string().trim().max(500),
  demoUrl: optionalUrl,
  repositoryUrl: optionalUrl,
  tags: z.array(z.string().min(1).max(100)).max(20),
  status: statusSchema,
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
