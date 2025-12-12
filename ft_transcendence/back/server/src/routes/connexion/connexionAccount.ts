import { FastifyReply, FastifyRequest } from "fastify";
import { readUserWithEmail } from "../../db/crud/read";
import { Provisionnal } from "../../utils/enums";
import { createCode } from "./code";
import bcrypt from "bcrypt";
import { provisional } from "./sendPassword";
import { updateUsers } from "../../db/crud/update";
import { emailValid, passwordValid } from "./formValidity";

export const connexionAccount = async (req: FastifyRequest, res: FastifyReply) => {
    const email = (req.headers.email as string);
    const password = (req.headers.password as string);
    let user: any;

    if (!emailValid(email) || !passwordValid(password))
        return res.code(409).send({ error: "bad format" });

    try {
        user = await readUserWithEmail(email);
    } catch (err) {
        return res.code(409).send({ error: "email doesn't exist" });
    }
    if (!user)
        return res.code(409).send({ error: "email doesn't exist" });

    let pass: Provisionnal | null = null;
    for (const passCode of provisional) {
        if (passCode.email == email
            && (await bcrypt.compare(password, passCode.password)) && passCode.expire > Date.now()) {
            pass = passCode;
            try {
                await updateUsers(user.id, "password", passCode.password);
                await updateUsers(user.id, "version", user.version + 1);
            } catch (err) {}
        }
    }

    if (!pass && !(await bcrypt.compare(password, user.password)))
        return res.code(401).send({ error: "password invalid" });

    if (user.id) {
        createCode(email, password);
        return res.code(200).send({ flag: "ok" });
    }

    return res.code(409).send({ error: "error database" });
}