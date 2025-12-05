import { FastifyRequest, FastifyReply } from 'fastify'
import { app } from '../../server';
import { readUser } from '../db/crud/read';
import { KeyUser } from '../utils/enums';
import jwt from 'jsonwebtoken';

export const authentication = async (req: FastifyRequest, res: FastifyReply) => {
    try {

        const authHeader = req.headers.authorization;
        if (!authHeader) return res.code(401).send("missing token");

        const token = authHeader.split(' ')[1];
        
        const payload = jwt.verify(token!, process.env.SECRET_KEY!);
        req.user = payload as any;
        const user = await readUser(req.user!.id.toString(), KeyUser.ID);

        if (!user || user.version != req.user!.version)
            return res.code(401).send("token refused");
    } catch (err: any) {
        return res.code(401).send("token refused");
    }
}
