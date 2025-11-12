import { FastifyReply, FastifyRequest } from "fastify";
import { createNotify } from "../../db/crud/create";

export const putNotification = async (req:FastifyRequest, res:FastifyReply) => {
    const reqBody = (req.body as any);
    const id = reqBody.id;

    await createNotify(id, reqBody.notify.for, reqBody.notify.type);
}