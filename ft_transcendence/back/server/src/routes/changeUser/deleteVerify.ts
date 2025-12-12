import { FastifyReply, FastifyRequest } from "fastify";
import { verifyCodes } from "../connexion/code";
import { updateUsers } from "../../db/crud/update";
import { readUser } from "../../db/crud/read";
import { KeyUser } from "../../utils/enums";

export const deleteAccountVerify = async (req: FastifyRequest, res: FastifyReply) => {
    const codeReq = parseInt(req.headers.code as string);

    for (const verifyCode of verifyCodes) {
        if (verifyCode.code === codeReq) {
            const { expire, email } = verifyCode;
            verifyCodes.splice(verifyCodes.findIndex(v => v.code == verifyCode.code), 1);
            if (expire < Date.now()) {
                return res.code(401).send({ error: "code expire" });
            }
            try {
                const user = await readUser(email, KeyUser.EMAIL);
                updateUsers(user.id, "email", `delete${user.id}`);
                updateUsers(user.id, "password", `delete`);
                updateUsers(user.id, "pseudo", `delete${user.id}`);
                updateUsers(user.id, "picture", `https://www.nicepng.com/png/detail/115-1150821_default-avatar-comments-sign-in-icon-png.png`);
                updateUsers(user.id, "version", 0);
            } catch (err) {
                return res.code(409).send({ error: "user doesn't exist" });
            }
            return { delete: "ok" };
        }
    }
    return res.code(401).send({ error: "code incorrect" });
}