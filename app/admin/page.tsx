import { redirect } from "next/navigation";

import { Box, Card, Container, Flex, Heading } from "@radix-ui/themes";

import LoginForm from "@/app/admin/_components/LoginForm";
import { getRouteByKey } from "@/app/admin/constants/routes";
import { getCurrentSession } from "@/lib/auth-server";

export default async function Admin() {
  const session = await getCurrentSession();

  if (session) {
    redirect(getRouteByKey('dashboard')!.href);
  }

  return (
    <Container size="4" px="4">
      <Flex direction="column" align="center" justify="center" height="100vh">
        <Box width="400px">
          <Card size="2">
            <Heading size="5" mb="5">
              Sign in
            </Heading>

            <LoginForm />
          </Card>
        </Box>
      </Flex>
    </Container>
  );
}
