import { FastifyReply, FastifyRequest } from "fastify";
import { readNotify, readNotifyById, readUser } from "../../db/crud/read";
import { KeyUser } from "../../utils/enums";
import { updateUsers } from "../../db/crud/update";
import { deleteNotify } from "../../db/crud/z-delete";
import { userSockets } from "../../sockets/sockets";
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
    let notify:any;

    try {
        notify = await readNotifyById(idNotify);
    } catch (err) {
        return res.code(404).send({message: "notify not found"});
    }

    if (notify.idReceiver != req.user!.id)
        return res.code(403).send({message: "not authorised"});

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
    const id = req.user!.id;
    const keys = Object.keys(reqBody);
    const idPlayer = reqBody[keys[0]!];

    addUserList(id, keys[0]!, idPlayer);
}
