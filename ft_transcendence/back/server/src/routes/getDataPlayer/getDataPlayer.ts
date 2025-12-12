import { FastifyReply, FastifyRequest } from "fastify";
import { readNotify, readStats, readUser } from "../../db/crud/read";
import { parseHistory } from "../connexion/parse/history";
import { KeyUser, Link, Notify } from "../../utils/enums";
import { userSockets } from "../../sockets/sockets";

export async function parseLink(id: number, idAsked: number): Promise<Link> {
    let user;
    try {
        user = await readUser(id.toString(), KeyUser.ID, false);
    } catch (err) {
        return Link.NONE;
    }

    if (user.friends && user.friends[0]) {
        const friendsList = user.friends?.split(",");
        for (const friend of friendsList)
            if (friend == idAsked)
                return Link.FRIEND;
    }
    if (user.blocked && user.blocked[0]) {
        const blockedList = user.blocked?.split(",");
        for (const blocked of blockedList)
            if (blocked == idAsked)
                return Link.BLOCKED;
    }

    let notifyList;
    try {
        notifyList = await readNotify(idAsked);
    } catch (err) {
        return Link.NONE;
    }
    if (notifyList && notifyList[0]) {
        for (const notify of notifyList)
            if (notify.idTransmitter == id && notify.type == Notify.ASK)
                return Link.SENT;
    }

    return Link.NONE;
}

export const getDataPlayer = async (req: FastifyRequest, res: FastifyReply) => {
    const id = req.user!.id;
    const idAsked = parseInt((req.headers.idasked as string));

    let playerStats;
    try {
        playerStats = await readStats(idAsked);
    } catch (err) {
        playerStats = null;
    }

    let isOnline = false;
    for (const id of userSockets.values())
        if (id == idAsked)
            isOnline = true;
    
    let linkDb;
    let userDb;
    let historyDb;

    try {
        linkDb = await parseLink(id, idAsked);
        userDb = await readUser(idAsked.toString(), KeyUser.ID, true);
        historyDb = await parseHistory(idAsked);
    } catch (err) {
        linkDb = null;
        userDb = null;
        historyDb = null;
    }

    return {
        link: linkDb,
        user: userDb,
        stats: {
            played: playerStats.played,
            ratio: playerStats.wins ? Number(Math.round(100 * playerStats.wins / playerStats.played) / 100) : 0,
            tournaments: playerStats.tournaments,
            winsTournaments: playerStats.winsTournaments
        },
        history: historyDb,
        online: isOnline
    }
}