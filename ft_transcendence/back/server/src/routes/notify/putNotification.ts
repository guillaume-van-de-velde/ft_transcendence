import { FastifyReply, FastifyRequest } from "fastify";
import { createNotify } from "../../db/crud/create";
import { userSockets } from "../../sockets/sockets";
import { readNotifyById, readUser } from "../../db/crud/read";
import { KeyUser } from "../../utils/enums";

export const putNotification = async (req: FastifyRequest, res: FastifyReply) => {
    const reqBody = (req.body as any);
    const id = req.user!.id;


    let idNotify;
    try {
        idNotify = await createNotify(id, reqBody.notify.for, reqBody.notify.type);
    } catch (err) {
        return;
    }
    if (!idNotify)
        return;

    let socketReceiver = null;
    for (const [socket, idReceiver] of userSockets) {
        if (idReceiver == reqBody.notify.for) {
            socketReceiver = socket;
            break;
        }
    }
    let notify;
    try {
        notify = await readNotifyById(idNotify);
    } catch (err) {
        notify = null;
    }
    if (socketReceiver) {
        let userDb;
        try {
            userDb = await readUser(notify.idTransmitter, KeyUser.ID, true);
        } catch (err) {
            userDb = null;
        }
        socketReceiver.emit("notify", {
            id: idNotify,
            user: userDb,
            type: notify.type,
            seen: false
        });
    }
} 