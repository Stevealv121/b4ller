import { boolean, decimal, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const player = pgTable("player", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    mmr: decimal("mmr", { precision: 10, scale: 4 }).notNull(),
    searching_match: boolean("searching_match").default(false).notNull(),
});

export type Player = typeof player.$inferSelect;