import { integer, pgTable, serial, text, timestamp, decimal } from "drizzle-orm/pg-core";

export const match = pgTable("match", {
    id: serial("id").primaryKey(),
    players: text("players").array().notNull().default([]),
    homeScore: integer("home_score").notNull().default(0),
    awayScore: integer("away_score").notNull().default(0),
    date: timestamp("date").notNull().default(new Date()),
    mmr: decimal("mmr", { precision: 10, scale: 4 }).notNull()
});