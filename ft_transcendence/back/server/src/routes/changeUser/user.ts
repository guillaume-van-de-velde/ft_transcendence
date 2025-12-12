import { FastifyReply, FastifyRequest } from "fastify";
import { updateUsers } from "../../db/crud/update";

export const changeUser = async (req: FastifyRequest, res: FastifyReply) => {
    const reqBody = (req.body as any);
    const id = req.user!.id;

    const keys = Object.keys(reqBody);
    const value = reqBody[keys[0]!];

    try {
        await updateUsers(id, keys[0]!, value);
    } catch (err) {
        return res.code(409).send({ error: "user doesn't exist" });
    }
}