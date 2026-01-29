import { db } from "@/lib/db";
import { feedbackTable, type InsertFeedback } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function createFeedback(data: InsertFeedback) {
  return await db.insert(feedbackTable).values(data).returning();
}

export async function getFeedbacksByUserId(user_id: string) {
  return await db
    .select()
    .from(feedbackTable)
    .where(eq(feedbackTable.user_id, user_id));
}
