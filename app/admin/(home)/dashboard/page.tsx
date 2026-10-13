import { type Metadata } from "next";

import { Container, Grid } from "@radix-ui/themes";

import DashboardArticles from "@/app/admin/_components/dashboard/articles";
import DashboardErrors from "@/app/admin/_components/dashboard/errors";
import DashboardLastChanges from "@/app/admin/_components/dashboard/last-changes";
import DashboardLastSeen from "@/app/admin/_components/dashboard/last-seen";
import DashboardNeedAttention from "@/app/admin/_components/dashboard/need-attention";
import DashboardProjects from "@/app/admin/_components/dashboard/projects";

export const metadata: Metadata = {
  title: "Admin - Dashboard",
  description: "Admin - Dashboard",
};

export default function Dashboard() {
  return (
    <Container size="4" px="4">
      <Grid columns="2" gap="4" rows="repeat(2, 1fr)" width="auto" mb="4">
        <DashboardProjects />
        <DashboardArticles />
        <DashboardLastSeen />
        <DashboardErrors />
      </Grid>

      <DashboardLastChanges />

      <DashboardNeedAttention />
    </Container>
  );
}
