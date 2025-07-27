// /db/queries.ts
import db from "../../index";

import { eq, sql } from "drizzle-orm";
import { match, match_players } from "../schemas/match";
import { field } from "../schemas/field";
import { time_slot } from "../schemas/time_slot";

// 1. Find open games
export async function findOpenGames(date?: Date, city?: string) {
    return db
        .select({
            matchId: match.id,
            fieldName: field.name,
            startTime: time_slot.startTime,
            currentPlayers: sql<number>`COUNT(${match_players.playerId})`,
            maxPlayers: match.maxPlayers,
            pricePerPerson: sql<number>`(${match.price} / ${match.maxPlayers})`,
        })
        .from(match)
        .innerJoin(time_slot, eq(match.slotId, time_slot.id))
        .innerJoin(field, eq(time_slot.fieldId, field.id))
        .leftJoin(match_players, eq(match_players.matchId, match.id))
        .where(city ? eq(field.city, city) : undefined)
        .groupBy(match.id, field.name, time_slot.startTime);
}

// 2. Join a match
export async function joinMatch(matchId: number, playerId: number) {
    await db.insert(match_players).values({ matchId, playerId });
}
