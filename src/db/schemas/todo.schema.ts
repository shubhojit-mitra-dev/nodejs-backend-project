/**
 * Todo Schema Definition using Drizzle ORM for PostgreSQL.
 * This schema defines the structure of the 'todos' table
 * along with its columns and relationships.
 *
 * Design Pattern Used:
 *  - Schema Definition Pattern: Clear definition of DB schema.
 *  - Relational Mapping: Establishes relations with other tables.
 */

import { pgTable, serial, varchar, text, timestamp, boolean, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './user.schema';

/**
 * Todos Table Definition
 *
 * Columns:
 * - id: Primary key, auto-incrementing integer.
 * - title: Title of the todo item, max length 255 characters.
 * - description: Detailed description of the todo item.
 * - isCompleted: Boolean flag indicating completion status, defaults to false.
 * - userId: Foreign key referencing the 'users' table, establishes ownership.
 * - createdAt: Timestamp of when the todo was created, defaults to current time.
 */
export const todos = pgTable('todos', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  isCompleted: boolean('is_completed').default(false),
  userId: integer('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

/**
 * Relations for Todos Table
 * - user: Many-to-one relationship with the 'users' table.
 * Establishes that each todo item belongs to a single user.
 */
export const todoRelations = relations(todos, ({ one }) => ({
  user: one(users, {
    fields: [todos.userId],
    references: [users.id],
  }),
}));
