import { page } from "../../../pages/index.js";
import { render } from "../../core/render.js";
import { state, TypeEvent } from "../../core/state.js";
import { closeEvent, renderPlayer } from "../../utils/globalEvents.js";
import { PageInstance } from "../../utils/interfaces.js";
import { renderGlobal } from "./global.js";
import { renderNotify } from "./notify.js";

export function renderPrivateMessage() {
    const privatePage: PageInstance = {
        content: page.messages.private,
        level: 1,
        create: privateMessage,
    }
    render(privatePage);
}

export function privateMessage() {
    const global = document.getElementById("global");
    const notify = document.getElementById("notify");

    global?.addEventListener("click", renderGlobal);
    notify?.addEventListener("click", renderNotify);

    state.events = new Map<Element | null, TypeEvent>([
        [global, {type: "click", callback: renderGlobal}],
        [notify, {type: "click", callback: renderNotify}]
    ]);

    renderPlayer();
    closeEvent();
}
