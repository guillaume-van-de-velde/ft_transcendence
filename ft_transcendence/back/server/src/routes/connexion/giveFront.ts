import { FastifyReply, FastifyRequest } from "fastify";
import path from "path";

export const giveFront = async (req: FastifyRequest, res: FastifyReply) => {
    const absolutePath = path.join(process.env.FRONT_PATH!, "index.html");
    const fs = require('fs');
    try {
        const content = fs.readFileSync(absolutePath, 'utf8');
        res.type('text/html').send(content);
    } catch (error) {
        res.status(500).send({ error: "error load" });
    }
}