import { state } from "../../../index.js";
import { vues } from "../../../vues/vues.js";
import { render } from "../../core/render.js";
import { TypeEvent } from "../../core/state.js";
import { closeEvent, renderPlayer, renderPlayerMessages } from "../../utils/globalEvents.js";
import { messagerieAPI, privateMessagesAPI } from "../../utils/api.js";
import { PageInstance } from "../../utils/interfaces.js";
import { renderGlobal } from "./global.js";
import { renderNotify } from "./notify.js";
import { checkSeen } from "../../utils/notifySocket.js";
import { sendMessageToUser } from "../../utils/emitSocket.js";

export function renderPrivateMessage() {
    const privatePage: PageInstance = {
        content: vues.messages.private,
        level: 1,
        create: privateMessage,
    }
    render(privatePage);
}

export function privateMessage() {
    const global = document.getElementById("global");
    const notify = document.getElementById("notify");
    const friendsList = document.getElementById("friendsList");
    const chat = document.getElementById("chat");
    const writeBar = document.getElementById("formWriteBar");

    if (state.messages.private && state.messages.private[state.friend])
        state.messages.private[state.friend]!.seen = true;

    if (state.checkMessage === false && state.messages.private && state.messages.private[0]) {
        state.checkMessage = true
    }

    checkSeen();

    privateMessagesAPI(friendsList);
    messagerieAPI(chat);

    chat!.scrollTop = chat!.scrollHeight;
    state.actual = "private";

    global?.addEventListener("click", renderGlobal);
    notify?.addEventListener("click", renderNotify);
    writeBar?.addEventListener("submit", sendMessageToUser);

    state.events = new Map<Element | null, TypeEvent>([
        [global, {type: "click", callback: renderGlobal}],
        [notify, {type: "click", callback: renderNotify}],
        [writeBar, {type: "submit", callback: sendMessageToUser}]
    ]);

    renderPlayer();
    renderPlayerMessages();
    closeEvent();
}