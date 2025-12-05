import { FastifyReply, FastifyRequest } from "fastify";
import { updateUsers } from "../../db/crud/update";
import { readUser } from "../../db/crud/read";
import { KeyUser, Verify } from "../../utils/enums";
import { createCode } from "../connexion/code";

export const changeEmail = async (req:FastifyRequest, res:FastifyReply) => {
    const reqBody = (req.body as any);
    const id = reqBody.id;
    const newEmail = reqBody.email;

    if (id != req.user!.id)
        return res.code(403).send({message: "not authorised"});

    let userId:number = 0;

    try {
        userId = await readUser(newEmail, KeyUser.EMAIL);
        if (userId)
            return res.code(409).send("email exists");
    } catch (err) {
        return res.code(409).send("database error");
    }
    
    const user = await readUser(id, KeyUser.ID);

    createCode(user.email, user.password, user.pseudo, newEmail);
    return {flag: "good"};
}