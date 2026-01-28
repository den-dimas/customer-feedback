import { relations } from "drizzle-orm/relations";
import { usersInAuth, feedbacks } from "./schema";

export const feedbacksRelations = relations(feedbacks, ({one}) => ({
	usersInAuth: one(usersInAuth, {
		fields: [feedbacks.userId],
		references: [usersInAuth.id]
	}),
}));

export const usersInAuthRelations = relations(usersInAuth, ({many}) => ({
	feedbacks: many(feedbacks),
}));