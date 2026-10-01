import { Box, Button, Card, Container, Flex, Heading, Text, TextField } from "@radix-ui/themes";

export default function Admin() {
  return (
    <Container size="4" px="4">
      <Flex direction="column" align="center" justify="center" height="100vh">
        <Box width="400px">
          <Card size="2">
            <Heading size="5" mb="5">
              Sign in
            </Heading>

            <Flex direction="column" gap="3" mb="3">
              <label>
                <Text size="1" weight="medium" mb="1" as="div">
                  Login
                </Text>
                <TextField.Root name="login" placeholder="Enter your login" />
              </label>

              <label>
                <Text size="1" weight="medium" mb="1" as="div">
                  Password
                </Text>
                <TextField.Root name="password" type="password" placeholder="Enter your password" />
              </label>
            </Flex>

            <Flex justify="end">
              <Button size="2" variant="solid">
                Sign in
              </Button>
            </Flex>
          </Card>
        </Box>
      </Flex>
    </Container>
  );
}
