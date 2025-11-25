import { readGlobalMessages, readUser } from "../../../db/crud/read";
import { KeyUser, MessageGlobal } from "../../../utils/enums";

export async function parseGlobalMessages(): Promise<MessageGlobal[]> {

    const usersMessages = await readGlobalMessages();

    let parsedMessages = await Promise.all(
            usersMessages.map(async messageGlobal => {
            return {
                user: await readUser(messageGlobal.idTransmitter, KeyUser.ID, true),
                message: messageGlobal.message
            }
        })
    );
    return parsedMessages;
}