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