import { state } from "../../../index.js";
import { vues } from "../../../vues/vues.js";
import { render } from "../../core/render.js";
import { TypeEvent } from "../../core/state.js";
import { closeEvent, renderPlayer } from "../../utils/globalEvents.js";
import { notifyAPI } from "../../api/notify/notifyAPI.js";
import { notifyCallAPI } from "../../api/notify/notifyCallAPI.js";
import { PageInstance } from "../../utils/interfaces.js";
import { renderGlobal } from "./global.js";
import { renderPrivateMessage } from "./private.js";
import { checkSeen } from "../../utils/notifySocket.js";

export function renderNotify() {
    const notifyPage: PageInstance = {
        content: vues.messages.notify,
        level: 1,
        create: notify
    }
    render(notifyPage);
}

export function notify() {
    const privateMessage = document.getElementById("private");
    const global = document.getElementById("global");
    const notificationsList = document.getElementById("notificationsList");

    state.actual = "notify";

    setNotifySeen();

    checkSeen();
    notifyAPI(notificationsList);
    notifyCallAPI();

    privateMessage?.addEventListener("click", renderPrivateMessage);
    global?.addEventListener("click", renderGlobal);

    state.events = new Map<Element | null, TypeEvent>([
        [privateMessage, { type: "click", callback: renderPrivateMessage }],
        [global, { type: "click", callback: renderGlobal }],
    ]);

    renderPlayer();
    closeEvent();
}

function setNotifySeen() {
    if (!state.messages.notify || !state.messages.notify![0])
        return;
    for (const notify of state.messages.notify!) {
        notify.seen = true;
    }
}