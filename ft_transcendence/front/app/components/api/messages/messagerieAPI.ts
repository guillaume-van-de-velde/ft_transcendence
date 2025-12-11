import { socket, state } from "../../../index.js";

export function messagerieAPI(element: HTMLElement | null) {
    const writeBar = document.getElementById("writeBar");

    if (!state.messages.private || !state.messages.private![0]) {
        writeBar?.classList.add("pointer-events-none");
        return;
    }

    if (!state.messages.private![state.friend]) {
        state.friend = 0;
        writeBar?.classList.add("pointer-events-none");
        return;
    }
    writeBar?.classList.remove("pointer-events-none");

    const chat = state.messages.private![state.friend]!.chat;
    for (let i = chat.length - 1; i >= 0; i--) {
        const message = chat[i]!;
        const div = document.createElement("div");
        const classOptions = message.isUser ? "usermessage" : "notusermessage";
        const p = document.createElement("p");

        p.textContent = message.message;
        div.className = classOptions;
        div.appendChild(p);
        element?.appendChild(div);
    }
    socket.emit("seen", state.messages.private[state.friend]!.user.id);
}