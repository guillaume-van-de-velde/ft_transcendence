import { FastifyReply, FastifyRequest } from "fastify";
import { deleteNotify } from "../../db/crud/z-delete";

export const removeNotification = async (req:FastifyRequest, res:FastifyReply) => {
    const reqBody = (req.body as any);
    const idNotify = reqBody.idNotify;

    await deleteNotify(idNotify);
}
