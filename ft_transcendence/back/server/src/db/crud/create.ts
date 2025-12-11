import { Notify, StatusTournament } from "../../utils/enums.js";
import { db } from "../../../server.js";

export async function createUser(email: string, password: string, pseudo: string, picture: string, language: string): Promise<number> {
    const result = await db.run(`
            INSERT INTO users (
                pseudo,
                email,
                password,
                picture,
                language,
                mode,
                general,
                noises,
                music,
                player1KeyUp,
                player1KeyDown,
                player2KeyUp,
                player2KeyDown,
                friends,
                blocked,
                version
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
            pseudo,
            email,
            password,
            picture,
            language,
            "COM",
            "100",
            "100",
            "100",
            "w",
            "s",
            "o",
            "l",
            "",
            "",
            1
        ]
    );
    return (result.lastID!);
}

export async function createStat(id: number | undefined) {
    await db.run(`
            INSERT INTO stats (
                idPlayer,
                played,
                wins,
                loses,
                tournaments,
                winsTournaments
            )
            VALUES (?, ?, ?, ?, ?, ?)
        `,
        [id, 0, 0, 0, 0, 0]
    );
}

export async function createPrivateMessage(idTransmitter: number, idReceiver: number, message: string, seen = false) {
    await db.run(`
            INSERT INTO privateMessages (
                idTransmitter,
                idReceiver,
                message,
                seen
            )
            VALUES (?, ?, ?, ?)
        `,
        [idTransmitter, idReceiver, message, seen]
    );
}

export async function createGlobalMessage(idTransmitter: number, message: string) {
    await db.run(`
            INSERT INTO globalMessages (
                idTransmitter,
                message
            )
            VALUES (?, ?)
        `,
        [idTransmitter, message]
    );
}

export async function createNotify(idTransmitter: number, idReceiver: number, type: Notify): Promise<number> {
    const result = await db.run(`
            INSERT OR IGNORE INTO notify (
                idTransmitter,
                idReceiver,
                type,
                seen
            )
            VALUES (?, ?, ?, ?)
        `,
        [idTransmitter, idReceiver, type, false]
    );
    return result.changes === 1 ? result.lastID! : 0;
}

export async function createTournament(name: string, mode: string, id: number) {
    const result = await db.run(`
            INSERT INTO tournaments (
                name,
                status,
                mode,
                id1,
                lv1
            )
            VALUES (?, ?, ?, ?, ?)
        `,
        [name, StatusTournament.WAIT, mode, id, 0]
    );
    return result.lastID!;
}

export async function createMatch(idPlayer1: number, idPlayer2: number, pointsPlayer1: number, pointsPlayer2: number, mode: string, date: string, hour: string) {
    await db.run(`
            INSERT INTO matches (
                idPlayer1,
                idPlayer2,
                pointsPlayer1,
                pointsPlayer2,
                mode,
                date,
                hour
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        [idPlayer1, idPlayer2, pointsPlayer1, pointsPlayer2, mode, date, hour]
    );
}