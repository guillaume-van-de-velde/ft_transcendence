import { FastifyReply, FastifyRequest } from "fastify";
import { deleteNotify } from "../../db/crud/z-delete";
import { readNotify } from "../../db/crud/read";
import { Notify } from "../../utils/enums";

export const takeOffNotification = async (req:FastifyRequest, res:FastifyReply) => {
    const reqBody = (req.body as any);
    const id = reqBody.id;

    const notifyList = await readNotify(reqBody.for);

    for (const notify of notifyList)
        if (notify.idTransmitter == id && notify.type == Notify.ASK)
            deleteNotify(notify.id);
}
