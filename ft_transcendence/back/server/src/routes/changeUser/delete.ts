import { FastifyReply, FastifyRequest } from "fastify";
import { readUser } from "../../db/crud/read";
import { KeyUser } from "../../utils/enums";
import { createCode } from "../connexion/code";

export const deleteAccount = async (req:FastifyRequest, res:FastifyReply) => {
    const reqBody = (req.body as any);
    const id = reqBody.id;

    if (id != req.user!.id)
        return res.code(403).send({message: "not authorised"});

    const user = await readUser(id, KeyUser.ID);

    createCode(user.email, user.password);
    return {flag: "good"};
}