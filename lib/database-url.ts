/**
 * Builds the PostgreSQL connection URL from DB_* env vars.
 * Locally DB_HOST defaults to localhost; in docker-compose it points to the db service.
 * Returns undefined when vars are missing (e.g. during `prisma generate` in docker build).
 */
export function getDatabaseUrl(): string | undefined {
  const { DB_USER, DB_PASSWORD = "", DB_HOST = "localhost", DB_PORT = "5432", DB_NAME } = process.env;

  if (!DB_USER || !DB_NAME) return undefined;

  const user = encodeURIComponent(DB_USER);
  const password = encodeURIComponent(DB_PASSWORD);

  return `postgresql://${user}:${password}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
}
