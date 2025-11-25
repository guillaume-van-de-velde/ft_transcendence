import { readUser } from "../../../db/crud/read";
import { KeyUser, UserShortData } from "../../../utils/enums";

export async function parseBlocked(ids:string): Promise<UserShortData[]> {
    const listBlockedIDs = ids.split(',');

    const parsedBlocked = Promise.all(
        listBlockedIDs.map(async idFriend => await readUser(idFriend, KeyUser.ID, true))
    );

    return parsedBlocked;
}