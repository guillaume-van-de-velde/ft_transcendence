import { page } from "../../../pages/index.js";
import { render } from "../../core/render.js";
import { state, TypeEvent } from "../../core/state.js";
import { closeEvent, renderPlayer } from "../../utils/globalEvents.js";
import { PageInstance } from "../../utils/interfaces.js";
import { renderNotify } from "./notify.js";
import { renderPrivateMessage } from "./private.js";

export function renderGlobal() {
    const globalPage: PageInstance = {
        content: page.messages.global,
        level: 1,
        create: global,
    }
    render(globalPage);
}

export function global() {
    const privateMessage = document.getElementById("private");
    const notify = document.getElementById("notify");

    privateMessage?.addEventListener("click", renderPrivateMessage);
    notify?.addEventListener("click", renderNotify);

    state.events = new Map<Element | null, TypeEvent>([
        [privateMessage, {type: "click", callback: renderPrivateMessage}],
        [notify, {type: "click", callback: renderNotify}]
    ]);

    closeEvent();
}
