import { readPrivateMessages, readUser } from "../../../db/crud/read";
import { KeyUser, MessagePrivate } from "../../../utils/enums";

export async function parsePrivateMessages(id:number): Promise<MessagePrivate[]> {
    const usersMessages = await readPrivateMessages(id);
    const parsedMessages:MessagePrivate[] = [];

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
            const firstUserMessage: MessagePrivate = {
                user: await readUser(idOtherPlayer, KeyUser.ID, true),
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
