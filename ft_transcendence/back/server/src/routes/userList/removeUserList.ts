import { FastifyReply, FastifyRequest } from "fastify";
import { readUser } from "../../db/crud/read";
import { KeyUser } from "../../utils/enums";
import { updateUsers } from "../../db/crud/update";
import { deletePrivateMessage } from "../../db/crud/delete";
import { userSockets } from "../../sockets/sockets";

export async function removeUserList(id: any, key: string, value: any) {
    let ArrayUser: string[] = await readUser(id, KeyUser.ID).then(user => user[key].split(','));
    ArrayUser = ArrayUser.filter(friendId => friendId != value);
    const listUser = ArrayUser.join(',');
    await updateUsers(id, key, listUser);
}

export const removeUserInFriendsList = async (req: FastifyRequest, res: FastifyReply) => {
    const reqBody = (req.body as any);
    const id = req.user!.id;
    const idPlayer = reqBody.friend;

    await removeUserList(id, "friends", idPlayer);
    await removeUserList(idPlayer, "friends", id);
    await deletePrivateMessage(id, idPlayer);
    let socketDeleteUser = null;
    for (const [socket, id] of userSockets) {
        if (id == idPlayer) {
            socketDeleteUser = socket;
            break;
        }
    }
    if (socketDeleteUser)
        socketDeleteUser.emit("delete", await readUser(id.toString(), KeyUser.ID, true));
}

export const removeUserInBlockedList = async (req: FastifyRequest, res: FastifyReply) => {
    const reqBody = (req.body as any);
    const id = req.user!.id;
    const idPlayer = reqBody.blocked;

    await removeUserList(id, "blocked", idPlayer);
}