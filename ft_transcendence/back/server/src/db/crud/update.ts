import { StatusTournament } from "../../utils/enums.js";
import { db } from "../../../server.js";

export async function updateUsers(id: number, key: string, value: string | number) {
    await db.run(
        `
            UPDATE users
            SET 
                ${key} = ?
            WHERE id = ?
        `,
        [value, id]
    )
}

export async function updateStats(id: number, update: string) {
    await db.run(
        `
            UPDATE stats
            SET 
                ${update} = ${update} + 1
            WHERE idPlayer = ?
        `,
        [id]
    )
}

export async function updateTournaments(id: number, player: number, level: number) {
    await db.run(
        `
            UPDATE tournaments
            SET 
                lv${player} = ?
            WHERE id = ? AND status != ?
        `,
        [level, id, StatusTournament.FINISHED]
    )
}

export async function updateUserTournaments(name: string, id: number, player: number) {
    await db.run(
        `
            UPDATE tournaments
            SET 
                id${player} = ?,
                lv${player} = 0
            WHERE name = ? AND status = ?
        `,
        [id, name, StatusTournament.WAIT]
    )
}

export async function updateStatusTournaments(id: number, status: StatusTournament) {
    await db.run(
        `
            UPDATE tournaments
            SET 
                status = ?
            WHERE id = ?
        `,
        [status, id]
    )
}

export async function updatePrivateMessageSeen(idTransmitter: string, idReceiver: string) {
    await db.run(
        `
            UPDATE privateMessages
            SET 
                seen = ?
            WHERE
                seen = ?
                AND idTransmitter = ?
                AND idReceiver = ?
        `,
        [true, false, idTransmitter, idReceiver]
    )
}