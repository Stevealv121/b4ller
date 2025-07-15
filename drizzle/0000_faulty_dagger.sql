CREATE TABLE "field" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"location" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "match" (
	"id" serial PRIMARY KEY NOT NULL,
	"players" text[] DEFAULT '{}' NOT NULL,
	"home_score" integer DEFAULT 0 NOT NULL,
	"away_score" integer DEFAULT 0 NOT NULL,
	"date" timestamp DEFAULT '2025-07-15 22:15:27.326' NOT NULL,
	"mmr" numeric(10, 4) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "player" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"mmr" numeric(10, 4) NOT NULL
);
