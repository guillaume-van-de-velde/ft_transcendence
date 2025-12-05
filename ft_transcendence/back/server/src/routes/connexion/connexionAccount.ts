import { FastifyReply, FastifyRequest } from "fastify";
import { getAllDataForUser } from "./getAllDataForUser";
import { readUser, readUserWithEmail } from "../../db/crud/read";
import { KeyUser, Provisionnal } from "../../utils/enums";
import { app } from "../../../server";
import { createCode } from "./code";
import bcrypt from "bcrypt";
import { provisional } from "./sendPassword";
import { updateUsers } from "../../db/crud/update";

export const connexionAccount = async (req:FastifyRequest, res:FastifyReply) => {
    const email = (req.headers.email as string);
    const password = (req.headers.password as string);
    let user:any;

    try {
        user = await readUserWithEmail(email);
    } catch (err) {
        return res.code(409).send("email doesn't exist");
    }

    let pass: Provisionnal | null = null;
    for (const passCode of provisional)  {
        if (passCode.email == email
         && (await bcrypt.compare(password, passCode.password)) && passCode.expire > Date.now()) {
            pass = passCode;
            await updateUsers(user.id, "password", passCode.password);
            updateUsers(user.id, "version", user.version + 1);
        }
    }

    if (!pass && !(await bcrypt.compare(password, user.password)))
        return res.code(401).send("password not valid");

    if (user.id) {
        createCode(email, password);
        return res.code(200).send({flag: "ok"});
    }

    return res.code(500).send("error server");
}