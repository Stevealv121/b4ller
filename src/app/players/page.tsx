"use client"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { getPlayers } from "@/lib/actions/player";
import { useState, useEffect } from "react";
import { Player } from "@/db/schemas/player";
export default function PlayersPage() {

    const [players, setPlayers] = useState<Player[]>([]);
    useEffect(() => {
        getPlayers().then(setPlayers);
    }, []);

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Name</TableHead>
                    <TableHead className="w-[100px]">MMR</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {players.map((player: any) => (
                    <TableRow key={player.id}>
                        <TableCell className="font-medium">{player.name}</TableCell>
                        <TableCell className="font-medium">{player.mmr}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}