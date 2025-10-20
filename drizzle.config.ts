import { env } from './src/env';
import { defineConfig } from 'drizzle-kit';

// NOTE:
// - `schema` can point to a file or a glob. We're using a glob that matches all *.schema.ts files.
// - `out` is where generated SQL migrations will be placed.
// - `dbCredentials.url` uses process.env.DATABASE_URL (set in .env / docker-compose).
export default defineConfig({
  schema: './src/db/schemas/index.ts',
  out: './drizzle',
  dialect: 'postgresql',
  driver: 'pglite',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
