import { db } from "../../../server";

export async function deleteUser(id:number) {
    await db.run(
        `
            DELETE FROM users
            WHERE id = ?
        `,
        [id]
    );
}

export async function deleteNotify(id:number) {
    await db.run(
        `
            DELETE FROM notify
            WHERE id = ?
        `,
        [id]
    );
}