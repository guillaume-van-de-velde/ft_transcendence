import { FastifyReply, FastifyRequest } from "fastify";
import { getAllDataForUser } from "./getAllDataForUser";
import { readUser, readUserWithEmail } from "../../db/crud/read";
import { KeyUser } from "../../utils/enums";

export const connexionAccount = async (req:FastifyRequest, res:FastifyReply) => {
    // const authHeader = (req.headers.authorization as string);
    // const token = authHeader?.split(" ")[1];
    const email = (req.headers.email as string);
    const password = (req.headers.password as string);

    const user = await readUserWithEmail(email);

    if (user.password !== password)
        return null;

    if (user.id) {
        const data = await getAllDataForUser(user.id);
        return data;
    }

    return null;
}