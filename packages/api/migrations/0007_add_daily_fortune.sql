CREATE TABLE `DailyFortune` (
  `id` text PRIMARY KEY NOT NULL,
  `user_id` text NOT NULL,
  `card_id` integer NOT NULL,
  `card_direction` text NOT NULL,
  `interpretation` text NOT NULL,
  `characterId` text,
  `date` text NOT NULL,
  `created_at` text NOT NULL
);

CREATE UNIQUE INDEX `daily_fortune_user_date_idx` ON `DailyFortune` (`user_id`, `date`);
