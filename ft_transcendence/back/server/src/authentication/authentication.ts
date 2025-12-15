import { FastifyRequest, FastifyReply } from 'fastify'
import { readUser } from '../db/crud/read';
import { KeyUser } from '../utils/enums';
import jwt from 'jsonwebtoken';

export function containsXSSPayload(input: any): boolean {
    if (!input) return false;

    const patterns = [
        /<script/i,
        /<\/script/i,
        /javascript:/i,
        /on\w+=/i,
        /<iframe/i,
        /<img/i,
        /<svg/i
    ];

    const text = JSON.stringify(input);
    return patterns.some((r) => r.test(text));
}

export const authentication = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (containsXSSPayload(authHeader))
            return res.code(400).send({ error: "XSS detected in headers" });
        
        if (containsXSSPayload(req.body)) {
            return res.code(400).send({ error: "XSS detected in body" });
        }
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
