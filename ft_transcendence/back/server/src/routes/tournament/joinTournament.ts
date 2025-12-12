import { FastifyReply, FastifyRequest } from "fastify";
import { readTournament, readUser } from "../../db/crud/read";
import { KeyTournament, KeyUser, StatusTournament } from "../../utils/enums";
import { updateStatusTournaments, updateUsers, updateUserTournaments } from "../../db/crud/update";
import { sendTournamentStateToPlayers, startTournament, tournamentsManagement } from "./tournament";

export const joinTournament = async (req: FastifyRequest, res: FastifyReply) => {
    const reqBody = (req.body as any);
    const id = req.user!.id;
    const nameTournament = reqBody.name;

    let searchTournament;
    try {
        searchTournament = await readTournament(nameTournament, KeyTournament.NAME);
    } catch (err) {
        searchTournament = null;
    }
    if (searchTournament) {
        let i = 1;
        while (searchTournament[`id${i}`])
            i++;
        if (i <= 8) {
            try {
                await updateUserTournaments(nameTournament, id, i);
                await updateUsers(id, "tournament", searchTournament.id);
            } catch (err) {
                return res.status(409).send({ error: "error database" });
            }

            const index = tournamentsManagement.findIndex(t => t.id == searchTournament.id);
            let user;
            try {
                user = await readUser(id.toString(), KeyUser.ID, true);
            } catch (err) {
                user = null;
            }
            if (!user)
                return res.status(409).send({ error: "error database" });
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
                try {
                    await updateStatusTournaments(searchTournament.id, StatusTournament.START);
                } catch (err) {}
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

            return;
        }
    }
}