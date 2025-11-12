import { FastifyReply, FastifyRequest } from "fastify";
import { updateUsers } from "../../db/crud/update";

export const changeUser = async (req:FastifyRequest, res:FastifyReply) => {
    const reqBody = (req.body as any);
    const id = reqBody.id;
    const keys = Object.keys(reqBody);
    const value = reqBody[keys[1]!];

    await updateUsers(id, keys[1]!, value);
}