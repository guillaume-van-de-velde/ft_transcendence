import { Socket, Server as SocketIOServer } from "socket.io";
import { io } from "../../server";
import { createGlobalMessage, createNotify, createPrivateMessage } from "../db/crud/create";
import { KeyUser, MessageGlobal, Notify } from "../utils/enums";
import { updatePrivateMessageSeen } from "../db/crud/update";
import { readNotifyById, readUser } from "../db/crud/read";

export const userSockets = new Map<Socket, number>();

async function inviteMatch(idTransmitter:number, idReceiver:number, socketReceiver:Socket | null) {
    const idNotify = await createNotify(idTransmitter, idReceiver, Notify.MATCH);

    if (socketReceiver) {
        const notify = await readNotifyById(idNotify);
        socketReceiver.emit("notify", {
            id: idNotify,
            user: await readUser(notify.idTransmitter, KeyUser.ID, true),
            type: notify.type,
            seen: false
        });
    }
}

export function activeSocket() {
    io.on("connection", (socket) => {
        userSockets.set(socket, socket.handshake.auth.id);
        socket.on("disconnect", () => {
            userSockets.delete(socket);
        });
        socket.on("private", (message) => {
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
                    break ;
                }
            }

            if (socketReceiver) {
                socketReceiver.emit("private", messageToSocketReceiver);
            }

            createPrivateMessage(idTransmitter!, idReceiver, message.chat[0].message, false);

            if (messageToSocketReceiver.message == "/match")
                inviteMatch(idTransmitter!, idReceiver, socketReceiver);
        });
        socket.on("global", (message:MessageGlobal) => {
            socket.broadcast.emit("global", message);
            createGlobalMessage(message.user.id, message.message);
        });
        socket.on("seen", (idTransmitter:number) => {
            const idReceiver = userSockets.get(socket);
            if (idReceiver)
                updatePrivateMessageSeen(idTransmitter.toString(), idReceiver.toString());
        });
    });
}
