import { FastifyReply, FastifyRequest } from "fastify";
import { createNotify } from "../../db/crud/create";
import { userSockets } from "../../sockets/sockets";
import { readNotifyById, readUser } from "../../db/crud/read";
import { KeyUser } from "../../utils/enums";

export const putNotification = async (req: FastifyRequest, res: FastifyReply) => {
    const reqBody = (req.body as any);
    const id = req.user!.id;


    const idNotify = await createNotify(id, reqBody.notify.for, reqBody.notify.type);
    if (!idNotify)
        return;

    let socketReceiver = null;
    for (const [socket, idReceiver] of userSockets) {
        if (idReceiver == reqBody.notify.for) {
            socketReceiver = socket;
            break;
        }
    }
    if (socketReceiver) {
        const notify = await readNotifyById(idNotify);
        socketReceiver.emit("notify", {
            id: idNotify,
            user: await readUser(notify.idTransmitter, KeyUser.ID, true),
            type: notify.type,
            seen: false
        });
    }
} 