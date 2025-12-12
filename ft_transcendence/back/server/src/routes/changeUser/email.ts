import { FastifyReply, FastifyRequest } from "fastify";
import { readUser } from "../../db/crud/read";
import { KeyUser } from "../../utils/enums";
import { createCode } from "../connexion/code";

export const changeEmail = async (req: FastifyRequest, res: FastifyReply) => {
    const reqBody = (req.body as any);
    const id = req.user!.id;
    const newEmail = reqBody.email;

    let userId: number = 0;

    try {
        userId = await readUser(newEmail, KeyUser.EMAIL);
        if (userId)
            return res.code(409).send({ error: "email exist" });
    } catch (err) {
        return res.code(409).send({ error: "database error" });
    }

    let user;
    try {
        user = await readUser(id.toString(), KeyUser.ID);
    } catch (err) {
        return res.code(409).send({ error: "user doesn't exist" });
    }

    createCode(user.email, user.password, user.language, user.pseudo, newEmail);
    return { flag: "good" };
}