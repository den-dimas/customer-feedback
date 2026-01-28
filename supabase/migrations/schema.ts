import { pgTable, foreignKey, uuid, text, timestamp } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const feedbacks = pgTable("feedbacks", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	title: text().notNull(),
	description: text().default('),
	category: text().default('),
	priority: text().default('),
	status: text().default('Pending'),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "feedbacks_user_id_users_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
]);
