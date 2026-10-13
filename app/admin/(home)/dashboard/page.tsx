import { type Metadata } from "next";

import { Box, Card, Container, Flex, Grid, Text } from "@radix-ui/themes";

import DashboardProjects from "@/app/admin/_components/dashboard/projects";

export const metadata: Metadata = {
  title: "Admin - Dashboard",
  description: "Admin - Dashboard",
};

export default function Dashboard() {
  return (
    <Container size="4" px="4">
      <Grid columns="2" gap="4" rows="repeat(2, 1fr)" width="auto">
        <DashboardProjects />
        <Box>
          <Card variant="classic" size="3">
            <Flex gap="3" align="center">
              <Box>
                <Text as="div" size="2" weight="bold">
                  Teodros Girmay
                </Text>
                <Text as="div" size="2" color="gray">
                  Engineering
                </Text>
              </Box>
            </Flex>
          </Card>
        </Box>
        <Box>
          <Card variant="classic" size="3">
            <Flex gap="3" align="center">
              <Box>
                <Text as="div" size="2" weight="bold">
                  Teodros Girmay
                </Text>
                <Text as="div" size="2" color="gray">
                  Engineering
                </Text>
              </Box>
            </Flex>
          </Card>
        </Box>
        <Box>
          <Card variant="classic" size="3">
            <Flex gap="3" align="center">
              <Box>
                <Text as="div" size="2" weight="bold">
                  Teodros Girmay
                </Text>
                <Text as="div" size="2" color="gray">
                  Engineering
                </Text>
              </Box>
            </Flex>
          </Card>
        </Box>
      </Grid>
    </Container>
  );
}
