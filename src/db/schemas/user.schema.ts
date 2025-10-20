/**
 * User Schema Definition using Drizzle ORM for PostgreSQL.
 * This schema defines the structure of the 'users' table
 * along with its columns and relationships.
 *
 * Design Pattern Used:
 *  - Schema Definition Pattern: Clear definition of DB schema.
 *  - Relational Mapping: Establishes relations with other tables.
 */

import { pgTable, serial, text, varchar, timestamp, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { todos } from './todo.schema';

/**
 * Users Table Definition
 *
 * Columns:
 * - id: Primary key, auto-incrementing integer.
 * - username: Unique username for the user, max length 255 characters.
 * - email: Unique email address for the user, max length 255 characters.
 * - password: Hashed password for authentication.
 * - isVerified: Boolean flag indicating if the user's email is verified, defaults to false.
 * - createdAt: Timestamp of when the user was created, defaults to current time.
 */
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 255 }).notNull().unique(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: text('password').notNull(),
  isVerified: boolean('is_verified').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

/**
 * Relations for Users Table
 * - todos: One-to-many relationship with the 'todos' table.
 * Establishes that a user can have multiple todo items.
 */
export const userRelations = relations(users, ({ many }) => ({
  todos: many(todos),
}));
