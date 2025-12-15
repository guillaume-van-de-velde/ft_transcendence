import { Socket } from "socket.io";
import { io } from "../../server";
import { createGlobalMessage, createNotify, createPrivateMessage } from "../db/crud/create";
import { KeyUser, MessageGlobal, Notify } from "../utils/enums";
import { updatePrivateMessageSeen } from "../db/crud/update";
import { readNotifyById, readUser } from "../db/crud/read";
import { gameManagement } from "../routes/game/createGame";
import { tournamentsManagement } from "../routes/tournament/tournament";
import { containsXSSPayload } from "../authentication/authentication";

export const userSockets = new Map<Socket, number>();

async function inviteMatch(idTransmitter: number, idReceiver: number, socketReceiver: Socket | null) {
    let idNotify;
    try {
        idNotify = await createNotify(idTransmitter, idReceiver, Notify.MATCH);
    } catch (err) {
        return;
    }

    if (socketReceiver) {
        let notify;
        try {
            notify = await readNotifyById(idNotify);
        } catch (err) {
            return;
        }
        let userDb;
        try {
            userDb = await readUser(notify.idTransmitter, KeyUser.ID, true);
        } catch (err) {
            userDb = null;
        }
        socketReceiver.emit("notify", {
            id: idNotify,
            user: userDb,
            type: notify.type,
            seen: false
        });
    }
}

function checkForQuitQueue(id: number | undefined) {
    if (!id)
        return;
    for (const tournament of tournamentsManagement) {
        for (const user of tournament.users) {
            if (user.user.id == id) {
                if (tournament.round == user.level) {
                    const index = gameManagement!.findIndex(m => m.users[0]?.id == id);
                    if (index != -1)
                        gameManagement![index]!.users[0] = null;
                    user.queue = false;
                    return;
                }
            }
        }
    }
    const index = gameManagement!.findIndex(m => m.users[0]?.id == id);
    if (index !== -1)
        gameManagement!.splice(index, 1);
}

export function activeSocket() {
    io.on("connection", (socket) => {
        userSockets.set(socket, socket.handshake.auth.id);
        socket.on("disconnect", () => {
            checkForQuitQueue(userSockets.get(socket));
            userSockets.delete(socket);
        });
        socket.on("private", (message) => {
            if (containsXSSPayload(message))
                return ;
            const idTransmitter = userSockets.get(socket);
            const idReceiver = message.user.id;
            let socketReceiver = null;
            const messageToSocketReceiver = {
                id: idTransmitter,
                message: message.chat[0].message
            }

            for (const [key, value] of userSockets) {
                if (value == idReceiver) {
                    socketReceiver = key;
                    break;
                }
            }

            if (socketReceiver) {
                socketReceiver.emit("private", messageToSocketReceiver);
            }

            try {
                createPrivateMessage(idTransmitter!, idReceiver, message.chat[0].message, false);
            } catch (err) {}

            if (messageToSocketReceiver.message == "/match")
                inviteMatch(idTransmitter!, idReceiver, socketReceiver);
        });
        socket.on("global", (message: MessageGlobal) => {
            if (containsXSSPayload(message))
                return;
            socket.broadcast.emit("global", message);
            try {
                createGlobalMessage(message.user.id, message.message);
            } catch (err) {}
        });
        socket.on("seen", (idTransmitter: number) => {
            if (containsXSSPayload(idTransmitter))
                return;
            const idReceiver = userSockets.get(socket);
            if (idReceiver) {
                try {
                    updatePrivateMessageSeen(idTransmitter.toString(), idReceiver.toString());
                } catch (err) {}
            }
        });
    });
}
