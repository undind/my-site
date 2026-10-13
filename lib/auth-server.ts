import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "./auth";

export async function getCurrentSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

export async function requireAuth() {
  const session = await getCurrentSession();

  if (!session) {
    return redirect("/admin");
  }

  return session;
}
