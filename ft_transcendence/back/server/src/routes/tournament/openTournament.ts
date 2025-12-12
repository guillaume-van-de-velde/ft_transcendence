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
    const mode = reqBody.mode[0]! + "O" + "T";

    const tournamentId = await createTournament(nameTournament, mode, id);
    try {
        await updateUsers(id, "tournament", tournamentId);
    } catch (err) {}
    let tournament;
    try {
        tournament = await readTournament(tournamentId, KeyTournament.ID);
    } catch (err) {
        tournament = null;
    }
    const usersDb = await parseUsersTournament(tournament);
    tournamentsManagement.push({
        id: tournamentId,
        status: StatusTournament.WAIT,
        time: 60,
        mode: mode,
        round: 0,
        users: usersDb
    });
    return {
        id: tournamentId,
        name: nameTournament
    };
}