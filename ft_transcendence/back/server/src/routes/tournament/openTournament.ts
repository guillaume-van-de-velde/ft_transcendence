import { FastifyReply, FastifyRequest } from "fastify";
import { createTournament } from "../../db/crud/create";
import { updateUsers } from "../../db/crud/update";

export const openTournament = async (req:FastifyRequest, res:FastifyReply) => {
    const reqBody = (req.body as any);
    const id = reqBody.id;
    const nameTournament = reqBody.name;

    const tournament = await createTournament(nameTournament, id);
    await updateUsers(id, "tournament", tournament);
    return {
        id: tournament,
        name: nameTournament
    };
}