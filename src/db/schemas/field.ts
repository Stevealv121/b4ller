import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const field = pgTable("field", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    location: varchar("location").notNull(),
});

export type Field = typeof field.$inferSelect