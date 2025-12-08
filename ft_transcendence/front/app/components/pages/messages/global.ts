import { state } from "../../../index.js";
import { vues } from "../../../vues/vues.js";
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
        content: vues.messages.global,
        level: 1,
        create: global
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

    if (state.input.value != "" || state.input.focused) {
        const input = document.getElementById("writeBar") as HTMLInputElement;
        if (input) {
            input!.value = state.input.value;
            input!.selectionStart = state.input.start;
            input!.selectionEnd = state.input.end;
            state.input.focused ? input.focus() : 0;
        }
        state.input = {
			value: "",
			focused: false,
			start: null,
			end: null
		}
    }

    formWriteBar?.addEventListener("submit", globalMessageSend);
    privateMessage?.addEventListener("click", renderPrivateMessage);
    notify?.addEventListener("click", renderNotify);

    state.events = new Map<Element | null, TypeEvent>([
        [formWriteBar, {type: "submit", callback: globalMessageSend}],
        [privateMessage, {type: "click", callback: renderPrivateMessage}],
        [notify, {type: "click", callback: renderNotify}]
    ]);

    renderPlayer();
    closeEvent();
}
