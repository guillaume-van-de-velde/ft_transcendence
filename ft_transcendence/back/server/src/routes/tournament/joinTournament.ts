import { FastifyReply, FastifyRequest } from "fastify";
import { readTournament, readUser } from "../../db/crud/read";
import { KeyTournament, KeyUser, StatusTournament, Tournament } from "../../utils/enums";
import { updateStatusTournaments, updateUsers, updateUserTournaments } from "../../db/crud/update";
import { parseUsersTournament } from "../connexion/parse/usersTournament";
import { userSockets } from "../../sockets/sockets";
import { Socket } from "socket.io";
import { sendTournamentStateToPlayers, startTournament, tournamentsManagement } from "./tournament";

export const joinTournament = async (req:FastifyRequest, res:FastifyReply) => {
    const reqBody = (req.body as any);
    const id = req.user!.id;
    const nameTournament = reqBody.name;

    const searchTournament = await readTournament(nameTournament, KeyTournament.NAME);
    if (searchTournament) {
        let i = 1;
        while (searchTournament[`id${i}`])
            i++;
        if (i <= 8) {
            await updateUserTournaments(nameTournament, id, i);
            await updateUsers(id, "tournament", searchTournament.id);

            const index = tournamentsManagement.findIndex(t => t.id == searchTournament.id);
            const user = await readUser(id.toString(), KeyUser.ID, true);
            tournamentsManagement[index]!.users.push({
                user: {
                    id: user.id,
                    picture: user.picture,
                    pseudo: user.pseudo
                },
                level: 0,
                queue: false,
                finish: false,
                quit: false
            });

            sendTournamentStateToPlayers(index);
            if (i == 8) {
                await updateStatusTournaments(searchTournament.id, StatusTournament.START);
                tournamentsManagement[index]!.status = StatusTournament.START;
                sendTournamentStateToPlayers(index);
                setImmediate(() => {
                    startTournament(searchTournament.id);
                })
            }
            res.send({
                id: searchTournament.id,
                name: nameTournament,
                mode: searchTournament.mode,
                round: 0,
                status: tournamentsManagement[index]!.status,
                users: tournamentsManagement[index]!.users
            });
            setImmediate(() => {
                sendTournamentStateToPlayers(index);
            })

            return ;
        }
    }
}