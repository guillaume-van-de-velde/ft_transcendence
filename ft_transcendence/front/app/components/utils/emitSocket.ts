import { socket, state } from "../../index.js";
import { MessagePrivate } from "../core/state.js";
import { renderGlobal } from "../pages/messages/global.js";
import { renderPrivateMessage } from "../pages/messages/private.js";

export function sendMessageToUser(e: Event) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    console.log(data.writeBar);
    
    if (!data.writeBar)
        return ;

    const chat = state.messages.private![state.friend]!.chat;

    const newChat = {
        isUser: true,
        message: data.writeBar.toString()
    }

    chat.unshift(newChat);

    const conversation:MessagePrivate = {
        user: state.messages.private![state.friend]!.user,
        seen: true,
        chat: [newChat]
    }
    socket.emit("private", conversation);

    renderPrivateMessage();
}

export function globalMessageSend(e: Event) {
    e.preventDefault();

    console.log("couocou");
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    console.log(data.writeBar);
    
    if (!data.writeBar)
        return ;

    const chat = state.messages.global!;

    const newChat = {
        user: {
            id: state.id,
            pseudo: state.account.pseudo,
            picture: state.profile.picture
        },
        message: data.writeBar.toString()
    }

    chat.unshift(newChat);

    socket.emit("global", newChat);

    renderGlobal();
}