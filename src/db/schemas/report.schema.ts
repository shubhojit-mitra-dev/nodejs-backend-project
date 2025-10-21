/**
 * Report Schema Definition using Drizzle ORM for PostgreSQL.
 * This schema handles report generation with AI summaries and S3 storage.
 *
 * Design Pattern Used:
 *  - Document Management Pattern: File storage and metadata tracking.
 *  - AI Integration Pattern: Support for AI-generated summaries.
 */

import { pgTable, varchar, text, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './user.schema';

/**
 * Reports Table Definition
 *
 * Columns:
 * - id: Primary key, UUID string.
 * - userId: Foreign key referencing users table.
 * - title: Report title.
 * - s3_url: S3 URL where the report file is stored.
 * - ai_summary: AI-generated summary of the report.
 * - status: Report status (generating, completed, failed, etc.).
 * - createdAt: Timestamp of when the report was created.
 */
export const reports = pgTable('reports', {
  id: varchar('id', { length: 36 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: varchar('user_id', { length: 36 })
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  s3Url: varchar('s3_url', { length: 500 }).notNull(),
  aiSummary: text('ai_summary'),
  status: varchar('status', { length: 50 }).notNull().default('generating'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

/**
 * Relations for Reports Table
 */
export const reportRelations = relations(reports, ({ one }) => ({
  user: one(users, {
    fields: [reports.userId],
    references: [users.id],
  }),
}));

// Type exports
export type Report = typeof reports.$inferSelect;
export type NewReport = typeof reports.$inferInsert;
