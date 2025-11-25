import { FastifyReply, FastifyRequest } from "fastify";
import { readUser } from "../../db/crud/read";
import { KeyUser } from "../../utils/enums";
import { updateUsers } from "../../db/crud/update";

export async function removeUserList(id: any, key: string, value: any) {
    let ArrayUser:string[] = await readUser(id, KeyUser.ID).then(user => user[key].split(','));
    ArrayUser = ArrayUser.filter(friendId => friendId != value);
    const listUser = ArrayUser.join(',');
    await updateUsers(id, key, listUser);
}

export const removeUserInFriendsList = async (req:FastifyRequest, res:FastifyReply) => {
    const reqBody = (req.body as any);
    const id = reqBody.id;
    const idPlayer = reqBody.friend;

    await removeUserList(id, "friends", idPlayer);
    await removeUserList(idPlayer, "friends", id);
}

export const removeUserInBlockedList = async (req:FastifyRequest, res:FastifyReply) => {
    const reqBody = (req.body as any);
    const id = reqBody.id;
    const idPlayer = reqBody.blocked;

    await removeUserList(id, "blocked", idPlayer);
}