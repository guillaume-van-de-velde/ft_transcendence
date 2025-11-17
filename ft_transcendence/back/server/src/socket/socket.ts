import { Server as SocketIOServer } from "socket.io";
import { io } from "../../server";
import { createGlobalMessage, createPrivateMessage } from "../db/crud/create";
import { MessageGlobal } from "../utils/enums";

export const userSockets = new Map<string, number>();

export function activeSocket() {
    io.on("connection", (socket) => {
        userSockets.set(socket.id, socket.handshake.auth.id);
        socket.on("disconnect", () => {
            userSockets.delete(socket.id);
        });
        socket.on("private", (message) => {
            console.log(message.chat[0].message);
            const idTransmitter = userSockets.get(socket.id);
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
                io.to(socketReceiver).emit("private", messageToSocketReceiver);
            }

            createPrivateMessage(idTransmitter!, idReceiver, message.chat[0].message, true);
        });
        socket.on("global", (message:MessageGlobal) => {
            console.log(message);
            
            socket.broadcast.emit("global", message);
            createGlobalMessage(message.user.id, message.message);
        });
    });
}
