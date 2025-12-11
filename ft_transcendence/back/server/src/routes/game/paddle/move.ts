import { FastifyReply, FastifyRequest } from "fastify";
import { gameManagement } from "../createGame";

export const movePaddle = async (req: FastifyRequest, res: FastifyReply) => {
    const direction = (req.body as any).direction;

    if (!gameManagement)
        return;
    const index = gameManagement?.findIndex(m => m.users[0]?.id == req.user?.id || m.users[1]?.id == req.user!.id);
    if (index == -1 || !gameManagement[index]!.renderGameAPI)
        return;
    const player = gameManagement[index]!.users[0]!.id == req.user!.id ? 1 : 2;
    gameManagement[index]!.renderGameAPI.move(player, direction);
}