ALTER TABLE "task" RENAME TO "tasks";--> statement-breakpoint
ALTER TABLE "tasks" DROP CONSTRAINT "task_task_list_id_task_list_id_fk";
--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_task_list_id_task_list_id_fk" FOREIGN KEY ("task_list_id") REFERENCES "public"."task_list"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "taskist_userId_idx" ON "task_list" USING btree ("user_id");