import { type ProjectStatus } from "@/generated/prisma/client";

export type GetProjectsParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: ProjectStatus[];
  tags?: string[];
};
