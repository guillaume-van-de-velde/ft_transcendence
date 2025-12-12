import { readPrivateMessages, readUser } from "../../../db/crud/read";
import { KeyUser, MessagePrivate } from "../../../utils/enums";

export async function parsePrivateMessages(id: number): Promise<MessagePrivate[]> {
    let usersMessages;
    try {
        usersMessages = await readPrivateMessages(id);
    } catch (err) {
        return [];
    }
    const parsedMessages: MessagePrivate[] = [];

    for (const userMessages of usersMessages) {
        let exist = false;
        const idOtherPlayer = userMessages.idTransmitter !== id ? userMessages.idTransmitter : userMessages.idReceiver;
        for (const userParsed of parsedMessages) {
            if (idOtherPlayer == userParsed.user.id)
                exist = true;
        }
        if (exist) {
            const index = parsedMessages.findIndex(friend => friend.user.id === idOtherPlayer);
            parsedMessages[index]!.chat.push({
                isUser: userMessages.idTransmitter === id ? true : false,
                message: userMessages.message
            })
        }
        else {
            let userDb;
            try {
                userDb = await readUser(idOtherPlayer, KeyUser.ID, true);
            } catch (err) {
                userDb = null;
            }
            const firstUserMessage: MessagePrivate = {
                user: userDb,
                chat: [{
                    isUser: userMessages.idTransmitter === id ? true : false,
                    message: userMessages.message
                }],
                seen: userMessages.seen
            }
            parsedMessages.push(firstUserMessage);
        }
    }

    return parsedMessages;
}
