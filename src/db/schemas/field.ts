import { doublePrecision, index, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const field = pgTable("field", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    sport: varchar("sport").notNull().default("football5"),
    address: varchar("address").notNull(),
    city: varchar("city").notNull(),
    lat: doublePrecision("lat").notNull(),
    lon: doublePrecision("lon").notNull()
}
    ,
    (table) => [
        index("field_city").on(table.city)
    ]);

export type Field = typeof field.$inferSelect