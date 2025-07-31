import { pgTable, serial, integer, timestamp, bigint, primaryKey } from "drizzle-orm/pg-core";
import { time_slot } from "./time_slot"
import { player } from "./player";
import { relations } from "drizzle-orm";

export const match = pgTable("match", {
    id: serial("id").primaryKey(),
    slotId: bigint("slot_id", { mode: "number" })
        .notNull()
        .references(() => time_slot.id, { onDelete: "cascade" }),
    maxPlayers: integer("max_players").notNull().default(10),
    price: integer("price").notNull().default(0), // total price for the match
    homeScore: integer("home_score").notNull().default(0),
    awayScore: integer("away_score").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});


export const match_players = pgTable(
    "match_players",
    {
        matchId: bigint("match_id", { mode: "number" })
            .notNull()
            .references(() => match.id, { onDelete: "cascade" }),
        playerId: bigint("player_id", { mode: "number" })
            .notNull()
            .references(() => player.id, { onDelete: "cascade" }),
        joinedAt: timestamp("joined_at", { withTimezone: true }).defaultNow().notNull(),
    },
    (table) => [
        primaryKey({ columns: [table.matchId, table.playerId] }),
    ]
);

export const matchesRelations = relations(match, ({ one, many }) => ({
    timeSlot: one(time_slot, {
        fields: [match.slotId],
        references: [time_slot.id],
    }),
    players: many(match_players),
}));

export const matchPlayersRelations = relations(match_players, ({ one }) => ({
    match: one(match, {
        fields: [match_players.matchId],
        references: [match.id],
    }),
    player: one(player, {
        fields: [match_players.playerId],
        references: [player.id],
    }),
}));
