import { FastifyReply, FastifyRequest } from "fastify";
import { deleteNotify } from "../../db/crud/z-delete";
import { readNotifyById, readUser } from "../../db/crud/read";
import { KeyUser } from "../../utils/enums";
import { gameManagement } from "./createGame";
import { userSockets } from "../../sockets/sockets";
import { createPrivateMessage } from "../../db/crud/create";

export const acceptMatch = async (req:FastifyRequest, res:FastifyReply) => {
    const reqBody = (req.body as any);
    const idNotify = reqBody.idNotify;

    const notify = await readNotifyById(idNotify);

    if (notify.idReceiver != req.user!.id)
        return res.code(403).send({message: "not authorised"});

    deleteNotify(idNotify);

    const player1 = await readUser(notify.idTransmitter, KeyUser.ID);
    const player2 = await readUser(notify.idReceiver, KeyUser.ID, true);

    gameManagement?.push({
        mode: player1.mode,
        users: [null, null],
        sockets: [undefined, undefined],
        invite: [player1.id, player2.id]
    });
    let socketTransmitter = null;
    for (const [socket, id] of userSockets) {
        if (id == notify.idTransmitter) {
            socketTransmitter = socket;
            break ;
        }
    }
    if (socketTransmitter) {
        socketTransmitter.emit("private", {
            id: notify.idReceiver,
            message: "accepted"
        });
    }
    createPrivateMessage(notify.idTransmitter, notify.idReceiver, "accepted", false);
}