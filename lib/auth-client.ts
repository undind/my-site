import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  basePath: process.env.NEXT_PUBLIC_BETTER_AUTH_PATH,
});
