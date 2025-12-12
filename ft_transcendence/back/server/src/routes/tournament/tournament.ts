import { Socket } from "socket.io";
import { readTournament } from "../../db/crud/read";
import { updateStats, updateStatusTournaments, updateTournaments } from "../../db/crud/update";
import { KeyTournament, StatusTournament, Tournament } from "../../utils/enums";
import { userSockets } from "../../sockets/sockets";
import { gameManagement } from "../game/createGame";

export const tournamentsManagement: Tournament[] = [];

export async function updateStatsTournamentPlayer(tournament: Tournament) {
    try {
        for (const user of tournament.users) {
            if (user.level >= 3)
                await updateStats(user.user.id, "winsTournaments");
            await updateStats(user.user.id, "tournaments");
        }
    } catch (err) {}
}

export function sendTournamentStateToPlayers(index: number) {
    const tournament = tournamentsManagement![index];

    if (tournament) {
        for (const user of tournament.users) {
            const idUser = user.user.id;
            let socket: Socket | null = null;

            for (const [socketConnected, idConnected] of userSockets) {
                if (idConnected == idUser)
                    socket = socketConnected;
            }
            if (socket)
                socket!.emit("tournament", tournament);
        }
    }
}

function deleteBookings(tournament: Tournament) {
    for (const user of tournament.users) {
        for (const [index, match] of gameManagement!.entries()) {
            if (match.booking && (user.user.id == match.booking[0] || user.user.id == match.booking[1])) {
                gameManagement!.splice(index, 1);
                break;
            }
        }
    }
}

function allPlayerStartedMatch(tournament: Tournament): boolean {
    for (const user of tournament.users) {
        if (user.level == tournament.round && !user.quit && !user.queue)
            return false;
    }
    return true;
}

export function allPlayersFinishedMatch(tournament: Tournament): boolean {

    for (const user of tournament.users) {
        if (user.level == tournament.round && !user.quit && !user.finish)
            return false;
    }
    return true;
}

export function nextRound(tournament: Tournament) {
    tournament.round++;

    try {
        for (const [index, user] of tournament.users.entries()) {
            if (user.queue && !user.finish) {
                user.level++;
                updateTournaments(tournament.id, index + 1, user.level);
            }
            if (tournament.round == user.level) {
                user.queue = false;
                user.finish = false;
            }
        }
    } catch (err) {}
}

function createLobbys(tournament: Tournament) {
    const level = tournament.round;
    for (let i = 0; i < 8; i++) {
        if (tournament.users[i]!.level == level) {
            const player1Id = tournament.users[i]!.user.id;
            i++;
            while (i < 8 && tournament.users[i] && tournament.users[i]!.level != level)
                i++;
            if (i >= 8) {
                gameManagement!.push({
                    mode: tournament.mode,
                    users: [null, null],
                    sockets: [undefined, undefined],
                    booking: [player1Id, 0]
                });
            }
            else {
                const player2Id = tournament.users[i]!.user.id;
                if (player1Id && player2Id) {
                    gameManagement!.push({
                        mode: tournament.mode,
                        users: [null, null],
                        sockets: [undefined, undefined],
                        booking: [player1Id, player2Id]
                    });
                }
            }
        }
    }
}

export function updateTimerTournament(tournament: Tournament, index: number) {
    createLobbys(tournament);
    sendTournamentStateToPlayers(index);
    const interval = setInterval(timer, 1000);
    function timer() {
        if (tournament.time == 0 || allPlayersFinishedMatch(tournament)) {
            if (tournament.time == 0) {
                if (allPlayerStartedMatch(tournament) && !allPlayersFinishedMatch(tournament))
                    return;
            }
            nextRound(tournament);
            deleteBookings(tournament);
            if (tournament.round < 3) {
                tournament.time = 60;
                createLobbys(tournament);
            }
            else {
                clearInterval(interval);
                try {
                    updateStatusTournaments(tournament.id, StatusTournament.FINISHED);
                    tournament.status = StatusTournament.FINISHED;
                    sendTournamentStateToPlayers(index);
                    updateStatsTournamentPlayer(tournament);
                } catch (err) {}
                tournamentsManagement.splice(index, 1);
                return;
            }
            sendTournamentStateToPlayers(index);
        }
        else
            tournament.time--;
    }
}

export async function startTournament(id: number) {
    let tournamentDb;
    try {
        tournamentDb = await readTournament(id, KeyTournament.ID);
    } catch (err) {
        tournamentDb = null;
    }
    updateTimerTournament(tournamentsManagement.find(t => t.id == tournamentDb.id)!, tournamentsManagement.findIndex(t => t.id == tournamentDb.id)!);
}