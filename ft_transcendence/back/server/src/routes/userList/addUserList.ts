import { FastifyReply, FastifyRequest } from "fastify";
import { readNotifyById, readUser } from "../../db/crud/read";
import { KeyUser } from "../../utils/enums";
import { updateUsers } from "../../db/crud/update";
import { deleteNotify } from "../../db/crud/delete";
import { userSockets } from "../../sockets/sockets";

export async function addUserList(id: any, key: string, value: any) {
    let ArrayUser: string[];
    try {
        ArrayUser = await readUser(id, KeyUser.ID).then(user => user[key!].split(','));
    } catch (err) {
        ArrayUser = []
    }
    if (ArrayUser[0] === "")
        ArrayUser[0] = value;
    else
        ArrayUser.push(value);
    const listUser = ArrayUser.join(',');
    try {
        await updateUsers(id, key!, listUser);
    } catch (err) {}
}

export const addPlayerToFriendList = async (req: FastifyRequest, res: FastifyReply) => {
    const reqBody = (req.body as any);
    const idNotify = reqBody.idNotify;
    let notify: any;

    try {
        notify = await readNotifyById(idNotify);
    } catch (err) {
        return res.code(404).send({ error: "notify not found" });
    }

    if (notify.idReceiver != req.user!.id)
        return res.code(403).send({ error: "not authorised" });

    addUserList(notify.idTransmitter, "friends", notify.idReceiver);
    addUserList(notify.idReceiver, "friends", notify.idTransmitter);

    try {
        deleteNotify(idNotify);
    } catch (err) {}

    let socketTransmitter = null;
    for (const [socket, id] of userSockets) {
        if (id == notify.idTransmitter) {
            socketTransmitter = socket;
            break;
        }
    }
    if (socketTransmitter) {
        try {
            socketTransmitter.emit("friend", await readUser(notify.idReceiver, KeyUser.ID, true));
        } catch (err) {}
    }

    let returnRes;
    try {
        returnRes = await readUser(notify.idTransmitter, KeyUser.ID, true);
    } catch (err) {
        returnRes = null;
    }
    return returnRes;
}

export const addPlayerToBlockedList = async (req: FastifyRequest, res: FastifyReply) => {
    const reqBody = (req.body as any);
    const id = req.user!.id;
    const keys = Object.keys(reqBody);
    const idPlayer = reqBody[keys[0]!];

    addUserList(id, keys[0]!, idPlayer);
}
