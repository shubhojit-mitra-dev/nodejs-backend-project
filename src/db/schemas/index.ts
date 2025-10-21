// Export all schemas from a single file
export * from './user.schema';
export * from './task.schema';
export * from './auth-token.schema';
export * from './otp-code.schema';
export * from './report.schema';

/**
 * -----------------------
 * NOTE from the developer
 * -----------------------
 *
 * Do Make sure to run the following commands:
 * 1. pnpm db:generate - to generate migration files based on schema changes
 * 2. pnpm db:migrate - to apply the generated migrations to the database
 *
 * These commands ensure that your database schema stays in sync with your application code.
 *
 * Also for better DX, consider using drizzle studio:
 * 1. pnpm db:studio - to launch the Drizzle Studio for visual database management
 *
 * Or you can run the docker compose file to spin up the database:
 * 1. docker-compose up -d
 *
 * This will start the PostgreSQL database in a Docker container.
 *
 * and then connect using the psql client or any database GUI tool of your choice.
 */
