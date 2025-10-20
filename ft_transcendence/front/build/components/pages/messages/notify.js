import { page } from "../../../pages/index.js";
import { render } from "../../core/render.js";
import { state } from "../../core/state.js";
import { closeEvent, renderPlayer } from "../../utils/globalEvents.js";
import { renderGlobal } from "./global.js";
import { renderPrivateMessage } from "./private.js";
export function renderNotify() {
    const notifyPage = {
        content: page.messages.notify,
        level: 1,
        create: notify,
    };
    render(notifyPage);
}
export function notify() {
    const privateMessage = document.getElementById("private");
    const global = document.getElementById("global");
    privateMessage?.addEventListener("click", renderPrivateMessage);
    global?.addEventListener("click", renderGlobal);
    state.events = new Map([
        [privateMessage, { type: "click", callback: renderPrivateMessage }],
        [global, { type: "click", callback: renderGlobal }],
    ]);
    renderPlayer();
    closeEvent();
}
