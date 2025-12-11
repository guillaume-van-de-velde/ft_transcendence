import { FastifyReply, FastifyRequest } from "fastify";
import { createTournament } from "../../db/crud/create";
import { updateUsers } from "../../db/crud/update";
import { KeyTournament, StatusTournament } from "../../utils/enums";
import { parseUsersTournament } from "../connexion/parse/usersTournament";
import { tournamentsManagement } from "./tournament";
import { readTournament } from "../../db/crud/read";

export const openTournament = async (req: FastifyRequest, res: FastifyReply) => {
    const reqBody = (req.body as any);
    const id = req.user!.id;
    const nameTournament = reqBody.name;
    const mode = reqBody.mode;

    const tournamentId = await createTournament(nameTournament, mode, id);
    await updateUsers(id, "tournament", tournamentId);
    const tournament = await readTournament(tournamentId, KeyTournament.ID);
    tournamentsManagement.push({
        id: tournamentId,
        status: StatusTournament.WAIT,
        time: 60,
        mode: mode,
        round: 0,
        users: await parseUsersTournament(tournament)
    });
    return {
        id: tournamentId,
        name: nameTournament
    };
}