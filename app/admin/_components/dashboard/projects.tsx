import { BackpackIcon } from "@radix-ui/react-icons";
import { Box, Card, Flex, Text } from "@radix-ui/themes";

import { getProjectCounts } from "@/lib/queries/projects";

export default async function DashboardProjects() {
  const counts = await getProjectCounts();

  return (
    <Box>
      <Card variant="classic" size="3" className="h-full">
        <Flex gap="1" align="start" direction="column" justify="between" height="100%">
          <BackpackIcon />
          <Text as="div" size="7">
            {counts?.total || "—"}
          </Text>
          <Text as="div" size="2" color="gray">
            Projects
          </Text>
          {counts?.published && counts?.published > 0 ? (
            <Text as="div" size="2" color="green">
              {counts?.published} published
            </Text>
          ) : null}
        </Flex>
      </Card>
    </Box>
  );
}
