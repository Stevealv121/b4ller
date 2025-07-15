"use server";
import db from "@/index";
import { player } from "@/db/schemas/player";

export async function getPlayers() {
    return await db.select().from(player);
}