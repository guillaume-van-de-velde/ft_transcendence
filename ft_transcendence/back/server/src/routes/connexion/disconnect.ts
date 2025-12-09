import { FastifyReply, FastifyRequest } from "fastify";
import { userSockets } from "../../sockets/sockets";

export const disconnect = async (req: FastifyRequest, res: FastifyReply) => {
    for (const [socket, id] of userSockets.entries()) {
        if (id === req.user!.id) {
            socket.disconnect();
            userSockets.delete(socket);
        }
    }
}