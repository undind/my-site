import { type Metadata } from "next";

import { Container } from "@radix-ui/themes";

import AccountForm from "@/app/admin/_components/account/Form";
import { requireAuth } from "@/lib/auth-server";

export const metadata: Metadata = {
  title: "Admin - Account",
  description: "Admin - Account",
};

export default async function Account() {
  const session = await requireAuth();

  const { user } = session;

  return (
    <Container size="3" px="4">
      <AccountForm initialEmail={user.email} initialName={user.name} />
    </Container>
  );
}
