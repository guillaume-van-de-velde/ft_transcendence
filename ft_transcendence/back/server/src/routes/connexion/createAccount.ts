import { FastifyReply, FastifyRequest } from "fastify";
import { createStat, createUser } from "../../db/crud/create";
import { getAllDataForUser } from "./getAllDataForUser";

export const createAccount = async (req:FastifyRequest, res:FastifyReply) => {
    const reqBody = (req.body as any);
    const { email, password, pseudo } = reqBody;
    
    const userId = await createUser(email, password, pseudo, "https://www.nicepng.com/png/detail/115-1150821_default-avatar-comments-sign-in-icon-png.png");

    await createStat(userId);
    
    const data = await getAllDataForUser(userId);
    
    return data;
}