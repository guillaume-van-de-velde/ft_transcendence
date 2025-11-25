import { FastifyReply, FastifyRequest } from "fastify";
import { readNotify, readNotifyById, readUser } from "../../db/crud/read";
import { KeyUser } from "../../utils/enums";
import { updateUsers } from "../../db/crud/update";
import { deleteNotify } from "../../db/crud/z-delete";
import { userSockets } from "../../socket/socket";
import { io } from "../../../server";

export async function addUserList(id: any, key: string, value: any) {
    const ArrayUser:string[] = await readUser(id, KeyUser.ID).then(user => user[key!].split(','));
    if (ArrayUser[0] === "")
        ArrayUser[0] = value;
    else
        ArrayUser.push(value);
    const listUser = ArrayUser.join(',');
    await updateUsers(id, key!, listUser);
}

export const addPlayerToFriendList = async (req:FastifyRequest, res:FastifyReply) => {
    const reqBody = (req.body as any);
    const idNotify = reqBody.idNotify;

    const notify = await readNotifyById(idNotify);

    addUserList(notify.idTransmitter, "friends", notify.idReceiver);
    addUserList(notify.idReceiver, "friends", notify.idTransmitter);

    deleteNotify(idNotify);

    let socketTransmitter = null;
    for (const [socket, id] of userSockets) {
        if (id == notify.idTransmitter) {
            socketTransmitter = socket;
            break ;
        }
    }
    if (socketTransmitter)
        socketTransmitter.emit("friend", await readUser(notify.idReceiver, KeyUser.ID, true));

    return await readUser(notify.idTransmitter, KeyUser.ID, true);
}

export const addPlayerToBlockedList = async (req:FastifyRequest, res:FastifyReply) => {
    const reqBody = (req.body as any);
    const id = reqBody.id;
    const keys = Object.keys(reqBody);
    const idPlayer = reqBody[keys[1]!];

    addUserList(id, keys[1]!, idPlayer);
}
