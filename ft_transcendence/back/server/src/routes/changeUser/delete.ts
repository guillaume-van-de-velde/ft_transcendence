import { FastifyReply, FastifyRequest } from "fastify";
import { readUser } from "../../db/crud/read";
import { KeyUser } from "../../utils/enums";
import { createCode } from "../connexion/code";

export const deleteAccount = async (req:FastifyRequest, res:FastifyReply) => {
    const id = req.user!.id;

    const user = await readUser(id.toString(), KeyUser.ID);

    createCode(user.email, user.password);
    return {flag: "good"};
}