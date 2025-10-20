/**
 * This file handles all PostgreSQL + Drizzle setup.
 * It connects to the database once and exports the
 * `db` instance to be reused throughout the app.
 *
 * Design Pattern Used:
 *  - Singleton Pattern: Ensures one DB connection across app.
 *  - Separation of Concerns: DB connection logic isolated here.
 */

import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { env } from '@/env';
import * as userSchema from './schemas/user.schema';
import * as todoSchema from './schemas/todo.schema';

const connectionString = env.DATABASE_URL;

// Create a connection pool (Singleton)
const pool = new Pool({
  connectionString,
});

// Initialize Drizzle ORM with the pool and schema
export const db = drizzle(pool, {
  schema: {
    user: userSchema,
    todo: todoSchema,
  },
  logger: true,
});

// Export the pool if raw queries are needed
export { pool };

/**
 * Helper function: Connect to DB once during app startup.
 * Can be imported and used in `server.ts` or `app.ts`.
 */
export async function initDb() {
  try {
    await pool.connect();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1); // Stop app if DB fails to connect
  }
}
