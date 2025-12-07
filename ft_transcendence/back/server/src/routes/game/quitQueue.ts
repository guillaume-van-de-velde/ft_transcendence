import { FastifyReply, FastifyRequest } from "fastify";
import { gameManagement } from "./createGame";
import { tournamentsManagement } from "../tournament/tournament";

export const quitQueue = async (req:FastifyRequest, res:FastifyReply) => {
    const reqBody = (req.body as any);
    const id = req.user!.id;
    const tournamentId = reqBody.tournament;

    if (tournamentId) {
        const tournament = tournamentsManagement.find(t => t.id == tournamentId);
        if (!tournament)
            return ;
        const userTournament = tournament?.users.find(u => u.user.id == id);
        if (userTournament!.level == tournament.round)
            userTournament!.queue = false;
        const match = gameManagement!.find(m => m.users[0]?.id == id); // ?
    }
    else {
        const index = gameManagement!.findIndex(m => m.users[0]?.id == id);
        if (index !== -1)
            gameManagement!.splice(index, 1);
    }
}