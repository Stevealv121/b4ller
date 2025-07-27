import { pgTable, bigserial, bigint, timestamp, integer, pgEnum, unique, index, primaryKey, serial, foreignKey } from "drizzle-orm/pg-core";
import { field } from "./field";
import { relations } from "drizzle-orm";
import { match } from "./match";

// Enum for slot_status
export const slotStatusEnum = pgEnum("slot_status", ["available", "booked", "blocked"]);

// Schema for time_slot table
export const time_slot = pgTable("time_slot", {
    id: bigserial({ mode: 'number' }).primaryKey(),
    fieldId: bigint("field_id", { mode: "number" }).notNull(),
    startTime: timestamp("start_time", { withTimezone: true }).notNull(),
    endTime: timestamp("end_time", { withTimezone: true }).notNull(),
    price: integer("price").notNull().default(0),
    status: slotStatusEnum("status").notNull().default("available"),
}
    , (table) => [
        unique().on(table.fieldId, table.startTime),
        index("time_slot_general").on(table.fieldId, table.startTime),
        index("time_slot_status").on(table.status),
        foreignKey({
            name: "fieldId_fk",
            columns: [table.fieldId],
            foreignColumns: [field.id],
        })
            .onDelete('cascade')
            .onUpdate('cascade')
    ]);

export const timeSlotRelations = relations(time_slot, ({ many }) => ({
    matches: many(match),
}));