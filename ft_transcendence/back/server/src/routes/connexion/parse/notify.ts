import { readNotify, readUser } from "../../../db/crud/read";
import { KeyUser, MessageNotify } from "../../../utils/enums";

export async function parseNotify(id: number, blocked: string): Promise<MessageNotify[]> {

    const userNotify = await readNotify(id);

    let parsedNotify = await Promise.all(
        userNotify.map(async notify => {
            let userDb;
            try {
                userDb = await readUser(notify.idTransmitter, KeyUser.ID, true);
            } catch (err) {
                userDb = null;
            }
            return {
                id: notify.id,
                user: await readUser(notify.idTransmitter, KeyUser.ID, true),
                type: notify.type,
                seen: notify.seen
            }
        })
    );

    const blockedList = blocked.split(",");

    if (blockedList && blockedList[0])
        for (const idBlocked of blockedList)
            parsedNotify = parsedNotify.filter(notify => notify.user.id != idBlocked);

    return parsedNotify;
}