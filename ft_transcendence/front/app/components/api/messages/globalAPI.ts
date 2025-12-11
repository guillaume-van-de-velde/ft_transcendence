import { state } from "../../../index.js";

export function globalAPI(element: HTMLElement | null) {

    if (!state.messages.global || !state.messages.global![0]) {
        return;
    }

    const blocked = state.profile.blocked;
    let chat = state.messages.global;

    if (blocked && blocked[0]) {
        for (const user of blocked!) {
            chat = chat.filter(message => message.user.id != user.id);
        }
    }

    for (let i = chat!.length - 1; i >= 0; i--) {
        const message = chat[i]!;

        const div = document.createElement("div");
        const classOptions = message.user.id === state.id ? "usermessage" : "notusermessage";
        const p = document.createElement("p");
        const pseudo = document.createElement("div");

        pseudo.textContent = message.user.pseudo;
        pseudo.className = "pseudo player cursor-pointer";
        pseudo.dataset.id = `${message.user.id}`;
        p.textContent = message.message;
        div.className = classOptions;
        div.appendChild(pseudo);
        div.appendChild(p);
        element?.appendChild(div);
    }
}