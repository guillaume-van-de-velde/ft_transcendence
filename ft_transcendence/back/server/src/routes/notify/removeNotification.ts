import { FastifyReply, FastifyRequest } from "fastify";
import { deleteNotify } from "../../db/crud/z-delete";
import { readNotify } from "../../db/crud/read";

export const removeNotification = async (req:FastifyRequest, res:FastifyReply) => {
    const reqBody = (req.body as any);
    const idNotify = reqBody.idNotify;

    const notify = await readNotify(idNotify);

    for (const currentNotify of notify)
        if (currentNotify.id == idNotify)
            if (currentNotify.idReceiver != req.user!.id)
                return res.code(403).send({ error: "not authorised" });
    await deleteNotify(idNotify);
}
