ALTER TABLE "tasks" RENAME COLUMN "name" TO "title";--> statement-breakpoint
DROP INDEX "taskist_userId_idx";--> statement-breakpoint
DROP INDEX "task_taskListId_idx";