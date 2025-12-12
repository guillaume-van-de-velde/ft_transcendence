import { FastifyReply, FastifyRequest } from "fastify";
import { readUser } from "../../db/crud/read";
import { KeyUser } from "../../utils/enums";

export const findPlayer = async (req: FastifyRequest, res: FastifyReply) => {
    const pseudo = (req.headers.pseudo as string);

    let user;
    try {
        user = readUser(pseudo, KeyUser.PSEUDO, true);
    } catch (err) {
        user = null;
    }
    return user;
}