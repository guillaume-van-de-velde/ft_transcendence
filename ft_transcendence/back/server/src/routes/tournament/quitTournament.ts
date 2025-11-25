import { FastifyReply, FastifyRequest } from "fastify";
import { readTournament } from "../../db/crud/read";
import { KeyTournament, StatusTournament } from "../../utils/enums";
import { updateTournaments, updateUsers, updateUserTournaments } from "../../db/crud/update";
import { sendTournamentStateToPlayers, tournamentsManagement } from "./tournament";
import { gameManagement } from "../game/createGame";

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
                    const index = tournamentsManagement.findIndex(t => t.id == dataTournament.id);
                    const userIndex = tournamentsManagement[index]!.users.findIndex(u => u.user.id == id);
                    tournamentsManagement[index]!.users.splice(userIndex, 1);
                    sendTournamentStateToPlayers(index);
                    updateUserTournaments(dataTournament.name, 0, i);
                    break ;
                }
                case StatusTournament.START : {
                    let i = 1;
                    while (dataTournament[`id${i}`] != id && i <= 8)
                        i++;
                    if (i > 8)
                        break ;
                    const index = tournamentsManagement.findIndex(t => t.id == dataTournament.id);
                    const user = tournamentsManagement[index]!.users.find(u => u.user.id == id);
                    user!.quit = true;
                    for (const match of gameManagement!) {
                        if (match.booking && match.booking[0] == user?.user.id) {
                            const ennemy = tournamentsManagement[index]!.users.find(u => u.user.id == match.booking![1]);
                            if (!ennemy?.quit) {
                                ennemy!.queue = true;
                                ennemy!.finish = true;
                                ennemy!.level++;
                                updateTournaments(tournamentsManagement[index]!.id, tournamentsManagement[index]!.users.findIndex(t => t.user.id == ennemy!.user.id) + 1, ennemy!.level);
                            }
                        }
                        else if (match.booking && match.booking[1] == user?.user.id) {
                            const ennemy = tournamentsManagement[index]!.users.find(u => u.user.id == match.booking![0]);
                            if (!ennemy!.quit) {
                                ennemy!.queue = true;
                                ennemy!.finish = true;
                                ennemy!.level++;
                                updateTournaments(tournamentsManagement[index]!.id, tournamentsManagement[index]!.users.findIndex(t => t.user.id == ennemy!.user.id) + 1, ennemy!.level);
                            }
                        }
                    }
                    user!.queue = true;
                    user!.finish = true;
                    sendTournamentStateToPlayers(index);
                    break ;
                }
                default :
                    break ;
            }
            await updateUsers(id, "tournament", 0);
        }
    }
}