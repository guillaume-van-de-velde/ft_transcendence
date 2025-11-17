import { FastifyReply, FastifyRequest } from "fastify";
import { readMatches, readStats, readUser } from "../../db/crud/read";
import { parseHistory } from "../connexion/parse/history";
import { KeyUser } from "../../utils/enums";

export const getDataPlayer = async (req:FastifyRequest, res:FastifyReply) => {
    const id = parseInt((req.headers.id as string));

    const playerStats = await readStats(id);

    return {
        user: await readUser(id.toString(), KeyUser.ID, true),
        stats: {
            played: playerStats.played,
            ratio: playerStats.played ? (playerStats.loses ? playerStats.wins / playerStats.loses : 1) : 0,
            tournaments: playerStats.tournaments,
            winsTournaments: playerStats.winsTournaments
        },
        history: await parseHistory(id)
    }
}