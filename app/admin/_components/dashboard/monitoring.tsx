import { Box, Card, Flex, Text } from "@radix-ui/themes";

export default function DashboardMonitoring() {
  return (
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
  );
}
