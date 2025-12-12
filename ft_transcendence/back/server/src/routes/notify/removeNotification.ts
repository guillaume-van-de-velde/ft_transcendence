import { FastifyReply, FastifyRequest } from "fastify";
import { deleteNotify } from "../../db/crud/delete";
import { readNotify } from "../../db/crud/read";

export const removeNotification = async (req: FastifyRequest, res: FastifyReply) => {
    const reqBody = (req.body as any);
    const idNotify = reqBody.idNotify;

    let notify;
    try {
        notify = await readNotify(idNotify);
    } catch (err) {
        notify = [];
    }

    for (const currentNotify of notify)
        if (currentNotify.id == idNotify)
            if (currentNotify.idReceiver != req.user!.id)
                return res.code(403).send({ error: "not authorised" });
    try {
        await deleteNotify(idNotify);
    } catch (err) {}
}
