CREATE TABLE `email_verification_code` (
	`id` int AUTO_INCREMENT NOT NULL,
	`code` varchar(6) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`email` text NOT NULL,
	`expires_at` datetime NOT NULL,
	CONSTRAINT `email_verification_code_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
DROP TABLE `email_verification`;--> statement-breakpoint
ALTER TABLE `email_verification_code` ADD CONSTRAINT `email_verification_code_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;