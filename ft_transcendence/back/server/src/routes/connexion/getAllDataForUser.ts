import { readStats, readTournament, readUser } from "../../db/crud/read";
import { KeyTournament, KeyUser, UserResponse } from "../../utils/enums";
import { parseHistory } from "./parse/history";
import { parseFriends } from "./parse/friends";
import { parsePrivateMessages } from "./parse/privateMessages";
import { parseGlobalMessages } from "./parse/globalMessages";
import { parseNotify } from "./parse/notify";
import { parseUsersTournament } from "./parse/usersTournament";
import { parseBlocked } from "./parse/blocked";

export async function getAllDataForUser(idAsk: number) {
    let userData;
    try {
        userData = await readUser(idAsk.toString(), KeyUser.ID);
    } catch (err) {
        return null;
    }
    const id = userData.id;
    let userStats;
    try {
        userStats = await readStats(id);
    } catch (err) {
        userStats = null;
    }
    let userTournament;

    if (userData.tournament) {
        try {
            userTournament = await readTournament(userData.tournament, KeyTournament.ID);
        } catch (err) {
            userTournament = null;
        }
    }

    const result: UserResponse = {
        id: id,
        settings: {
            volume: {
                general: userData.general,
                noises: userData.noises,
                music: userData.music
            },
            key: {
                player1: {
                    up: userData.player1KeyUp,
                    down: userData.player1KeyDown
                },
                player2: {
                    up: userData.player2KeyUp,
                    down: userData.player2KeyDown
                }
            },
            account: {
                email: userData.email,
                pseudo: userData.pseudo
            },
            language: userData.language
        },
        profile: {
            picture: userData.picture,
            stats: {
                played: userStats.played,
                ratio: userStats.wins ? Number(Math.round(100 * userStats.wins / userStats.played) / 100) : 0,
                tournaments: userStats.tournaments,
                winsTournaments: userStats.winsTournaments
            },
            history: await parseHistory(id),
            friends: await parseFriends(userData.friends),
            blocked: await parseBlocked(userData.blocked)
        },
        messages: {
            private: await parsePrivateMessages(id),
            global: await parseGlobalMessages(),
            notify: await parseNotify(id, userData.blocked)
        },
        mode: {
            set: userData.mode,
            ...(userTournament?.id && {
                tournament: {
                    id: userTournament.id,
                    status: userTournament.status,
                    time: 60,
                    mode: userTournament.mode,
                    round: 0,
                    users: await parseUsersTournament(userTournament)
                }
            })
        }
    };
    return (result);
}
