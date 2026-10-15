import { CheckCircledIcon } from "@radix-ui/react-icons";
import { Box, Card, Flex, Text } from "@radix-ui/themes";

export default function DashboardNeedAttention() {
  return (
    <Box>
      <Card variant="classic" size="3">
        <Flex gap="2" align="center">
          <CheckCircledIcon />
          <Text as="div" size="3" weight="medium">
            What requires attention
          </Text>
        </Flex>
      </Card>
    </Box>
  );
}
