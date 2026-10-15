import { ClockIcon } from "@radix-ui/react-icons";
import { Box, Card, Flex, Text } from "@radix-ui/themes";

export default function DashboardLastChanges() {
  return (
    <Box mb="4">
      <Card variant="classic" size="3">
        <Flex gap="2" align="center">
          <ClockIcon />
          <Text as="div" size="3" weight="medium">
            Recent changes
          </Text>
        </Flex>
      </Card>
    </Box>
  );
}
