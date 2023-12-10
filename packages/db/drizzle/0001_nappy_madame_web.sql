CREATE TABLE `task` (
	`id` varchar(24) NOT NULL,
	`title` text NOT NULL,
	`details` text,
	`completed` boolean NOT NULL DEFAULT false,
	`deadline` datetime,
	`user_id` varchar(15) NOT NULL,
	CONSTRAINT `task_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `task` ADD CONSTRAINT `task_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;