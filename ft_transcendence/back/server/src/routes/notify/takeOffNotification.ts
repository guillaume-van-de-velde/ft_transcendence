import { FastifyReply, FastifyRequest } from "fastify";
import { deleteNotify } from "../../db/crud/delete";
import { readNotify } from "../../db/crud/read";
import { Notify } from "../../utils/enums";

export const takeOffNotification = async (req: FastifyRequest, res: FastifyReply) => {
    const reqBody = (req.body as any);
    const id = req.user!.id;

    let notifyList;
    try {
        notifyList = await readNotify(reqBody.for);
    } catch (err) {
        notifyList = [];
    }

    for (const notify of notifyList) {
        if (notify.idTransmitter == id && notify.type == Notify.ASK) {
            if (notify.idTransmitter != req.user!.id)
                return res.code(403).send({ error: "not authorised" });
            try {
                deleteNotify(notify.id);
            } catch (err) {}
        }
    }
}
