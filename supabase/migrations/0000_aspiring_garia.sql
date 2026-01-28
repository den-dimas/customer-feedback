CREATE TABLE "feedbacks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"title" text NOT NULL,
	"description" text DEFAULT '',
	"category" text DEFAULT '',
	"priority" text DEFAULT '',
	"status" text DEFAULT 'Pending',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
CREATE INDEX "category_idx" ON "feedbacks" USING btree ("category");--> statement-breakpoint
CREATE INDEX "priority_idx" ON "feedbacks" USING btree ("priority");