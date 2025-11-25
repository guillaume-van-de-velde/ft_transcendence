import { state } from "../../../index.js";
import { page } from "../../../vues/index.js";
import { render } from "../../core/render.js";
import { TypeEvent } from "../../core/state.js";
import { closeEvent, renderPlayer } from "../../utils/globalEvents.js";
import { globalAPI } from "../../utils/api.js";
import { PageInstance } from "../../utils/interfaces.js";
import { renderNotify } from "./notify.js";
import { renderPrivateMessage } from "./private.js";
import { checkSeen } from "../../utils/notifySocket.js";
import { globalMessageSend } from "../../utils/emitSocket.js";

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
    const globalMessagerie = document.getElementById("globalMessagerie");
    const formWriteBar = document.getElementById("formWriteBar");

    state.actual = "global";
    
    checkSeen();
    
    globalAPI(globalMessagerie);

    globalMessagerie!.scrollTop = globalMessagerie!.scrollHeight;

    formWriteBar?.addEventListener("submit", globalMessageSend);
    privateMessage?.addEventListener("click", renderPrivateMessage);
    notify?.addEventListener("click", renderNotify);

    state.events = new Map<Element | null, TypeEvent>([
        [formWriteBar, {type: "submit", callback: globalMessageSend}],
        [privateMessage, {type: "click", callback: renderPrivateMessage}],
        [notify, {type: "click", callback: renderNotify}]
    ]);

    closeEvent();
}
