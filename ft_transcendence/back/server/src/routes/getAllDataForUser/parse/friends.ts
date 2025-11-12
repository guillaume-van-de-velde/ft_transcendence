import { readUser } from "../../../db/crud/read";
import { KeyUser, UserShortData } from "../../../utils/enums";

export async function parseFriends(ids:string): Promise<UserShortData[]> {
    const listFriendsIDs = ids.split(',');

    const parsedFriends = Promise.all(
        listFriendsIDs.map(async idFriend => await readUser(idFriend, KeyUser.ID, true))
    );

    return parsedFriends;
}