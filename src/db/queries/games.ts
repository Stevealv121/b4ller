// /db/queries.ts
"use server"
import db from "../../index";

import { eq, sql } from 'drizzle-orm';
import { match, match_players } from "../schemas/match";
import { field } from "../schemas/field";
import { time_slot } from "../schemas/time_slot";

// 1. Find open games
export async function findOpenGames() {
    const results = await db
        .select({
            matchId: match.id,
            sport: field.sport,
            fieldName: field.name,
            fieldAddress: field.address,
            fieldCity: field.city,
            lat: field.lat,
            lon: field.lon,
            startTime: time_slot.startTime,
            endTime: time_slot.endTime,
            currentPlayers: sql<number>`COUNT(${match_players.playerId})`,
            maxPlayers: match.maxPlayers,
            pricePerPerson: sql<number>`${match.price} / ${match.maxPlayers}`,
        })
        .from(match)
        .innerJoin(time_slot, eq(match.slotId, time_slot.id))
        .innerJoin(field, eq(time_slot.fieldId, field.id))
        .leftJoin(match_players, eq(match.id, match_players.matchId))
        .groupBy(
            match.id,
            field.sport,
            field.name,
            field.address,
            field.city,
            field.lat,
            field.lon,
            time_slot.startTime,
            time_slot.endTime,
            match.maxPlayers,
            match.price
        )
        .having(sql`${sql.raw("COUNT(match_players.player_id)")} < ${match.maxPlayers}`);

    return results;
}

// 2. Join a match
export async function joinMatch(matchId: number, playerId: number) {
    await db.insert(match_players).values({ matchId, playerId });
}
