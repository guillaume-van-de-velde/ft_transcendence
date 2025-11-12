import { FastifyReply, FastifyRequest } from "fastify";
import { readTournament } from "../../db/crud/read";
import { KeyTournament, StatusTournament } from "../../utils/enums";
import { updateUsers, updateUserTournaments } from "../../db/crud/update";

export const quitTournament = async (req:FastifyRequest, res:FastifyReply) => {
    const reqBody = (req.body as any);
    const id = reqBody.id;
    const idTournament = reqBody.tournament;

    if (idTournament) {
        const dataTournament = await readTournament(idTournament, KeyTournament.ID);
        if (dataTournament) {
            switch (dataTournament.status) {
                case StatusTournament.WAIT : {
                    let i = 1;
                    while (dataTournament[`id${i}`] != id && i <= 8)
                        i++;
                    if (i > 8)
                        break ;
                    updateUserTournaments(dataTournament.name, 0, i);
                    break ;
                }
                case StatusTournament.START : {
                    let i = 1;
                    while (dataTournament[`id${i}`] != id && i <= 8)
                        i++;
                    if (i > 8)
                        break ;
                    updateUserTournaments(dataTournament.name, dataTournament[`id${i}`], -1);
                    break ;
                }
                default :
                    break ;
            }
            await updateUsers(id, "tournament", 0);
        }
    }
}