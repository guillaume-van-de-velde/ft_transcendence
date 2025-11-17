import { FastifyReply, FastifyRequest } from "fastify";
import { readTournament } from "../../db/crud/read";
import { KeyTournament } from "../../utils/enums";
import { updateUsers, updateUserTournaments } from "../../db/crud/update";
import { parseUsersTournament } from "../connexion/parse/usersTournament";

export const joinTournament = async (req:FastifyRequest, res:FastifyReply) => {
    const reqBody = (req.body as any);
    const id = reqBody.id;
    const nameTournament = reqBody.name;

    const searchTournament = await readTournament(nameTournament, KeyTournament.NAME);
    if (searchTournament) {
        let i = 1;
        while (searchTournament[`id${i}`])
            i++;
        if (i <= 8) {
            await updateUserTournaments(nameTournament, id, i);
            await updateUsers(id, "tournament", searchTournament.id);

            return {
                id: searchTournament.id,
                name: nameTournament,
                users: await parseUsersTournament(await readTournament(nameTournament, KeyTournament.NAME))
            };
        }
    }
}