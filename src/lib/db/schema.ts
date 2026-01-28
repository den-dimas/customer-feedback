import { index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { authUsers } from "drizzle-orm/supabase";

/* 
Create a table named `feedback` with the following columns:
    - `id` (UUID, primary key)
    - `user_id` (Foreign Key to auth.users)
    - `title` (Text)
    - `description` (Text)
    - `category` (Text) – *Initially empty, filled by n8n*
    - `priority` (Text) – *Initially empty, filled by n8n*
    - `status` (Text) – Default: 'Pending'
    - `created_at` (Timestamp)
*/

export const feedbackTable = pgTable(
  "feedbacks",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    user_id: uuid("user_id")
      .notNull()
      .references(() => authUsers.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    title: text("title").notNull(),
    description: text("description").default(""),
    category: text("category").default(""),
    priority: text("priority").default(""),
    status: text("status").default("Pending"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("category_idx").on(table.category),
    index("priority_idx").on(table.priority),
  ],
);

export type InsertFeedback = typeof feedbackTable.$inferInsert;
export type SelectFeedback = typeof feedbackTable.$inferSelect;
