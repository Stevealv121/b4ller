import { decimal, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const player = pgTable("player", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    mmr: decimal("mmr", { precision: 10, scale: 4 }).notNull()
});

export type Player = typeof player.$inferSelect;