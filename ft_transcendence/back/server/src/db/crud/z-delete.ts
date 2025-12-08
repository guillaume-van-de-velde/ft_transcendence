import { db } from "../../../server";

export async function deleteNotify(id:number) {
    await db.run(
        `
            DELETE FROM notify
            WHERE id = ?
        `,
        [id]
    );
}

export async function deleteTournament(id:number) {
    await db.run(
        `
            DELETE FROM tournaments
            WHERE id = ?
        `,
        [id]
    );
}

export async function deletePrivateMessage(user1:number, user2:number) {
    await db.run(`
            DELETE FROM privateMessages
            WHERE idTransmitter = ? AND idReceiver = ?
        `,
        [user1, user2]
    );
    await db.run(`
            DELETE FROM privateMessages
            WHERE idTransmitter = ? AND idReceiver = ?
        `,
        [user2, user1]
    );
}