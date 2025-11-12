import { readNotify, readUser } from "../../../db/crud/read";
import { KeyUser, MessageNotify } from "../../../utils/enums";

export async function parseNotify(id:number): Promise<MessageNotify[]> {
    const userNotify = await readNotify(id);

    const parsedNotify = await Promise.all(
            userNotify.map(async notify => {
            return {
                id: notify.id,
                user: await readUser(notify.idTransmitter, KeyUser.ID, true),
                type: notify.type
            }
        })
    );

    return parsedNotify;
}