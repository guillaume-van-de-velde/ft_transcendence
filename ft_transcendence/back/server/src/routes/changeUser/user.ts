import { FastifyReply, FastifyRequest } from "fastify";
import { updateUsers } from "../../db/crud/update";
import { pseudoValid } from "../connexion/formValidity";

export const changeUser = async (req: FastifyRequest, res: FastifyReply) => {
    const reqBody = (req.body as any);
    const id = req.user!.id;

    const keys = Object.keys(reqBody);
    const value = reqBody[keys[0]!];

    if (keys[0] == "pseudo") {
        if (!pseudoValid(value))
            return res.code(409).send({ error: "pseudo too large" });
    }
    try {
        await updateUsers(id, keys[0]!, value);
    } catch (err) {
        return res.code(409).send({ error: "user doesn't exist" });
    }
}