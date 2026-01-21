CREATE TYPE "public"."sort_order" AS ENUM('DATE', 'DUEDATE', 'TITLE');--> statement-breakpoint
ALTER TABLE "task_list" ADD COLUMN "sort_order" "sort_order" DEFAULT 'DATE' NOT NULL;