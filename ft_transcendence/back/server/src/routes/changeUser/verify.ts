import { FastifyReply, FastifyRequest } from "fastify";
import { updateUsers } from "../../db/crud/update";
import { verifyCodes } from "../connexion/code";
import { readUserWithEmail } from "../../db/crud/read";

export const verifyEmail = async (req: FastifyRequest, res: FastifyReply) => {
    const codeReq = parseInt(req.headers.code as string);
    let user: any;

    for (const verifyCode of verifyCodes) {
        if (verifyCode.code === codeReq) {
            const { expire, email, newEmail } = verifyCode;
            verifyCodes.splice(verifyCodes.findIndex(v => v.code == verifyCode.code), 1);
            if (!newEmail)
                break;
            if (expire < Date.now()) {
                return res.code(401).send({ error: "code expire" });
            }
            try {
                user = await readUserWithEmail(email);
                updateUsers(user.id, "email", newEmail);
            } catch (err) {
                return res.code(409).send({ error: "user doesn't exist" })
            }
            return { email: newEmail };
        }
    }
    return res.code(401).send({ error: "code incorrect" });
}