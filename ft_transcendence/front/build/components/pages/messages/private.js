import { page } from "../../../pages/index.js";
import { render } from "../../core/render.js";
import { state } from "../../core/state.js";
import { closeEvent, renderPlayer } from "../../utils/globalEvents.js";
import { renderGlobal } from "./global.js";
import { renderNotify } from "./notify.js";
export function renderPrivateMessage() {
    const privatePage = {
        content: page.messages.private,
        level: 1,
        create: privateMessage,
    };
    render(privatePage);
}
export function privateMessage() {
    const global = document.getElementById("global");
    const notify = document.getElementById("notify");
    global?.addEventListener("click", renderGlobal);
    notify?.addEventListener("click", renderNotify);
    state.events = new Map([
        [global, { type: "click", callback: renderGlobal }],
        [notify, { type: "click", callback: renderNotify }]
    ]);
    renderPlayer();
    closeEvent();
}
