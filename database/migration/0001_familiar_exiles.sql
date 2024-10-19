CREATE TABLE `transaction` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`amount` integer NOT NULL,
	`type` text,
	`description` text,
	`issued_on` text DEFAULT current_timestamp,
	`updated_on` text DEFAULT current_timestamp
);
--> statement-breakpoint
CREATE INDEX `transaction_title_index` ON `transaction` (`title`);