import { FastifyReply, FastifyRequest } from "fastify";
import { getAllDataForUser } from "./getAllDataForUser";
import { readUser } from "../../db/crud/read";
import { KeyUser } from "../../utils/enums";
import jwt from "jsonwebtoken"
import { userSockets } from "../../sockets/sockets";

export const tryToConnect = async (req:FastifyRequest, res:FastifyReply) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.code(401).send({ error: "missing token" });
        
        const token = authHeader.split(' ')[1];
        const payload = jwt.verify(token!, process.env.SECRET_KEY!);
        req.user = payload as any;
        if (!req.user)
            throw "noUser";
        const user = await readUser(req.user.id.toString(), KeyUser.ID);
        if (!user || user.version != req.user.version)
            return res.code(401).send("token refused");
        for (const id of userSockets.values())
            if (id == user.id)
                return res.code(409).send({ error: "user connected" });
    } catch (err: any) {
        return res.code(200).send({ error: "invalid token" });
    }
    if (req.user.id) {
        const data = await getAllDataForUser(req.user.id);
        return { data };
    }
    return res.code(500).send({ error: "error server" });
}