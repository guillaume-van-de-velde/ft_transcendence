import { FastifyReply, FastifyRequest } from "fastify";
import { KeyUser } from "../../utils/enums";
import { readUser } from "../../db/crud/read";
import { createCode } from "./code";
import bcrypt from "bcrypt";
import { emailValid, passwordValid, pseudoValid } from "./formValidity";

export const createAccount = async (req: FastifyRequest, res: FastifyReply) => {
    const reqBody = (req.body as any);
    const { email, pseudo, language } = reqBody;
    const password = await bcrypt.hash(reqBody.password, 1);
    let userId: number = 0;

    if (!emailValid(email) || !passwordValid(reqBody.password) || !pseudoValid(pseudo))
        return res.code(409).send({ error: "bad format" });

    try {
        userId = await readUser(email, KeyUser.EMAIL, true);
        if (userId)
            return res.code(409).send({ error: "email exist" });
        userId = await readUser(pseudo, KeyUser.PSEUDO, true);
        if (userId)
            return res.code(409).send({ error: "pseudo exist" });
    } catch (err) {
        return res.code(409).send({ error: "database error" });
    }

    await createCode(email, password, language, pseudo);

    return res.code(200).send({ flag: "ok" });
}