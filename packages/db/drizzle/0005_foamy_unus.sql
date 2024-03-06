CREATE TABLE `email_verification` (
	`id` int AUTO_INCREMENT NOT NULL,
	`code` varchar(6) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`email` text NOT NULL,
	`expires_at` datetime NOT NULL,
	CONSTRAINT `email_verification_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `note` (
	`id` varchar(24) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`title` text NOT NULL,
	`content` text,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
	CONSTRAINT `note_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
DROP TABLE `key`;--> statement-breakpoint
ALTER TABLE `session` MODIFY COLUMN `id` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `session` MODIFY COLUMN `user_id` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `task_list` MODIFY COLUMN `user_id` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `id` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `session` ADD `expires_at` datetime NOT NULL;--> statement-breakpoint
ALTER TABLE `task_list` ADD `created_at` datetime DEFAULT CURRENT_TIMESTAMP NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD `email` text;--> statement-breakpoint
ALTER TABLE `user` ADD `email_verified` boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD `password` text NOT NULL;--> statement-breakpoint
ALTER TABLE `session` DROP COLUMN `active_expires`;--> statement-breakpoint
ALTER TABLE `session` DROP COLUMN `idle_expires`;--> statement-breakpoint
ALTER TABLE `email_verification` ADD CONSTRAINT `email_verification_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `note` ADD CONSTRAINT `note_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;