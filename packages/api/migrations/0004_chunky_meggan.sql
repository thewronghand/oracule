CREATE TABLE `Reading` (
	`id` text PRIMARY KEY NOT NULL,
	`question` text NOT NULL,
	`cards` text NOT NULL,
	`interpretation` text NOT NULL,
	`spreadType` text NOT NULL,
	`shareId` text,
	`createdAt` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Reading_shareId_unique` ON `Reading` (`shareId`);