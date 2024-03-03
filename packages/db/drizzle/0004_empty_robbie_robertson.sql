CREATE TABLE `task_list` (
	`id` varchar(24) NOT NULL,
	`user_id` varchar(15) NOT NULL,
	`name` varchar(32) NOT NULL,
	CONSTRAINT `task_list_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `task` DROP FOREIGN KEY `task_user_id_user_id_fk`;
--> statement-breakpoint
ALTER TABLE `task` ADD `list_id` varchar(24);--> statement-breakpoint
ALTER TABLE `task` ADD CONSTRAINT `task_list_id_task_list_id_fk` FOREIGN KEY (`list_id`) REFERENCES `task_list`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `task` DROP COLUMN `user_id`;--> statement-breakpoint
ALTER TABLE `task_list` ADD CONSTRAINT `task_list_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;