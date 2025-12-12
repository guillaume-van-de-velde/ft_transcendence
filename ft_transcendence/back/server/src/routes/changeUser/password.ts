import { FastifyReply, FastifyRequest } from "fastify";
import { updateUsers } from "../../db/crud/update";
import { readUser } from "../../db/crud/read";
import { KeyUser } from "../../utils/enums";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { passwordValid } from "../connexion/formValidity";

export const changePassword = async (req: FastifyRequest, res: FastifyReply) => {
    const reqBody = (req.body as any);
    const oldpassword = reqBody.oldpassword;
    const id = req.user!.id;

    let password;
    if (!passwordValid(reqBody.newpassword))
        return res.code(409).send({ error: "bad format" });
    if (reqBody.newpassword != "")
        password = await bcrypt.hash(reqBody.newpassword, 1);
    else 
        return res.code(409).send({ error: "password void" });

    let user;
    try {
        user = await readUser(id.toString(), KeyUser.ID);
    
        if (!(await bcrypt.compare(oldpassword, user.password)))
            return res.code(401).send({ error: "password invalid" });
    
        updateUsers(id, "password", password);
        updateUsers(id, "version", user.version + 1);
    } catch (err) {
        return res.code(409).send({ error: "user doesn't exist" });
    }

    const token = jwt.sign(
        {
            id: user.id,
            version: user.version + 1
        },
        process.env.SECRET_KEY!,
        { expiresIn: '1d' }
    );
    return { token };
}