import { KeyTournament, KeyUser, StatusTournament } from "../../utils/enums.js";
import { db } from "../../../server.js";

export async function readUser(dataGiven:string, key:KeyUser, otherUser = false) {
    const dataAsked = otherUser ? "id, pseudo, picture" : "*";
    const user = await db.get(
        `
            SELECT ${dataAsked} 
            FROM users 
            WHERE ${key} = ?
        `,
        [dataGiven]
    );
    return user;
}

export async function readUserWithEmail(email:string) {
    const userId = await db.get(
        `
            SELECT id, password
            FROM users 
            WHERE email = ?
        `,
        [email]
    );
    return userId;
}

export async function readPrivateMessages(id:number) {
    const messages = await db.all(
        `
            SELECT * 
            FROM privateMessages 
            WHERE 
                (idTransmitter = ? OR idReceiver = ?)
                ORDER BY id DESC
        `,
        [id, id]
    );
    return messages;
}

export async function readGlobalMessages() {
    const messages = await db.all(
        `
            SELECT * 
            FROM globalMessages 
            ORDER BY id DESC
        `,
    );
    return messages;
}

export async function readNotify(id:number) {
    const messages = await db.all(
        `
            SELECT * 
            FROM notify
            WHERE 
                idReceiver = ?
                ORDER BY id DESC
        `,
        [id]
    );
    return messages;
}

export async function readNotifyById(id:number) {
    const messages = await db.get(
        `
            SELECT * 
            FROM notify
            WHERE id = ?
        `,
        [id]
    );
    return messages;
}

export async function readStats(id:number) {
    const stats = await db.get(
        `
            SELECT * 
            FROM stats
            WHERE idPlayer = ?
        `,
        [id]
    );
    return stats;
}

export async function readTournament(dataGiven:number, key:KeyTournament) {
    const tournament = await db.get(
        `
            SELECT * 
            FROM tournaments
            WHERE ${key} = ?
        `,
        [dataGiven]
    );
    return tournament;
}

export async function readMatches(id:number) {
    const matches = await db.all(
        `
            SELECT * 
            FROM matches
            WHERE
                (idPlayer1 = ? OR idPlayer2 = ?)
                ORDER BY id DESC
                LIMIT 5
        `,
        [id, id]
    );
    return matches;
}