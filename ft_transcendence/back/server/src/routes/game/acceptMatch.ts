import { FastifyReply, FastifyRequest } from "fastify";
import { deleteNotify } from "../../db/crud/delete";
import { readNotifyById, readUser } from "../../db/crud/read";
import { KeyUser } from "../../utils/enums";
import { gameManagement } from "./createGame";
import { userSockets } from "../../sockets/sockets";
import { createPrivateMessage } from "../../db/crud/create";

export const acceptMatch = async (req: FastifyRequest, res: FastifyReply) => {
    const reqBody = (req.body as any);
    const idNotify = reqBody.idNotify;

    let notify;
    try {
        notify = await readNotifyById(idNotify);
    } catch (err) {
        return res.code(404).send({ error: "cannot find notify" });
    }

    if (notify.idReceiver != req.user!.id)
        return res.code(403).send({ error: "not authorised" });

    try {
        await deleteNotify(idNotify);
    } catch (err) {
        return res.code(404).send({ error: "cannot find notify" });
    }

    let player1;
    let player2;
    try {
        player1 = await readUser(notify.idTransmitter, KeyUser.ID);
        player2 = await readUser(notify.idReceiver, KeyUser.ID, true);
    } catch (err) {
        return res.code(404).send({ error: "cannot find player" });
    }

    gameManagement?.push({
        mode: player1.mode,
        users: [null, null],
        sockets: [undefined, undefined],
        invite: [player1.id, player2.id]
    });
    let socketTransmitter = null;
    for (const [socket, id] of userSockets)
        if (id == notify.idTransmitter)
            socketTransmitter = socket;
    if (socketTransmitter) {
        socketTransmitter.emit("private", {
            id: notify.idReceiver,
            message: "accepted"
        });
    }
    try {
        createPrivateMessage(notify.idReceiver, notify.idTransmitter, "accepted", false);
    } catch (err) {}
}