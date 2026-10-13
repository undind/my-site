import { BackpackIcon } from "@radix-ui/react-icons";
import { Box, Card, Flex, Text } from "@radix-ui/themes";

export default function DashboardProjects() {
  return (
    <Box>
      <Card variant="classic" size="3" className="h-full">
        <Flex gap="1" align="start" direction="column" justify="between" height="100%">
          <BackpackIcon />
          <Text as="div" size="7">
            —
          </Text>
          <Text as="div" size="2" color="gray">
            Projects
          </Text>
          <Text as="div" size="2" color="green">
            1 published
          </Text>
        </Flex>
      </Card>
    </Box>
  );
}
