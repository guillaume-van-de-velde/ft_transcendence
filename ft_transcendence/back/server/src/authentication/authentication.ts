import { FastifyRequest, FastifyReply } from 'fastify'
import { readUser } from '../db/crud/read';
import { KeyUser } from '../utils/enums';
import jwt from 'jsonwebtoken';

export const authentication = async (req: FastifyRequest, res: FastifyReply) => {
    try {

        const authHeader = req.headers.authorization;
        if (!authHeader) return res.code(401).send({ error: "missing token" });

        const token = authHeader.split(' ')[1];

        let user;
        try {
            const payload = jwt.verify(token!, process.env.SECRET_KEY!);
            req.user = payload as any;
            user = await readUser(req.user!.id.toString(), KeyUser.ID);
        } catch (err) {
            return res.code(401).send({ error: "token refused" });
        }

        if (!user || user.version != req.user!.version)
            return res.code(401).send({ error: "token refused" });
    } catch (err: any) {
        return res.code(401).send({ error: "token refused" });
    }
}
