import { Flex, Spinner } from "@radix-ui/themes";

export default function Loading() {
  return (
    <Flex justify="center" align="center" my="6">
      <Spinner size="3" />
    </Flex>
  );
}
