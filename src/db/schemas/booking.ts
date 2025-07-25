import { pgTable, bigserial, bigint, integer, timestamp, primaryKey, foreignKey } from "drizzle-orm/pg-core";
import { time_slot } from "./time_slot";

export const booking = pgTable("booking", {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    userId: bigint("user_id", { mode: "number" }).notNull(),
    slotId: bigint("slot_id", { mode: "number" }).notNull(),
    bookedAt: timestamp("booked_at", { withTimezone: true }).notNull().defaultNow(),
    totalPaid: integer("total_paid").notNull(),
}, (table) => [
    foreignKey({
        name: "slotId_fk",
        columns: [table.slotId],
        foreignColumns: [time_slot.id],
    })
        .onDelete('cascade')
        .onUpdate('cascade')
]);