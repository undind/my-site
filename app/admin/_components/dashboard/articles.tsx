import { Pencil2Icon } from "@radix-ui/react-icons";
import { Box, Card, Flex, Text } from "@radix-ui/themes";

export default function DashboardArticles() {
  return (
    <Box>
      <Card variant="classic" size="3" className="h-full">
        <Flex gap="1" align="start" direction="column" justify="between" height="100%">
          <Pencil2Icon />
          <Text as="div" size="7">
            —
          </Text>
          <Text as="div" size="2" color="gray">
            Articles
          </Text>
          <Text as="div" size="2" color="gray">
            1 drafts
          </Text>
        </Flex>
      </Card>
    </Box>
  );
}
