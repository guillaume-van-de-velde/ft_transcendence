import { FastifyReply, FastifyRequest } from "fastify";
import { readMatches, readNotify, readStats, readUser } from "../../db/crud/read";
import { parseHistory } from "../connexion/parse/history";
import { KeyUser, Link, Notify } from "../../utils/enums";
import { userSockets } from "../../sockets/sockets";

export async function parseLink(id:number, idAsked:number): Promise<Link> {
    const user = await readUser(id.toString(), KeyUser.ID, false);

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

    const notifyList = await readNotify(idAsked);
    if (notifyList && notifyList[0]) {
        for (const notify of notifyList)
            if (notify.idTransmitter == id && notify.type == Notify.ASK)
                return Link.SENT;
    }

    return Link.NONE;
}

export const getDataPlayer = async (req:FastifyRequest, res:FastifyReply) => {
    const id = req.user!.id;
    const idAsked = parseInt((req.headers.idasked as string));

    const playerStats = await readStats(idAsked);

    let isOnline = false;
    for (const id of userSockets.values())
        if (id == idAsked)
            isOnline = true;

    return {
        link: await parseLink(id, idAsked),
        user: await readUser(idAsked.toString(), KeyUser.ID, true),
        stats: {
            played: playerStats.played,
            ratio: playerStats.played ? (playerStats.loses ? playerStats.wins / playerStats.loses : 1) : 0,
            tournaments: playerStats.tournaments,
            winsTournaments: playerStats.winsTournaments
        },
        history: await parseHistory(idAsked),
        online: isOnline
    }
}