import { FastifyReply, FastifyRequest } from "fastify";
import { readUser } from "../../db/crud/read";
import { KeyUser } from "../../utils/enums";
import { createCode } from "../connexion/code";

export const deleteAccount = async (req: FastifyRequest, res: FastifyReply) => {
    const id = req.user!.id;

    let user;
    try {
        user = await readUser(id.toString(), KeyUser.ID);
    } catch (err) {
        return res.code(409).send({ error: "user doesn't exist" });
    }

    createCode(user.email, user.password);
    return { flag: "good" };
}